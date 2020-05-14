// Create audio stream by using getUserMedia
// return a promise which resolves to an object
// that contains our API, which consists of 2 function
// start and stop

const recordAudio = () => {
  return new Promise(async (resolve, reject) => {
    let stream;
    // Error handling
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
    } catch (err) {
      reject({ success: false, message: "Permission Denied" });
      return;
    }
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    // Save audio data chunks
    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });

    // Start recording
    const start = () => {
      mediaRecorder.start();
    };

    // Stop recording and return a promise which resolves
    // to an object that contains audioBlob, audioUrl, play function
    const stop = () => {
      return new Promise((resolve) => {
        mediaRecorder.addEventListener("stop", () => {
          // Convert audio data to single audio blob
          // create audio URL
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => {
            audio.play();
          };

          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });
    };

    resolve({ start, stop });
  });
};
