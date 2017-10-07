class Lecture {

    constructor({ id }){
      this.id = id;
      this.total = "";
    }

    addWord (text) {
        this.total += text;
    }

    getText () {
        return this.total;
    }

    validateID (num) {
      return num == this.id;
    }
}

module.exports = lecture;
