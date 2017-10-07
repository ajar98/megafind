const Language = require('@google-cloud/language');2

class Entity {
    constructor () {
      this.language = Language();
    }

    /* DOC must look like THIS:
      {
      'content' = text,
      type = 'PLAIN_TEXT'
    }
    */
    getEntities(doc) {
      return this.language.analyzeEntities({ document: doc }).then((results) => {
        const result = {}
        const entities = results[0].entities;

        entities.forEach((entity) => {
          if (entity.metadata && entity.metadata.wikipedia_url) {
            result[`${entity.name}`] = entity.metadata.wikipedia_url;
          }
        })
        return result
      });
    }
}
