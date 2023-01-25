const htmlEntities = document.getElementById("html_entities");
const darkBlockOutput = document.getElementById("dark_block_output");
const lightBlockOutput = document.getElementById("light_block_output");

// span tag color classes, and keywords
const classes = ["green", "blue", "light-blue", "white", "comment", "red", "purple", "orange"]

// Global Regular Expressions
const dblQuote = /(&quot;[.\s\w\/:*#?-]*&quot;)/g;
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
const cssClassId = /(?<=[\.:])([^\d][a-zA-Z_-\d]*)/g; // problems
const cssRegEx = [cssProp, comments, cssFxName, cssUnits, cssAtRules, cssVariables, singleQt];

// SASS/SCSS Regular Expressions
const sassProp = /(?<![;=\w$-])([a-z-]*)(?=:\s)/g;
const sassVars = /([$]{1}[\w-]*)/g;
const sassRegEx = [sassProp, comments, cssFxName, cssUnits, cssAtRules, sassVars, singleQt];

// JavaScript Regular Expressions
const backTicks = /`(?:\\.|\$\{[^{}]*\}|(?!\$\{)[^\\`])*`/g;
const jsKeywords = /(?<=\(?)(typeof|async|await|break|case|catch|class|const|default|delete|do|else|extends|for|from|function|get|if|import|in|let|new|of|return|set|switch|throw|try|while)(?=\s)/g;
const jsFx = /([\w]*)(?=\()/g;
const jsNumDate = /(Math|Date|Number|BigInt)(?=\(|\.)/g;
const jsObjProp = /([\w]*)(?=:)/g;
const jsBool = /(true|false|null|undefined)/g;
const jsEqual = /(=&gt;|=|!=|!==|==|===|\+=|\*=|\/=|-=)/g;
const jsRegEx = [backTicks, jsKeywords, comments, dblQuote, singleQt];

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

/* I think the split regex should be /[\n\r]|[\n]/g */

// const myInput = input.split(/[\n]/);
// const myJs = inputJS.split(/[\n\r]|[\n]/g);
const myPhp = inputPHP.split(/[\n\r]|[\n]/g);
let convertedCode = [];

function convertCode(arr) {
  arr.forEach(str => {
    let convertedLine = convertReservedChars(str);
    convertedCode.push(`${convertedLine}`);
  })
}
// convertCode(myInput);
convertCode(myPhp);

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

let jsKeywordsClass = []; let jsNumClass = []; let jsFxClass = []; let jsNumDateClass = []; let jsObjPropClass = []; let jsBoolClass = []; let jsEqualClass = []; let backTicksClass = [];

class htmlCode {
  constructor(arr, regex, lineArray, index) {
    this.arr = arr;
    this.regex = regex;
    this.lineArray = lineArray;
    this.index = index;
  }

  findMatches() {
    this.arr.map(line => {

      // The 1st string is to remove empty span.color tags (removeDups())
      const htmlStrings = [`<span class="${classes[this.index]}"></span>`, `<span class="${classes[this.index]}">${'$1'}</span>`];

      const result = line.replace(this.regex, htmlStrings[1]);

      return this.lineArray.push(result);
    })
  }
}

/* Start HTML classes */
/*
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
*/
/* End HTML classes */

/* Start CSS classes */
/* 
const myCssProp = new htmlCode(convertedCode, cssProp, cssPropClass, 1);
myCssProp.findMatches();
const mCssComments = new htmlCode(cssPropClass, comments, commentsClass, 4);
mCssComments.findMatches();
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
*/
/* End CSS classes */

/* Start SASS/SCSS classes */
/* 
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
*/
/* End SASS/SCSS classes */

/* Start JavaScript classes */
const myjsEqual = new htmlCode(convertedCode, jsEqual, jsEqualClass, 1);
myjsEqual.findMatches();
const myjsNumDate = new htmlCode(jsEqualClass, jsNumDate, jsNumDateClass, 7);
myjsNumDate.findMatches();
const myjsBool = new htmlCode(jsNumDateClass, jsBool, jsBoolClass, 1);
myjsBool.findMatches();
const myjsObjProp = new htmlCode(jsBoolClass, jsObjProp, jsObjPropClass, 1);
myjsObjProp.findMatches();
const myjsKeywords = new htmlCode(jsObjPropClass, jsKeywords, jsKeywordsClass, 5);
myjsKeywords.findMatches();
const myjsFx = new htmlCode(jsKeywordsClass, jsFx, jsFxClass, 6);
myjsFx.findMatches();
const mySingleQt = new htmlCode(jsFxClass, singleQt, singleQtClass, 2);
mySingleQt.findMatches();
const mybackTicks = new htmlCode(singleQtClass, backTicks, backTicksClass, 2);
mybackTicks.findMatches();
const myHtmlDblQuotes = new htmlCode(backTicksClass, dblQuote, DblQuotesClass, 2);
myHtmlDblQuotes.findMatches();

/* End JavaScript classes */

DblQuotesClass.forEach(codeLine => {
  darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";

  /* Use the line below as a visual check for the colors before doing all the work to format the final code for your pre block: */

  // darkBlockOutput.innerHTML += '<li><span>' + `${codeLine}` + "</span></li>";
})

/* Start JSON classes */
/*
const myjsonValDblQt = new htmlCode(convertedCode, jsonValDblQt, jsonValDblQtClass, 2);
myjsonValDblQt.findMatches();
const myjsonProp = new htmlCode(jsonValDblQtClass, jsonProp, jsonPropClass, 0);
myjsonProp.findMatches();
const myjsonNumBool = new htmlCode(jsonPropClass, jsonNumBool, jsonNumBoolClass, 1);
myjsonNumBool.findMatches();
*/
/* End JSON classes */


/* Start PHP classes */

/* End PHP classes */


/* Start Markdown classes */

/* End Markdown classes */

/* Step 5: Output your code to the DOM - I will need a switch statement here
   to attach the final output array for  
*/


/* 
*
 for LIGHT code block, you need to use the classes constant 
 that is commented out and comment out the other one 
 and use lightBlockOutput as your output point to the DOM
*
*/

/*
DblQuotesClass.forEach(codeLine => {
  lightBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
})
*/ 