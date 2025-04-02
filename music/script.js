console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Sarah_C_-_My_Heart_Is_Your_Home.mp3'); // Default song
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Song List (Fix file paths)
let songs = [
    {songName: "Samie_bower", filePath: "Samie_Bower_-_Where's_the_Love.mp3", coverPath: "mm.jpg"},
    {songName: "Alone", filePath: "Alone_-_Color_Out.mp3", coverPath: "mm.jpg"},
    {songName: "Bessonn&amp", filePath: "Bessonn&amp;sa_-_Dance_All_Night.mp3", coverPath: "mm.jpg"},
    {songName: "Boulvard", filePath: "Boulvard_X-Audi_-_My_inspiration_for_the_day.mp3", coverPath: "mm.jpg"},
    {songName: "Chill_Ocelot", filePath: "Chill_Ocelot_-_The_Cold_City.mp3", coverPath: "mm.jpg"},
    {songName: "Igor_Pumphonia", filePath: "Igor_Pumphonia_-_Igor_Pumphonia_-_Echoes_of_Love.mp3", coverPath: "mm.jpg"},
    {songName: "Love_of_My_Life_", filePath: "Love_of_My_Life_-_Ben_Lvcas.mp3", coverPath: "mm.jpg"},
    {songName: "Square_a_Saw", filePath: "Square_a_Saw_-_Scattered.mp3", coverPath: "mm.jpg"},
    {songName: "Tom_Orlando", filePath: "Tom_Orlando_-_Love_You_Anymore_(feat._Seven).mp3", coverPath: "mm.jpg"},
    {songName: "Ogi_Feel_the_Beat", filePath: "Ogi_Feel_the_Beat_-_Tristeza.mp3", coverPath: "mm.jpg"}
];

// Update song list UI
songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events (Update Progress Bar)
audioElement.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

// Seekbar Change Event
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Make All Songs Playable
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.replace('fa-pause-circle', 'fa-play-circle');
    });
};

// Play a Song When Clicked
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = index;
        e.target.classList.replace('fa-play-circle', 'fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    });
});

// Next Button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
});

// Previous Button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
});
