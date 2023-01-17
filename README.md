# Pre and Code tag formatter

Output code symbols/syntax for display in a pre tag code block.

Things I need:

1. Convert html entities (**DONE**)
1. Use RegEx to add span with color classes for various parts of the code for _**EVERY**_ language - DONE HTML

Nice to have:

1. Have each line of code break to a new line for easier copy/paste for DOM `textContent`
1. How to grab the code from a code file or ...
1. from a form with a textarea element,
1. A select list for the language you want to use for styling,
1. And a submit button that runs the JS code and outputs the code back onto the page (async/await?)

## How to use

1. Add each line of code to the array called (either `codeToConvert` or `input`)
2. Save the file
3. Copy the code and paste into an empty area in your html file
4. remove the `li` tags
5. Paste the rest into your pre tag - DONE

## RegEx and languages

I am using regualr expressions to wrap parts of a language syntax in span tags with a color class for that part of the syntax. Languages I will be covering and ones I am done:

- [x] HTML
- [x] CSS
- [ ] SASS/SCSS
- [ ] JavaScript
- [ ] JSX
- [ ] JSON
- [ ] PHP

## Contributing

I have not created a license yet which I understand is a requirement before people will contribute to a repo. I'll eventually add a license, but open an issue if you would like to help.
