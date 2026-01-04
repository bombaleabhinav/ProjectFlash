import os
from moviepy.editor import ImageClip, AudioFileClip

# ========== CONFIG ==========
txt_folder = "current_folder.txt"
with open(txt_folder, "r") as f:
    folder_path_my = f.read().strip()  # The latest folder path

csv_file = "config.csv"
# ======= Step 1: Manually set your folder path here =======
with open(csv_file, newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

folder_path = rows[1][0] 

image_path = "media/bg.jpg"
audio_path = rf"D:/Flash/All Videos/{folder_path_my}/audio_files/02.wav"
temp_video = "temp_nosound.mp4"
output_path = rf"D:/Flash/All Videos/{folder_path_my}/final_output.mp4"

# ========== MAIN LOGIC ==========

# Load the audio file
audio_clip = AudioFileClip(audio_path)
audio_duration = audio_clip.duration

# Create image-based video for same duration
image_clip = ImageClip(image_path, duration=audio_duration)
image_clip = image_clip.resize((1920, 1080)).set_position("center")

# Export the image-only video first
image_clip.write_videofile(
    temp_video,
    codec="libx264",
    fps=30,
    audio=False,
    verbose=False,
    logger=None
)

# ========== MERGE AUDIO + VIDEO (Hard Embedded) ==========
# Use ffmpeg to fully mux both into a single MP4 file
os.system(
    f'ffmpeg -y -i "{temp_video}" -i "{audio_path}" -c:v copy -c:a aac -shortest "{output_path}"'
)

# Clean up temporary file
os.remove(temp_video)

print(f"✅ Final video generated successfully with audio embedded: {output_path}")
