import sys
import csv
import json

file_path = sys.argv[1]
data = []

with open(file_path, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data.append(row)

print(json.dumps(data))
