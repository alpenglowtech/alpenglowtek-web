import re
import json

def extract_chinese(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Extract text between > and <
    text_nodes = re.findall(r'>([^<]*[\u4e00-\u9fa5]+[^<]*)<', html)
    # Extract meta content
    meta_content = re.findall(r'content="([^"]*[\u4e00-\u9fa5]+[^"]*)"', html)
    # Extract alt tags
    alt_tags = re.findall(r'alt="([^"]*[\u4e00-\u9fa5]+[^"]*)"', html)
    
    strings = set([s.strip() for s in text_nodes + meta_content + alt_tags if s.strip()])
    return list(strings)

all_strings = []
files = [
    'zh/index.html',
    'zh/company/about.html',
    'zh/company/team.html',
    'zh/company/brand-story.html',
    'zh/solutions/asic/custom-asic.html',
    'zh/solutions/fpga/pqc.html',
    'zh/solutions/fpga/event-camera.html',
    'zh/solutions/fpga/rf.html',
    'zh/solutions/fpga/vision-audio-preprocess.html',
    'zh/news/index.html'
]
for file in files:
    all_strings.extend(extract_chinese(file))

strings = list(set(all_strings))
with open('zh_strings.json', 'w', encoding='utf-8') as f:
    json.dump(strings, f, ensure_ascii=False, indent=2)
