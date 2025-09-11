const video = document.getElementById("video1");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const muteBtn = document.getElementById("mute-btn");
const unmuteBtn = document.getElementById("unmute-btn");
const watchThis = document.querySelector("#watch-this");

// // Loader: wait for all images AND video to load
// window.addEventListener("DOMContentLoaded", () => {
//   const loader = document.getElementById("loader");

//   // Collect all images
//   const images = Array.from(document.images);
//   const video = document.getElementById("video1");

//   let loadedCount = 0;
//   const totalCount = images.length + (video ? 1 : 0);

//   function checkAllLoaded() {
//     loadedCount++;
//     if (loadedCount >= totalCount) {
//       // Fade out loader
//       if (loader) {
//         loader.style.opacity = "1";
//         loader.style.transition = "opacity 0.5s ease";
//         requestAnimationFrame(() => {
//           loader.style.opacity = "0";
//           setTimeout(() => loader.style.display = "none", 500);
//         });
//       }
//     }
//   }

//   // Track image loading
//   images.forEach(img => {
//     if (img.complete) {
//       checkAllLoaded();
//     } else {
//       img.addEventListener("load", checkAllLoaded);
//       img.addEventListener("error", checkAllLoaded);
//     }
//   });

//   // Track video loading (when metadata + enough data is loaded)
//   if (video) {
//     if (video.readyState >= 3) {
//       checkAllLoaded();
//     } else {
//       video.addEventListener("canplaythrough", checkAllLoaded, { once: true });
//     }
//   }
// });

// Toggle Play/Pause
function togglePlayPause() {
  if (video.paused) {
    video.play();
    updateButtonVisibility(pauseBtn, playBtn);
    gsap.to(watchThis, { opacity: 0, duration: 0.03, ease: "power2.inOut" });
  } else {
    video.pause();
    updateButtonVisibility(playBtn, pauseBtn);
    gsap.to(watchThis, { opacity: 1, duration: 0.03, ease: "power2.inOut" });
  }
}

// Toggle Mute/Unmute
function toggleMuteUnmute() {
  video.volume = video.volume === 0 ? 1 : 0;
  updateButtonVisibility(
    video.volume === 0 ? unmuteBtn : muteBtn,
    video.volume === 0 ? muteBtn : unmuteBtn
  );
}

// Utility: Show one button, hide another
function updateButtonVisibility(showBtn, hideBtn) {
  showBtn.style.visibility = "visible";
  hideBtn.style.visibility = "hidden";
}

// GSAP Click Transitions
function addClickTransition(triggerBtn, targetBtn) {
  document.querySelector(triggerBtn).addEventListener("click", () => {
    gsap.to(triggerBtn, {
      scale: 0.75,
      duration: 0.2,
      opacity: 0,
      overwrite: true,
    });
    gsap.to(targetBtn, {
      scale: 1,
      duration: 0.25,
      opacity: 1,
      overwrite: true,
    });
  });
}

// Auto-show play button after 10s
video.addEventListener("timeupdate", () => {
  if (video.currentTime >= 10) {
    updateButtonVisibility(playBtn, pauseBtn);
    gsap.to("#pause-btn", {
      scale: 0.75,
      duration: 0.25,
      opacity: 0,
      overwrite: true,
    });
    gsap.to("#play-btn", {
      scale: 1,
      duration: 0.25,
      opacity: 1,
      overwrite: true,
    });
  }
});

// Event Listeners
playBtn.addEventListener("click", togglePlayPause);
pauseBtn.addEventListener("click", togglePlayPause);
muteBtn.addEventListener("click", toggleMuteUnmute);
unmuteBtn.addEventListener("click", toggleMuteUnmute);

// GSAP Effects
addScaleHoverEffect("#play-btn");
addScaleHoverEffect("#pause-btn");
addClickTransition("#play-btn", "#pause-btn");
addClickTransition("#pause-btn", "#play-btn");

function addScaleHoverEffect(id) {
  const el = document.querySelector(id);
  el.addEventListener("mouseover", () =>
    gsap.to(id, { scale: 1.1, duration: 0.2 })
  );
  el.addEventListener("mouseleave", () =>
    gsap.to(id, { scale: 1, duration: 0.2 })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const box1 = document.querySelector("#box1");
  const tick1 = document.querySelector("#tick1");
  const box2 = document.querySelector("#box2");
  const tick2 = document.querySelector("#tick2");

  if (!box1 || !tick1) return;
  if (!box2 || !tick2) return;

  // make sure both start at 0 width
  gsap.set([tick1, tick2], { width: 0, opacity: 0 });

  box1.addEventListener("click", () => {
    const current = parseFloat(getComputedStyle(tick1).width);
    if (current >= 35) {
      // shrink back to 0
      gsap.to(tick1, {
        opacity: 0,
        width: 0,
        duration: 0.07,
        ease: "power2.inOut",
      });
    } else {
      // expand to 35
      gsap.to(tick1, {
        opacity: 1,
        width: 35,
        duration: 0.07,
        ease: "power2.out",
      });
    }
  });

  box2.addEventListener("click", () => {
    const current = parseFloat(getComputedStyle(tick2).width);
    if (current >= 35) {
      gsap.to(tick2, {
        opacity: 0,
        width: 0,
        duration: 0.07,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(tick2, {
        opacity: 1,
        width: 35,
        duration: 0.07,
        ease: "power2.out",
      });
    }
  });
});

// image carousel
const track = document.querySelector(".pic-track");
const totalPics = 4;
let currentPic = 0;

function displayPic(newNum) {
  if (newNum < 0) newNum = totalPics - 1;
  if (newNum >= totalPics) newNum = 0;
  currentPic = newNum;
  const offset = -currentPic * document.getElementById("picFrame").offsetWidth;
  track.style.transform = `translateX(${offset}px)`;
}

function moveLeft() {
  displayPic(currentPic - 1);
}

function moveRight() {
  displayPic(currentPic + 1);
}

function startShow() {
  setInterval(moveRight, 2000);
}

startShow();
