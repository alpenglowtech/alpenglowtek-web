import os

def update_index_files():
    files = [
        'zh/index.html',
        'en/index.html',
        'ja/index.html'
    ]
    
    for f in files:
        if not os.path.exists(f): continue
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Remove 程穝笆
        content = content.replace('<a href=\"news/events.html\" class=\"dropdown-item\">程穝笆</a>\n', '')
        content = content.replace('<a href=\"news/events.html\" class=\"dropdown-item\">Latest Events</a>\n', '')
        content = content.replace('<a href=\"news/events.html\" class=\"dropdown-item\">程穝????</a>\n', '')
        content = content.replace('<a href=\"../zh/news/events.html\" class=\"dropdown-item\">程穝笆</a>\n', '')
        content = content.replace('<a href=\"../en/news/events.html\" class=\"dropdown-item\">Latest Events</a>\n', '')
        content = content.replace('<a href=\"../ja/news/events.html\" class=\"dropdown-item\">程穝????</a>\n', '')
        
        # Also remove from main.js if any... Wait main.js is handled via t.events and another place.
        
        if 'class=\"header-right\"' not in content:
            lang = 'zh'
            if '/en/' in f or '\\en\\' in f:
                lang = 'en'
            elif '/ja/' in f or '\\ja\\' in f:
                lang = 'ja'
                
            if lang == 'zh':
                lang_btn = '???? 羉い'
                active_zh = ' active'
                active_en = ''
                active_ja = ''
            elif lang == 'en':
                lang_btn = '???? EN'
                active_zh = ''
                active_en = ' active'
                active_ja = ''
            else:
                lang_btn = '???? JP'
                active_zh = ''
                active_en = ''
                active_ja = ' active'
                
            switcher = f'''
            <!-- Language Switcher -->
            <div class=\"header-right\">
                <div class=\"nav-item lang-switcher\">
                    <div class=\"lang-btn\">{lang_btn} <span style=\"font-size:.6rem\">?</span></div>
                    <div class=\"dropdown\" style=\"right:0;left:auto;min-width:160px\">
                        <a href=\"../zh/index.html\" class=\"dropdown-item{active_zh}\">???? 羉砰いゅ</a>
                        <a href=\"../en/index.html\" class=\"dropdown-item{active_en}\">???? English</a>
                        <a href=\"../ja/index.html\" class=\"dropdown-item{active_ja}\">???? らセ粂</a>
                    </div>
                </div>
            </div>
            '''
            content = content.replace('<!-- Mobile Toggle -->', switcher + '\n            <!-- Mobile Toggle -->')

        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
            
update_index_files()
