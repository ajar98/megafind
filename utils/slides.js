var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/slides.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/presentations.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'slides.googleapis.com-nodejs-quickstart.json';

Slides = module.exports;

Slides.parseSlides = (presentationId, textSlides) => {
        // Load client secrets from a local file.
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      // Authorize a client with the loaded credentials, then call the
      // Google Slides API.
      credentials = JSON.parse(content);

      var clientSecret = credentials.installed.client_secret;
      var clientId = credentials.installed.client_id;
      var redirectUrl = credentials.installed.redirect_uris[0];
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
          var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
          });
          console.log('Authorize this app by visiting this url: ', authUrl);
          var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          rl.question('Enter the code from that page here: ', function(code) {
            rl.close();
            oauth2Client.getToken(code, function(err, token) {
              if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
              }
              oauth2Client.credentials = token;
              Slides.storeToken(token);
              Slides.listSlides(oauth2Client, presentationId, textSlides);
            });
          });
        } else {
          oauth2Client.credentials = JSON.parse(token);
          Slides.listSlides(oauth2Client, presentationId, textSlides);
        }
      });
    });
}

Slides.storeToken = (token) => {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}

Slides.listSlides = (auth, presentationId, textSlides) => {
    // console.log(auth.credentials);
    var slides = google.slides('v1');
    slides.presentations.get({
      auth,
      presentationId
    }, function(err, presentation) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var length = presentation.slides.length;
      for (i = 0; i < presentation.slides.length; i++) {
        var slide = presentation.slides[i];
        let text = "";
        for (j = 0; j < slide.pageElements.length; j++) {
            var element = slide.pageElements[j];
            if (element['shape'] && element['shape'].text && element['shape'].text['textElements']) {
                currentIndent = 0;
                for (k = 0; k < element['shape'].text['textElements'].length; k++) {
                    var textElement = element['shape'].text['textElements'][k];
                    if (textElement.hasOwnProperty('textRun')) {
                        text += '-'.repeat(Math.round(currentIndent)) + textElement.textRun.content;
                        currentIndent = 0;
                    } else if (textElement.hasOwnProperty('paragraphMarker')){
                        const style = textElement.paragraphMarker.style;
                        if (style.hasOwnProperty('indentStart')) {
                            currentIndent = style.indentStart.magnitude / 12;
                        } else  {
                            currentIndent = 0;
                        }
                    }
                }
            }
        }
        textSlides.push(text);
      }
    });
}


// const s = new Slides()
//
// s.parseSlides('1rAcg0Geq0ulUGYLhIK_0B3KiO3KvrQMrJvOTg2oYAyU');

// console.log(s.textSlides);
