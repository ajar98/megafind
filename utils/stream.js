const record = require('node-record-lpcm16');
const Speech = require('@google-cloud/speech');
const request = require('request');

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

class Stream {

  constructor() {
      this.speech = Speech();
      this.request = {
        config: {
          encoding,
          sampleRateHertz,
          languageCode
        },
        interimResults: false // If you want interim results, set this to true
      };
      this.recognizeStream = this.speech.streamingRecognize(this.request)
        .on('error', console.error)
        .on('data', (data) => {
            if (data.results[0] && data.results[0].alternatives[0]) {
                const text = {text: data.results[0].alternatives[0].transcript};
                console.log(`Text sent: ${JSON.stringify(text)}`);
                request.post('https://adf030c8.ngrok.io/handleText', {form: text});
            } else {
                // Error
            }
        });
  }

  startRecording() {
      // Start recording and send the microphone input to the Speech API
      record
        .start({
          sampleRateHertz,
          threshold: 0,
          // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
          verbose: false,
          recordProgram: 'rec' // Try also "arecord" or "sox"
        })
        .on('error', console.error)
        .pipe(this.recognizeStream);
      return;
  };

  stopRecording() {
    record.stop();
    return;
  }

}

module.exports = Stream;
