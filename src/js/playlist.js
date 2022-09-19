/** @jsx dom */

function Playlist({ list, handleChangeMusic }) {
  function loadedAudio() {
    const duration = this.duration;
    const target = this.parentElement.querySelector(
      ".music-player__song-duration"
    );

    let min = parseInt(duration / 60);
    if (min < 10) min = "0" + min;

    let sec = parseInt(duration % 60);
    if (sec < 10) sec = "0" + sec;

    target.appendChild(document.createTextNode(`${min}:${sec}`));
  }

  function timeupdate() {
    const duration = this.duration;
    const currentTime = this.currentTime;

    const progressBarWidth = (currentTime / duration) * 100;
    setProperty(progressBar_elmnt, "--width", `${progressBarWidth}%`);

    if (songIsPlayed && currentTime === duration) {
      handleChangeMusic({});
    }

    if (
      indexSong === songsLength &&
      this === selectedSong &&
      currentTime === duration
    ) {
      songIsPlayed = false;
      broadcastGuarantor_elmnt.classList.remove("click");
    }
  }

  return (
    <ul class="music-player__playlist list">
      {list.map(({ songName, artist, files: { cover, song } }, index) => {
        return (
          <li
            class="music-player__song"
            onClick={() =>
              handleChangeMusic({ isPrev: false, playListIndex: index })
            }
          >
            <div class="flex-row _align_center">
              <img src={cover} class="img music-player__song-img" />
              <div class="music-player__playlist-info  text_trsf-cap">
                <b class="text_overflow">{songName}</b>
                <div class="flex-row _justify_space-btwn">
                  <span class="music-player__subtitle">{artist}</span>
                  <span class="music-player__song-duration"></span>
                </div>
              </div>
            </div>
            <audio
              src={song}
              onTimeupdate={timeupdate}
              onLoadeddata={loadedAudio}
            />
          </li>
        );
      })}
    </ul>
  );
}
