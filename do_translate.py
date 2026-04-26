import os
import json
import time
from deep_translator import GoogleTranslator

# Load the list of strings
with open('zh_strings.json', 'r', encoding='utf-8') as f:
    raw_strings = json.load(f)

# Filter out CSS/JS blocks or huge strings
strings = []
for s in raw_strings:
    if len(s) > 1500:
        continue
    if '{' in s and '}' in s and '/*' in s:
        continue
    strings.append(s)

# Sort strings by length descending to avoid partial replacements
strings = sorted(strings, key=len, reverse=True)

print(f"Total strings to translate: {len(strings)}")

en_translator = GoogleTranslator(source='zh-TW', target='en')
ja_translator = GoogleTranslator(source='zh-TW', target='ja')

en_map = {}
ja_map = {}

for s in strings:
    s_en = s
    s_ja = s
    if "臻至科技" in s and "Alpenglow Tek" not in s:
        s_en = s.replace("臻至科技", "Alpenglow Tek")
        s_ja = s.replace("臻至科技", "Alpenglow Tek")
    
    try:
        en_map[s] = en_translator.translate(s_en)
    except Exception as e:
        en_map[s] = s
        
    try:
        ja_map[s] = ja_translator.translate(s_ja)
    except Exception as e:
        ja_map[s] = s

# Overrides for some known bad translations
en_map['解決方案'] = 'Solutions'
ja_map['解決方案'] = 'ソリューション'
en_map['公司簡介'] = 'About Us'
ja_map['公司簡介'] = '会社概要'
en_map['最新消息'] = 'News'
ja_map['最新消息'] = 'ニュース'
en_map['關於我們'] = 'About Us'
ja_map['關於我們'] = '私たちについて'
en_map['發展動態'] = 'Development Updates'
ja_map['發展動態'] = '発展動向'
en_map['近期榮譽與肯定'] = 'Recent Honors'
ja_map['近期榮譽與肯定'] = '最近の受賞'

# Save maps just in case
with open('en_map.json', 'w', encoding='utf-8') as f:
    json.dump(en_map, f, ensure_ascii=False, indent=2)
with open('ja_map.json', 'w', encoding='utf-8') as f:
    json.dump(ja_map, f, ensure_ascii=False, indent=2)

def apply_translations(dir_path, t_map):
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                for k in sorted(t_map.keys(), key=len, reverse=True):
                    content = content.replace(k, t_map[k])
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

print("Applying English translations...")
apply_translations('en', en_map)
print("Applying Japanese translations...")
apply_translations('ja', ja_map)

print("Done!")
