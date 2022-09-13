/** @jsx dom */

function Slider({ slides }) {
  return (
    <div class="slider center">
      <div class="slider__content center">
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
        <button class="slider__switch-button flex-row button">
          <i class="icon-back" />
        </button>
        <div class="music-player__info text_trsf-cap">
          <div class="music-player__singer-name">{slides[0].artist}</div>
          <div class="music-player__song-name">{slides[0].songName}</div>
        </div>
        <button class="slider__switch-button flex-row button">
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
