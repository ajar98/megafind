var newbod = null;
var request = require("request");
function summarizeText(txt){
    var options = { method: 'POST',
  url: 'http://api.intellexer.com/summarizeText',
  qs:
   { apikey: '0d175b94-7204-45cd-9231-87178dbdb22f',
     summaryRestriction: '1',
     returnedTopicsCount: '2',
     loadConceptsTree: 'false',
     loadNamedEntityTree: 'false',
     usePercentRestriction: 'false',
     conceptsRestriction: '7',
     structure: 'general',
     fullTextTrees: 'false',
     textStreamLength: '1000',
     wrapConcepts: 'true' },
  headers:
   { 'cache-control': 'no-cache' },
  body: txt };
  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  newbod = JSON.parse(body);
});
  setTimeout(slowDown, 1000);
}
function slowDown(){
    var summary ="";
    for(var i = 0 ; i < newbod["items"].length; i++){
    summary+= newbod["items"][i]["text"];
  }
    console.log(summary);
    return summary;
}