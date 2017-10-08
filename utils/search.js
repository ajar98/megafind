request = require('request-promise');

const Search = module.exports;

const customSearchId = '005590087156535369194:i5srknb67es';
const WIKIPEDIA = 'en.wikipedia.org';
const DICTIONARY = 'www.dictionary.com'

Search.getSnippet = (query) => {
    const options = {
      method: 'GET',
      url: 'https://www.googleapis.com/customsearch/v1',
      qs:
       { key: process.env.GOOGLE_SEARCH_API_KEY,
         q: query,
         cx: customSearchId },
      headers:
       {} };

    return request(options).then((body) => {
        return Search.handleBody(body);
    });

}

Search.handleBody = (response) => {
    response = JSON.parse(response);
    const searchResults = response.items;
    let dictionaryResult = null;
    let wikipediaResult = null;
    let i = 0;
    while ((!dictionaryResult && !wikipediaResult) || i < searchResults.length) {
        const searchResult = searchResults[i];
        if (!wikipediaResult && searchResult.displayLink == WIKIPEDIA) {
            wikipediaResult = [searchResult.snippet.replace('\n', ''), searchResult.link];
        } else if (!dictionaryResult && searchResult.displayLink == DICTIONARY) {
            dictionaryResult = [searchResult.snippet.replace('\n', ''), searchResult.link];
        }
        i++;
    }
    return (dictionaryResult || wikipediaResult);
}

// Search.getSnippet('wikipedia').then((result) => console.log(result));
