# Pre and Code tag formatter

A JavaScript program to output different languages with `code.color` classes for syntax highlighting. This is a manual process, as opposed to using PrismJS.

If you would like to see an example, check my [Pre tag formatter in CodePen](https://codepen.io/jim-kernicky/pen/KKQebjW).

## How to use

> This project is for personal use so I had to add `js/input.js` in the HTML file because I am using Live Server and you need HTTPS for modules. I just want the code to add to my blog posts.

1. At this point, you have to paste your code to the variables in backticks in `js/input.js`.
1. Those strings are brought into `js/script.js` as a variable and then split.
1. Depending on the language you are working on, uncomment `convertCode(arr)` after the comment `/* CHOOSE THE LANGUAGE YOU WANT TO CONVERT: */` for the language you want.
   1. `convertCode(arr)` converts reserved characters (`< > ' " &`) to HTML entities
1. Also unccoment the appropriate `createClass(input, arr)` line under `/* CHOOSE THE LANGUAGE YOU WANT TO OUTPUT: */`
1. Then save `script.js` and copy the code under _Code to copy for dark code block_.
1. Paste that code between the comments under the `pre` block in the HTML file so the `li` tags break to a new line. Then remove the opening and closing `li` tags.
1. Finally, cut and paste the remaining code into your `pre` block.

**NOTE**: I added `data-` attributes to indicate each line number to make it easier to see each new line among all the code tags.

You will need to <kbd>TAB</kbd> the entire code block to be indented in from your `pre` tag. You may also have to use the <kbd>SPACEBAR</kbd> key for nested/indented lines.

The code in the `pre` tag will look funky but you should not have to touch it after pasting it other than for indentation. I have noticed some exceptions though, so you may need to adjust some of the `code` tags, but I've only seen that with long lines.

### SUMMARY OF MANUAL STEPS ON YOUR PART

1. Paste your code into `js/input.js` and save
1. Uncomment to 2 functions for the language you want.
1. Open `index.html` and copy the code
1. Paste the code into a blank area in `index.html` so that the `<li>` tags break to a new line
1. Remove all opening and closing `li` tags
1. Cut and paste that code into your `pre` tag
1. Adjust the spacing if necessary with the <kbd>TAB</kbd> and <kbd>SPACEBAR</kbd> keys.
1. When it looks good, copy the entire `pre` block into your blog post.

**NOTE**: If you only want the code that has the reserved characters converted to HTML entities, then that _Code to copy_ is at the bottom of `index.html`.

## Files

HTML:

1. `index.html`: has an example for a dark code block on a light background and a light code block on a dark background. It also has examples for each language, and styling for `code`, `kbd`, and `var` tags. It also has brief notes similar to above.
1. `dark.html` has a light background and a dark `pre` ode block.
1. `light.html` has a dark background and a light `pre` ode block.

CSS: `css/style.css` has the styling for `index.html`, `css/dark.css` for `dark.html`, `css/light.css` for `light.html`

JavaScript: `js/script.js` is for `index.html`, `js/dark.js` is for `dark.html`, `js/light.js` is for `light.html`

`js/script.js`: I use `textContent` to output the `code` tags to the DOM, but in that `forEach` I also have `innerHTML` commented out. Turn that one on to see the coloring for your code to make sure it looks good. That method is really helpful!

## RegEx and languages and color

I am using regualr expressions to wrap parts of a language in code tags with a color class. Here is a list of the languages I will be covering and ones I am done:

- [x] HTML
- [x] CSS (_except HTML selectors AND Classes_)
- [x] SASS/SCSS (_except HTML selectors AND Classes_)
- [x] JavaScript (_except numbers AND template literals_)
- [x] JSON
- [x] PHP (with a few exceptions)
- [ ] JSX and Astro
- [x] Markdown (_except unordered lists, blockquotes and diff blocks_)

I have different colors for both a dark code block and a light code block, even though I personally will only be using the dark code block colors. I will be tweaking those colors as I go.

I added the colors to an array which is used to output the code tags with the appropriate color class.

Other _languages/syntax_ I want to cover: Git and Git Bash, NPM commands, SQL, React/JSX and Astro, YAML, and Apache.

### Notes by Language

**NOTE**: All languages use the same color for anything in single quotes, double quotes, and backticks.

**HTML**: All good!

**CSS**:

1. I removed the check for double-quotes (Regex: `dblQuotes`, `&quot;`), so make sure your quotes are only single-quotes, e.g. `url`, `content`, `@import` and/or some font families. Feel free to add that RegEx back to `cssRegEx`.
1. The multi-line comment type `/* */` works, but `//` does not output for some reason so only use the 1st one.
1. I can't seem to escape `//` so using web urls like Google fonts also creates a problem so don't use them until I fix that.
1. I can match and replace variable names in `var()` but not the declaration.
1. My regular expression for Classes and Ids (`.#`) works but it also selects file or URLs with a `.` in it. So either don't use `@import`, `url`, etc., or remove the period and add it back as the last step. It also breaks for pseudo-classes like `nth-child`.
1. HTML tag selectors have to be done manually until I figure the RegEx to select only them. Use _Emmet wrap with abbreviation_ and add the appropriate `code.color` class..

That's some serious issues for CSS, and I have not tested out all the various combinators, pseudo-classes, pseudo-selectors, and other edge cases.

**JSON**: All good!

**SASS**:

1. All the same issues as with CSS.
1. Since there are a lot more unique syntax for SASS, I have only tested the most common. I'm going to need help testing all the syntax and figuring out the regular expressions.

**JavaScript**:

1. I have a selected list of keywords - the ones I use. Here is the complete list. Also, I had to put `typeof` before `of` because my RegEx skills are intermediate at best:

```js
// I left off null and undefined
const jsKeywords =
  /(?<=\(?)(typeof|as|assert|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|of|package|private|protected|public|return|set|static|super|switch|throw|try|var|void|whilewith|yield)(?=\s)/g;
```

2. Single quotes and double quotes are fine
3. Template literals: I am putting the code in a template literal so adding a template literal inside is not easy (see example in `input.js`). I had to use a simple RegEx and it has to be a single line template literal.
4. I can't seem to select numbers without an extreme number of empty code tags.

**PHP**:

1. Having problems grabbing `$` as a prefix to `this`
1. Having problems grabbing custom classes instances
1. For some reason comments are not geing grabbed???
1. I also have a reduced number of keywords. Add more if you do not see ones you use:

```js
const phpKeywords =
  /(?<=\(?)(while|new|array|echo|endwhile|else|elseif|class|function|return|break|catch|continue|default|endfor|endforeach|enum|eval|exit|extends|final|finally|foreach|instanceof|insteadof|match|namespace|require|static|switch|throw|try)(?=\s)/g;
```

**Markdown**:

1. The foolwoing are good: Headings, Images, links, footnotes, HTML tags, and ordered lists
1. Blockquotes issue: you can alphanumeric (`\w`) characters but not other characters. This one may have to manually have `code.green` is you have quotes inside or any other non word char. My RegEx works in [regexr.com](https://regexr.com/76te2) but not in my JavaScript.
1. I had to remove the `-` for unordered lists because it is grabbing other dashes
1. Diff blocks: I was not able to select the `-` for the changes/old code line. I was able to in [regexr.com](https://regexr.com/76tiu) but not in this app. I'll have to manually add red.
1. Outputting backticks will require some creativity when it comes to inline code. Language blocks can be simulated by using the language in question then adding backticks above and below the code block.

## Contributing

I only have regular expressions for languages that I use. If you would like to contribute to this repo for additional languages (or improve mine), then open an issue or fork the repo and create a Pull Request. Hopefully, you are good with regular expressions. Although, feel free to suggest any changes.

### Issues:

1. RegEx for Markdown blockquotes - [see issue #2](https://github.com/Kernix13/pre-code-formatter/issues/2)
1. RegEx for Markdown unordered lists - [see issue #3](https://github.com/Kernix13/pre-code-formatter/issues/3)
1. RegEx capture groups issue - [see issue #4](https://github.com/Kernix13/pre-code-formatter/issues/4)
1. RegEx for CSS classes - [see issue #5](https://github.com/Kernix13/pre-code-formatter/issues/5)
