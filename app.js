// const recorder = document.querySelector("#recorder");
// const player = document.querySelector("#player");

// // Solution 1
// recorder.addEventListener("change", function (event) {
//   const file = event.target.files[0];
//   const url = URL.createObjectURL(file);

//   player.src = url;
// });

// Solution 2
const userPlayer = document.querySelector("#userPlayer");
const recordButton = document.querySelector("#action");
const downloadButton = document.querySelector("#download");
const stopButton = document.querySelector("#stop");
let recorder;

const getRecorder = async () => {
  try {
    recorder = await recordAudio();
  } catch (err) {
    console.log(err);
    return;
  }
};
getRecorder();
recordButton.addEventListener("click", (event) => {
  if (!recorder) {
    return;
  }
  console.log("recording....");
  handleRecording();
});

stopButton.addEventListener("click", (event) => {
  if (!recorder) {
    return;
  }
  console.log("stop recording...");
  stopRecording();
});

const handleRecording = () => {
  const recordButton = document.querySelector("#action");
  recordButton.disabled = true;
  recorder.start();
};

const stopRecording = async () => {
  const audio = await recorder.stop();
  recordButton.disabled = false;
  userPlayer.src = audio.audioUrl;
  downloadButton.href = audio.audioUrl;
  downloadButton.download = "recording.mp3";
};
