import requests
import json
from moviepy.editor import VideoFileClip, AudioFileClip, concatenate_videoclips
import os
import time

# ========== CONFIG ==========
txt_folder = "current_folder.txt"
with open(txt_folder, "r") as f:
    folder_path_my = f.read().strip()

VIDEO_PATH = "media/teacher.mp4"
AUDIO_PATH = rf"D:/Flash/All Videos/{folder_path_my}/audio_files/02.wav"
API_KEY = "sk-bQDQYCXyQ5ydiQpLO8PiiQ.txAhs4dK_WkCclIksR8U_9Y8Zukr2Gym"
OUTPUT_VIDEO = rf"D:/Flash/All Videos/{folder_path_my}/final_lipsync_green.mp4"

# ========== STEP 1: Loop the video to match audio length ==========
video_clip = VideoFileClip(VIDEO_PATH)
audio_clip = AudioFileClip(AUDIO_PATH)

video_duration = video_clip.duration
audio_duration = audio_clip.duration

repeat_times = int(audio_duration // video_duration) + 1
looped_clip = concatenate_videoclips([video_clip] * repeat_times).subclip(0, audio_duration)
looped_clip.write_videofile("looped_video.mp4", codec="libx264", audio=False)

video_clip.close()
audio_clip.close()

print(f"✅ Looped video created: {audio_duration:.2f}s long")


# ========== STEP 2: Call Sync.so Lip Sync API ==========
url = "https://api.sync.so/v2/lipsync"

files = {
    'video_file': open("looped_video.mp4", 'rb'),
    'audio_file': open(AUDIO_PATH, 'rb'),
}
headers = {
    'accept': 'application/json',
    'Authorization': f'Bearer {API_KEY}'
}
data = {
    "model": "lipsync-2",  # model name
    "background": "green", # optional, since you’re using green screen
    "output_format": "mp4"
}

print("🎬 Uploading to Sync.so for lip-sync processing...")
response = requests.post(url, headers=headers, files=files, data=data)

if response.status_code != 200:
    print("❌ API Error:", response.text)
    exit()

job_info = response.json()
print("✅ Job submitted:", job_info)

job_id = job_info.get("id")

# ========== STEP 3: Poll until done ==========
import time

status_url = f"https://api.sync.so/v2/jobs/{job_id}"
while True:
    r = requests.get(status_url, headers=headers)
    job_status = r.json()
    status = job_status.get("status")
    print(f"Job Status: {status}")
    if status == "completed":
        result_url = job_status["output"]["url"]
        print("✅ Completed! Downloading result...")
        break
    elif status == "failed":
        print("❌ Job failed:", job_status)
        exit()
    time.sleep(10)

# ========== STEP 4: Download final synced video ==========
output_video = requests.get(result_url)
with open(OUTPUT_VIDEO, "wb") as f:
    f.write(output_video.content)

print(f"🎉 Final lip-synced video saved as: {OUTPUT_VIDEO}")
