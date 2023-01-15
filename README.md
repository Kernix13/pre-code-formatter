# Pre and Code tag formatter

Output code symbols/syntax for display in a pre tag codeblock.

[Link](https://example.com)

Things I need:

1. convert html entities (**DONE**)
1. use RegEx to add span with classes for various parts of the code (**DONE**)

Nice to have:

1. have each line of code break to a new line for easier copy/paste,
1. how to grab the code from a code file or...
1. from a form with a textarea element,
1. a select list for the language you want to use for styling,
1. and a submit button that runs the JS code and outputs the code back onto the page (async/await)

## How to use

1. add each line of code to the array called (either `codeToConvert` or `input`)
2. save the file
3. copy the code and paste into an empty area in your html file
4. remove the `li` tags
5. "clean up" the span tags - DONE

## Colors and classes

All languages seem to use light-blue for values in singlequotes, double-quotes, and back-ticks so I can rule that color out as the default color and just use RegEx to add a `span.light-blue` around the quotes and the contents.

> Note: I am using a dark theme in VS Code

Right now in my editor I see 8 colors: 2 blues, 1 gray, 1 white, 1 lime green, 1 orange, 1 red, and 1 purple. That is from html, css, js, md, and php.

1. HTML: white, green, light-blue, blue, gray
1. CSS: HTM + red
1. SASS/SCSS: HTML + red and orange
1. JAVASCRIPT & PHP: white, light-blue, blue, red, orange, purple, gray
1. JSX: JS + green
1. MARKDOWN: HTML - light-blue + red (red only for diff code block)
1. BATCH: HTML - light-blue (.bat and .cmd)
1. POWERSHELL: HTML - green
1. SHELL: HTML - green + purple
1. OTHERS: ???

## Regular Expressions

These ahve given me a lot of problems and I assume it's my lack of understanding of character sets and capture groups that has resulted in duplicate code.

I had to do a fix to remove empty span tags for the synrtax colors.

HTML

```js
// the following are in the array htmlRegEx
const htmlTag = /(?<=&lt;\/*)([\w]*)/g;
const htmlAttr = /([\w-]*)(?==)/g;
const htmlBoolAttr = /(\s\w*)(?=&gt;)/g; // need to have it right on > or &gt;
const dblQuote = /(&quot;[.\w\/:*?-]*\w&quot;)/g;
```

> THIS IS NOW A MESS...I'M STOPPING
