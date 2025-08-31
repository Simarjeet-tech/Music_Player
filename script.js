let songName = document.querySelector("#song-name");
let songSinger = document.querySelector("#song-singer");
let songImage = document.querySelector(".song-image");
let playPauseImg = document.querySelector("#play-pause");  // fixed the id if needed
let songRange = document.querySelector("#song-duration");
let playlistImg = document.querySelector("#playlist-img");
let playlist = document.querySelector(".playlist");
let playlistSong = document.querySelectorAll(".playlist-song");
let index = 0;
let playingSongs = false;  // consistent variable name
let track = document.createElement("audio");
document.body.appendChild(track);  // append audio element for compatibility

// Volume control element (you need this in HTML)
// <input type="range" id="volume-control" min="0" max="100" value="50">
let volumeRange = document.querySelector("#volume-range");
track.volume = 0.5;  // initial volume 50%
let volSvg = document.querySelector("#vol-svg");
volumeRange.addEventListener("input", function (e) {
    track.volume = e.target.value / 100;
 if(volumeRange.value == 0){
        volSvg.src = "mute.svg"
    }else{
        volSvg.src = "volume.svg"
    }
});

let songs = [
    {
        name: "AZUL",
        path: "AZUL_1.mp3",
        image: "image.png",
        singer: "Guru Randhawa"
    },
    {
        name: "Baby",
        path: "baby.mp3",
        image: "image1.png",
        singer: "Justin Bieber"
    },
    {
        name: "Bandana",
        path: "Bandana_1.mp3",
        image: "image2.png",
        singer: "Shubh"
    },
    {
        name: "Millionaire",
        path: "Millionaire.mp3",
        image: "image3.png",
        singer: "YO YO Honey Singh"
    },
    {
        name: "Off_Limits",
        path: "Off_Limits_1.mp3",
        image: "image4.png",
        singer: "Parmish Verma"
    },
    {
        name: "Pardesiya",
        path: "Pardesiya.mp3",
        image: "image5.png",
        singer: "Sonu Nigam, Krishankali Saha"
    }
];

function loadTrack(index) {
    track.src = songs[index].path;
    songName.innerHTML = songs[index].name;
    songSinger.innerHTML = songs[index].singer;
    songImage.style = `background-image: url("${songs[index].image}");`
    // volume()
    duration()
    setInterval(()=>{
        songRange.max = track.duration
        songRange.value = track.currentTime
    },1000)
     track.load()
}

loadTrack(index);

function playPause() {
    if (playingSongs == false) {
        playSong();
    } else {
        pauseSong();
    }
}

function playSong() {
    track.play();
    playingSongs = true;
    playPauseImg.src = "pause.svg";
}

function pauseSong() {
    track.pause();
    playingSongs = false;
    playPauseImg.src = "play.svg";
}
function nextSong() {
    if (index < songs.length - 1) {
        index++;
    } else {
        index = 0; // loop back to first song
    }
    loadTrack(index);
    playSong();
}

function previousSong() {
    if (index > 0) {
        index--;
    } else {
        index = songs.length - 1; // loop back to last song
    }
    loadTrack(index);
    playSong();
}
function duration(){
    track.currentTime = songRange.value
}
// Song duration display elements (add these in your HTML)
// <span id="current-time">0:00</span> / <span id="total-time">0:00</span>
// let songDuration = document.querySelector("#song-duration");
// let totalTimeDisplay = document.querySelector("#total-time");

// track.addEventListener("timeupdate", function () {
//     let current = track.currentTime;
//     let duration = track.duration;

//     let currentMinutes = Math.floor(current / 60);
//     let currentSeconds = Math.floor(current % 60);
//     let durationMinutes = Math.floor(duration / 60);
//     let durationSeconds = Math.floor(duration % 60);

//     if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
//     if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

//     currentTimeDisplay.innerText = currentMinutes + ":" + currentSeconds;

//     if (!isNaN(duration)) {
//         totalTimeDisplay.innerText = durationMinutes + ":" + durationSeconds;
//     }
// });
playlistImg.addEventListener("click",()=>{
    playlist.classList.toggle("playlist-active")
})

playlistSong.forEach((song,index)=>{
    song.addEventListener('click',()=>{
        loadTrack(index);
        playSong()
        playlist.classList.remove("playlist-active")
    })
})