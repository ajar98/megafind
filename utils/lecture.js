const EntityExtractor = require('./entityextractor');
const R = require('ramda');

class Lecture {

    constructor() {
      // this.id = id;
      this.document = [];
      this.entityExtractor = new EntityExtractor();
      this.entities = [];
    }

    addBlock (text) {
        this.document.push(text);
    }

    getText () {
        return this.document;
    }

    getEntities() {
        return this.entities;
    }

    async generateTextWithEntities(block) {
        const result = await this.entityExtractor.getEntities(block).then((results) => {
            let textWithEntities = block;
            // var i = 0;
            R.forEach((entry) => {
                // i++;
                // console.log(entry);
                this.entities.push(entry);
                textWithEntities = textWithEntities.replace(new RegExp(entry[0], "i"), `<a href=${entry[1]}>${entry[0]}</a>`);
                // if (i == results.length) {
                //     return block;
                // }
            }, Object.entries(results));
            return textWithEntities;
        });
        return result;
    }

    // validateID (num) {
    //   return num == this.id;
    // }
}

// const text = "Martin luther king was a great man and he was married to not rosa parks.";
// const l = new Lecture();
// l.generateTextWithEntities(text).then((result) => {
//     console.log(result);
// });

module.exports = Lecture;
