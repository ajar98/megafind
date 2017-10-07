const lecture = require('./lecture');

var hash = {};
    class sessions{
    constructor(){
    }
    createSession(){
        var numb = Math.floor(Math.random()*20);
        console.log(numb);
        while((numb.toString() in hash)){
            numb = Math.floor(Math.random()*20);
        }
        hash[numb.toString()] = new lecture(numb);
        return numb;
        }


    joinSession(key){
        var strrep = key.toString();
        if(strrep in hash){
            return hash[strrep];
        }
        else{
            return 'Error Invalid Entry Code.'
        }
    }
    }


module.exports = sessions;
