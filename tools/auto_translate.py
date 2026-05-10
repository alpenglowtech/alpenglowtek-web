import os
import re
from bs4 import BeautifulSoup
from deep_translator import GoogleTranslator
import time
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

en_translator = GoogleTranslator(source='zh-TW', target='en')
ja_translator = GoogleTranslator(source='zh-TW', target='ja')

def has_chinese(text):
    if not text:
        return False
    return bool(re.search(r'[\u4e00-\u9fa5]', text))

def translate_text(text, lang='en', retries=3):
    if not has_chinese(text):
        return text
    
    t_text = text
    t_text = t_text.replace("臻至科技", "Alpenglow Tek")

    translator = en_translator if lang == 'en' else ja_translator
    for i in range(retries):
        try:
            res = translator.translate(t_text)
            if res:
                return res
        except Exception as e:
            time.sleep(1)
    return text

def process_file(filepath, lang):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    changed = False

    for text_node in soup.find_all(string=True):
        if text_node.parent and text_node.parent.name in ['script', 'style']:
            continue
        original = str(text_node)
        if has_chinese(original):
            translated = translate_text(original.strip(), lang)
            if translated != original.strip():
                new_text = original.replace(original.strip(), translated)
                text_node.replace_with(new_text)
                changed = True

    for tag in soup.find_all(True):
        for attr in ['alt', 'title', 'placeholder']:
            if tag.has_attr(attr):
                val = tag[attr]
                if has_chinese(val):
                    tag[attr] = translate_text(val, lang)
                    changed = True
        
        if tag.name == 'meta' and tag.has_attr('content'):
            val = tag['content']
            if has_chinese(val):
                tag['content'] = translate_text(val, lang)
                changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print(f"Translated [{lang}] {filepath}", flush=True)

def main():
    dirs = {'en': 'en', 'ja': 'ja'}
    for lang, folder in dirs.items():
        if not os.path.exists(folder):
            continue
        for root, _, files in os.walk(folder):
            for file in files:
                if file.endswith('.html'):
                    path = os.path.join(root, file)
                    process_file(path, lang)

if __name__ == '__main__':
    print("Starting translation scan...", flush=True)
    main()
    print("Done scanning and translating.", flush=True)
