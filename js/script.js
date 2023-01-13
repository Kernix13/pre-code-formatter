const darkBlockOutput = document.getElementById("dark_block_output");
const lightBlockOutput = document.getElementById("light_block_output");

const languages = ["css", "html", "javascript", "php", "markdown"];
const classes = ["white", "light-blue", "dark-blue", "lime-green", "comment", "red", "purple", "orange"]

// all languages seem to use light-blue for values in single or double-quotes so I can rule that color out as the default color and just use RegEx to add a span.light-blue around the quotes and the contents

const codeToConvert = [
  `<p class="test">words here</p>`,
  `<title>Code Formatter</title>`,
  `<img src ="./img/file.jpeg" />`
]

const myRegex = /&quot;[.\w\/:*?-]*/g;
const myRegex2 = /(&quot;[.\w\/:*?-]*\w)(&quot;[.\w\/:*?-]*)/g;

let codeClass = "";
const lang = "html";

// Set default color class by language
switch (lang) {
  case "html": 
  case "css": 
    codeClass = classes[0];
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

// For now I'm adding lines to an array - need to find something better
const input = [`<p class="test">words here</p>`, `<title>Code Formatter</title>`, `<img src ="./img/file.jpeg" />`];

let testArr = [];

input.forEach(line => {
  let convertedLine = convertHTML(line);

  testArr.push(`${convertedLine}`);
});
console.log(testArr)

let result = '';
let matches = testArr.map(item => {
  let newArr = []
  if (item.match(myRegex)) {
    let cleanHtml = item.match(myRegex).toString().split(",").join("")
    newArr.push(`<span class="light-blue">${cleanHtml}</span>`) 
  } else {
    newArr.push(item)
  }
  return newArr
})


matches.forEach(line => {
  if (line.match(myRegex)) {
    result = line.replace(myRegex, `<span class="light-blue">${line.match(myRegex)}</span>`);
  } else {
    result = line;
  }

  darkBlockOutput.textContent += '<span class="' + `${codeClass}` + '">' + `${result}` + "</span>";
});


// Ignore below here - just the light code block
input.forEach(line => {
  let convertedLine = convertHTML(line);
  lightBlockOutput.textContent += '<span class="' + `${codeClass}` + '">' + `${convertedLine}` + "</span>";
});
