const record = require('node-record-lpcm16');
const Speech = require('@google-cloud/speech');

const speech = Speech();

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
  config: {
    encoding,
    sampleRateHertz,
    languageCode
  },
  interimResults: false // If you want interim results, set this to true
};

const Stream = module.exports;

// Create a recognize stream
Stream.recognizeStream = speech.streamingRecognize(request)
  .on('error', console.error)
  .on('data', (data) =>
      process.stdout.write(
        (data.results[0] && data.results[0].alternatives[0])
          ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
          : `\n\nReached transcription time limit, press Ctrl+C\n`));

Stream.startRecording = () => {
    // Start recording and send the microphone input to the Speech API
    record
      .start({
        sampleRateHertz,
        threshold: 0,
        // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
        verbose: false,
        recordProgram: 'rec', // Try also "arecord" or "sox"
        silence: '10.0'
      })
      .on('error', console.error)
      .pipe(Stream.recognizeStream);
}

Stream.startRecording()



// console.log('Listening, press Ctrl+C to stop.');
