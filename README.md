# Pre and Code tag formatter

Output code symbols/syntax for display in a pre tag code block.

Things I need:

1. Convert html entities (**DONE**)
1. Use RegEx to add span with color classes for various parts of the code for _**EVERY**_ language - DONE HTML

Nice to have and To-dos:

1. Have each line of code break to a new line for easier copy/paste for DOM `textContent`
1. How to grab the code from a code file or ...
1. from a form with a textarea element,
1. A select list for the language you want to use for styling,
1. And a submit button that runs the JS code and outputs the code back onto the page (async/await?)

> Why are there so many _user agent stylesheet_ styles?

## How to use

1. At this point, you have to add your code to `script.js` in backticks to an array called `input` or `codeToConvert` (I do not like this approach).
1. Then save `script.js` and copy the code under _Code to copy for dark code block_.
1. Paste that code anywhere into your HTML file so the `li` tags break to a new line. Then remove the opening and closing `li` tags and paste the remaining code into your `pre` block - DONE!

The code in the `pre` tag will look funky but you should not have to touch it after pasting it.

If you have a dark website and you want a light code block, comment out the first `classes` variable and uncomment the one that is commented out. Also change `darkBlockOutput` to `lightBlockOutput` that uses `textContent` to write the finished code to the DOM.

> WTF: `user agent stylesheet`?

### Alternatives to adding code to an array

Read text from a file line by line (markdown, txt or csv?):

1. Readline API provided by Node.js: have a blank file where you add your code to. Check out [How To Read a File Line by Line in JavaScript](https://levelup.gitconnected.com/how-to-read-a-file-line-by-line-in-javascript-48d9a688fe49)
1. Use the [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader). Look at [stackoverflow filereader](https://stackoverflow.com/questions/23331546/how-to-use-javascript-to-read-local-text-file-and-read-line-by-line)
1. Another [FileReader API article](https://linuxhint.com/read-file-line-line-javascript/) by linuxhunt

> Search term: `use javascript to grab lines of code from any file`

Split each line entered in a textarea element:

1. use a `<textarea>` element: `document.getElementById('mytextarea').value.split('\n');` - check out [Stackoverflow](https://stackoverflow.com/questions/60498186/get-text-from-textarea-and-storing-each-line-in-a-separate-variable)
1. [second textarea article](https://www.encodedna.com/javascript/get-textarea-values-with-line-breaks-using-javascript.htm)

>

## RegEx and languages and color

I am using regualr expressions to wrap parts of a language syntax in span tags with a color class for that part of the syntax. Languages I will be covering and ones I am done:

- [x] HTML
- [x] CSS (except HYML selectors)
- [ ] SASS/SCSS
- [ ] JavaScript
- [ ] JSX
- [x] JSON
- [ ] PHP

I don't like the colors for the light block. I need to change the html tags from green to red/maroon, attributes to green, and values to blue.

## Contributing

I have not created a license yet which I understand is a requirement before people will contribute to a repo. I'll eventually add a license, but open an issue if you would like to help.
