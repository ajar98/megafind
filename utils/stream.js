const record = require('node-record-lpcm16');
const Speech = require('@google-cloud/speech');
const request = require('request');
const to = require('to-case');
const WordPOS = require('wordpos'), wordpos = new WordPOS();

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const interrogatives = ['what', 'when', 'why', 'which', 'who', 'how', 'whose', 'whom'];

class Stream {

  constructor() {
      this.speech = Speech();
      this.request = {
        config: {
          encoding,
          sampleRateHertz,
          languageCode,
        },
        interimResults: false // If you want interim results, set this to true
      };
      this.recognizeStream = this.speech.streamingRecognize(this.request)
        .on('error', console.error)
        .on('data', (data) => {
            if (data.results[0] && data.results[0].alternatives[0]) {
                const rawText = data.results[0].alternatives[0].transcript;
                this.processText(rawText, (cleaned) => {
                    request.post('https://8e16fd68.ngrok.io/handleText', {form: {text: cleaned}});
                    console.log(`Text sent: ${JSON.stringify(cleaned)}`);
                });

            }
        });
  }

  processText(rawText, cb) {
      rawText = rawText.replace('i ', 'I ').replace('i\'', 'I\'');
      const sent = to.sentence(rawText);
      const first = sent.split(' ')[0];
      if (interrogatives.includes(first.toLowerCase())) {
          cb(`${sent}? `);
      } else {
          cb(`${sent}. `)
      }
  }

  startRecording() {
      console.log('starting recording');
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
    console.log('stopping recording');
    record.stop();
    return;
  }

}

module.exports = Stream;
