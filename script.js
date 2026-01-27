//Background music toggle
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
bgMusic.volume = 0.05;
let musicPlaying = false;

const musicImages = {
    off: "assets/music-off.png",
    offHover: "assets/music-off-hover.png",
    on: "assets/music-on.png",
    onHover: "assets/music-on-hover.png"
};

//Play click sound helper
function playClick() {
    const clickSound = document.getElementById("click-sound");
    clickSound.currentTime = 0;
    clickSound.play().catch(err => console.log(err));
}

//Toggle music on click
musicToggle.addEventListener("click", () => {
    musicPlaying = !musicPlaying;
    playClick();
    if (musicPlaying) {
        bgMusic.play().catch(err => console.log(err));
        musicToggle.src = musicImages.on;
    } else {
        bgMusic.pause();
        musicToggle.src = musicImages.off;
    }
});

//Hover effects for music toggle
musicToggle.addEventListener("mouseenter", () => {
    musicToggle.src = musicPlaying ? musicImages.onHover : musicImages.offHover;
});
musicToggle.addEventListener("mouseleave", () => {
    musicToggle.src = musicPlaying ? musicImages.on : musicImages.off;
});

//Image helper for hovers and clicks
function setupImage(img, images, onClick) {
    if (!img) return;
    let clicked = false;

    img.addEventListener("mouseenter", () => {
        if (!clicked) img.src = images.hover;
    });

    img.addEventListener("mouseleave", () => {
        if (!clicked) img.src = images.default;
    });

    img.addEventListener("click", () => {
        playClick();
        clicked = true;
        if (images.clicked) img.src = images.clicked;
        if (onClick) onClick();
    });
}

//Scene and typewriter animation
const bakeryOutside = document.getElementById("bakery-outside");
const bigMenu = document.getElementById("big-menu");
const av = document.getElementById("av");
const av2 = document.getElementById("av2");
const sceneText = document.getElementById("scene-text");

function typeWriter(element, text, speed) {
    element.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
        element.innerHTML += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);
}

typeWriter(sceneText, "Welcome to Arya's Bakery!\nClick the building to see the menu.", 0);

//Showing menu on click (of bakery outside)
setupImage(
    bakeryOutside,
    { default: "assets/bakery.png", hover: "assets/bakery-hover.png" },
    () => {
        playClick();

        bakeryOutside.classList.add("hidden");
        av.classList.remove("hidden");
        av2.classList.remove("hidden");
        bigMenu.classList.remove("hidden");

        typeWriter(sceneText, "What would you like to order?\nClick your selection.", 0);
        initMenuIcons();
    }
);

//Opening pages on click (of the icons)
function initMenuIcons() {
    const icons = [
        { id: "edu-icon", text: "education" },
        { id: "exp-icon", text: "experience" },
        { id: "proj-icon", text: "projects" },
        { id: "abt-icon", text: "abt-me" }
    ];

    const pageMap = {
        "edu-icon": "edu-page",
        "exp-icon": "exp-page",
        "proj-icon": "proj-page",
        "abt-icon": "abt-page"
    };

    icons.forEach(icon => {
        const img = document.getElementById(icon.id);
        if (!img) return;

        img.addEventListener("mouseenter", () => {
            img.src = `assets/${icon.text}-hover.png`;
        });

        img.addEventListener("mouseleave", () => {
            img.src = `assets/${icon.text}.png`;
        });

        img.addEventListener("click", () => {
            playClick();
            hideAllPages();

            const pageId = pageMap[icon.id];
            const page = document.getElementById(pageId);
            if (page) page.classList.remove("hidden");
        });
    });
}

//Helper to hide pages when switching
const pages = {
    edu: { iconId: "edu-icon", sideId: "edu-side", pageId: "edu-page" },
    abt: { iconId: "abt-icon", sideId: "abt-side", pageId: "abt-page" },
    exp: { iconId: "exp-icon", sideId: "exp-side", pageId: "exp-page" },
    proj: { iconId: "proj-icon", sideId: "proj-side", pageId: "proj-page" }
};

function hideAllPages() {
    Object.values(pages).forEach(p => {
        const pageEl = document.getElementById(p.pageId);
        if (pageEl) pageEl.classList.add("hidden");
    });

    bakeryOutside.classList.add("hidden");
    bigMenu.classList.add("hidden");
    av.classList.add("hidden");
    av2.classList.add("hidden");
    sceneText.classList.add("hidden");
}

//Sidebar and icon clicking
Object.values(pages).forEach(p => {
    const icon = document.getElementById(p.iconId);
    const side = document.getElementById(p.sideId);
    const page = document.getElementById(p.pageId);
    if (!icon || !side || !page) return;

    icon.addEventListener("click", () => {
        playClick();
        hideAllPages();
        page.classList.remove("hidden");
    });

    side.addEventListener("click", () => {
        playClick();
        hideAllPages();
        page.classList.remove("hidden");
    });
});

//Back to main menu from sidebar
const menuSide = document.getElementById("menu-side");
menuSide.addEventListener("click", () => {
    playClick();
    typeWriter(sceneText, "What would you like to order?\nClick your selection.", 0);
    hideAllPages();
    av.classList.remove("hidden");
    av2.classList.remove("hidden");
    sceneText.classList.remove("hidden");
    bigMenu.classList.remove("hidden");
    bakeryOutside.classList.add("hidden");
});

//Mouse sparkles and background star animations
const starsContainer = document.getElementById("stars");
const numberOfStars = 30;

for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = Math.random() * 80 + "%";
    star.style.right = Math.random() * 100 + "%";
    const size = 5 + Math.random() * 3;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.animationDuration = 0.8 + Math.random() * 1.2 + "s";
    starsContainer.appendChild(star);
}

const sparkleContainer = document.getElementById("sparkle-container");
document.addEventListener("mousemove", e => {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    const pixels = [
        { x: 0, y: -3 }, { x: 0, y: 0 }, { x: 0, y: 3 },
        { x: -3, y: 0 }, { x: 3, y: 0 }
    ];
    pixels.forEach(pos => {
        const pixel = document.createElement("div");
        pixel.style.left = pos.x + "px";
        pixel.style.top = pos.y + "px";
        sparkle.appendChild(pixel);
    });

    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    sparkleContainer.appendChild(sparkle);

    sparkle.animate([
        { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        { opacity: 0, transform: "translate(-50%, -50%) scale(0)" }
    ], { duration: 500, easing: "ease-out" });

    setTimeout(() => sparkle.remove(), 100);
});

//Icon click helpers 
function showMenu() {
    bigMenu.classList.remove("hidden");
    bigMenu.style.pointerEvents = "auto";
}
function hideMenu() {
    bigMenu.classList.add("hidden");
    bigMenu.style.pointerEvents = "none";
}

bigMenu.addEventListener("click", e => {
    if (e.target.id === "big-menu") hideMenu();
});

//Tooltips when hovering over menu icons
const tooltip = document.createElement("div");
tooltip.style.position = "fixed"; 
tooltip.style.pointerEvents = "none"; 
tooltip.style.background = "#756262";
tooltip.style.color = "#fff1dc";
tooltip.style.fontFamily = '"VT323", monospace';
tooltip.style.fontSize = "1.5vw";
tooltip.style.padding = "0.3vw 0.5vw";
tooltip.style.borderRadius = "4px";
tooltip.style.whiteSpace = "nowrap";
tooltip.style.zIndex = 5000;
tooltip.style.transition = "opacity 0.2s";
tooltip.style.opacity = "0";
document.body.appendChild(tooltip);

const menuIcons = document.querySelectorAll(".menu-icon");
menuIcons.forEach(icon => {
    const text = icon.getAttribute("data-tooltip");
    if (!text) return;

    icon.addEventListener("mouseenter", () => {
        tooltip.textContent = text;
        tooltip.style.opacity = "1";
    });

    icon.addEventListener("mouseleave", () => {
        tooltip.style.opacity = "0";
    });

    icon.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.clientX + 15 + "px";
        tooltip.style.top = e.clientY + 15 + "px";  
    });
});







