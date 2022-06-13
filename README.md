# Pre and Code tag formatter

Output code symbols/syntax for display in pre and code tags.

> Right now the page is sloppy and I need to have 2 things: 1) have each line of code break to a new line for each of copying, 2) how to grab the code from a file or from a textarea?

I Need: 1) a form with a textarea element, 2) a select list for the language you want to use for styling, 3) and finally a submit button.

## CSS classes

- `.container`
- `.code` or `.noncode` on `pre` tag for the background color for the code block which contains all the span tags. `.code` outputs a dark blueish color, `.noncode` outputs very light gray background
- `css` on `span` tag for CSS, outputs green text
- `html` on `span` tag for HTML, outputs yellow text
- `php` on `span` tag for PHP, outputs white text
- `javascript` on `span` tag for JavaScript, outputs orange
- `css` on `span` tag for CSS
- `span.code` for "non-code", outputs black text
