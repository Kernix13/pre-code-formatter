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
const cssFxName = /([\w-]{3,})(?=\()/g;
const cssUnits = /(?<=\d)(em|rem|vh|vw|px|%|ch|ex|vmin|vmax)/g;
const cssAtRules = /([@][a-z-]*|!important|!default)/g;
const cssVariables = /([\s\(?][-]{2}[a-zA-Z-]*)/g;
// const cssClassId = /(?<=[#\.:])([^\d][a-zA-Z_-\d]*)/g; // problems
// const cssTag = /[]/g; // CAN'T GET THIS!
const cssRegEx = [cssProp, comments, cssFxName, cssUnits, cssAtRules, cssVariables, singleQt];

// SASS/SCSS Regular Expressions
const sassProp = /(?<![;=\w$-])([a-z-]*)(?=:\s)/g;
// const sassProp = /(?<=[%\.:])([^;\s\d][a-zA-Z_-\d]*)/g;
const sassVars = /([$]{1}[\w-]*)/g;
// const sassClass = /(?<=[%\.:])[^;\s\d]([^\d][a-zA-Z_-\d]*)/g;
const sassRegEx = [sassProp, comments, cssFxName, cssUnits, cssAtRules, sassVars, singleQt];

// JavaScript Regular Expressions
const backTicks = /`(.*?)`/g;
const jsRegEx = [];

// JSX Regular Expressions

// JSON Regular Expressions
const jsonValDblQt = /(&quot;[.\s\w/*#?-]*&quot;)(?!:)/g;
const jsonProp = /(&quot;[.\w\/:*\{\s?-]*\w&quot;)(?=:\s)/g;
const jsonNumBool = /([\d]*|true|false|null)(?=[,\]])/g;
const jsonRegEx = [jsonValDblQt, jsonProp, jsonNumBool];

// PHP Regular Expressions

// Step 1: Get your code added to a backtick string in input.js or from input in this file
const input =
`<h3>HTML Example</h3>
<nav class="main-nav">
  <ul class="nav-list">
    <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="/contact">Contact</a></li>
  </ul>
</nav>`;
const myInput = input.split(/[\n]/);
// const myText = inputText.split(/[\n]/);
// const myHtml = inputHTML.split(/[\n]/);
// const myJson = inputJSON.split(/[\n]/);
const mySass = inputSASS.split(/[\n]/);

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
// convertCode(myInput);
// convertCode(myText);
// convertCode(myJson);
convertCode(mySass);

// Step 3b: Output the HTML entities if you want to stop there
convertedCode.forEach(codeLine => {
  htmlEntities.textContent += '<li>' + `${codeLine}` + "</li>";
})

// Step 4: add span color classes to converted code for the RegEx scenarios
/* HOW DO I DO THIS DIFFERENTLY? Nested map, nested for loop, recursion? */
let DblQuotesClass = []; let singleQtClass = []; let commentsClass = [];

let HtmlAttrClass = []; let HtmlCommentClass = []; let HtmlTagClass = []; let HtmlBoollClass = [];

let cssPropClass = []; let cssFxNameClass = []; let cssUnitsClass = []; let cssAtRulesClass = []; let cssVarsClass = []; let cssClassIdClass = []; let cssTagClass = [];

let sassPropClass = []; let sassVarsClass = []; let sassClassClass = [];

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

      // The 1st string will be used to remove empty span.color tags
      const htmlStrings = [`<span class="${classes[this.index]}"></span>`, `<span class="${classes[this.index]}">${'$1'}</span>`];

      const result = line.replace(this.regex, htmlStrings[1]);

      return this.lineArray.push(result);
    })
  }
}

/* Start HTML classes */
// const myHtmlAttr = new htmlCode(convertedCode, htmlAttr, HtmlAttrClass, 1);
// myHtmlAttr.findMatches();
// const myHtmlComment = new htmlCode(HtmlAttrClass, htmlComment, HtmlCommentClass, 4);
// myHtmlComment.findMatches();
// const myHtmlTags = new htmlCode(HtmlCommentClass, htmlTag, HtmlTagClass, 0);
// myHtmlTags.findMatches();
// const myHtmlBoolAttr = new htmlCode(HtmlTagClass, htmlBoolAttr, HtmlBoollClass, 1);
// myHtmlBoolAttr.findMatches();
// const myHtmlDblQuotes = new htmlCode(HtmlBoollClass, dblQuote, DblQuotesClass, 2);
// myHtmlDblQuotes.findMatches();
/* End HTML classes */

// Step 5: Output the HTML code to the DOM
// DblQuotesClass.forEach(codeLine => {
//   darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
// })

/* Start CSS classes */
// const myCssProp = new htmlCode(convertedCode, cssProp, cssPropClass, 1);
// myCssProp.findMatches();
// const mCssComments = new htmlCode(cssPropClass, comments, commentsClass, 4);
// mCssComments.findMatches();
// const myCssFx = new htmlCode(commentsClass, cssFxName, cssFxNameClass, 6);
// myCssFx.findMatches();
// const myCssUnits = new htmlCode(cssFxNameClass, cssUnits, cssUnitsClass, 5);
// myCssUnits.findMatches();
// const myCssAt = new htmlCode(cssUnitsClass, cssAtRules, cssAtRulesClass, 5);
// myCssAt.findMatches();
// const myCssVars = new htmlCode(cssAtRulesClass, cssVariables, cssVarsClass, 7);
// myCssVars.findMatches();
// const mySingleQt = new htmlCode(cssVarsClass, singleQt, singleQtClass, 2);
// mySingleQt.findMatches();
// const myCssClassId = new htmlCode(singleQtClass, cssClassId, cssClassIdClass, 1);
// myCssClassId.findMatches();
/* End CSS classes */

// Step 5: Output the CSS code to the DOM
// singleQtClass.forEach(codeLine => {
//   darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
// })

// const classes = ["green", "blue", "light-blue", "white", "comment", "red", "purple", "orange"]
/* Start SASS/SCSS classes */
const mySassProp = new htmlCode(convertedCode, sassProp, sassPropClass, 1);
mySassProp.findMatches();
const mySassComments = new htmlCode(sassPropClass, comments, commentsClass, 4);
mySassComments.findMatches();
const mySassFx = new htmlCode(commentsClass, cssFxName, cssFxNameClass, 6);
mySassFx.findMatches();
const mySassUnits = new htmlCode(cssFxNameClass, cssUnits, cssUnitsClass, 5);
mySassUnits.findMatches();
const mySassAt = new htmlCode(cssUnitsClass, cssAtRules, cssAtRulesClass, 5);
mySassAt.findMatches();
const mySassVars = new htmlCode(cssAtRulesClass, sassVars, sassVarsClass, 7);
mySassVars.findMatches();
const mySingleQt = new htmlCode(sassVarsClass, singleQt, singleQtClass, 2);
mySingleQt.findMatches();
// const mySassClass = new htmlCode(singleQtClass, sassClass, sassClassClass, 2);
// mySassClass.findMatches();
/* End SASS/SCSS classes */

// Step 5: Output the SASS code to the DOM
singleQtClass.forEach(codeLine => {
  darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
})

/* Start JavaScript classes */

/* End JavaScript classes */

/* Start JSON classes */
// const jsonRegEx = [jsonProp, jsonValDblQt, jsonNumBool];
// let jsonPropClass = []; let jsonValDblQtClass = []; let jsonNumBoolClass = [];
const myjsonValDblQt = new htmlCode(convertedCode, jsonValDblQt, jsonValDblQtClass, 2);
myjsonValDblQt.findMatches();
const myjsonProp = new htmlCode(jsonValDblQtClass, jsonProp, jsonPropClass, 1);
myjsonProp.findMatches();
const myjsonNumBool = new htmlCode(jsonPropClass, jsonNumBool, jsonNumBoolClass, 1);
myjsonNumBool.findMatches();
/* End JSON classes */

// Step 5: Output the CSS code to the DOM
// jsonNumBoolClass.forEach(codeLine => {
//   darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
// })

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
