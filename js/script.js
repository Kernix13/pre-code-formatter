const code = document.getElementById("code");
const nonCode = document.getElementById("noncode");

const classes = ["css", "html", "javascript", "php"];
const codeClass = classes[2];

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

const output = ["const users = ", '   { name: "John_&_Jane", age: 34 },', '  { name: "Amy_<>_1", age: 20 },', ' { name: "SINGLE-QUOTE_\'_1", age: 10 }', "];"];

output.forEach(line => {
  let convertedLine = convertHTML(line);
  code.textContent += '<span class="' + `${codeClass}` + '">' + `${convertedLine}` + "</span>" + `\r`;
});

output.forEach(line => {
  let testOutput = [];
  let convertedLine = convertHTML(line);
  // testOutput.push()
  // I need line breaks but can't get them. How do I get the code to output into div tags and innerHTML but still get the textContent? \r, <br />, and &nbsp; all don't work
  nonCode.textContent += '<span class="code">' + `${convertedLine}` + "</span>" + `\r`;
});
