/** @jsx dom */

let indexSong = 0;
let isLocked = false;
let songName_elmnt = null;
let sliderImgs_elmnt = null;
let singerName_elmnt = null;
let musicPlayerInfo_elmnt = null;

function App({ songs }) {
  const songsLength = songs.length - 1;

  function handleChangeMusic({ isPrev = false, playListIndex = null }) {
    if (isLocked) return;

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

    updateInfo(singerName_elmnt, songs[indexSong].artist);
    updateInfo(songName_elmnt, songs[indexSong].songName);

    setProperty(sliderImgs_elmnt, "--index", -indexSong);
    setBodyBg(songs[indexSong].bg);
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

        sliderImgs_elmnt = querySelector(".slider__imgs");
        songName_elmnt = querySelector(".music-player__subtitle");
        musicPlayerInfo_elmnt = querySelector(".music-player__info");
        singerName_elmnt = querySelector(".music-player__singer-name");

        controlSubtitleAnimation(musicPlayerInfo_elmnt, songName_elmnt);
        controlSubtitleAnimation(musicPlayerInfo_elmnt, singerName_elmnt);
      });
    });
  });

function controlSubtitleAnimation(parent, child) {
  const element = child.firstChild;

  if (child.clientWidth > parent.clientWidth) {
    if (child.classList.contains("animate")) return;
    child.appendChild(element.cloneNode(true));
    child.classList.add("animate");
  } else {
    child.classList.remove("animate");
  }

  setProperty(child.parentElement, "width", `${element.clientWidth}px`);
}

function handleResize() {
  const vH = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vH", `${vH}px`);
}

function querySelector(target) {
  return document.querySelector(target);
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
  controlSubtitleAnimation(musicPlayerInfo_elmnt, target);
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
