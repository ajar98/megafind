const lecture = require('./lecture');

var hash = {};

class Session {
    constructor () {
    }

    createSession () {
        let num = Math.floor(Math.random()*20);

        while((numb.toString() in hash)){
            numb = Math.floor(Math.random()*20);
        }
        hash[numb.toString()] = new lecture(numb);
        return numb;
    }


    joinSession (key) {
        const strKey = key.toString();

        if (strKey in hash) {
            return hash[strrep];
        } else {
            return 'Error Invalid Entry Code.'
        }
    }
    }


module.exports = Session;
