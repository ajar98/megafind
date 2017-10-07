var aggregateWords = "";


class lecture{
    constructor(){

    }

    addWord(txt){
        aggregateWords += txt;
        return;
    }

    completeText(){
        return aggregateWords;
    }
}

module.exports = lecture;

