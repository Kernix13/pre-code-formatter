# Pre and Code tag formatter

A JavaScript program to output different languages with `span.color` classes for syntax highlighting. This is a manual process, as opposed to using PrismJS.

Things I need:

1. Convert html entities (**DONE**)
1. Use RegEx to add span with color classes for various parts of the code for _**EVERY**_ language (ongoing)

Nice to have and To-dos:

1. Have each line of code break to a new line for easier copy/paste for DOM `textContent`
1. How to grab the code from a textarea element
1. A select list for the language you want to use for styling,
1. And a submit button that runs the JS code and outputs the code back onto the page (async/await?)

> Why are there so many _user agent stylesheet_ styles for my `pre` block?

## How to use

1. At this point, you have to paste your code to a variable named `inputText` in backticks into `js/input.js`.
1. That string is brought into `js/script.js` as a variable named `myText` and then split on `\n`. You can duplicate `inputText` and `myText` to be language specific and then run `convertCode(arr)` for each array (see example in `input.js`). That is good for organization but it unnecessary IMO.

> This project is for personal use so I had to add `js/input.js` in the HTML file because I am using Live Server and you need HTTPS for modules. I just want the code to add to my blog posts.

1. Then save `script.js` and copy the code under _Code to copy for dark code block_.
1. Paste that code anywhere into your HTML file so the `li` tags break to a new line. Then remove the opening and closing `li` tags.
1. Finally, cat and paste the remaining code into your `pre` block - DONE! You may need to <kbd>TAB</kbd> the entire code block to be only 1 <kbd>TAB</kbd> indented in from your `pre` tag.

The code in the `pre` tag will look funky but you should not have to touch it after pasting it. I have noticed some exceptions though, so you may need to adjust some of the `span` tags.

If you have a dark website and you want a light code block, comment out the first `classes` variable and uncomment the one that is commented out. Also change `darkBlockOutput` to `lightBlockOutput` that uses `textContent` to write the finished code to the DOM.

> WTF: `user agent stylesheet`?

### SUMMARY OF MANUAL STEPS ON YOUR PART

1. Paste your code into `js/input.js` then save that file
1. Open `index.html` and copy the code
1. Paste the code into a blank area in `index.html` so that the `<li>` tags break to a new line
1. Remove all opening and closing `li` tags
1. Cut and paste that code into your `pre` tag
1. Adjust the <kbd>TAB</kbd> spacing if necessary.

**NOTE**: IF you only want the code that has the reserved characters converted to HTML entities, then that _Cody to copy_ is at the bottom of `index.html`.

## RegEx and languages and color

I am using regualr expressions to wrap parts of a language in span tags with a color class. Here is a list of the languages I will be covering and ones I am done:

- [x] HTML
- [x] CSS (_except HTML selectors_)
- [ ] SASS/SCSS
- [ ] JavaScript
- [ ] JSX
- [x] JSON
- [ ] PHP

I have different colors for both a dark code block and a light code block, even though I personally will only be using the dark code block colors. Remove all the CSS and JavaScript for the code block you will be using.

<!-- ### Notes by Language

CSS:

1. I want to remove the check for double-quotes (Regex: `dblQuotes`), so make sure your quotes are only single-quotes, e.g. `url`, `content` and/or some font families. -->

## Contributing

I only have languages that I use. If you would like to contribute to this repo for additional languages, then open an issue or fork the repo and create a Pull Request. Hopefully, you are good with regular expressions.
