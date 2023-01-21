const darkBlockOutput = document.getElementById("dark_block_output");
const lightBlockOutput = document.getElementById("light_block_output");

// span tag color classes, and keywords
const classes = ["green", "blue", "light-blue", "white", "comment", "red", "purple", "orange"]
// const classes = ["maroon", "blue2", "green2", "light-blue2", "gray", "comment2", "red2", "purple2", "orange2", "black"];

// Global Regular Expressions
const dblQuote = /(&quot;[.\w\/:*?-]*\w&quot;)/g;
const singleQt = /(&apos;[.\w/:*?-]*\w&apos;)/g;
const comments = /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g;

// HTML Regular Expressions
const htmlAttr = /([\w-]*)(?==)/g;
const htmlComment = /(&lt;!--\s[\w\s]*\s--&gt;)/g;
const htmlTag = /(?<=&lt;\/*|!)([a-zA-Z1-6]*)/g;
const htmlBoolAttr = /(\s\w*)(?=&gt;)/g; // need to have it right on > or &gt;
const htmlRegEx = [htmlAttr, htmlComment, htmlTag, htmlBoolAttr, dblQuote];

// CSS Regular Expressions
const cssIdClass = /(?<=[#\.])([^\d][a-zA-Z_-\d]*)/g;
const cssProp = /([a-z-]*):/g;
const cssVariables = /([-]{2}[a-z-]*)/g;
const cssFxName = /([\w]{3})(?=\()/g;
const cssUnits = /(?<=\d)(em|rem|vh|vw|px|%|ch|ex|vmin|vmax)/g;
const cssAtRules = /([@][a-z-]*|!important)/g;
const cssTag = /[]/g; // FUCK!
const cssRegEx = [comments, cssIdClass, cssProp, cssFxName, cssUnits, cssAtRules, cssVariables, dblQuote, singleQt];

// SASS/SCSS Regular Expressions

// JavaScript Regular Expressions
const backTicks = /`(.*?)`/g;

// JSX Regular Expressions

// JSON Regular Expressions
const jsonProp = /(&quot;[.\w\/:*\{\s?-]*\w&quot;):/g;
const jsonRegEx = [jsonProp, dblQuote];

// PHP Regular Expressions

// Step 1: Add each line of code to an array (for now)
const input = [`<p id="something" class="test" required>words here</p>`, `<title>Code Formatter</title>`, `<img class="test-img" src="./img/file.jpeg">`, `<!-- Example comment goes here -->`, ];

const inputJs = [];
const inputJsx = [];
const inputJson = [];
const inputPhp = [];

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

// Step 3: Run your code through convertReservedChars() 
let convertedCode = [];

function convertCode(arr) {
  arr.forEach(str => {
    let convertedLine = convertReservedChars(str);
    convertedCode.push(`${convertedLine}`);
  })
}
convertCode(input);
// convertCode(inputCss);


// Step 4: add span color classes to converted code for the 4 HTML scenarios
/* HOW DO I DO THIS DIFFERENTLY, WITH ONLY 2 EMPTY ARRAYS OR NO EMPTY ARRAYS AT ALL - OR HOW DO I RUN EACH LINE THRU ALL CHECKS AND THEN MOVE TO NEXT LINE */
let HtmlAttrClass = [];
let HtmlCommentClass = [];
let HtmlTagClass = [];
let HtmlBoollClass = [];
let DblQuotesClass = [];
let css = [];
let output = [];

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
DblQuotesClass.forEach(codeLine => {
  darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
})



/* 
Getting EMPTY span.color tags though the output works (my capture groups?)
My attempt at slicing the dups out but it's only grabbing the last code line 
-> REMOVED THAT CODE BLOCK, removeDups()
*/
