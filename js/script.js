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
const htmlRegEx = [htmlAttr, htmlComment, htmlTag, htmlBoolAttr, htmlEntity, dblQuote];

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
const jsFx = /([\w]*[^\(\s])(?=\()/g;
const jsNumDate = /(Math|Date|Number|BigInt)(?=\(|\.)/g;
const jsObjProp = /([\w]*)(?=:)/g;
const jsBool = /(true|false|null|undefined)/g;
const jsEqual = /(=&gt;|=|!=|!==|==|===|\+=|\*=|\/=|-=)/g;
const jsKeywords = /(?<=\(?)(typeof|async|await|break|case|catch|class|const|default|delete|do|else|extends|for|from|function|get|if|import|in|let|new|of|return|set|switch|throw|try|while)(?=\s)/g;
const jsRegEx = [jsEqual, jsNumDate, jsBool, jsObjProp, jsKeywords, jsFx, singleQt, dblQuote, comments];

// JSON Regular Expressions
const jsonValDblQt = /(&quot;[.\s\w/*#?-]*&quot;)(?!:)/g;
const jsonProp = /(&quot;[.\w\/:*\{\s?-]*\w&quot;)(?=:\s)/g;
const jsonNumBool = /([\d]*|true|false|null)(?=[,\]])/g;
const jsonRegEx = [jsonValDblQt, jsonProp, jsonNumBool];

// PHP Regular Expressions
const phpCustomFx = /(?!\()([\w]*)(?=\s\{)/g; // canst isolate new instance
const phpHtmlTag = /(?<=&lt;\/*|!)([a-zA-Z1-6?]*)/g; // not getting closing ?
const phpKeywords = /(?<=\(?)(while|new|array|echo|endwhile|else|elseif|class|function|return|break|catch|continue|default|endfor|endforeach|enum|eval|exit|extends|final|finally|foreach|instanceof|insteadof|match|namespace|require|static|switch|throw|try)(?=\s)/g;
const phpRegEx = [htmlAttr, phpCustomFx, phpHtmlTag, phpKeywords, jsFx, singleQt, dblQuote, comments];

// JSX Regular Expressions

// Markdown Regular Expressions
const mdHeadings = /([#]{1,6}[\s]{1}[\s\w]*)(?<!\n)/g;
const mdLinks = /(?!\[)([\w\s?\^?]*)(?=\])/g;
const mdBlockQt = /(^&gt;(?:[\t ]*&gt;)*[\w\s]*)/gm;
const mdDiffMinus = /(\+\s[\w\s]*)/gm
const mdDiffPlus = /(\+\s[\w\s]*)/g
const mdLists = /([\d]\.)/g;
const mdRegEx = [htmlAttr, htmlComment, htmlTag, htmlEntity, singleQt, dblQuote, mdHeadings, mdLinks, mdBlockQt, mdDiffMinus, mdDiffPlus, mdLists];

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
// convertCode(myHtml);
// convertCode(myCss);
// convertCode(mySass);
// convertCode(myJs);
// convertCode(myJson);
// convertCode(myPhp);
convertCode(myMd);

// Step 3b: Output the HTML entities if you want to stop there
convertedCode.forEach(codeLine => {
  htmlEntities.textContent += '<li>' + `${codeLine}` + "</li>";
})

// Step 4: add span color classes to converted code for the RegEx scenarios
/* HOW DO I DO THIS DIFFERENTLY? Nested map, nested for loop, recursion? */
let DblQuotesClass = []; let singleQtClass = []; let commentsClass = [];

let HtmlAttrClass = []; let HtmlCommentClass = []; let HtmlTagClass = []; let HtmlBoollClass = []; let htmlEntityClass = [];

let cssPropClass = []; let cssFxNameClass = []; let cssUnitsClass = []; let cssAtRulesClass = []; let cssVarsClass = []; let cssClassIdClass = []; let cssTagClass = [];

let sassPropClass = []; let sassVarsClass = []; let sassClassClass = [];

let jsonPropClass = []; let jsonValDblQtClass = []; let jsonNumBoolClass = [];

let jsKeywordsClass = []; let jsNumClass = []; let jsFxClass = []; let jsNumDateClass = []; let jsObjPropClass = []; let jsBoolClass = []; let jsEqualClass = []; let backTicksClass = [];

let phpCustomFxClass = []; let phpHtmlTagClass = []; let phpKeywordsClass = []; let mdListsClass = [];

// const mdRegEx = [htmlAttr, mdHeadings, htmlComment, htmlTag, singleQt, dblQuote,];
let mdHeadingsClass = []; let mdLinksClass = []; let mdBlockQtClass = []; let mdDiffPlusClass = []; let mdDiffMinusClass = [];

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
      const htmlString = `<span class="${classes[this.index]}">${'$1'}</span>`;

      const result = line.replace(this.regex, htmlString);

      return this.lineArray.push(result);
    })
  }
}

/* Start HTML classes */
/*
const myHtmlAttr = new htmlCode(convertedCode, htmlAttr, HtmlAttrClass, 1);
myHtmlAttr.findMatches();
const myHtmlComment = new htmlCode(HtmlAttrClass, htmlComment, HtmlCommentClass, 3);
myHtmlComment.findMatches();
const myHtmlTags = new htmlCode(HtmlCommentClass, htmlTag, HtmlTagClass, 0);
myHtmlTags.findMatches();
const myHtmlBoolAttr = new htmlCode(HtmlTagClass, htmlBoolAttr, HtmlBoollClass, 1);
myHtmlBoolAttr.findMatches();
const myHtmlEntity = new htmlCode(HtmlBoollClass, htmlEntity, htmlEntityClass, 4);
myHtmlEntity.findMatches();
const myHtmlDblQuotes = new htmlCode(htmlEntityClass, dblQuote, DblQuotesClass, 2);
myHtmlDblQuotes.findMatches();
*/
/* End HTML classes */

/* Start CSS classes */
/* 
const myCssProp = new htmlCode(convertedCode, cssProp, cssPropClass, 1);
myCssProp.findMatches();
const mCssComments = new htmlCode(cssPropClass, comments, commentsClass, 3);
mCssComments.findMatches();
const myCssFx = new htmlCode(commentsClass, cssFxName, cssFxNameClass, 5);
myCssFx.findMatches();
const myCssUnits = new htmlCode(cssFxNameClass, cssUnits, cssUnitsClass, 4);
myCssUnits.findMatches();
const myCssAt = new htmlCode(cssUnitsClass, cssAtRules, cssAtRulesClass, 4);
myCssAt.findMatches();
const myCssVars = new htmlCode(cssAtRulesClass, cssVariables, cssVarsClass, 6);
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
const mySassComments = new htmlCode(sassPropClass, comments, commentsClass, 3);
mySassComments.findMatches();
const mySassFx = new htmlCode(commentsClass, cssFxName, cssFxNameClass, 5);
mySassFx.findMatches();
const mySassUnits = new htmlCode(cssFxNameClass, cssUnits, cssUnitsClass, 4);
mySassUnits.findMatches();
const mySassAt = new htmlCode(cssUnitsClass, cssAtRules, cssAtRulesClass, 4);
mySassAt.findMatches();
const mySassVars = new htmlCode(cssAtRulesClass, sassVars, sassVarsClass, 6);
mySassVars.findMatches();
const mySingleQt = new htmlCode(sassVarsClass, singleQt, singleQtClass, 2);
mySingleQt.findMatches();
// const mySassClass = new htmlCode(singleQtClass, sassClass, sassClassClass, 2);
// mySassClass.findMatches();
*/
/* End SASS/SCSS classes */

/* Start JavaScript classes */
/*
const myjsEqual = new htmlCode(convertedCode, jsEqual, jsEqualClass, 1);
myjsEqual.findMatches();
const myjsNumDate = new htmlCode(jsEqualClass, jsNumDate, jsNumDateClass, 6);
myjsNumDate.findMatches();
const myjsBool = new htmlCode(jsNumDateClass, jsBool, jsBoolClass, 1);
myjsBool.findMatches();
const myjsObjProp = new htmlCode(jsBoolClass, jsObjProp, jsObjPropClass, 1);
myjsObjProp.findMatches();
const myjsKeywords = new htmlCode(jsObjPropClass, jsKeywords, jsKeywordsClass, 4);
myjsKeywords.findMatches();
const myjsFx = new htmlCode(jsKeywordsClass, jsFx, jsFxClass, 5);
myjsFx.findMatches();
const mySingleQt = new htmlCode(jsFxClass, singleQt, singleQtClass, 2);
mySingleQt.findMatches();
const myHtmlDblQuotes = new htmlCode(singleQtClass, dblQuote, DblQuotesClass, 2);
myHtmlDblQuotes.findMatches();
const myjsComments = new htmlCode(DblQuotesClass, comments, commentsClass, 3);
myjsComments.findMatches();
*/
/* End JavaScript classes */

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
/*
const myHtmlAttr = new htmlCode(convertedCode, htmlAttr, HtmlAttrClass, 1);
myHtmlAttr.findMatches();
const myphpCustomFx = new htmlCode(HtmlAttrClass, phpCustomFx, phpCustomFxClass, 6);
myphpCustomFx.findMatches();
const myphpHtmlTag = new htmlCode(phpCustomFxClass, phpHtmlTag, phpHtmlTagClass, 0);
myphpHtmlTag.findMatches();
const myphpKeywords = new htmlCode(phpHtmlTagClass, phpKeywords, phpKeywordsClass, 4);
myphpKeywords.findMatches();
const myjsFx = new htmlCode(phpKeywordsClass, jsFx, jsFxClass, 5);
myjsFx.findMatches();
const mysingleQt = new htmlCode(jsFxClass, singleQt, singleQtClass, 2);
mysingleQt.findMatches();
const myHtmlDblQuotes = new htmlCode(singleQtClass, dblQuote, DblQuotesClass, 2);
myHtmlDblQuotes.findMatches();
const myjsBool = new htmlCode(DblQuotesClass, jsBool, jsBoolClass, 1);
myjsBool.findMatches();
// const myjsComments = new htmlCode(jsBoolClass, comments, commentsClass, 3);
// myjsComments.findMatches();
*/
/* End PHP classes */

/* Start Markdown classes */

const myHtmlAttr = new htmlCode(convertedCode, htmlAttr, HtmlAttrClass, 1);
myHtmlAttr.findMatches();
const myHtmlComment = new htmlCode(HtmlAttrClass, htmlComment, HtmlCommentClass, 3);
myHtmlComment.findMatches();
const myHtmlTags = new htmlCode(HtmlCommentClass, htmlTag, HtmlTagClass, 0);
myHtmlTags.findMatches();
const myHtmlEntity = new htmlCode(HtmlTagClass, htmlEntity, htmlEntityClass, 4);
myHtmlEntity.findMatches();
const mysingleQt = new htmlCode(htmlEntityClass, singleQt, singleQtClass, 2);
mysingleQt.findMatches();
const myHtmlDblQuotes = new htmlCode(singleQtClass, dblQuote, DblQuotesClass, 2);
myHtmlDblQuotes.findMatches();
const myMdHeadings = new htmlCode(DblQuotesClass, mdHeadings, mdHeadingsClass, 1);
myMdHeadings.findMatches();
const myMdLinks = new htmlCode(mdHeadingsClass, mdLinks, mdLinksClass, 2);
myMdLinks.findMatches();
const myMdBlockQt = new htmlCode(mdLinksClass, mdBlockQt, mdBlockQtClass, 0);
myMdBlockQt.findMatches();
const myMdDiffMinus = new htmlCode(mdBlockQtClass, mdDiffMinus, mdDiffMinusClass, 4);
myMdDiffMinus.findMatches();
const myMdDiffPlus = new htmlCode(mdDiffMinusClass, mdDiffPlus, mdDiffPlusClass, 0);
myMdDiffPlus.findMatches();
const myMdLists = new htmlCode(mdDiffPlusClass, mdLists, mdListsClass, 6);
myMdLists.findMatches();

/* End Markdown classes */

/* Step 5: Output your code to the DOM - I will need a switch statement here
   to attach the final output array for */
mdListsClass.forEach(codeLine => {
  // darkBlockOutput.textContent += '<li>' + `${codeLine}` + "</li>";

  /* Use the line below as a visual check for the colors before doing all the work to format the final code for your pre block: */

  darkBlockOutput.innerHTML += '<li>' + `${codeLine}` + "</li>";
  
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