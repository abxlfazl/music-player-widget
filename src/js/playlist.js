/** @jsx dom */

function Playlist({ list }) {
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
  return (
    <ul class="music-player__playlist list">
      {list.map(({ songName, artist, files: { cover, song } }) => {
        return (
          <li class="music-player__song">
            <div class="flex-row _align_center">
              <img src={cover} class="img music-player__song-img" />
              <div class="music-player__playlist-info  text_trsf-cap">
                <b>{songName}</b>
                <div class="flex-row _justify_space-btwn">
                  <span class="music-player__song-name">{artist}</span>
                  <span class="music-player__song-duration"></span>
                </div>
              </div>
            </div>
            <audio src={song} onLoadeddata={loadedAudio} />
          </li>
        );
      })}
    </ul>
  );
}
