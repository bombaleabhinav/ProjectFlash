import os
import csv
import subprocess

csv_file = "config.csv"
# ======= Step 1: Manually set your folder path here =======
with open(csv_file, newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

folder_path = rows[1][0] 
os.makedirs(folder_path, exist_ok=True) #Base folder
  # 👈 change this to your folder
folder_path =folder_path+"/input"
os.makedirs(folder_path, exist_ok=True)
# ======= Step 2: Validate folder =======
if not os.path.isdir(folder_path):
    print(f"❌ Error: '{folder_path}' is not a valid directory.")
    exit(1)

# ======= Step 3: Get all file paths =======
file_paths = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]

# ======= Step 4: Filter by file type =======
csv_file  = next((f for f in file_paths if f.endswith(".csv")), None)
png_file  = next((f for f in file_paths if f.endswith(".png")), None)
wav_file  = next((f for f in file_paths if f.endswith(".wav")), None)
jpeg_file = next((f for f in file_paths if f.endswith((".jpg", ".jpeg"))), None)



# ======= Step 3: Open and read the CSV file =======
with open(csv_file, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)

    # ======= Step 4: Validate columns =======
    headers = [h.lower().strip() for h in reader.fieldnames]
    if not ("question" in headers and ("answer" in headers or "solution" in headers)):
        print(f"❌ CSV must contain 'question' and 'answer' or 'solution' columns.")
        print(f"Found columns: {headers}")
        exit(1)

    # ======= Step 5: Iterate over each row =======
    print("\n🧠 Extracted Q&A from CSV:\n")

    for i, row in enumerate(reader, start=1):
        # Normalize column keys
        row = {k.lower().strip(): v.strip() for k, v in row.items() if v is not None}

        question = row.get("question")
        answer = row.get("answer") or row.get("solution")
        cmd = [
            "python",
            "1.script-generation.py",
            "-q", question,
            "-s", answer
        ]

        # ======= Step 5: Run the script =======
        try:
            subprocess.run(cmd, check=True)
        except subprocess.CalledProcessError as e:
            print(f"❌ Error while running for row {i}: {e}")
        print("-" * 60)

        subprocess.run(["python","3.index-tts-sentences.py","-r",wav_file,"-g",rows[1][1]], check=True)
        subprocess.run(["python","4.audio+img.py"], check=True)
        subprocess.run(["python","5.subtitle-generator.py"], check=True)
        subprocess.run(["python","6.srt-adding.py"], check=True)
        subprocess.run(["python","8.logo.py","-p",png_file], check=True)
        

