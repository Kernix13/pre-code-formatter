# Pre and Code tag formatter

Output code symbols/syntax for display in a pre tag codeblock.

Things I need:

1. convert html entities (**DONE**)
1. wrap each line in a span tag with a class for the default color (_DONE_)
1. use RegEx to add span with classes for various parts of the code

Nice to have:

1. have each line of code break to a new line for easier copy/paste,
1. how to grab the code from a code file or...
1. from a form with a textarea element,
1. a select list for the language you want to use for styling,
1. and a submit button that runs the JS code and outputs the code back onto the page (async/await)

## Colors and classes

> Note: I am using a dark theme in VS Code

Right now in my editor I see 8 colors: 2 blues, 1 gray, 1 white, 1 lime green, 1 orange, 1 red, and 1 purple. That is from html, css, js, md, and php.

1. a common light blue: HTML attr values, quoted values in CSS and JS,
1. a darker light blue: JS var names, CSS values, HTML attributes
1. gray is for comments
1. white is for HTML content and angle brackets, JS let var names and punctuation (. , ;, :), CSS punctuation (, ;, :)
1. red is for CSS units, JS keywords & symbols
1. purple is for JS function/method names
1. orange: markdown list symbols | JS parameters and brackets depending on scope
1. lime green: css tags, prop names and parens; JS brackets depending on scope; html element names | markdown comments

CSS: only green, light blue, dark blue, red, white

HTML: only green, white, light blue, dark blue

JS: make `[]` = blue, `{}` = orange, `()` = orange | `.,;` = white

PHP:

Markdown:

## Color table

def = Default

| Color | Lang | uses               |
| :---- | :--- | :----------------- |
| White | MD   | def                |
|       | CSS  | `:`, `,`, `;`      |
|       | HTML | content            |
|       |      | `<`, `>`, `/`, `=` |

Make the precode default white so classes do not need to be put on puctuation
