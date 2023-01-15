const darkBlockOutput = document.getElementById("dark_block_output");
const lightBlockOutput = document.getElementById("light_block_output");

const classes = ["white", "light-blue", "blue", "lime-green", "comment", "red", "purple", "orange", "black"]
const jsKeys = ['const', 'function', 'return', 'switch', 'case', 'break', 'default'];

// For now I'm adding lines to an array - need to find something better
const input = [`<p id="something" class="test" required>words here</p>`, `<title>Code Formatter</title>`, `<img class="test-img" src="./img/file.jpeg">`];
const codeToConvert = [`<p id="value-one" class="value-one">words here</p>`]

// HTML Regular Expressions
const htmlTag = /(?<=&lt;\/*)([\w]*)/g;
const htmlAttr = /([\w-]*)(?==)/g;
const htmlBoolAttr = /(\s\w*)(?=&gt;)/g; // need to have it right on > or &gt;
const dblQuote = /(&quot;[.\w\/:*?-]*\w&quot;)/g;

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

// Convert your code to HTML entities
let convertedArr = [];
input.forEach(line => {
  let convertedLine = convertHTML(line);
  convertedArr.push(`${convertedLine}`);
});
// console.log(convertedArr)

/* HTML */
let result = []; // tags
let lineArr = [];
const str1 = `<span class="lime-green"></span>`;

let result2 = []; // attributes
let lineArr2 = [];
const str2 = `<span class="blue"></span>`;

let result3 = []; // boolean attributes
let lineArr3 = [];

let result4 = []; // double quotes
let lineArr4 = [];
const str4 = `<span class="light-blue"></span>`;

let repeatLen = "";
let repeatInd = "";
let preNewLine = "";
let postNewLine = "";
let newLine = "";
let newLineArr = [];

function htmlOutput(arr) {
  arr.forEach(line => {

  // Tag styling (getting an extra span.lime-green for lines with 2 tags)
  result = line.replace(htmlTag, `<span class="${classes[3]}">${'$1'}</span>`);
  lineArr.push(line.replace(htmlTag, `<span class="${classes[3]}">${'$1'}</span>`));

  // Attribute styling (2 extra span.blue)
  result2 = line.replace(htmlAttr, `<span class="${classes[2]}">${'$1'}</span>`);
  lineArr2.push(line.replace(htmlAttr, `<span class="${classes[2]}">${'$1'}</span>`));

  // Boolean Attribute styling
  result3 = line.replace(htmlBoolAttr, `<span class="${classes[2]}">${'$1'}</span>`);
  lineArr3.push(line.replace(htmlBoolAttr, `<span class="${classes[2]}">${'$1'}</span>`));

  // Double-quote styling: the only one without an extra & empty span tag
  result4 = line.replace(dblQuote, `<span class="${classes[1]}">${'$1'}</span>`);
  lineArr4.push(line.replace(dblQuote, `<span class="${classes[1]}">${'$1'}</span>`));

  // removeDups(lineArr, str1)
  removeDups(lineArr2, str2)

  // Do I need to actually return these since I am pushing to global vars?
  return result, result2, result3, result4, lineArr, lineArr2, lineArr3, lineArr4;
  });
}
htmlOutput(convertedArr)

console.log(lineArr2)

function removeDups(arr, str) {
  arr.forEach(line => {
    // console.log(line)
    if (line.includes(str)) {
      repeatLen = str.length
      repeatInd = line.indexOf(str)
      console.log(repeatInd)
      preNewLine = line.slice(0, repeatInd)
      postNewLine = line.slice(repeatInd + repeatLen)
      newLine = `${preNewLine}${postNewLine}`
    } else {
      newLine = line;
    }
  })
  newLineArr.push(newLine)
}

newLineArr.forEach(codeLine => {
  darkBlockOutput.textContent += '<li><span>' + `${codeLine}` + "</span></li>";
})

convertedArr.forEach(line => {
  if (line.match(dblQuote)) {
    // console.log(line.match(dblQuote))
    result = line.replace(dblQuote, `<span class="light-blue2">${line.match(dblQuote)}</span>`);
  } else {
    result = line;
  }

  lightBlockOutput.textContent += '<span>' + `${result2}` + "</span>";
});

