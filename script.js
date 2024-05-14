// Initialize the variable 
let songIndex = 0;
let audioElement = new Audio("./songs/Gulabi-Sadi.mp3");
// let audioElement = new Audio("./songs/Arambha-Hai-Prachand.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


//Here we have to start from tommarow
let songs = [
    { songName: "Gulabi-Sadi", filePath: "./songs/Gulabi-Sadi.mp3", coverPath: "./covers/1.jpg" },
    { songName: "Arambha-Hai-Prachand", filePath: "./songs/Arambha-Hai-Prachand.mp3", coverPath: "./covers/2.jpg" },
    { songName: "Sam-Dam-Dandh-Bhed", filePath: "./songs/Sam-Dam-Dandh-Bhed.mp3", coverPath: "./covers/3.jpg" },
    { songName: "Maula-Maula", filePath: "./songs/Maula-Maula.mp3", coverPath: "./covers/4.jpg" },
    { songName: "Aale-Maratha", filePath: "./songs/Aale-Maratha.mp3", coverPath: "./covers/5.jpg" },
    { songName: "Jalwa-Re-Jalwa", filePath: "./songs/Jalwa-Re-Jalwa.mp3", coverPath: "./covers/6.jpg" },
]

//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to music
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    // Update seeker
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        // audioElement.src = `./songs/${songIndex+1}.mp3`; Error line here
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0
    } else {
        songIndex += 1;
    }
    // audioElement.src = `./songs/${songIndex+1}.mp3`; Error Line
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    } else {
        songIndex -= 1;
    }
    // audioElement.src = `./songs/${songIndex+1}.mp3`; Error here
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})