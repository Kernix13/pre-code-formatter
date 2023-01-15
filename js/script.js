const darkBlockOutput = document.getElementById("dark_block_output");
const lightBlockOutput = document.getElementById("light_block_output");

const languages = ["html", "css", "javascript", "php", "markdown"];
const classes = ["white", "light-blue", "blue", "lime-green", "comment", "red", "purple", "orange", "black"]

// For now I'm adding lines to an array - need to find something better
const input = [`<p id="something" class="test">words here</p>`, `<title>Code Formatter</title>`, `<img class="test-img" src="./img/file.jpeg">`];
const codeToConvert = [`<p id="value-one" class="value-one">words here</p>`]

// Regular Expressions
const htmlTag = /(?<=&lt;\/*)([\w]*)/g;
const htmlAttr = /([\w-]*)(?==)/g;
const dblQuote = /(&quot;)([.\w\/:*?-]*\w)(&quot;)/g;

let codeClass = "";
let codeClass2 = "";
const lang = languages[0];

// Set default color class by language (add to a function), need to incorporate the light code block color names
switch (lang) {
  case "html": 
  case "css": 
    codeClass = classes[0];
    codeClass2 = classes[8];
    break
  case "javascript": 
  case "php": 
  case "markdown": 
    codeClass = classes[2];
    break
}

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

/* add colors classes then output to DOM for DARK code block. I may need to rewrite this because I will have a class for each regex */
let result = [];
let result2 = [];
let result3 = [];

convertedArr.forEach(line => {
  
  // HTML tags
  if (line.match(htmlTag)) {
    // console.log(line.match(htmlTag))
    result = line.replace(htmlTag, `<span class="${classes[3]}">${'$1'}</span>`);
    // console.log(result2)
  } else {
    result = line;
  }

  // HTML attributes
  if (line.match(htmlAttr)) {
    // console.log(line.match(htmlAttr))
    result2 = line.replace(htmlAttr, `<span class="${classes[2]}">${'$1'}</span>`);
    // console.log(result3)
  } else {
    result2 = line;
  }

  // Quotes
  if (line.match(dblQuote)) {
    console.log(line.match(dblQuote))
    result3 = line.replace(dblQuote, `<span class="${classes[1]}">${'$1$2$3'}</span>`);
    // console.log(result3)
  } else {
    result3 = line;
  }
  
  // Consider adding an <li> to paste into the html for line breaks and then remove them before pasting into the <pre> tag
  darkBlockOutput.textContent += '<span>' + `${result2}` + "</span>";
});

// add colors classes then output to DOM for LIGHT code block
convertedArr.forEach(line => {
  if (line.match(dblQuote)) {
    // console.log(line.match(dblQuote))
    result = line.replace(dblQuote, `<span class="light-blue2">${line.match(dblQuote)}</span>`);
  } else {
    result = line;
  }

  // Consider adding an <li> to paste into the html for line breaks and then remove them before pasting into the <pre> tag
  // lightBlockOutput.textContent += '<span class="' + `${codeClass2}` + '">' + `${result2}` + "</span>";
  lightBlockOutput.textContent += '<span>' + `${result2}` + "</span>";
});

