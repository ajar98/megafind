var newbod = null;
var request = require("request");
function summarizeText(txt){
    var options = { method: 'POST',
  url: 'http://api.intellexer.com/summarizeText',
  qs:
   { apikey: '0d175b94-7204-45cd-9231-87178dbdb22f',
     summaryRestriction: '2',
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
  setTimeout(slowDown, txt.length/2);
}
function slowDown(){
    var summary ="";
    for(var i = 0 ; i < newbod["items"].length; i++){
    summary+= newbod["items"][i]["text"];
  }
    console.log(summary);
    return summary;
}

summarizeText("Though it is very simple, sum_squares exemplifies the most powerful property of user-defined functions. The function sum_squares is defined in terms of the function square, but relies only on the relationship thatsquare defines between its input arguments and its output values.We can write sum_squares without concerning ourselves with how to square a number. The details of how the square is computed can be suppressed, to be considered at a later time. Indeed, as far as sum_squaresis concerned, square is not a particular function body, but rather an abstraction of a function, a so-called functional abstraction. At this level of abstraction, any function that computes the square is equally good.Thus, considering only the values they return, the following two functions for squaring a number should be indistinguishable. Each takes a numerical argument and produces the square of that number as the value.In other words, a function definition should be able to suppress details. The users of the function may not have written the function themselves, but may have obtained it from another programmer as a. A programmer should not need to know how the function is implemented in order to use it. The Python Library has this property. Many developers use the functions defined there, but few ever inspect their implementation.Aspects of a functional abstraction. To master the use of a functional abstraction, it is often useful to consider its three core attributes. The domain of a function is the set of arguments it can take. The range of a function is the set of values it can return. The intent of a function is the relationship it computes between inputs and output (as well as any side effects it might generate). Understanding functional abstractions via their domain, range, and intent is critical to using them correctly in a complex program.For example, any square function that we use to implement sum_squares should have these attributes:These attributes do not specify how the intent is carried out; that detail is abstracted away.");