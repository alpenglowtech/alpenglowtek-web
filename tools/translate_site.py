import os

# Dictionary of translations
en_map = {
    'ANIX 技術介紹 — 超低功耗微型 AI 推論核心 | 臻至科技 Alpenglow Tek': 'ANIX Technology — Ultra-Low Power Micro AI Inference Core | Alpenglow Tek',
    'ANIX 重新思考資料搬移與運算分工，為低功耗微型 AI 提供架構級解決方案。了解 ANIX 的核心技術與 FPGA 原型驗證成果。': 'ANIX rethinks data movement and computation allocation, delivering architecture-level solutions for low-power micro AI. Explore ANIX core technology and FPGA prototype validation.',
    '實現超低功耗即時智慧': 'Enabling Ultra-Low Power Real-Time Intelligence',
    '微型 AI 推論核心': 'Micro AI Inference Core',
    '重新思考資料搬移與運算分工，': 'Rethinking data movement and computation allocation,',
    '為低功耗微型 AI 提供架構級解決方案。': 'delivering architecture-level solutions for low-power micro AI.',
    '傳統數位 AI 架構在處理運算時，': 'In traditional digital AI architectures,',
    '頻繁的資料搬移往往成為影響效能與功耗的最大障礙。': 'frequent data movement often becomes the biggest bottleneck affecting performance and power consumption.',
    '尤其在穿戴式裝置、感測節點與工業邊緣設備中，每一焦耳能耗與每一毫秒延遲，都是產品競爭力的核心考量。': 'Especially in wearables, sensor nodes, and industrial edge devices, every joule of energy and every millisecond of latency is a core competitive consideration.',
    '在電力受限的嚴苛環境下，解決方案不應僅止於參數優化，而需從': 'In power-constrained environments, solutions should go beyond parameter optimization and ',
    '架構層級重新定義數據流動': 'redefine data flow at the architecture level',
    'ANIX 採用的記憶體內運算 (CIM) 技術，使數據直接在存儲單元中原地處理，打破存算瓶頸，從根本上消除了搬移數據帶來的冗餘功耗與能量浪費。': 'ANIX employs Computing-in-Memory (CIM) technology, enabling data to be processed directly within storage units, breaking through the memory-compute bottleneck and fundamentally eliminating redundant power consumption from data movement.',
    '技術驗證與產品展示': 'Technical Validation & Product Demo',
    'ANIX 已完成 FPGA 原型整合與實際推論流程驗證。': 'ANIX has completed FPGA prototype integration and real inference process validation.',
    '以下為產品示範影片。': 'Below is the product demonstration video.',
    'ANIX 超低功耗微型 AI 推論核心 — 產品示範': 'ANIX Ultra-Low Power Micro AI Inference Core — Product Demo',
    'ANIX 可作為 IP 與驗證平台，': 'ANIX can serve as an IP and validation platform,',
    '協助 IC Design House 與系統整合商進行技術導入與應用評估。': 'helping IC Design Houses and system integrators with technology adoption and application assessment.',
    '更多 ANIX 專業應用': 'More ANIX Applications',
    '探索 ANIX 在不同場域中的低功耗智慧應用場景': 'Explore ANIX low-power intelligent application scenarios across various domains',
    '工業低功耗應用': 'Industrial Low-Power Applications',
    '消費性低功耗應用': 'Consumer Low-Power Applications',
    
    'FPGA PQC 密碼學硬體加速 | 臻至科技 Alpenglow Tek': 'FPGA PQC Cryptography Hardware Acceleration | Alpenglow Tek',
    '臻至科技提供基於 FPGA 的 PQC 後量子密碼學硬體加速解決方案，為量子時代打造高效能、低延遲與低功耗的資安防護系統。': 'Alpenglow Tek provides FPGA-based PQC post-quantum cryptography hardware acceleration solutions, building high-performance, low-latency, and low-power security systems for the quantum era.',
    'FPGA PQC 密碼學硬體加速': 'FPGA PQC Cryptography Hardware Acceleration',
    '為量子時代打造高效能、低延遲與低功耗的後量子資安解決方案': 'High-performance, low-latency, and low-power post-quantum security solutions for the quantum era',
    '隨著量子運算技術的快速發展，傳統的公開金鑰密碼系統面臨潛在威脅。後量子密碼學（PQC）成為全球資安與半導體產業的關鍵技術。臻至科技提供基於 FPGA 的 PQC 硬體加速解決方案，確保資料傳輸的安全性。': 'With the rapid advancement of quantum computing, traditional public-key cryptographic systems face potential threats. Post-Quantum Cryptography (PQC) has become a key technology for global cybersecurity and semiconductor industries. Alpenglow Tek provides FPGA-based PQC hardware acceleration solutions to ensure data transmission security.',
    '為何選擇 FPGA 加速 PQC 演算法': 'Why FPGA for PQC Acceleration',
    '核心技術優勢': 'Core Technical Advantages',
    '客製化硬體架構設計': 'Customized Hardware Architecture Design',
    '低延遲與高吞吐量': 'Low Latency & High Throughput',
    '低功耗與資源效率': 'Low Power & Resource Efficiency',
    '可重組與長期安全性': 'Reconfigurable & Long-Term Security',
    '臻至科技的 FPGA PQC 解決方案': 'Alpenglow Tek FPGA PQC Solutions',
    '應用領域': 'Application Domains',
    '安全通訊與網路設備': 'Secure Communications & Network Equipment',
    '政府與國防資安系統': 'Government & Defense Security Systems',
    '物聯網與邊緣裝置安全': 'IoT & Edge Device Security',
    '車用電子與智慧運輸': 'Automotive Electronics & Smart Transportation',
    '金融科技與區塊鏈': 'FinTech & Blockchain',
    '技術成果與實際展示': 'Technical Results & Demonstrations',
    
    '核心成員 Team | 臻至科技 Alpenglow Tek': 'Core Team | Alpenglow Tek',
    '深入了解臻至科技的團隊組成與核心優勢。我們致力於打造能在資源受限環境中穩定運作的智慧運算架構。': 'Learn about Alpenglow Tek team composition and core strengths. We are dedicated to building intelligent computing architectures that operate reliably in resource-constrained environments.',
    '攜手攀登，臻至卓越': 'Climb Together, Reach Excellence',
    '來自各領域專業的頂尖夥伴，在開放協作與持續突破中，共同打造下一代邊緣 AI 技術。': 'Top partners from various professional fields, collaborating openly and continuously breaking through to build next-generation edge AI technology.',
    '我們的團隊': 'Our Team',
    '核心夥伴': 'Core Partners',
    '完整 IC 設計與系統整合能力': 'Complete IC Design & System Integration',
    '邊緣 AI 與低功耗運算專長': 'Edge AI & Low-Power Computing Expertise',
    'FPGA 至 ASIC 的落地能力': 'FPGA to ASIC Implementation',
    '技術與商業並重的團隊組成': 'Technology & Business Balanced Team',
    '執行長 CEO': 'CEO',
    '晶片工程經理': 'Silicon Engineering Manager',
    '業務發展經理 BD Manager': 'Business Development Manager',
    '系統與平台經理': 'Systems & Platform Manager',
    '市場經理 Market Manager': 'Market Manager',
    
    '關於我們': 'About Us',
    '品牌故事': 'Brand Story',
    
    '發展動態': 'Development Updates',
    '近期榮譽與肯定': 'Recent Honors & Recognition',
    '我們的技術與成果，持續獲得產業與官方單位的肯定': 'Our technology and achievements continue to gain recognition from industry and official institutions',
    '經濟部 AI 智慧創新大賞': 'MOEA AI Smart Innovation Award',
    '中華電信創新應用比賽': 'Chunghwa Telecom Innovation Application Competition',
    '近期新聞': 'Recent News',
    '最新活動': 'Latest Events',
    '解決方案': 'Solutions',
    '公司簡介': 'About',
    '最新消息': 'News',
    '聯絡資訊': 'Contact Info',
    '隱私權政策': 'Privacy Policy',
    '服務條款': 'Terms of Service'
}

ja_map = {
    'ANIX 技術介紹 — 超低功耗微型 AI 推論核心 | 臻至科技 Alpenglow Tek': 'ANIX 技術紹介 — 超低消費電力マイクロAI推論コア | Alpenglow Tek',
    'ANIX 重新思考資料搬移與運算分工，為低功耗微型 AI 提供架構級解決方案。了解 ANIX 的核心技術與 FPGA 原型驗證成果。': 'ANIXはデータ移動と演算分担を再考し、低消費電力マイクロAIにアーキテクチャレベルのソリューションを提供します。ANIXのコア技術とFPGAプロトタイプ検証の成果をご覧ください。',
    '實現超低功耗即時智慧': '超低消費電力リアルタイムインテリジェンスを実現',
    '微型 AI 推論核心': 'マイクロAI推論コア',
    '重新思考資料搬移與運算分工，': 'データ移動と演算分担を再考し、',
    '為低功耗微型 AI 提供架構級解決方案。': '低消費電力マイクロAIにアーキテクチャレベルのソリューションを提供します。',
    '傳統數位 AI 架構在處理運算時，': '従来のデジタルAIアーキテクチャでは、',
    '頻繁的資料搬移往往成為影響效能與功耗的最大障礙。': '頻繁なデータ移動がパフォーマンスと消費電力に影響を与える最大のボトルネックとなっています。',
    '尤其在穿戴式裝置、感測節點與工業邊緣設備中，每一焦耳能耗與每一毫秒延遲，都是產品競爭力的核心考量。': '特にウェアラブルデバイス、センサーノード、産業用エッジ機器では、1ジュールのエネルギーと1ミリ秒の遅延が製品競争力の核心的な考慮事項です。',
    '在電力受限的嚴苛環境下，解決方案不應僅止於參數優化，而需從': '電力制約のある厳しい環境では、ソリューションはパラメータ最適化にとどまらず、',
    '架構層級重新定義數據流動': 'アーキテクチャレベルでデータフローを再定義',
    'ANIX 採用的記憶體內運算 (CIM) 技術，使數據直接在存儲單元中原地處理，打破存算瓶頸，從根本上消除了搬移數據帶來的冗餘功耗與能量浪費。': 'ANIXが採用するComputing-in-Memory（CIM）技術により、データをストレージユニット内で直接処理し、メモリ-コンピュートのボトルネックを打破し、データ移動による冗長な消費電力とエネルギー浪費を根本的に排除します。',
    '技術驗證與產品展示': '技術検証と製品デモ',
    'ANIX 已完成 FPGA 原型整合與實際推論流程驗證。': 'ANIXはFPGAプロトタイプ統合と実際の推論プロセス検証を完了しました。',
    '以下為產品示範影片。': '以下は製品デモビデオです。',
    'ANIX 超低功耗微型 AI 推論核心 — 產品示範': 'ANIX 超低消費電力マイクロAI推論コア — 製品デモ',
    'ANIX 可作為 IP 與驗證平台，': 'ANIXはIPおよび検証プラットフォームとして、',
    '協助 IC Design House 與系統整合商進行技術導入與應用評估。': 'ICデザインハウスやシステムインテグレーターの技術導入とアプリケーション評価を支援します。',
    '更多 ANIX 專業應用': 'ANIXのその他の応用分野',
    '探索 ANIX 在不同場域中的低功耗智慧應用場景': '様々な分野におけるANIXの低消費電力スマートアプリケーションシナリオを探索',
    '工業低功耗應用': '産業用低消費電力アプリケーション',
    '消費性低功耗應用': 'コンシューマー低消費電力アプリケーション',
    
    'FPGA PQC 密碼學硬體加速 | 臻至科技 Alpenglow Tek': 'FPGA PQC暗号学ハードウェアアクセラレーション | Alpenglow Tek',
    '臻至科技提供基於 FPGA 的 PQC 後量子密碼學硬體加速解決方案，為量子時代打造高效能、低延遲與低功耗的資安防護系統。': 'Alpenglow Tekは、FPGAベースのPQCポスト量子暗号ハードウェアアクセラレーションソリューションを提供し、量子時代に向けた高性能・低遅延・低消費電力のセキュリティシステムを構築します。',
    'FPGA PQC 密碼學硬體加速': 'FPGA PQC暗号学ハードウェアアクセラレーション',
    '為量子時代打造高效能、低延遲與低功耗的後量子資安解決方案': '量子時代に向けた高性能・低遅延・低消費電力のポスト量子セキュリティソリューション',
    '隨著量子運算技術的快速發展，傳統的公開金鑰密碼系統面臨潛在威脅。後量子密碼學（PQC）成為全球資安與半導體產業的關鍵技術。臻至科技提供基於 FPGA 的 PQC 硬體加速解決方案，確保資料傳輸的安全性。': '量子コンピューティングの急速な発展に伴い、従来の公開鍵暗号システムは潜在的な脅威に直面しています。ポスト量子暗号（PQC）は、世界のサイバーセキュリティと半導体産業の重要な技術となっています。Alpenglow Tekは、FPGAベースのPQCハードウェアアクセラレーションソリューションを提供し、データ伝送のセキュリティを確保します。',
    '為何選擇 FPGA 加速 PQC 演算法': 'なぜFPGAでPQCアルゴリズムを加速するのか',
    '核心技術優勢': 'コア技術の優位性',
    '客製化硬體架構設計': 'カスタムハードウェアアーキテクチャ設計',
    '低延遲與高吞吐量': '低遅延・高スループット',
    '低功耗與資源效率': '低消費電力・リソース効率',
    '可重組與長期安全性': '再構成可能性と長期セキュリティ',
    '臻至科技的 FPGA PQC 解決方案': 'Alpenglow TekのFPGA PQCソリューション',
    '應用領域': 'アプリケーション分野',
    '安全通訊與網路設備': 'セキュア通信・ネットワーク機器',
    '政府與國防資安系統': '政府・防衛セキュリティシステム',
    '物聯網與邊緣裝置安全': 'IoT・エッジデバイスセキュリティ',
    '車用電子與智慧運輸': '車載エレクトロニクス・スマートトランスポーテーション',
    '金融科技與區塊鏈': 'フィンテック・ブロックチェーン',
    '技術成果與實際展示': '技術成果と実際のデモ',
    
    '核心成員 Team | 臻至科技 Alpenglow Tek': 'コアチーム | Alpenglow Tek',
    '深入了解臻至科技的團隊組成與核心優勢。我們致力於打造能在資源受限環境中穩定運作的智慧運算架構。': 'Alpenglow Tekのチーム構成とコア優位性をご覧ください。リソース制約環境で安定して動作するインテリジェントコンピューティングアーキテクチャの構築に取り組んでいます。',
    '攜手攀登，臻至卓越': '共に頂を目指し、卓越を追求する',
    '來自各領域專業的頂尖夥伴，在開放協作與持續突破中，共同打造下一代邊緣 AI 技術。': '各分野のトップパートナーが、オープンなコラボレーションと継続的なブレークスルーを通じて、次世代エッジAI技術を共に構築しています。',
    '我們的團隊': '私たちのチーム',
    '核心夥伴': 'コアパートナー',
    '完整 IC 設計與系統整合能力': '完全なIC設計とシステム統合能力',
    '邊緣 AI 與低功耗運算專長': 'エッジAIと低消費電力コンピューティングの専門性',
    'FPGA 至 ASIC 的落地能力': 'FPGAからASICへの実装能力',
    '技術與商業並重的團隊組成': '技術とビジネスのバランスが取れたチーム構成',
    '執行長 CEO': '最高経営責任者 CEO',
    '晶片工程經理': 'シリコンエンジニアリングマネージャー',
    '業務發展經理 BD Manager': '事業開発マネージャー',
    '系統與平台經理': 'システム＆プラットフォームマネージャー',
    '市場經理 Market Manager': 'マーケットマネージャー',
    
    '關於我們': '私たちについて',
    '品牌故事': 'ブランドストーリー',
    
    '發展動態': '発展動向',
    '近期榮譽與肯定': '最近の受賞と評価',
    '我們的技術與成果，持續獲得產業與官方單位的肯定': '私たちの技術と成果は、業界や公的機関から継続的に認められています',
    '經濟部 AI 智慧創新大賞': '経済部AIスマートイノベーション大賞',
    '中華電信創新應用比賽': '中華電信イノベーションアプリケーションコンテスト',
    '近期新聞': '最新ニュース',
    '最新活動': '最新イベント',
    '解決方案': 'ソリューション',
    '公司簡介': '会社概要',
    '最新消息': 'ニュース',
    '聯絡資訊': 'お問い合わせ情報',
    '隱私權政策': 'プライバシーポリシー',
    '服務條款': '利用規約'
}

def translate_dir(dir_path, t_map):
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Sort keys by length descending to prevent partial replacements
                for k in sorted(t_map.keys(), key=len, reverse=True):
                    content = content.replace(k, t_map[k])
                    
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

if __name__ == '__main__':
    translate_dir('en', en_map)
    print("English translation done.")
    translate_dir('ja', ja_map)
    print("Japanese translation done.")
