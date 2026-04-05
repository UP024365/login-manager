const sitesData = {
    study: [
        { 
            name: "📅 2026 학사일정", 
            url: "https://www.ut.ac.kr/prog/schedule/kor/sub05_01/1/scheduleList.do", 
            icon: "icons/ut_logo.svg" 
        },
        { 
            name: "교통대 통합로그인(포털)", 
            url: "https://sso.ut.ac.kr/svc/tk/Auth.eps?ac=Y&ifa=N&id=portal&", 
            icon: "icons/ut_logo.svg" 
        },
        { 
            name: "OCU 컨소시엄 로그인", 
            url: "https://cons.ocu.ac.kr/home/mainHome/Form/main", 
            icon: "icons/ocu_logo.png" 
        },
        { 
            name: "e-Campus (LMS)", 
            url: "https://ecampus.ut.ac.kr/main/MainView.dunet#main", 
            icon: "icons/ut_logo.svg" 
        },
        { 
            name: "한국교통대 홈페이지", 
            url: "https://www.ut.ac.kr", 
            icon: "icons/ut_logo.svg" 
        }
    ],
    login: [
        // 로그인 매니저의 외부 아이콘들은 그대로 유지하거나, 
        // 자주 깨진다면 구글 파비콘 API 방식을 섞어 쓰면 좋습니다.
        { name: "구글 로그인 관리", url: "https://myaccount.google.com/device-activity", icon: "https://www.google.com/favicon.ico" },
        { name: "네이버 보안 설정", url: "https://nid.naver.com/user2/help/myInfo.nhn?m=viewSecurity", icon: "https://www.naver.com/favicon.ico" },
        { name: "카카오 계정 관리", url: "https://accounts.kakao.com/weblogin/account/info", icon: "https://www.kakao.com/favicon.ico" },
        { name: "스팀 기기 관리", url: "https://store.steampowered.com/twofactor/manage", icon: "https://store.steampowered.com/favicon.ico" },
        { name: "인스타 로그인 활동", url: "https://www.instagram.com/session/login_activity/", icon: "https://www.instagram.com/favicon.ico" }
    ]
};

function openCategory(cat) {
    localStorage.setItem('lastCategory', cat);
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('list-screen').style.display = 'block';
    document.getElementById('back-btn').style.display = 'block';
    document.getElementById('title').innerText = cat === 'study' ? '📚 Study' : '🔐 Login Manager';
    render(cat);
}

function goHome() {
    localStorage.removeItem('lastCategory');
    document.getElementById('home-screen').style.display = 'grid';
    document.getElementById('list-screen').style.display = 'none';
    document.getElementById('back-btn').style.display = 'none';
    document.getElementById('title').innerText = '🚀 My Uni-Hub';
}

function render(cat) {
    const container = document.getElementById('list-container');
    container.innerHTML = '';
    sitesData[cat].forEach(site => {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
            <a href="${site.url}" target="_blank">
                <img src="${site.icon}" class="icon" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3064/3064155.png'">
                <span class="info">${site.name}</span>
            </a>
        `;
        container.appendChild(li);
    });
}

function applyTheme(theme) {
    const isDark = theme === 'system' ? window.matchMedia('(prefers-color-scheme: dark)').matches : theme === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

function toggleTheme() {
    const modes = ['system', 'light', 'dark'];
    let current = localStorage.getItem('theme') || 'system';
    let next = modes[(modes.indexOf(current) + 1) % 3];
    localStorage.setItem('theme', next);
    document.querySelector('.theme-toggle').innerText = next === 'system' ? '🖥️ OS' : next === 'light' ? '☀️ Light' : '🌙 Dark';
    applyTheme(next);
}

window.onload = () => {
    applyTheme(localStorage.getItem('theme') || 'system');
    const lastCat = localStorage.getItem('lastCategory');
    if (lastCat) openCategory(lastCat);
};