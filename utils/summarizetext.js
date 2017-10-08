const request = require('request-promise');
const winston = require('winston');
const R = require('ramda');

class Summarizer {
  constructor() {
    this.options = { method: 'POST',
        url: 'http://api.intellexer.com/summarizeText',
        qs:
         { apikey: '0d175b94-7204-45cd-9231-87178dbdb22f',
           summaryRestriction: '8',
           returnedTopicsCount: '2',
           loadConceptsTree: 'false',
           loadNamedEntityTree: 'false',
           usePercentRestriction: 'false',
           conceptsRestriction: '7',
           structure: 'general',
           fullTextTrees: 'false',
           textStreamLength: '1000',
           wrapConcepts: 'true' },
           headers:{ 'cache-control': 'no-cache' }}
    this.summary = null;
  };

  summarizeText (text) {
    this.options.body = text;
    return request(this.options).then((body) => {
      body = JSON.parse(body);
      let summary = "";
      R.forEach((entry) => {
        if (entry.text != null) {
          summary += entry.text + " ";
        }
      }, body.items)

      this.summary = summary;
      return this.summary
    })
  }
}


const s = new Summarizer();
s.summarizeText(text).then((result) => console.log(result));
