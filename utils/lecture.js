const EntityExtractor = require('./entityextractor');
const Summarizer = require('./summarizer');
const Search = require('./search');
const R = require('ramda');
const fs = require('fs');

class Lecture {

    constructor() {
      // this.id = id;
      this.document = [];
      this.entityExtractor = new EntityExtractor();
      this.entities = [];
      this.summarizer = new Summarizer();
      this.notes = "";
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
                this.addEntity(entry);
                textWithEntities = textWithEntities.replace(new RegExp(entry[0], "i"), `<a href=${entry[1]}>${entry[0]}</a>`);
                // if (i == results.length) {
                //     return block;
                // }
            }, Object.entries(results));
            return textWithEntities;
        });
        return result;
    }

    addEntity(entity) {
      Search.getSnippet(entity[0]).then((result) => {
        this.entities.push({ name: entity[0], url: result[1], snippet: result[0]});
      })
    }

    close() {

      let lectureText = "";
      for (let i =0; i < this.document.length; i += 1) {
        lectureText += this.document[i] + " "
      }
      const a = this.summarizer.summarizeText(lectureText).then((result) => {

        const stream = fs.createWriteStream('./digest.txt');
        stream.once('open', function (fd) {
          stream.write("I. SUMMARY \n");
          stream.write("\n");
          stream.write(result + "\n");
          stream.write("\n");

          stream.write("II. NOTES \n");
          for (let i = 0; i < this.notes.length; i += 1) {
            stream.write("------------------------------------------------- \n");
            stream.write(this.notes[i] + "\n");
          }
          stream.write("------------------------------------------------- \n");
          stream.write("\n");

          stream.write("III. KEYWORDS \n")
          let entity;
          for (let i = 0; i < this.entities.length; i += 1) {
            entity = this.entities[i];
            stream.write(`${entity.name}: ${entity.snippet} \n`)
          }
          stream.end();
      })
      })
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
const l = new Lecture();
l.document = ["Hello my name is Kian Hooshmand.", "I really like to say hello to people.", "Ajay is a great partner of mine.", "We are working super hard on this.",
          "We are building the future of business and technology", "Please like me."];
l.close();
