from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip
import os
import subprocess


txt_folder  = "current_folder.txt"
with open(txt_folder, "r") as f:
        folder_path_my = f.read().strip() # The latest folder path


# input_video = rf"D:\Neutrino_All_Videos\{folder_path_my}\final.mp4"
input_video = rf"D:/Flash/All Videos/{folder_path_my}/final_output.mp4"
input_srt = "captions.srt"
output_video = rf"D:/Flash/All Videos/{folder_path_my}/final_with_subtitles.mp4"

command = [
    "ffmpeg",
    "-i", input_video,
    "-vf", f"subtitles={input_srt}:force_style='FontName=Segoe UI Bold,FontSize=32,PrimaryColour=&HFFFFFF&,OutlineColour=&H000000&,Outline=2,Alignment=8,WrapStyle=0,MarginL=20,MarginR=20,MarginV=40'",
    "-c:a", "copy",
    output_video
]

subprocess.run(command)

# if os.path.exists(input_video):
#         os.remove(input_video)
#         os.remove("captions.srt")
#         print(f"🗑️ Deleted original video: {input_video}")