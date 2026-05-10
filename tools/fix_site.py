import os

target_dir = r'g:\我的雲端硬碟\臻至科技工作檔案\00-公司經營資料\0-06-公司網站\alpenglowtek-web'

for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith('.html') or file.endswith('.js') or file.endswith('.json'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            # Remove flags (and their trailing space if they have one)
            new_content = new_content.replace('🇺🇸 ', '')
            new_content = new_content.replace('🇹🇼 ', '')
            new_content = new_content.replace('🇯🇵 ', '')
            # Just in case some don't have a space
            new_content = new_content.replace('🇺🇸', '')
            new_content = new_content.replace('🇹🇼', '')
            new_content = new_content.replace('🇯🇵', '')
            
            # Replace inline white-space: nowrap;
            new_content = new_content.replace('style="white-space: nowrap;"', 'style="white-space: normal;"')
            new_content = new_content.replace('white-space: nowrap;', 'white-space: normal;')
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {file_path}')
