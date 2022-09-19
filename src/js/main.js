/** @jsx dom */

let indexSong = 0;
let isLocked = false;
let songsLength = null;
let selectedSong = null;
let songIsPlayed = false;
let progress_elmnt = null;
let songName_elmnt = null;
let sliderImgs_elmnt = null;
let singerName_elmnt = null;
let progressBar_elmnt = null;
let playlistSongs_elmnt = [];
let musicPlayerInfo_elmnt = null;
let progressBarIsUpdating = false;
let broadcastGuarantor_elmnt = null;

function App({ songs }) {
  function handleChangeMusic({ isPrev = false, playListIndex = null }) {
    if (isLocked || indexSong === playListIndex) return;

    if (playListIndex || playListIndex === 0) {
      indexSong = playListIndex;
    } else {
      indexSong = isPrev ? (indexSong -= 1) : (indexSong += 1);
    }

    if (indexSong < 0) {
      indexSong = 0;
      return;
    } else if (indexSong > songsLength) {
      indexSong = songsLength;
      return;
    }

    selectedSong.pause();
    selectedSong.currentTime = 0;
    progressBarIsUpdating = false;
    selectedSong = playlistSongs_elmnt[indexSong];
    selectedSong.paused && songIsPlayed
      ? selectedSong.play()
      : selectedSong.pause();

    setBodyBg(songs[indexSong].bg);
    setProperty(sliderImgs_elmnt, "--index", -indexSong);
    updateInfo(singerName_elmnt, songs[indexSong].artist);
    updateInfo(songName_elmnt, songs[indexSong].songName);
  }

  setBodyBg(songs[0].bg);

  return (
    <div class="music-player flex-column">
      <Slider slides={songs} handleChangeMusic={handleChangeMusic} />
      <Playlist list={songs} handleChangeMusic={handleChangeMusic} />
    </div>
  );
}

fetch("../data.json")
  .then((respone) => respone)
  .then((data) => data.json())
  .then((result) => {
    const songs = result.songs;

    function downloadTheFiles(media, input) {
      return Promise.all(
        input.map((song) => {
          return new Promise((resolve) => {
            const url = song.files[media];
            const req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.responseType = "blob";
            req.send();
            req.onreadystatechange = () => {
              if (req.readyState === 4) {
                if (req.status === 200) {
                  const blob = req.response;
                  const file = URL.createObjectURL(blob);
                  song.files[media] = file;
                  resolve(song);
                }
              }
            };
          });
        })
      );
    }

    downloadTheFiles("cover", songs).then((respone) => {
      downloadTheFiles("song", respone).then((data) => {
        querySelector("#root").appendChild(<App songs={data} />);

        songsLength = data.length - 1;
        progress_elmnt = querySelector(".progress");
        playlistSongs_elmnt = querySelectorAll("audio");
        sliderImgs_elmnt = querySelector(".slider__imgs");
        songName_elmnt = querySelector(".music-player__subtitle");
        musicPlayerInfo_elmnt = querySelector(".music-player__info");
        singerName_elmnt = querySelector(".music-player__singer-name");
        selectedSong = playlistSongs_elmnt[indexSong];
        progressBar_elmnt = querySelector(".progress__bar");
        broadcastGuarantor_elmnt = querySelector(
          ".music-player__broadcast-guarantor"
        );

        controlSubtitleAnimation(musicPlayerInfo_elmnt, songName_elmnt);
        controlSubtitleAnimation(musicPlayerInfo_elmnt, singerName_elmnt);
      });
    });
  });

function controlSubtitleAnimation(parent, child) {
  if (child.classList.contains("animate")) return;

  const element = child.firstChild;

  if (child.clientWidth > parent.clientWidth) {
    child.appendChild(element.cloneNode(true));
    child.classList.add("animate");
  }

  setProperty(child.parentElement, "width", `${element.clientWidth}px`);
}
function handleResize() {
  const vH = window.innerHeight * 0.01;
  setProperty(document.documentElement, "--vH", `${vH}px`);
}
function querySelector(target) {
  return document.querySelector(target);
}
function querySelectorAll(target) {
  return document.querySelectorAll(target);
}
function setProperty(target, prop, value = "") {
  target.style.setProperty(prop, value);
}
function setBodyBg(color) {
  setProperty(document.body, "--body-bg", color);
}
function updateInfo(target, value) {
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }

  const targetChild_elmnt = document.createElement("div");
  targetChild_elmnt.appendChild(document.createTextNode(value));
  target.appendChild(targetChild_elmnt);
  target.classList.remove("animate");
  controlSubtitleAnimation(musicPlayerInfo_elmnt, target);
}
function handleScrub(e) {
  const progressOffsetLeft = progress_elmnt.getBoundingClientRect().left;
  const progressWidth = progress_elmnt.offsetWidth;
  const duration = selectedSong.duration;
  const currentTime = (e.clientX - progressOffsetLeft) / progressWidth;

  selectedSong.currentTime = currentTime * duration;
}

handleResize();

window.addEventListener("resize", handleResize);
window.addEventListener("orientationchange", handleResize);
window.addEventListener("transitionstart", ({ target }) => {
  if (target === sliderImgs_elmnt) {
    isLocked = true;
    setProperty(sliderImgs_elmnt, "will-change", "transform");
  }
});
window.addEventListener("transitionend", ({ target, propertyName }) => {
  if (target === sliderImgs_elmnt) {
    isLocked = false;
    setProperty(sliderImgs_elmnt, "will-change", "auto");
  }
  if (target.classList.contains("slider") && propertyName === "height") {
    controlSubtitleAnimation(musicPlayerInfo_elmnt, songName_elmnt);
    controlSubtitleAnimation(musicPlayerInfo_elmnt, singerName_elmnt);
  }
});
window.addEventListener("pointerup", () => {
  if (progressBarIsUpdating) {
    selectedSong.muted = false;
    progressBarIsUpdating = false;
  }
});
window.addEventListener("pointermove", (e) => {
  if (progressBarIsUpdating) {
    handleScrub(e, this);
    selectedSong.muted = true;
  }
});
