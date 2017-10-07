// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

const language = Language();

// Instantiates a Document, representing the provided tex

const EntityExtractor = module.exports

EntityExtractor.analyze = (text) => {
  const document = {
    'content': text,
    type: 'PLAIN_TEXT'
  };
  return language.analyzeEntities({ document })
    .then((results) => {
      return results[0].entities;
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}

// Detects entities in the document

console.log(EntityExtractor.analyze('After spending 40 years in slavery, he was freed in 1828 by order of President John Quincy Adams and Secretary of State Henry Clay after the Sultan of Morocco requested his release'))
