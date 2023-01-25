# Pre and Code tag formatter

A JavaScript program to output different languages with `span.color` classes for syntax highlighting. This is a manual process, as opposed to using PrismJS.

Things I need or want:

1. Use RegEx to add span with color classes for various parts of the code for _**EVERY**_ language (ongoing)
1. Have each line of code break to a new line for easier copy/paste for DOM `textContent`
1. Grab the code from a textarea element
1. A select list for the language you want to use for styling,
1. And a submit button that runs the JS code and outputs the code back onto the page (async/await?)

> Why are there so many _user agent stylesheet_ styles for my `pre` block?

## How to use

1. At this point, you have to paste your code to a variable named `inputText` in backticks into `js/input.js`.
2. That string is brought into `js/script.js` as a variable named `myText` and then split on `\n`. You can duplicate `inputText` and `myText` to be language specific and then run `convertCode(arr)` for each array (see example in `input.js`).

> This project is for personal use so I had to add `js/input.js` in the HTML file because I am using Live Server and you need HTTPS for modules. I just want the code to add to my blog posts.

**IMPORTANT**: Each language hava a `new` class instance for each regular expression. The coutput array name for the final class instance is used in a `forEach` to output the code via `darkBlockOutput.textContent`. For exmple, for the HTML block the array `DblQuotesClass` is the array in the `forEach` dorectly below. So:

3. Make sure the `forEach` for the language you are converting is not commented out, and all others are commented out.
4. Then save `script.js` and copy the code under _Code to copy for dark code block_.
5. Paste that code anywhere into your HTML file so the `li` tags break to a new line. Then remove the opening and closing `li` tags.
6. Finally, cut and paste the remaining code into your `pre` block - DONE!

You will need to <kbd>TAB</kbd> the entire code block to indented in from your `pre` tag. You may also have to use the <kbd>SPACEBAR</kbd> key for nested/indented lines.

The code in the `pre` tag will look funky but you should not have to touch it after pasting it other than for indentation. I have noticed some exceptions though, so you may need to adjust some of the `span` tags, but I've only seen that with long lines and/or lond code blocks.

If you have a dark website and you want a light code block, comment out the first `classes` variable and uncomment the one that is commented out. Also change `darkBlockOutput` to `lightBlockOutput` that uses `textContent` to write the finished code to the DOM. I may create a dark and light html, css and main JS file.

### SUMMARY OF MANUAL STEPS ON YOUR PART

1. Paste your code into `js/input.js` and save
1. Make sure the `forEach` block that has `darkBlockOutput.textContent` is the only block not commented out for the language you want. And of course, don't have the class instances commented out for the language.
1. Open `index.html` and copy the code
1. Paste the code into a blank area in `index.html` so that the `<li>` tags break to a new line
1. Remove all opening and closing `li` tags
1. Cut and paste that code into your `pre` tag
1. Adjust the spacing if necessary with the <kbd>TAB</kbd> and <kbd>SPACEBAR</kbd> keys.
1. When it looks good, copy the entire `pre` block into your blog paost.

**NOTE**: If you only want the code that has the reserved characters converted to HTML entities, then that _Code to copy_ is at the bottom of `index.html`.

## RegEx and languages and color

I am using regualr expressions to wrap parts of a language in span tags with a color class. Here is a list of the languages I will be covering and ones I am done:

- [x] HTML
- [x] CSS (_except HTML selectors AND CLASSES_)
- [x] SASS/SCSS (_except HTML selectors AND CLASSES_)
- [ ] JavaScript
- [x] JSON
- [ ] PHP
- [ ] JSX and Astro
- [ ] Markdown

I have different colors for both a dark code block and a light code block, even though I personally will only be using the dark code block colors. I will be tweaking those colors as I go.

Here is the color array you should use and of course remove the suffix of `2` and do the same in the CSS file:

```js
const classes = [
  'maroon',
  'blue2',
  'green2',
  'light-blue2',
  'gray',
  'comment2',
  'red2',
  'purple2',
  'orange2',
  'black',
];
```

### Notes by Language

**HTML**: All good except I can't highlight the reserved characters as HTML entities.

**CSS**:

1. I removed the check for double-quotes (Regex: `dblQuotes`, `&quot;`), so make sure your quotes are only single-quotes, e.g. `url`, `content`, `@import` and/or some font families.
1. The multi-line comment type `/* */` works, but `//` does not output for some reason so only use the 1st one.
1. I can't seem to escape `//` so using web urls like Google fonts also creates a problem so don't use them until I fix that.
1. I can match and replace variable names in `var()` but not the declaration.
1. My regular expression for Classes and Ids (`.#`) works but it also selects file or URLs with a `.` in it. So either don't use `@import`, `url`, etc., or remove the period and add it back as the last step. It also breaks for pseudo-classes like `nth-child`.
1. HTML tag selectors have to be done by themselves. That should not be a problem UNLESS you have a lot of them or they are part of a media query.

That's some serious issues for CSS, and I have not tested out all the various combinators, pseudo-classes, pseudo-selectors, and other edge cases.

**JSON**: All good!

**SASS**:

1. All the same issues as with CSS.
1. Since there is a lot more unique syntax for SASS, I have only tested the most common. I'm going to need help testing all the syntax and figuring out the regular expressions.

**JavaScript**:

1. I have a selected list of keywords - the ones I use. Here is the complete list. Also, I had to put `typeof` before `of` because my RegEx chops are intermediate at best:

```js
// There are more keywords, but these are the only ones I have currently used
// the positive lookbehind then lookahead covers scenarios like forEach with the keeyword for but not if you have a keyword in a string with a space on either side
// I left off null and undefined
const jsKeywords =
  /(?<=\(?)(typeof|as|assert|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|of|package|private|protected|public|return|set|static|super|switch|throw|try|var|void|whilewith|yield)(?=\s)/g;
```

2. single quote vs double quote
3. How to add template literals inside the template literals for your code

**PHP**:

1. Having problems grabbing `$` as a prefix to this
1. Having problems grabbing custom classes
1. For some reason comments are not geing grabbed???
1. I also have a reduced number of keywords. Add more if you do not see ones you use

**Markdown**:

1. Adding a empty span tag in task lists for `[ ]` - need to rule out the selection if there are no chars between `[]`
1. I'm getting multiple span tags again
1. Blockquotes issue: you can alphanumeric (`\w`) characters but not other characters. This one may have to manually have `span.green` is you have quotes inside or any other non word char
1. I had to remove the `-` for unordered lists because it is grabbing other dashes
1. And for the last color you see in Markdown files (other than language blocks), diff blocks. I was not able to select the `-` old code line. I was in regexr.com, but not in this app. I'll have to remove the orange span and manually add red.
1. I also can not figure out how to output backticks inside a backtick string, even though I tried `\`\`

## Contributing

I only have regular expressions for languages that I use. If you would like to contribute to this repo for additional languages, then open an issue or fork the repo and create a Pull Request. Hopefully, you are good with regular expressions. Or feel free to improve the current state of the JavaScript (and it needs improvement).
