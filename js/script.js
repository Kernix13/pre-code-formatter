const htmlEntities = document.getElementById("html_entities");
const darkBlockOutput = document.getElementById("dark_block_output");
const lightBlockOutput = document.getElementById("light_block_output");

// span tag color classes, and keywords
const classes = ["green", "blue", "light-blue", "white", "comment", "red", "purple", "orange"]
// const classes = ["maroon", "blue2", "green2", "light-blue2", "gray", "comment2", "red2", "purple2", "orange2", "black"];

// Global Regular Expressions
const dblQuote = /(&quot;[.\s\w\/:*#?-]*&quot;)/g;
const singleQt = /(&apos;[=,.\w\s/:*?-]*\w&apos;)/g;
const comments = /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g;

// HTML Regular Expressions
const htmlAttr = /([\w-]*)(?==)/g;
const htmlComment = /(&lt;!--\s[\w\s\W]*\s--&gt;)/g;
const htmlTag = /(?<=&lt;\/*|!)([a-zA-Z1-6]*)/g;
const htmlBoolAttr = /(\s\w*)(?=&gt;)/g; // need to have it right on > or &gt;
const htmlRegEx = [htmlAttr, htmlComment, htmlTag, htmlBoolAttr, dblQuote];

// CSS Regular Expressions
// const cssClassId = /(?<=[#\.])([^\d][a-zA-Z_-\d]*)/g;
const cssClassId = /(?<=[#\.:])[^:]([^\d][a-zA-Z_-\d]*)/g;
const cssAtRules = /([@][a-z-]*|!important)/g;
const cssVariables = /([\s\(?][-]{2}[a-zA-Z-]*)/g;
// const cssProp = /([a-z-]*)(?=:)/g;
const cssProp = /(?<![;=\w])([a-z-]*):/g;
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
const jsonProp = /(&quot;[.\w\/:*\{\s?-]*\w&quot;):/g;
const jsonNum = /[]/g;
const jsonBool = /[]/g;
const jsonRegEx = [jsonProp, dblQuote];

// PHP Regular Expressions

// Step 1: Get your code added to a backtick string in input.js
const myText = inputText.split(/[\n]/);

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
convertCode(myText);

// Step 3b: Output the HTML entities if you want to stop here
convertedCode.forEach(codeLine => {
  htmlEntities.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
})


// Step 4: add span color classes to converted code for the RegEx scenarios
/* HOW DO I DO THIS DIFFERENTLY? Nester map, recursion? */
let DblQuotesClass = []; let singleQtClass = []; let commentsClass = [];

let HtmlAttrClass = []; let HtmlCommentClass = []; let HtmlTagClass = []; let HtmlBoollClass = [];

let cssClassIdClass = []; let cssPropClass = []; let cssFxNameClass = []; let cssUnitsClass = []; let cssAtRulesClass = []; let cssVarsClass = [];

class htmlCode {
  constructor(arr, regex, lineArray, index) {
    this.arr = arr;
    this.regex = regex;
    this.lineArray = lineArray;
    this.index = index;
  }

  // Can I use removeDups()? As a get or set?

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

// Step 5: Output the code to the DOM
// DblQuotesClass.forEach(codeLine => {
//   darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
// })

/* Start CSS classes */
const myCssProp = new htmlCode(convertedCode, cssProp, cssPropClass, 1);
myCssProp.findMatches();
const mCssComments = new htmlCode(cssPropClass, comments, commentsClass, 4);
mCssComments.findMatches();
const myCssClassId = new htmlCode(commentsClass, cssClassId, cssClassIdClass, 1);
myCssClassId.findMatches();
const myCssFx = new htmlCode(cssClassIdClass, cssFxName, cssFxNameClass, 6);
myCssFx.findMatches();
const myCssUnits = new htmlCode(cssFxNameClass, cssUnits, cssUnitsClass, 5);
myCssUnits.findMatches();
const myCssAt = new htmlCode(cssUnitsClass, cssAtRules, cssAtRulesClass, 5);
myCssAt.findMatches();
const myCssVars = new htmlCode(cssAtRulesClass, cssVariables, cssVarsClass, 7);
myCssVars.findMatches();
const myCssDblQuotes = new htmlCode(cssVarsClass, dblQuote, DblQuotesClass, 2);
myCssDblQuotes.findMatches();
const mySingleQt = new htmlCode(DblQuotesClass, singleQt, singleQtClass, 2);
mySingleQt.findMatches();
/* End CSS classes */

// Step 5: Output the code to the DOM
singleQtClass.forEach(codeLine => {
  darkBlockOutput.textContent += '<li>' + `${codeLine}` + "</li>";
  // darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
})


/* for this block to be correct, I need to use the classes constant that is commented out
DblQuotesClass.forEach(codeLine => {
  lightBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
})
*/ 

/* 
Getting EMPTY span.color tags though the output works (my capture groups?)
My attempt at slicing the dups out but it's only grabbing the last code line 
-> REMOVED THAT CODE BLOCK, removeDups()
*/
