const darkBlockOutput = document.getElementById("dark_block_output");
const lightBlockOutput = document.getElementById("light_block_output");

// span tag color classes
const classesDark = ["green", "blue", "light-blue", "white", "comment", "red", "purple", "orange"]
const classesLight = ["green2", "blue2", "light-blue2", "gray", "comment2", "red2", "purple2", "orange2", "black"]
// preliminary keywords by language
const cssUOMs = [`px`, `ex`, `em`, `rem`, `%`, `vw`, `vh`, `vmin`, `vmax`, `ch`];
const jsKWs = ['const', 'function', 'return', 'switch', 'case', 'break', 'default', 'class', 'if', 'else', 'new'];
const phpKWs = ['function', 'class', 'if', 'else', 'AND', 'OR', 'return', 'new']

// Global Regular Expressions
const dblQuote = /(&quot;[.\w/:*?-]*\w&quot;)/g;
const singleQt = /(&apos;[.\w/:*?-]*\w&apos;)/g;
const comments = /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g;

// HTML Regular Expressions
const htmlTag = /(?<=&lt;\/*)([\w]*)/g;
const htmlAttr = /([\w-]*)(?==)/g;
const htmlBoolAttr = /(\s\w*)(?=&gt;)/g; // need to have it right on > or &gt;
const htmlComment = /(&lt;!--\s[\w\s]*\s--&gt;)/g;

// CSS Regular Expressions
const idClassSelector = /([#\.][^\d][a-zA-Z_-\d]*)/g; // DONE
const tagSelector = /([a-z1-6]*)(?=[,.\s])/g; // almost
const cssProp = /[]/g;
const cssFunctionName = /[]/g;
// const cssStrValue = /[]/g;
// const cssNumValue = /[]/g;

// SASS/SCSS Regular Expressions

// JavaScript Regular Expressions
const backTicks = /`(.*?)`/g;

// JSX Regular Expressions

// JSON Regular Expressions

// PHP Regular Expressions

// Step 1: the code to convert (need something better)
const input = [`<p id="something" class="test" required>words here</p>`, `<title>Code Formatter</title>`, `<img class="test-img" src="./img/file.jpeg">`, `<!-- Example comment goes here -->`, ];
const codeToConvert = [
`blockquote,`,
`h1 {`,
`  font-family: 'Times New Roman', Times, serif;`
];

// Step 2: convert reserved characters into HTML entities
function convertHTML(str) {
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

// Step 3: Convert your code to HTML entities
let convertedArr = [];
input.forEach(line => {
  let convertedLine = convertHTML(line);
  convertedArr.push(`${convertedLine}`);
});

let convertedArr2 = [];
codeToConvert.forEach(line => {
  let convertedLine = convertHTML(line);
  convertedArr2.push(`${convertedLine}`);
});
console.log(convertedArr2)

// Step 4: add span color classes to converted code for the 4 HTML scenarios
let darkHtmlAttr = [];
let darkHtmlTag = [];
let darkHtmlBoollAttr = [];
let darkHtmlDblQuotes = [];
let darkHtmlComment = [];
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
      const result = line.replace(this.regex, htmlStrings[1]);

      return this.lineArray.push(result);
    })
  }
}

// Have to do Attributes first because the span tags have classes
const myHtmlAttr = new htmlCode(convertedArr, htmlAttr, darkHtmlAttr, 1);
myHtmlAttr.findMatches();

const myHtmlComment = new htmlCode(darkHtmlAttr, htmlComment, darkHtmlComment, 4);
myHtmlComment.findMatches();

const myHtmlTags = new htmlCode(darkHtmlComment, htmlTag, darkHtmlTag, 0);
myHtmlTags.findMatches();

const myHtmlBoolAttr = new htmlCode(darkHtmlTag, htmlBoolAttr, darkHtmlBoollAttr, 1);
myHtmlBoolAttr.findMatches();

const myHtmlDblQuotes = new htmlCode(darkHtmlBoollAttr, dblQuote, darkHtmlDblQuotes, 2);
myHtmlDblQuotes.findMatches();

// CSS
const cssTry = new htmlCode(convertedArr2, tagSelector, css, 0);
cssTry.findMatches();

// Step 5: Output the code to the DOM
// darkHtmlDblQuotes.forEach(codeLine => {
//   darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
// })
css.forEach(codeLine => {
  darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
})

console.log(darkHtmlDblQuotes[0].includes(`<span class="green"></span>`))
console.log(darkHtmlDblQuotes[0].includes(`<span class="blue"></span>`))
console.log(darkHtmlDblQuotes[0].includes(`<span class="light-blue"></span>`))

/* 
Getting EMPTY span.color tags though the output works (my capture groups?)
My attempt at slicing the dups out but it's only grabbing the last code line 
-> REMOVED THAT CODE BLOCK, removeDups()
*/
