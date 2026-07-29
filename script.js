// ==========================
// 婚禮日期
// ==========================

const weddingDate = new Date("2026-10-11T11:30:00");

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
// 自動捲動
// ==========================

let autoScroll = true;

const sections = document.querySelectorAll("section");

let currentSection = 0;


// 使用者操作就停止

function stopAutoScroll() {

    autoScroll = false;

}

window.addEventListener("wheel", stopAutoScroll, { passive: true });

window.addEventListener("touchstart", stopAutoScroll, { passive: true });

window.addEventListener("mousedown", stopAutoScroll);


// 等待 3 秒開始

setTimeout(startScroll, 3000);


function startScroll() {

    if (!autoScroll) return;

    scrollNext();

}


function scrollNext() {

    if (!autoScroll) return;

    currentSection++;

    if (currentSection >= sections.length) return;

    sections[currentSection].scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

    setTimeout(scrollNext, 5000);

}

// ==========================
// Hero Animation
// ==========================

window.addEventListener("load", () => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const date = hero.querySelector(".hero-date");
    const line1 = hero.querySelector(".line1");
    const line2 = hero.querySelector(".line2");
    const couple = hero.querySelector(".hero-couple");
    const love = hero.querySelector(".hero-love");

    fade(date, 0);
    fade(line1, 600);
    fade(line2, 1200);
    fade(couple, 1800);
    fade(love, 2400);

});


function fade(el, delay){

    if(!el) return;

    setTimeout(()=>{

        el.style.animation="fadeUp .9s ease forwards";

    },delay);

}

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

// 嘗試自動播放
window.addEventListener("load", () => {

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

        musicBtn.classList.remove("playing");
        musicBtn.classList.add("pause");

        isPlaying = false;

    } else {

        music.play();

        musicBtn.classList.remove("pause");
        musicBtn.classList.add("playing");

        isPlaying = true;

    }

});

// 如果瀏覽器阻擋自動播放
// 第一次點擊畫面自動開始
document.addEventListener("click", () => {

    if (!isPlaying) {

        music.play().then(() => {

            musicBtn.classList.remove("pause");
            musicBtn.classList.add("playing");

            isPlaying = true;

        }).catch(() => {});

    }

}, { once: true });