// ==========================
// 婚禮日期
// ==========================

const weddingDate = new Date("2026-10-11T11:30:00");
const preloadDesktop = new Image();
preloadDesktop.src = "images/cover-desktop.jpg";

const preloadMobile = new Image();
preloadMobile.src = "images/cover-mobile.jpg";

const daysElement = document.getElementById("days");

// ==========================
// 倒數
// ==========================

function updateCountdown() {

    const now = new Date();

    const distance = weddingDate - now;

    if (distance <= 0) {

        daysElement.textContent = "0";

        return;

    }

    const days = Math.ceil(distance / (1000 * 60 * 60 * 24));

    daysElement.textContent = days;

}

updateCountdown();

setInterval(updateCountdown, 60000);


// ==========================
// Hero Animation
// ==========================

window.addEventListener("DOMContentLoaded", () => {

    const heroItems = document.querySelectorAll(".hero-fade");

    heroItems.forEach((item, index) => {

        item.style.animation = "fadeUp .8s ease-out forwards";
        item.style.animationDelay = `${0.15 + index * 0.12}s`;

    });

});

// ==========================
// Opening Animation
// ==========================

const openingTitle = document.querySelector(".opening-title");

if (openingTitle) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                openingTitle.style.transition =
                    "opacity 1.2s ease, transform 1.2s ease";

                openingTitle.style.opacity = "1";

                openingTitle.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.45

    });

    observer.observe(openingTitle);

}
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;
let userPaused = false;

// 嘗試自動播放
window.addEventListener("DOMContentLoaded", () => {

    const playPromise = music.play();

    if (playPromise !== undefined) {

        playPromise.then(() => {

            isPlaying = true;
            musicBtn.classList.add("playing");

        }).catch(() => {

            // 被瀏覽器阻擋
            musicBtn.classList.add("pause");

        });

    }

});

// 點按按鈕切換播放
musicBtn.addEventListener("click", () => {

    if (isPlaying) {

        music.pause();
        userPaused = true;

        musicBtn.classList.remove("playing");
        musicBtn.classList.add("pause");

        isPlaying = false;

    } else {

        music.play();
        userPaused = false;

        musicBtn.classList.remove("pause");
        musicBtn.classList.add("playing");

        isPlaying = true;

    }

});

// 如果瀏覽器阻擋自動播放
// 第一次點擊畫面自動開始
document.addEventListener(

"pointerdown",

() => {

    if (!isPlaying) {

        music.play().then(()=>{

            musicBtn.classList.remove("pause");
            musicBtn.classList.add("playing");

            isPlaying = true;

            userPaused = false;

        }).catch(()=>{});

    }

},

{ once:true }

);
// ==========================
// 背景切換
// ==========================

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        if (isPlaying) {

            music.pause();

        }

    } else {

        if (isPlaying && !userPaused) {

            music.play().catch(()=>{});

        }

    }

});