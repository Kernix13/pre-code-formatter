# Pre and Code tag formatter

A JavaScript program to output different languages with `span.color` classes for syntax highlighting. This is a manual process, as opposed to using PrismJS.

Things I need:

1. Use RegEx to add span with color classes for various parts of the code for _**EVERY**_ language (ongoing)
1. Have each line of code break to a new line for easier copy/paste for DOM `textContent`
1. Grab the code from a textarea element
1. A select list for the language you want to use for styling,
1. And a submit button that runs the JS code and outputs the code back onto the page (async/await?)

> Why are there so many _user agent stylesheet_ styles for my `pre` block?

## How to use

> STOPPED

1. At this point, you have to paste your code to a variable named `inputText` in backticks into `js/input.js`.
2. That string is brought into `js/script.js` as a variable named `myText` and then split on `\n`. You can duplicate `inputText` and `myText` to be language specific and then run `convertCode(arr)` for each array (see example in `input.js`). That is good for organization but it unnecessary IMO.

> This project is for personal use so I had to add `js/input.js` in the HTML file because I am using Live Server and you need HTTPS for modules. I just want the code to add to my blog posts.

**IMPORTANT**: Each language hava a `new` class instance for each regular expression. The coutput array name for the final class instance is used in a `forEach` to output the code via `darkBlockOutput.textContent`. For exmple, for the HTML block the array `DblQuotesClass` is the array in the `forEach` dorectly below. So:

3. Make sure the `forEach` for the language you are converting is not commented out, and others are commented out.
4. Then save `script.js` and copy the code under _Code to copy for dark code block_.
5. Paste that code anywhere into your HTML file so the `li` tags break to a new line. Then remove the opening and closing `li` tags.
6. Finally, cut and paste the remaining code into your `pre` block - DONE! You will need to <kbd>TAB</kbd> the entire code block to be only 1 <kbd>TAB</kbd> indented in from your `pre` tag, and/or use <kbd>SPACEBAR</kbd> for nested/indented lines.

The code in the `pre` tag will look funky but you should not have to touch it after pasting it. I have noticed some exceptions though, so you may need to adjust some of the `span` tags.

If you have a dark website and you want a light code block, comment out the first `classes` variable and uncomment the one that is commented out. Also change `darkBlockOutput` to `lightBlockOutput` that uses `textContent` to write the finished code to the DOM.

<!-- > WTF: `user agent stylesheet` is creating problems? -->

### SUMMARY OF MANUAL STEPS ON YOUR PART

1. Paste your code into `js/input.js` and save
1. Make sure the `forEach` block that has `darkBlockOutput.textContent` is the only block not commented out for the language you want
1. Open `index.html` and copy the code
1. Paste the code into a blank area in `index.html` so that the `<li>` tags break to a new line
1. Remove all opening and closing `li` tags
1. Cut and paste that code into your `pre` tag
1. Adjust the <kbd>TAB</kbd> spacing if necessary.

**NOTE**: IF you only want the code that has the reserved characters converted to HTML entities, then that _Cody to copy_ is at the bottom of `index.html`.

## RegEx and languages and color

I am using regualr expressions to wrap parts of a language in span tags with a color class. Here is a list of the languages I will be covering and ones I am done:

- [x] HTML
- [x] CSS (_except HTML selectors AND CLASSES_)
- [x] SASS/SCSS (_except HTML selectors AND CLASSES_)
- [ ] JavaScript
- [x] JSON
- [ ] PHP
- [ ] JSX

I have different colors for both a dark code block and a light code block, even though I personally will only be using the dark code block colors. Remove all the CSS and JavaScript for the code block you will be using.

### Notes by Language

**HTML**: All good!

**CSS**:

1. I removed the check for double-quotes (Regex: `dblQuotes`, `&quot;`), so make sure your quotes are only single-quotes, e.g. `url`, `content`, `@import` and/or some font families.
1. Comment type `/* */` works, but `//` does not output for some reason so only use the 1st kind
1. I can't seem to escape `//` so using web urls like Google fonts also creates a problem so don't use them until I fix that
1. I can match and replace variable names in `var()` but not the declaration
1. My regular expression for Classes and Ids (`.#`) works but it also selects file or url with a . in it. So either don't use `@import`, `url`, etc., or remove the period and add it back as the last step. It also breaks for pseudo-classes like `nth-child`
1. HTML tag selectors have to be done by themselves. That should not be a problem UNLESS you have a lot of them or they are part of a media query.

That's some serious using for CSS, and I have not tested out all the various combinators, pseudo-classes, pseudo-selectors, and other edge cases. So it would be better to manually add the classes for the problem lines of code, rather than include those lines and have to clean up the bad code. REGEX -> !?!?!

**JSON**:

1. The little there is to do is done except for light-blue for the double-quotes values.

## Contributing

I only have languages that I use. If you would like to contribute to this repo for additional languages, then open an issue or fork the repo and create a Pull Request. Hopefully, you are good with regular expressions.
