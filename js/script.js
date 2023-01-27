const htmlEntities = document.getElementById("html_entities");
const darkBlockOutput = document.getElementById("dark_block_output");
const lightBlockOutput = document.getElementById("light_block_output");

// span tag color classes, and keywords
const classes = ["green", "blue", "light-blue", "comment", "red", "purple", "orange"]

// Global Regular Expressions
const dblQuote = /(&quot;[.\s\w\/:*#?-]*&quot;)/g;
const singleQt = /(&apos;[=,.\w\s/:*?-]*&apos;)/g;
const comments = /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g;

// HTML Regular Expressions
const htmlAttr = /([\w-]*)(?==)/g;
const htmlComment = /(&lt;!--\s[\w\s\W]*\s--&gt;)/g;
const htmlTag = /(?<=&lt;\/*)([a-zA-Z1-6]*)/g;
const htmlBoolAttr = /(\s\w*)(?=&gt;)/g; // need to have it right on > or &gt;
const htmlEntity = /(&amp;#[\d]*;)/g;
const htmlRegEx = [[htmlAttr, 1], [htmlComment, 3], [htmlTag, 0], [htmlBoolAttr, 1], [htmlEntity, 4], [dblQuote, 2]];

// CSS Regular Expressions
const cssProp = /(?<![;=\w])([a-z-]*)(?=:\s)/g;
const cssFxName = /([\w-]{3,})(?=\()/g;
const cssUnits = /(?<=\d)(em|rem|vh|vw|px|%|ch|ex|vmin|vmax)/g;
const cssAtRules = /([@][a-z-]*|!important|!default)/g;
const cssVariables = /([\s\(?][-]{2}[a-zA-Z-]*)/g;
const cssClassId = /(?<=[\.:])([^\d][a-zA-Z_-\d]*)/g; // problems
// const cssRegEx = [cssProp, comments, cssFxName, cssUnits, cssAtRules, cssVariables, singleQt];
const cssRegEx = [[cssProp, 1], [comments, 3], [cssFxName, 5], [cssUnits, 4], [cssAtRules, 4], [cssVariables, 6], [singleQt, 2], [cssClassId, 1]];

// SASS/SCSS Regular Expressions
const sassProp = /(?<![;=\w$-])([a-z-]*)(?=:\s)/g;
const sassVars = /([$]{1}[\w-]*)/g;
const sassRegEx = [[sassProp, 1], [comments, 3], [cssFxName, 5], [cssUnits, 4], [cssAtRules, 4], [sassVars, 6], [singleQt, 2]];

// JavaScript Regular Expressions
const jsFx = /([\w]*[^\(\s])(?=\()/g;
const jsNumDate = /(Math|Date|Number|BigInt)(?=\(|\.)/g;
const jsObjProp = /([\w]*)(?=:)/g;
const jsBool = /(true|false|null|undefined)/g;
const jsEqual = /(=&gt;|=|!=|!==|==|===|\+=|\*=|\/=|-=)/g;
const jsKeywords = /(?<=\(?)(typeof|async|await|break|case|catch|class|const|default|delete|do|else|extends|for|from|function|get|if|import|in|let|new|of|return|set|switch|throw|try|while)(?=\s)/g;
const jsRegEx = [[jsEqual, 1], [jsNumDate, 6], [jsBool, 1], [jsObjProp, 1], [jsKeywords, 4], [jsFx, 5], [singleQt, 2], [dblQuote, 2], [comments, 3]];

// JSON Regular Expressions
const jsonValDblQt = /(&quot;[.\s\w/*#?-]*&quot;)(?!:)/g;
const jsonProp = /(&quot;[.\w\/:*\{\s?-]*\w&quot;)(?=:\s)/g;
const jsonNumBool = /([\d]*|true|false|null)(?=[,\]])/g;
const jsonRegEx = [[jsonValDblQt, 2], [jsonProp, 0], [jsonNumBool, 1]];

// PHP Regular Expressions
const phpCustomFx = /(?!\()([\w]*)(?=\s\{)/g; // canst isolate new instance
const phpHtmlTag = /(?<=&lt;\/*|!)([a-zA-Z1-6?]*)/g; // not getting closing ?
const phpKeywords = /(?<=\(?)(while|new|array|echo|endwhile|else|elseif|class|function|return|break|catch|continue|default|endfor|endforeach|enum|eval|exit|extends|final|finally|foreach|instanceof|insteadof|match|namespace|require|static|switch|throw|try)(?=\s)/g;
const phpRegEx = [[htmlAttr, 1], [phpCustomFx, 6], [phpHtmlTag, 0], [phpKeywords, 4], [jsFx, 5], [singleQt, 2], [dblQuote, 2], [jsBool, 1]];

// Markdown Regular Expressions
const mdHeadings = /([#]{1,6}[\s]{1}[\s\w]*)(?<!\n)/g;
const mdLinks = /(?!\[)([\w\s?\^?]*)(?=\])/g;
const mdBlockQt = /(^&gt;(?:[\t ]*&gt;)*[\w\s]*)/gm;
const mdDiffMinus = /(\+\s[\w\s]*)/gm
const mdDiffPlus = /(\+\s[\w\s]*)/g
const mdLists = /([\d]\.)/g;
const mdRegEx = [[htmlAttr, 1], [htmlComment, 3], [htmlTag, 0], [htmlEntity, 4], [singleQt, 2], [dblQuote, 2], [mdHeadings, 1], [mdLinks, 2], [mdBlockQt, 0], [mdDiffMinus, 4], [mdDiffPlus, 0], [mdLists, 6]];

// JSX Regular Expressions

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

const myInput = input.split(/[\n]/);
const myText = inputText.split(/[\n\r]|[\n]/g);
const myHtml = inputHTML.split(/[\n\r]|[\n]/g);
const myCss = inputCSS.split(/[\n\r]|[\n]/g);
const mySass = inputSASS.split(/[\n\r]|[\n]/g);
const myJs = inputJS.split(/[\n\r]|[\n]/g);
const myJson = inputJSON.split(/[\n\r]|[\n]/g);
const myPhp = inputPHP.split(/[\n\r]|[\n]/g);
const myMd = inputMD.split(/[\n\r]|[\n]/g);

let convertedCode = [];

function convertCode(arr) {
  arr.forEach(str => {
    let convertedLine = convertReservedChars(str);
    convertedCode.push(`${convertedLine}`);
  })
}
// convertCode(myInput);


// Step 3b: Output the HTML entities if you want to stop there
convertedCode.forEach(codeLine => {
  htmlEntities.textContent += '<li>' + `${codeLine}` + "</li>";
})

// Step 4: add span color classes to converted code for the RegEx scenarios

let finishedArr = [];

class htmlCode {
  constructor(regexArr) {
    this.regexArr = regexArr;
  }

  findMatches() {
    let str = convertedCode.join("~");
    let str2 = "";
    this.regexArr.forEach(([regex, index]) => {
      const htmlStrings = `<span class="${classes[index]}">${'$1'}</span>`;
      str2 = str.replaceAll(regex, htmlStrings);
      str = str2;
      
    })
    finishedArr = str.split("~");
  }
}

// Choose the correct RegEx array depending on myInput 
const myInputOutput = new htmlCode(htmlRegEx);
myInputOutput.findMatches();

/* Function to create the language classes from input.js  */
function createClass(input, arr) {
  convertCode(input);
  const classOutput = new htmlCode(arr);
  return classOutput.findMatches();
}

/* add the regex for the language from inputText in input.js */
// createClass(myText, htmlRegEx) 

/* Uncomment the language you want to run */
createClass(myHtml, htmlRegEx);
// createClass(myCss, cssRegEx);
// createClass(mySass, sassRegEx);
// createClass(myJson, jsonRegEx);
// createClass(myJs, jsRegEx);
// createClass(myPhp, phpRegEx);
// createClass(myMd, mdRegEx);


/* Step 5: Output your code to the DOM */
finishedArr.forEach((codeLine, i) => {
  darkBlockOutput.textContent += '<li><span data-line="' + `${i + 1}` + '">' + `${codeLine}` + "</span></li>";

  /* Use the line below as a visual check for the colors before doing the work to format the final code for your pre block: */

  // darkBlockOutput.innerHTML += '<li>' + `${codeLine}` + "</li>";
  
})

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