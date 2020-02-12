const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");


// Play & Pause video
function toggleVideoStatus(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
    updatePlayIcon()
}

// Update play/ pause icon
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    }else{
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

// Update progress bar
function updateProgress(){
    progress.value = (video.currentTime / video.duration) * 100

    //get Minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + String(mins)
    }

    //get Seconds
    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10){
        secs = '0' + String(secs)
    }

    timestamp.innerHTML = `${mins}:${secs}`

}

// Stop Video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

// set video progress
function setVideoProgress(){
    video.currentTime = (+progress.value * video.duration) / 100;
}

//Event Listener of Video
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
