var audio = document.getElementById("audio-player");
var songTitle = document.getElementById("song-title");
var artist = document.getElementById("artist");
var playPauseBtn = document.getElementById("play-pause-btn");
var nextBtn = document.getElementById("next-btn");
var prevBtn = document.getElementById("prev-btn");
var songList = document.getElementById("song-list");
var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var searchList = document.getElementById("search-list");
var playYoutubeBtn = document.getElementById("play-youtube-btn");

var currentSongIndex = 0;

// Replace this array with your actual playlist data
var playlist = [
    { title: "Despacito", artist: "Louis and Daddy Yonke", source: "/music/Despacito.mp3", image: "/images/despacito.webp" },
    { title: "Heeriye", artist: "Arijit Singh", source: "/music/Heeriye.mp3", image: "/images/heeriye.webp" },
    { title: "Maan meri jaan", artist: "King", source: "/music/Maan Meri Jaan.mp3", image: "/images/maan meri jaan.webp" },
    { title: "Alag Aaasmaan", artist: "Anuv Jain", source: "/music/Alag Aasmaan.mp3", image: "/images/alag aasmaan.jpg" },
    { title: "Dhundhala", artist: "Yashraj, Talwinder", source: "/music/Dhundhala.mp3", image: "/images/dhundhla.jpg" },
    { title: "One love", artist: "Shubh", source: "/music/One love.mp3", image: "/images/one love.jpg" },
    { title: "Softly", artist: "Karan Aujla", source: "/music/Softly.mp3", image: "/images/softly.webp" },
    { title: "Tu hai kahan", artist: "AUR", source: "/music/Tu hai kahan.mp3", image: "/images/tu hai kahan.jpg" },


    // Add more songs with their image paths
];

// Add your YouTube API key here
const apiKey = "AIzaSyCFl3Vgz5nhP1Os8_qmRXslIovGlVlCZv4";

function loadSong(index) {
    audio.src = playlist[index].source;
    songTitle.textContent = playlist[index].title;
    artist.textContent = playlist[index].artist;
    // Set the image source
    document.getElementById("album-image").src = playlist[index].image;
}

function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    playPauseBtn.innerHTML = audio.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
    updatePlayPauseButton();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
    updatePlayPauseButton();
}

function loadPlaylist() {
    for (let i = 0; i < playlist.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = playlist[i].title;
        listItem.addEventListener("click", function () {
            currentSongIndex = i;
            loadSong(currentSongIndex);
            audio.play();
            updatePlayPauseButton();
        });
        songList.appendChild(listItem);
    }
}

function searchSongs() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredSongs = playlist.filter(song =>
        song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm)
    );

    // Clear the current search results
    searchList.innerHTML = '';

    // Load the filtered search results
    filteredSongs.forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = song.title + ' - ' + song.artist;
        listItem.addEventListener("click", function () {
            currentSongIndex = playlist.indexOf(song);
            loadSong(currentSongIndex);
            audio.play();
            updatePlayPauseButton();
        });
        searchList.appendChild(listItem);
    });
}

// Add this function to play YouTube video
function playYoutube() {
    const currentSong = playlist[currentSongIndex];
    const searchTerm = `${currentSong.title} ${currentSong.artist}`;

    // Use YouTube Data API to search for videos
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${apiKey}`;

    fetch(youtubeApiUrl)
        .then(response => response.json())
        .then(data => {
            const videoId = data.items[0].id.videoId; // Get the video ID of the first result
            const youtubeVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;

            // Open the YouTube video in a new tab
            window.open(youtubeVideoUrl, '_blank');
        })
        .catch(error => console.error('Error fetching YouTube API:', error));
}

// Event listeners
searchBtn.addEventListener("click", searchSongs);

// Listen for the ended event to play the next song
audio.addEventListener('ended', () => {
    nextSong();
});

// Listen for play and pause events to update the button
audio.addEventListener('play', updatePlayPauseButton);
audio.addEventListener('pause', updatePlayPauseButton);

// Initial setup
loadSong(currentSongIndex);
loadPlaylist();
