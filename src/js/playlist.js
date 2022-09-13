/** @jsx dom */

function Playlist() {
  return (
    <ul class="music-player__playlist list">
      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
        <li class="music-player__song">
          <div class="flex-row _align_center">
            <img
              src={`../../assets/media/songs/${num}/img.jpg`}
              class="img music-player__song-img"
            />
            <div class="music-player__playlist-info  text_trsf-cap">
              <b>a man</b>
              <div class="flex-row _justify_space-btwn">
                <span class="music-player__song-name">travis scott</span>
                <span class="music-player__song-duration">03:26</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
