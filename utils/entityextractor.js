const Language = require('@google-cloud/language');
const R = require('ramda');
const to = require('to-case');

class EntityExtractor {
    constructor () {
      this.language = Language();
    }

    /* DOC must look like THIS:
      {
      'content' = text,
      type = 'PLAIN_TEXT'
    }
    */
    async getEntities(text) {
      text = to.capital(text);
      const entities = await this.language.analyzeEntities({ document: {content: text, type: 'PLAIN_TEXT'} }).then((results) => {
        const result = {};
        const entities = results[0].entities;

        console.log(`${JSON.stringify(entities)}`);

        // var i = 0;
        R.forEach((entity) => {
          if (entity.metadata && entity.metadata.wikipedia_url) {
            result[`${entity.name}`] = entity.metadata.wikipedia_url;
          }
          // if (i == entities.length) {
          //     cb(result);
          // };
        }, entities);
        return result;

      });
      return entities;
    }
}


module.exports = EntityExtractor;
