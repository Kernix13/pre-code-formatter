const darkBlockOutput = document.getElementById("dark_block_output");
const lightBlockOutput = document.getElementById("light_block_output");

// span tag color classes, and keywords
const classesDark = ["green", "blue", "light-blue", "white", "comment", "red", "purple", "orange"]
const classesLight = ["green2", "blue2", "light-blue2", "gray", "comment2", "red2", "purple2", "orange2", "black"]
const cssUOMs = [`px`, `ex`, `em`, `rem`, `%`, `vw`, `vh`, `vmin`, `vmax`, `ch`];

// Global Regular Expressions
const dblQuote = /(&quot;[.\w/:*?-]*\w&quot;)/g;
const singleQt = /(&apos;[.\w/:*?-]*\w&apos;)/g;
const comments = /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g;

// HTML Regular Expressions
const htmlAttr = /([\w-]*)(?==)/g;
const htmlComment = /(&lt;!--\s[\w\s]*\s--&gt;)/g;
const htmlTag = /(?<=&lt;\/*)([\w]*)/g;
const htmlBoolAttr = /(\s\w*)(?=&gt;)/g; // need to have it right on > or &gt;
const htmlRegEx = [htmlAttr, htmlComment, htmlTag, htmlBoolAttr, dblQuote];

// CSS Regular Expressions
const cssIdClass = /(?<=[#\.])([^\d][a-zA-Z_-\d]*)/g; // DONE
const cssProp = /([a-z-]*):/g; // DONE
const cssFxName = /([\w]{3})(?=\()/g; // DONE
const cssUnits = /(?<=\d)(em|rem|vh|vw|px|%|ch|ex|vmin|vmax)/g; // DONE
const cssTag = /([a-z1-6]*)(?=[,.\s])/g; // almost
const cssRegEx = [cssIdClass, cssProp, cssFxName, cssUnits, cssTag, dblQuote, singleQt]

// SASS/SCSS Regular Expressions

// JavaScript Regular Expressions
const backTicks = /`(.*?)`/g;

// JSX Regular Expressions

// JSON Regular Expressions

// PHP Regular Expressions

// Step 1: the code to convert (need something better)
const inputHtml = [`<p id="something" class="test" required>words here</p>`, `<title>Code Formatter</title>`, `<img class="test-img" src="./img/file.jpeg">`, `<!-- Example comment goes here -->`, ];
const inputCss = [
`li a,`,
`.bem__class--name1,`,
`p.card`,
`h1 {`,
`  font-family: 'Times New Roman', Times, serif;`,
`  font-size: 20vmin;`
`  color: hsl(0, 100%, 50%);`
];
const inputJs = [];
const inputJsx = [];
const inputJson = [];
const inputPhp = [];

// Step 2: convert reserved characters into HTML entities
function convertReserved(str) {
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

// Step 3: Convert your array of code strings
let convertedArr = [];

function convertCode(arr) {
  arr.forEach(str => {
    let convertedLine = convertReserved(str);
    convertedArr.push(`${convertedLine}`);
  })
}
convertCode(inputHtml);
// convertCode(inputCss);


// Step 4: add span color classes to converted code for the 4 HTML scenarios
let {HtmlAttrClass, HtmlCommentClass} = [];
// let HtmlCommentClass = [];
let HtmlTagClass = [];
let HtmlBoollClass = [];
let DblQuotesClass = [];
let css = [];

class htmlCode {
  constructor(arr, regex, lineArray, index) {
    this.arr = arr;
    this.regex = regex;
    this.lineArray = lineArray;
    this.index = index;
  }

  // How do I use removeDups()? As a get or set?

  findMatches() {
    this.arr.forEach(line => {

      const htmlStrings = [`<span class="${classesDark[this.index]}"></span>`, `<span class="${classesDark[this.index]}">${'$1'}</span>`];

      if (line.match(this.regex)) {
        const result = line.replace(this.regex, htmlStrings[1]);
        return this.lineArray.push(result);
      } else {
        return this.lineArray.push(line);
      }

      // return this.lineArray.push(result);
    })
  }
}

/* Start HTML classes */
const myHtmlAttr = new htmlCode(convertedArr, htmlAttr, HtmlAttrClass, 1);
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

// CSS
// const cssTry = new htmlCode(convertedArr, cssTag, css, 0);
// cssTry.findMatches();

// css.forEach(codeLine => {
//   darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
// })


/* 
Getting EMPTY span.color tags though the output works (my capture groups?)
My attempt at slicing the dups out but it's only grabbing the last code line 
-> REMOVED THAT CODE BLOCK, removeDups()
*/
