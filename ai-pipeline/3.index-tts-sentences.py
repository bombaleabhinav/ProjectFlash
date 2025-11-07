from gradio_client import Client, handle_file
import pandas as pd
import os
import shutil
import csv
import time
import argparse


parser = argparse.ArgumentParser(description="Pass absolute path to reference audio file")
parser.add_argument(
    "-r", "--ref_audio",
    type=str,
    required=True,
    help="Absolute path to reference audio file (e.g., D:/Flash/audio/voice.mp3)"
)
args = parser.parse_args()

# --- Normalize and validate the path ---
ref_audio_path = os.path.abspath(args.ref_audio)

if not os.path.exists(ref_audio_path):
    raise FileNotFoundError(f"Audio file not found at: {ref_audio_path}")

# --- Load using Gradio handle_file ---
reference_audio = handle_file(ref_audio_path) #taking files from uploaded stuff
# reference_audio = handle_file(r"media/pc_ref_voice_10s.mp3")

# df = pd.read_csv("api_variables.csv") #include / during 

# Connect to local IndexTTS WebUI
# client = Client(df["tts-url"][0])
client = Client("https://4a856f872137e42638.gradio.live/")

# Reference audio

def move_wav_file(source_path, destination_folder):
    """
    Moves a single .wav file from the given source path to the destination folder.
    If the destination folder doesn't exist, it is created.
    """

    # Check if source file exists
    if not os.path.isfile(source_path):
        print(f"❌ File not found: {source_path}")
        return

    # Check if it's a .wav file
    if not source_path.lower().endswith(".wav"):
        print(f"❌ Not a .wav file: {source_path}")
        return

    # Create destination folder if it doesn't exist
    os.makedirs(destination_folder, exist_ok=True)

    # Build destination path
    destination_path = os.path.join(destination_folder, os.path.basename(source_path))

    # Move the file (use shutil.copy2() if you want to copy instead)
    shutil.move(source_path, destination_path)
    print(f"✅ Moved: {source_path} → {destination_path}")



# Generate audio using this function
def str_to_audio(prompt):
    result = client.predict(
        emo_control_method="Same as the voice reference",
        prompt=reference_audio,
        text=prompt,
        emo_ref_path=reference_audio,
        emo_weight=0.65,
        vec1=0, vec2=0, vec3=0, vec4=0, vec5=0, vec6=0, vec7=0, vec8=0,
        emo_text="",
        emo_random=False,
        max_text_tokens_per_segment=120,
        param_16=True,
        param_17=0.8,
        param_18=30,
        param_19=0.8,
        param_20=0,
        param_21=3,
        param_22=10,
        param_23=1500,
        api_name="/gen_single"
    )

    print("✅ Audio generation complete!")
    print("Result object:", result)
    print(type(result))
    print(result['value'])
    return (result['value'])




txt_folder  = "current_folder.txt"
with open(txt_folder, "r") as f:
        folder_path_my = f.read().strip() # The latest folder path



#CSV file cells to audio
csv_file = r"D:/Flash/All Videos"+f"\{folder_path_my}\generated_sentences.csv"
print(csv_file)
# Load the CSV into a DataFrame
df = pd.read_csv(csv_file)
no_of_rows= len(df) # Toal no of rows


txt_folder  = "current_folder.txt"
with open(txt_folder, "r") as f:
        folder_path_my = f.read().strip()

dst= r"D:/Flash/All Videos"+f"\{folder_path_my}/audio_files" 
os.makedirs(dst, exist_ok=True)
counter = 1
with open(csv_file, 'r', newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    all_rows= []
    # Iterate through each row
    for row in reader:
        sentence = row[0]
        all_rows.append(sentence)
        # Generate audio
        # aud_path = str_to_audio(sentence)
        
        # # Build new sequential filename
        # new_filename = f"{counter:02d}.wav"  # 01.wav, 02.wav, etc.
        # destination_path = os.path.join(dst, new_filename)
        
        # # Move and rename
        # shutil.move(aud_path, destination_path)
        # print(f"✅ Moved and renamed: {aud_path} → {destination_path}")
            
    counter += 1
    aud_path = str_to_audio("\n".join(all_rows))
    
    # Build new sequential filename
    new_filename = f"{counter:02d}.wav"  # 01.wav, 02.wav, etc.
    destination_path = os.path.join(dst, new_filename)
    
    # Move and rename
    shutil.move(aud_path, destination_path)
    print(f"✅ Moved and renamed: {aud_path} → {destination_path}")
print("IndexTTS work done sucessfully!")
time.sleep(5)





