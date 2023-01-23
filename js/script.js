const htmlEntities = document.getElementById("html_entities");
const darkBlockOutput = document.getElementById("dark_block_output");
const lightBlockOutput = document.getElementById("light_block_output");

// span tag color classes, and keywords
const classes = ["green", "blue", "light-blue", "white", "comment", "red", "purple", "orange"]
// const classes = ["maroon", "blue2", "green2", "light-blue2", "gray", "comment2", "red2", "purple2", "orange2", "black"];

// Global Regular Expressions
const dblQuote = /(&quot;[.\s\w\/:*#?-]*&quot;)/g;
// const singleQt = /(&apos;[=,.\w\s/:*?-]*\w&apos;)/g;
const singleQt = /(&apos;[=,.\w\s/:*?-]*&apos;)/g;
const comments = /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g;

// HTML Regular Expressions
const htmlAttr = /([\w-]*)(?==)/g;
const htmlComment = /(&lt;!--\s[\w\s\W]*\s--&gt;)/g;
const htmlTag = /(?<=&lt;\/*|!)([a-zA-Z1-6]*)/g;
const htmlBoolAttr = /(\s\w*)(?=&gt;)/g; // need to have it right on > or &gt;
const htmlRegEx = [htmlAttr, htmlComment, htmlTag, htmlBoolAttr, dblQuote];

// CSS Regular Expressions
const cssProp = /(?<![;=\w])([a-z-]*)(?=:\s)/g;
// const cssClassId = /(?<=[#\.:])[^:]([^\d][a-zA-Z_-\d]*)/g;
const cssClassId = /(?<=[#\.:])([^\d][a-zA-Z_-\d]*)/g; // problems
// const cssClassId = /(?<=[#\.:])([^:][^\d][a-zA-Z_-\d]*)/g;
const cssAtRules = /([@][a-z-]*|!important)/g;
const cssVariables = /([\s\(?][-]{2}[a-zA-Z-]*)/g;
const cssFxName = /([\w]{3})(?=\()/g;
const cssUnits = /(?<=\d)(em|rem|vh|vw|px|%|ch|ex|vmin|vmax)/g;
const cssTag = /[]/g; // CAN'T GET THIS!
const cssRegEx = [comments, cssClassId, cssProp, cssFxName, cssUnits, cssAtRules, cssVariables, dblQuote, singleQt];

// SASS/SCSS Regular Expressions

const scssRegex = [comments]

// JavaScript Regular Expressions
const backTicks = /`(.*?)`/g;
const jsRegEx = [];

// JSX Regular Expressions

// JSON Regular Expressions
const jsonProp = /(&quot;[.\w\/:*\{\s?-]*\w&quot;)(?=:\s)/g;
// const jsonValDblQt = /(&quot;[.\s\w\/*#?-]*&quot;)([^:][,]*)/g;
const jsonValDblQt = /(&quot;[.\s\w\/*#?-]*&quot;)([^:])/g;
const jsonNumBool = /([\d]*|true|false|null)(?=[,\]])/g;
const jsonRegEx = [jsonProp, jsonValDblQt, jsonNumBool];

// PHP Regular Expressions

// Step 1: Get your code added to a backtick string in input.js
const myText = inputText.split(/[\n]/);
const myJson = inputJSON.split(/[\n]/);

// Step 2: Fx to convert reserved characters into HTML entities
function convertReservedChars(str) {
  const convertSymbols = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  };

  return str
    .split("")
    .map(symbol => convertSymbols[symbol] || symbol)
    .join("");
}

// Step 3a: Run your code through convertReservedChars() 
let convertedCode = [];

function convertCode(arr) {
  arr.forEach(str => {
    let convertedLine = convertReservedChars(str);
    convertedCode.push(`${convertedLine}`);
  })
}
// convertCode(input);
// convertCode(myText);
// console.log(convertedCode)
convertCode(myJson);

// Step 3b: Output the HTML entities if you want to stop there
convertedCode.forEach(codeLine => {
  htmlEntities.textContent += '<li>' + `${codeLine}` + "</li>";
})

// Step 4: add span color classes to converted code for the RegEx scenarios
/* HOW DO I DO THIS DIFFERENTLY? Nester map, recursion? */
let DblQuotesClass = []; let singleQtClass = []; let commentsClass = [];

let HtmlAttrClass = []; let HtmlCommentClass = []; let HtmlTagClass = []; let HtmlBoollClass = [];

let cssClassIdClass = []; let cssPropClass = []; let cssFxNameClass = []; let cssUnitsClass = []; let cssAtRulesClass = []; let cssVarsClass = [];

let jsonPropClass = []; let jsonValDblQtClass = []; let jsonNumBoolClass = [];

class htmlCode {
  constructor(arr, regex, lineArray, index) {
    this.arr = arr;
    this.regex = regex;
    this.lineArray = lineArray;
    this.index = index;
  }

  findMatches() {
    this.arr.map(line => {

      // Change the 6 span tags to code then fix the css file for code
      const htmlStrings = [`<span class="${classes[this.index]}"></span>`, `<span class="${classes[this.index]}">${'$1'}</span>`];

      const result = line.replace(this.regex, htmlStrings[1]);

      return this.lineArray.push(result);
    })
  }
}

/* Start HTML classes */
const myHtmlAttr = new htmlCode(convertedCode, htmlAttr, HtmlAttrClass, 1);
myHtmlAttr.findMatches();
const myHtmlComment = new htmlCode(HtmlAttrClass, htmlComment, HtmlCommentClass, 4);
myHtmlComment.findMatches();
const myHtmlTags = new htmlCode(HtmlCommentClass, htmlTag, HtmlTagClass, 0);
myHtmlTags.findMatches();
const myHtmlBoolAttr = new htmlCode(HtmlTagClass, htmlBoolAttr, HtmlBoollClass, 1);
myHtmlBoolAttr.findMatches();
const myHtmlDblQuotes = new htmlCode(HtmlBoollClass, dblQuote, DblQuotesClass, 2);
myHtmlDblQuotes.findMatches();
/* End HTML classes */

// Step 5: Output the HTML code to the DOM
// DblQuotesClass.forEach(codeLine => {
//   darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
// })

/* Start CSS classes */
const myCssProp = new htmlCode(convertedCode, cssProp, cssPropClass, 1);
myCssProp.findMatches();
const mCssComments = new htmlCode(cssPropClass, comments, commentsClass, 4);
mCssComments.findMatches();
// const myCssFx = new htmlCode(cssClassIdClass, cssFxName, cssFxNameClass, 6);
// myCssFx.findMatches();
const myCssFx = new htmlCode(commentsClass, cssFxName, cssFxNameClass, 6);
myCssFx.findMatches();
const myCssUnits = new htmlCode(cssFxNameClass, cssUnits, cssUnitsClass, 5);
myCssUnits.findMatches();
const myCssAt = new htmlCode(cssUnitsClass, cssAtRules, cssAtRulesClass, 5);
myCssAt.findMatches();
const myCssVars = new htmlCode(cssAtRulesClass, cssVariables, cssVarsClass, 7);
myCssVars.findMatches();
const mySingleQt = new htmlCode(cssVarsClass, singleQt, singleQtClass, 2);
mySingleQt.findMatches();
const myCssClassId = new htmlCode(singleQtClass, cssClassId, cssClassIdClass, 1);
myCssClassId.findMatches();
/* End CSS classes */

// Step 5: Output the CSS code to the DOM
// cssClassIdClass.forEach(codeLine => {
//   darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
// })

/* Start SASS/SCSS classes */

/* End SASS/SCSS classes */

// Step 5: Output the SASS code to the DOM
// enterArrNameHere.forEach(codeLine => {
//   darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
// })

/* Start JavaScript classes */

/* End JavaScript classes */

/* Start JSON classes */
// const jsonRegEx = [jsonProp, jsonValDblQt, jsonNumBool];
// let jsonPropClass = []; let jsonValDblQtClass = []; let jsonNumBoolClass = [];
const myjsonProp = new htmlCode(convertedCode, jsonProp, jsonPropClass, 1);
myjsonProp.findMatches();
const myjsonValDblQt = new htmlCode(jsonPropClass, jsonValDblQt, jsonValDblQtClass, 1);
myjsonValDblQt.findMatches();
const myjsonNumBool = new htmlCode(jsonPropClass, jsonNumBool, jsonNumBoolClass, 1);
myjsonNumBool.findMatches();


/* End JSON classes */

// Step 5: Output the CSS code to the DOM
jsonNumBoolClass.forEach(codeLine => {
  darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
})

/* Start PHP classes */

/* End PHP classes */


/* for LIGHT code block, you need to use the classes constant that is commented out and comment out the other one */
/*
DblQuotesClass.forEach(codeLine => {
  lightBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
})
*/ 

/* 
Getting EMPTY span.color tags though the output works (my capture groups?)
My attempt at slicing the dups out but it's only grabbing the last code line 
-> REMOVED THAT BLOCK Of CODE: removeDups()
*/
// Can I use removeDups()? As a get or set?
