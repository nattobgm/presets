const songs = document.querySelectorAll('audio');
const playPauseButtons = document.querySelectorAll('.playPause');
let currentPlayingIndex = -1;

playPauseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        const song = songs[index];

        if (index == currentPlayingIndex) {
            if (song.paused) {
                song.play();
                button.textContent = 'Pause';
            } else {
                song.pause();
                button.textContent = 'Play';
            }
        } else {
            songs.forEach(song => {
                song.pause();
                song.currentTime = 0;
            });
            song.play();
            button.textContent = 'Pause';

            // Update the previous play/pause button if there was any
            if (currentPlayingIndex >= 0) {
                playPauseButtons[currentPlayingIndex].textContent = 'Play';
            }

            currentPlayingIndex = index;
        }
    });
});

songs.forEach(song => {
    song.addEventListener('ended', () => {
        playPauseButtons[currentPlayingIndex].textContent = 'Play';
        currentPlayingIndex = -1;
    });
});

const downloadButtons = document.querySelectorAll('.download');
downloadButtons.forEach(button => {
    button.addEventListener('click', () => {
        const url = button.getAttribute('data-url');
        window.open(url, '_blank');
    });
});

const applyFilters = () => {
    const genre = document.getElementById('genre-filter').value;
    const type = document.getElementById('type-filter').value;
    const pack = document.getElementById('pack-filter').value;
    const title = document.getElementById('title-filter').value.trim().toLowerCase();

    const allSongs = document.querySelectorAll('.song');

    allSongs.forEach(song => {
        song.style.display = 'none';
    });

    let filteredSongs = Array.from(allSongs);

    if (genre) {
        filteredSongs = filteredSongs.filter(song => song.dataset.genre.includes(genre));
    }

    if (type) {
        filteredSongs = filteredSongs.filter(song => song.dataset.type.includes(type));
    }

    if (pack) {
        filteredSongs = filteredSongs.filter(song => song.dataset.pack === pack);
    }

    if (title) {
        filteredSongs = filteredSongs.filter(song => song.querySelector('.song-title').textContent.trim().toLowerCase().includes(title));
    }

    filteredSongs.forEach(song => {
        song.style.display = 'flex';
    });

    updateFilteredCount(filteredSongs.length);
};

const updateFilteredCount = (count) => {
    const resultCountElement = document.getElementById('filtered-count');
    if (count === 0) {
        resultCountElement.textContent = "No results found.";
    } else {
        resultCountElement.textContent = `${count} results`;
    }
};

const resetFilters = () => {
    const allSongs = document.querySelectorAll('.song');
    allSongs.forEach(song => {
        song.style.display = 'flex';
    });
    document.getElementById('genre-filter').value = '';
    document.getElementById('type-filter').value = '';
    document.getElementById('pack-filter').value = '';
    document.getElementById('title-filter').value = '';
    updateFilteredCount(allSongs.length);
};

window.onload = () => {
    resetFilters();
};