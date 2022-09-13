/** @jsx dom */

function Slider() {
  return (
    <div class="slider center">
      <div class="slider__content center">
        <button class="music-player__broadcast-guarantor center button">
          <i class="icon-play" />
          <i class="icon-pause" />
        </button>
        <div class="slider__imgs flex-row">
          <img src="../../assets/media/songs/4/img.jpg" class="img" />
        </div>
      </div>
      <div class="slider__controls center">
        <button class="slider__switch-button flex-row button">
          <i class="icon-back" />
        </button>
        <div class="music-player__info text_trsf-cap">
          <div class="music-player__singer-name">travis scott</div>
          <div class="music-player__song-name">a man</div>
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
