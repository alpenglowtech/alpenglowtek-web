import os

base_dir = r"G:\我的雲端硬碟\臻至科技工作檔案\02-業務發展資料\2-APG新版網站\alpenglowtek-web"

# Define the HTML template
html_template = """<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | 臻至科技 Alpenglow Tek</title>
    <meta name="description" content="臻至科技 Alpenglow Tek - {title} Placeholder">
    <link rel="stylesheet" href="{root}assets/css/main.css">
    <link rel="stylesheet" href="{root}assets/css/header.css">
    <link rel="stylesheet" href="{root}assets/css/footer.css">
</head>
<body>
    <!-- Header will be dynamically injected here by main.js -->
    <div id="site-header"></div>

    <main>
        <!-- Hero Section -->
        <section class="page-hero text-center">
            <div class="container fade-up fade-up-delay-1">
                <h1>{title}</h1>
                <p>這是一個示範用 placeholder 頁面：主要用來展示新的網站架構與路由配置。</p>
            </div>
        </section>

        <!-- Dynamic Content Section placeholder -->
        <section class="section">
            <div class="container">
                <div class="section-label mb-4">{section_label}</div>
                <h2 class="mb-5 fade-up">網站內容區塊</h2>
                <p class="fade-up fade-up-delay-1">此處為 {title} 的獨立內頁。所有的選單連結與檔案路徑已經建構完畢，我們後續可以將實際內容填充進此處。</p>
                <br>
                <div class="grid-3 mt-5">
                    <div class="card card-body fade-up fade-up-delay-2">
                        <h4>特色一</h4>
                        <p>大量留白、乾淨排版</p>
                    </div>
                    <div class="card card-body fade-up fade-up-delay-3">
                        <h4>特色二</h4>
                        <p>白色 + 深蓝 + 荧光蓝主色</p>
                    </div>
                    <div class="card card-body fade-up fade-up-delay-3">
                        <h4>特色三</h4>
                        <p>完全獨立的多頁式路由</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer will be dynamically injected here by main.js -->
    <div id="site-footer"></div>

    <script src="{root}assets/js/main.js"></script>
</body>
</html>
"""

# Define all routes
routes = {
    # Home
    "zh/index.html": {"title": "首頁 Home", "section_label": "HOME"},
    # Solutions - ASIC
    "zh/solutions/index.html": {"title": "解決方案 Solutions", "section_label": "SOLUTIONS"},
    "zh/solutions/asic/anix/index.html": {"title": "ANIX：超低功耗 AI 處理器", "section_label": "ASIC / ANIX"},
    "zh/solutions/asic/anix/tech.html": {"title": "ANIX 技術介紹", "section_label": "ASIC / ANIX TECH"},
    "zh/solutions/asic/anix/apps-industrial.html": {"title": "工業低功耗應用", "section_label": "APPLICATIONS"},
    "zh/solutions/asic/anix/apps-consumer.html": {"title": "消費性低功耗應用", "section_label": "APPLICATIONS"},
    "zh/solutions/asic/custom-asic.html": {"title": "客製化 ASIC", "section_label": "ASIC SERVICES"},
    # Solutions - FPGA
    "zh/solutions/fpga/pqc.html": {"title": "FPGA - PQC 密碼學", "section_label": "FPGA APPLICATIONS"},
    "zh/solutions/fpga/event-camera.html": {"title": "FPGA - 事件相機", "section_label": "FPGA APPLICATIONS"},
    "zh/solutions/fpga/rf.html": {"title": "FPGA - RF 射頻", "section_label": "FPGA APPLICATIONS"},
    "zh/solutions/fpga/vision-audio-preprocess.html": {"title": "FPGA - 視覺/聽覺前處理", "section_label": "FPGA APPLICATIONS"},
    # Company
    "zh/company/index.html": {"title": "公司簡介 Company", "section_label": "COMPANY"},
    "zh/company/about.html": {"title": "關於我們 About Us", "section_label": "ABOUT"},
    "zh/company/team.html": {"title": "核心成員 Team", "section_label": "TEAM"},
    "zh/company/brand-story.html": {"title": "品牌故事 Brand Story", "section_label": "BRAND"},
    # News
    "zh/news/index.html": {"title": "近期新聞 News", "section_label": "NEWS"},
    "zh/news/awards.html": {"title": "榮獲獎項 Awards", "section_label": "AWARDS"},
    "zh/news/events.html": {"title": "最新活動 Events", "section_label": "EVENTS"},
    "zh/resources/index.html": {"title": "資源下載 Resources", "section_label": "RESOURCES"},
    # Careers
    "zh/careers/index.html": {"title": "加入臻至 Careers", "section_label": "CAREERS"},
    "zh/careers/rtl-engineer.html": {"title": "RTL 工程師正職", "section_label": "JOB OPENING"},
    "zh/careers/rtl-intern.html": {"title": "RTL 工程師實習", "section_label": "JOB OPENING"},
    "zh/careers/product-ops-intern.html": {"title": "產品與營運實習", "section_label": "JOB OPENING"},
    "zh/careers/life.html": {"title": "臻至生活 Life at APG", "section_label": "CULTURE"},
    # Contact
    "zh/contact/index.html": {"title": "填寫資料 Contact Form", "section_label": "CONTACT"},
    "zh/contact/location.html": {"title": "公司位置 Location", "section_label": "LOCATION"},
}

# Add EN and JA blank clones (just one page for testing structure)
for lang in ['en', 'ja']:
    routes[f"{lang}/index.html"] = {"title": f"Home ({lang.upper()})", "section_label": "HOME"}
    routes[f"{lang}/solutions/index.html"] = {"title": f"Solutions ({lang.upper()})", "section_label": "SOLUTIONS"}
    routes[f"{lang}/company/index.html"] = {"title": f"Company ({lang.upper()})", "section_label": "COMPANY"}

def get_root_prefix(filepath):
    # Calculates prefix like '../../' based on directory depth
    depth = filepath.count('/')
    if depth == 0:
        return './'
    return '../' * depth

for filepath, data in routes.items():
    full_path = os.path.join(base_dir, filepath.replace('/', os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    
    # get lang from path (first component)
    lang = filepath.split('/')[0]
    
    html_content = html_template.format(
        lang=lang,
        title=data['title'],
        section_label=data['section_label'],
        root=get_root_prefix(filepath)
    )
    
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

# Update root index.html to redirect to zh/index.html and language.html
root_index = """<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=zh/index.html">
    <title>Redirecting...</title>
</head>
<body>
    <p>如果您沒有自動跳轉，請點擊 <a href="zh/index.html">這裡</a> 進入首頁。</p>
    <p>If you are not redirected automatically, follow this <a href="zh/index.html">link</a>.</p>
</body>
</html>
"""
with open(os.path.join(base_dir, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(root_index)

language_page = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Select Language | 臻至科技</title>
    <link rel="stylesheet" href="./assets/css/main.css">
    <style>
        .lang-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #061A3A; color: white;}
        .lang-box { background: white; border-radius: 20px; padding: 3rem; text-align: center; color: #061A3A;}
        .lang-btn { display: block; padding: 1rem 2rem; margin: 1rem 0; border: 2px solid #2FE8FA; border-radius: 12px; font-weight: bold; transition: 0.3s;}
        .lang-btn:hover { background: #2FE8FA; color: #061A3A; transform: translateY(-3px);}
    </style>
</head>
<body>
    <div class="lang-container">
        <div class="lang-box">
            <h1 style="margin-bottom: 2rem;">Select Language</h1>
            <a href="zh/index.html" class="lang-btn">繁體中文</a>
            <a href="en/index.html" class="lang-btn">English</a>
            <a href="ja/index.html" class="lang-btn">日本語</a>
        </div>
    </div>
</body>
</html>
"""
with open(os.path.join(base_dir, 'language.html'), 'w', encoding='utf-8') as f:
    f.write(language_page)

print("HTML Structure Generated Successfully!")
