import ollama
import pandas as pd
import os
from datetime import datetime
import csv
import argparse

# ----------------------------
# Argument Parsing
# ----------------------------
parser = argparse.ArgumentParser(description="Generate YouTube video script from question and solution")
parser.add_argument("-q", "--question", type=str, required=True, help="Question to be asked in the video")
parser.add_argument("-s", "--solution", type=str, required=True, help="Solution to base the script on")

args = parser.parse_args()


question = args.question
solution = args.solution

# question = "What is Polymerisation?"
# solution = "Polymerisation is a chemical process in which many small molecules called monomers combine to form a large molecule known as a polymer. This process can occur through addition polymerisation, where monomers join without producing any by-product, or condensation polymerisation, where small molecules like water or hydrogen chloride are eliminated during the reaction. For example, ethene molecules polymerise to form polyethene, a common plastic. In essence, polymerisation links simple units into long repeating chains, creating materials with varied and useful properties such as plastics, fibres, and resins."
# # ----------------------------
# Folder Setup
# ----------------------------
timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M")
folder_name = timestamp + "_" + question[:10]
base_path = r"D:/Flash/All Videos"
txt_file = r"current_folder.txt"

with open(txt_file, "w") as f:
    f.write(folder_name)

folder_path = os.path.join(base_path, folder_name)

try:
    os.makedirs(folder_path, exist_ok=True)
    print(f"Folder created successfully at: {folder_path}")
except Exception as e:
    print(f"Error creating folder: {e}")


csv_path = os.path.join(folder_path, "generated_sentences.csv")
open(csv_path, 'a').close()
print(f"✅ CSV file created at: {csv_path}")

prompt = f"""
You are a YouTube explainer video scriptwriter.

Create a short 1–2 minute video script (around 150–250 words) based on the following:

Question: "{question}"
Solution: "{solution}"

Guidelines:
1. Start the script by clearly stating the question.
2. Use the given solution as the factual base — **do not change or modify facts**.
3. Add light filler sentences or transitions to make it conversational and natural for a YouTube audience.
4. Keep tone engaging, explanatory, and smooth — like a teacher explaining step-by-step.
5. Do **not** add new examples or unrelated information.
6. Each sentence should be long enough to sound natural when spoken (10–20 seconds).
7. Output one sentence per line, ending with a period (.) or question mark (?).
8. Do not include section titles, bullet points, or any meta text — only the spoken script.
9. Do not mention that this is a YouTube explainer video script
"""


# Function to Call Ollama modell

def getresponse():
    response = ollama.chat(model='gemma3:12b', messages=[
        {'role': 'user', 'content': prompt}
    ])
    return response['message']['content']

response_text = getresponse()

# ----------------------------
# Post-process Response
# ----------------------------
sentences = [line.strip() for line in response_text.splitlines() if line.strip()]
sentences.insert(0, f"Question: {question}")

# Merge every 2 lines into one row for CSV
merged_sentence_list = []
for i in range(0, len(sentences), 2):
    merged_sentence_list.append(sentences[i] + (sentences[i+1] if i+1 < len(sentences) else ''))

# ----------------------------
# Write to CSV
# ----------------------------
with open(csv_path, 'a', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    for sentence in merged_sentence_list:
        writer.writerow([sentence])

print("✅ Script generation and CSV writing complete!")
