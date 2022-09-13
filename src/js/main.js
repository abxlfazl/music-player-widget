/** @jsx dom */

function App({ songs }) {
  return (
    <div class="music-player flex-column">
      <Slider />
      <Playlist />
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
        document.getElementById("root").appendChild(<App songs={data} />);
      });
    });
  });

function handleResize() {
  const vH = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vH", `${vH}px`);
}

handleResize();
window.addEventListener("resize", handleResize);
window.addEventListener("orientationchange", handleResize);
