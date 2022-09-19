/** @jsx dom */

function Slider({ slides, handleChangeMusic }) {
  function handleResizeSlider({ target }) {
    if (isLocked) {
      return;
    } else if (target.classList.contains("music-player__info")) {
      this.classList.add("resize");
      setProperty(this, "--controls-animate", "down running");
      return;
    } else if (target.classList.contains("music-player__playlist-button")) {
      this.classList.remove("resize");
      setProperty(this, "--controls-animate", "up running");
      return;
    }
  }

  return (
    <div class="slider center" onClick={handleResizeSlider}>
      <div class="slider__content center">
        <button class="music-player__playlist-button center button">
          <i class="icon-playlist" />
        </button>
        <button class="music-player__broadcast-guarantor center button">
          <i class="icon-play" />
          <i class="icon-pause" />
        </button>
        <div class="slider__imgs flex-row">
          {slides.map(({ songName, files: { cover } }) => (
            <img src={cover} class="img" alt={songName} />
          ))}
        </div>
      </div>
      <div class="slider__controls center">
        <button
          class="slider__switch-button flex-row button"
          onClick={() => handleChangeMusic({ isPrev: true })}
        >
          <i class="icon-back" />
        </button>
        <div class="music-player__info text_trsf-cap">
          <div>
            <div class="music-player__singer-name">
              <div>{slides[0].artist}</div>
            </div>
          </div>
          <div>
            <div class="music-player__subtitle">
              <div>{slides[0].songName}</div>
            </div>
          </div>
        </div>
        <button
          class="slider__switch-button flex-row button"
          onClick={() => handleChangeMusic({ isPrev: false })}
        >
          <i class="icon-next" />
        </button>
        <div class="progress center">
          <div class="progress__wrapper">
            <div class="progress__bar center" />
          </div>
        </div>
      </div>
    </div>
  );
}
