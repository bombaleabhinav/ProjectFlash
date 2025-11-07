import whisper
import os


txt_folder  = "current_folder.txt"
with open(txt_folder, "r") as f:
        folder_path_my = f.read().strip() # The latest folder path

# --- CONFIG ---


def generate_srt(mp4_path, output_srt=None):
    """
    Transcribes an MP4 file and generates an SRT subtitle file.
    
    Args:
        mp4_path (str): Path to the input MP4 file.
        output_srt (str, optional): Path to save the generated SRT file. 
                                     Defaults to same name as mp4_path with .srt extension.
    """
    if not os.path.exists(mp4_path):
        raise FileNotFoundError(f"File not found: {mp4_path}")
    
    if output_srt is None:
        output_srt = os.path.splitext(mp4_path)[0] + ".srt"
    
    # Load the Whisper model (small model is faster, use "medium" or "large" for better accuracy)
    model = whisper.load_model("small")
    
    print(f"Transcribing {mp4_path} ...")
    result = model.transcribe(mp4_path, language="en")
    
    print(f"Generating SRT file at {output_srt} ...")
    
    # Write the transcription in SRT format
    with open(output_srt, "w", encoding="utf-8") as srt_file:
        for i, segment in enumerate(result['segments'], start=1):
            start = segment['start']
            end = segment['end']
            text = segment['text'].strip()
            
            def format_time(seconds):
                h = int(seconds // 3600)
                m = int((seconds % 3600) // 60)
                s = int(seconds % 60)
                ms = int((seconds - int(seconds)) * 1000)
                return f"{h:02}:{m:02}:{s:02},{ms:03}"
            
            srt_file.write(f"{i}\n")
            srt_file.write(f"{format_time(start)} --> {format_time(end)}\n")
            srt_file.write(f"{text}\n\n")
    
    print("Subtitle generation completed!")

# Example usage
mp4_file_path = rf"D:/Flash/All Videos\{folder_path_my}\final_output.mp4"
custom_srt_path = "captions.srt"
generate_srt(mp4_file_path,output_srt=custom_srt_path)

