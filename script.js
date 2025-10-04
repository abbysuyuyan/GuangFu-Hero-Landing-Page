const hamburgerBtn = document.getElementById('hamburgerBtn');
const hamburgerSidebar = document.getElementById('hamburgerSidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const sidebarClose = document.getElementById('sidebarClose');

const evacuationBanner = document.getElementById('evacuationBanner');
const evacuationModal = document.getElementById('evacuationModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');

const toggleButton = document.getElementById('toggleButton');
const toggleArrow = document.getElementById('toggleArrow');
const listOption = document.getElementById('listOption');

const tabs = document.querySelectorAll('.tab');
const sidebarTabs = document.querySelectorAll('.sidebar-tab');
const shareBtn = document.getElementById('shareBtn');

function openSidebar() {
    hamburgerSidebar.classList.add('active');
    sidebarBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    hamburgerSidebar.classList.remove('active');
    sidebarBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);

// 用關閉漢堡回到地圖的邏輯可以嗎
const sidebarItems = document.querySelectorAll('.sidebar-item');

sidebarItems.forEach(item => {
    item.addEventListener('click', function(e) {
        closeSidebar();
    });
});

let currentOpenAccordion = null;

sidebarTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetPages = document.getElementById(targetId);
        
        if (currentOpenAccordion === this) {
            this.classList.remove('active');
            targetPages.classList.remove('active');
            currentOpenAccordion = null;
        } else {
            if (currentOpenAccordion) {
                currentOpenAccordion.classList.remove('active');
                const prevTargetId = currentOpenAccordion.getAttribute('data-target');
                document.getElementById(prevTargetId).classList.remove('active');
            }
            
            this.classList.add('active');
            targetPages.classList.add('active');
            currentOpenAccordion = this;
        }
    });
});

function openModal() {
    evacuationModal.classList.add('active');
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    evacuationModal.classList.remove('active');
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

evacuationBanner.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Toggle
let isListVisible = false;

toggleButton.addEventListener('click', function() {
    isListVisible = !isListVisible;
    
    if (isListVisible) {
        listOption.style.display = 'flex';
        toggleArrow.classList.add('expanded');
        
        setTimeout(() => {
            listOption.classList.add('active');
        }, 10);
    } else {
        listOption.classList.remove('active');
        toggleArrow.classList.remove('expanded');
        
        setTimeout(() => {
            listOption.style.display = 'none';
        }, 300);
    }
});

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        
        // 加到點擊的 tab
        this.classList.add('active');
        
        const tabType = this.getAttribute('data-tab');
        console.log('切換到:', tabType);
        
    });
});

shareBtn.addEventListener('click', async function() {
    const shareData = {
        title: '光復災區資訊整合',
        text: '花蓮光復鄉災害資訊整合平台',
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            console.log('分享成功');
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert('連結已複製到剪貼簿');
        }
    } catch (err) {
        console.error('分享失敗:', err);
    }
});

// ===== Map Iframe Integration =====
function loadMap(mapUrl) {
    const mapIframe = document.getElementById('mapIframe');
    if (mapUrl) {
        mapIframe.src = mapUrl;
    }
}


function notifyParentOfHeight() {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage({
        type: 'resize',
        height: height
    }, '*');
}

notifyParentOfHeight();

window.addEventListener('resize', notifyParentOfHeight);

// 各位link好再提醒我
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('連結點擊:', this.textContent);
        // maybe sth else?
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (hamburgerSidebar.classList.contains('active')) {
            closeSidebar();
        }
        if (evacuationModal.classList.contains('active')) {
            closeModal();
        }
    }
});

// ===== Console Info =====
console.log('光復災區資訊整合網頁已載入');
console.log('請使用 loadMap(url) 函數載入後端地圖');
