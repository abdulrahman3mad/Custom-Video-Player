// DOM
const player = document.querySelector(".player");
const video = document.querySelector("video");
const progressBar = document.querySelector(".progress-bar");
const progressBarState = document.querySelector(".progress-bar-state");
const playingBtns = document.querySelectorAll(".playingBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const volumnSlider = document.querySelector(".volumn-slider");
const speedSlider = document.querySelector(".speed-slider");
const skipBtns = document.querySelectorAll(".skip-btn")

// Variables 
const progressBarWidth = +getComputedStyle(progressBar).width.split("px")[0];
video.currentTime = 1;

// Event
player.addEventListener("mouseover", () => player.classList.add("display-controls"));
player.addEventListener("mouseout", () => player.classList.remove("display-controls"));
video.addEventListener("click", handleVideoPlay);
playingBtns.forEach((btn) => btn.addEventListener("click", handleVideoPlay))
progressBar.addEventListener("click", handleProgressBarClick);
volumnSlider.addEventListener("change", handleVolumnSliding);
speedSlider.addEventListener("change", handleSpeedSliding);
skipBtns.forEach((btn) => btn.addEventListener("click", handleSkip))

// Handlers 
function handleProgressBarClick(event) {
    progressBarState.style.width = `${event.offsetX}px`;
    let barVideoRatio = video.duration / progressBarWidth;
    video.currentTime = event.offsetX * barVideoRatio;
}

function handleVideoPlay() {
    video.paused ? video.play() : video.pause();
    playingBtns.forEach((btn) => {
        btn.classList.toggle("hidden");
    })
}

function handleVolumnSliding() {
    video.volume = +this.value / 100
}

function handleSpeedSliding() {
    video.playbackRate = +this.value / 100
}

function handleSkip() {
    if (video.currentTime > 1 && video.currentTime < video.duration) {
        video.currentTime += +this.dataset.skipAmount
        let barVideoRatio = progressBarWidth / video.duration;
        progressBarState.style.width = `${+progressBarState.style.width.split("px")[0] + (Number(this.dataset.skipAmount) * barVideoRatio)}px`;
    }

    if(video.currentTime >= video.duration){
        video.currentTime = 1;
        progressBarState.style.width = progressBarState.dataset.startWidth;
    }
}