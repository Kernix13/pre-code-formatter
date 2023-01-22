# Regular expressions used for this app

> **NOTE**: This is basically a sketchpad of sorts. I used the language code blocks on this page, the files in this project, and files from my other projects to determine the colors I want to use.

When it comes to code blocks in a `pre` tag on a docs page or a blog post, you can have the entire code block in a single color. If it is a dark code block, then the code will be white or light gray, and if it's a light code block it will be black or dark gray.

That's fine. However, a code block with color syntax highlighting not only looks good, but it is easier to read. As a result, a syntax highlighted code block will make your blog posts look better and hopefully lead to higher results in t he SERPs.

But how many colors would you need? You can try to recreate your own code editor, or look at other blog posts, documentation pages, or markdown language blocks.

Since I am adding span tags with a color class around every RegEx match, I would like to have only enough colors to make the code readable and have differentiation between different languages.

> Prism.js: Very easy to define new languages. The only thing you need is **a good understanding of regular expressions**.

## Table of Contents

1. [Colors and classes](#colors-and-classes)
1. [VS Code colors](#vs-code-colors)
1. [Global RegEx and colors](#global-regex-and-colors)
1. [HTML RegEx and colors](#html-regex-and-colors)
1. [CSS RegEx and colors](#css-regex-and-colors)
1. [SASS and SCSS RegEx and colors](#SASS and SCSS regex-and-colors)
1. [JavaScript RegEx and colors](#JavaScript regex-and-colors)
1. [JSX RegEx and colors](#JSX regex-and-colors)
1. [JSON RegEx and colors](#JSON regex-and-colors)
1. [PHP RegEx and colors](#PHP regex-and-colors)
1. [Markdown RegEx and colors](#Markdown regex-and-colors)
1. [Other languages RegEx and colors](#Other languages regex-and-colors)

## Colors and classes

I do not want to add span tags around puctuation like `(){}[],;:`, etc. Therefore, all code not wrapped in a `span.color` tag will be white for dark code bloacks, and black for light code blocks.

All languages seem to use light-blue for anything inside single-quotes, double-quotes, and backticks so I will use RegEx to add a `span.light-blue` around those symbols and their contents.

I am going to use either the colors I see in VS Code or the colors in language code blocks on GitHub.

## VS Code colors

> Note: I am using a dark theme in VS Code

Right now in my editor I see 8 colors: 2 blues, 1 gray, 1 white, 1 green/lime green, 1 orange, 1 red, and 1 purple. That is from html, css, js, jsx, md, json, and php code.

1. HTML: white, green, light-blue, blue, and gray (comments)
1. CSS: HTML colors + red
1. SASS/SCSS: CSS + orange
1. JAVASCRIPT & PHP: white, light-blue, blue, gray, red, orange, purple,
1. JSX: JS + green, or JS + HTML
1. MARKDOWN: HTML - light-blue + red (red only for diff code block)
1. BATCH: HTML - light-blue (.bat and .cmd)
1. POWERSHELL: HTML - green
1. SHELL: HTML - green + purple

## Global RegEx and colors

| Name     | RegEx                             | Color class |
| :------- | :-------------------------------- | :---------- |
| dblQuote | `/(&quot;[.\w\/:*?-]*\w&quot;)/g` | light-blue  |
| singleQt | `/(&apos;[.\w/:*?-]*\w&apos;)/g`  | light-blue  |
| comments | See below                         | light-blue  |

Comments regex: `/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g`

The comments regex is global for me by being used in CSS, SASS, JavaScript, and PHP. I assume other languages may use `//` and `/* */` as well, but other languages use other syntax such as `# `.

1. comment type 1 and multi-line: `/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/g`
1. comment type 2: `/\/\/.*/g`
1. both: `/(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|(//.*)/g` or better
   1. -> `/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g`

## HTML RegEx and colors

**NOTE**: the HTML atttribute RegEx has to be run first or else it will wrap tags around `span.blue` tags added for other scans of the code. Then the comments RegEx must run second, or at least before the RegEx for tags.

| Name         | RegEx                           | Color class |
| :----------- | :------------------------------ | :---------- |
| htmlAttr     | `/([\w-]*)(?==)/g`              | blue        |
| htmlTag      | `(?<=&lt;\/*)([\w]*)`           | lime-green  |
|              | BETTER: see below               | lime-green  |
| htmlBoolAttr | `/(\s\w*)(?=&gt;)/g`            | blue        |
| htmlComment  | `/(&lt;!--\s[\w\s]*\s--&gt;)/g` | comment     |

> Add `|!` to grab DOCTYPE: `(?<=&lt;\/*|!)([a-zA-Z1-6]*) `

```html
<!-- Comment -->
<h3>JavaScript Template</h3>
<pre class="code-block dark_block">
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<!-- example of the only red in HTML (in VS Code only) -->
<span class="comment">&lt;!-- Comment here --&gt;</span>
```

### Misc HTML regex

1. Match opening and closing HTML tags with content between
   1. `/^<([a-z1-6]+)([^<]+)*(?:>(.*)<\/\1>| *\/>)$/`
1. OPENING html tag: `/<.*?>/g`
1. CLOSING html tag: `/<\/.*?>/g`

## CSS RegEx and colors

PrismJS CSS light and dark interesting: https://prismjs.com/examples.html

Colors: In VS Code I have the HTML colors + red for units of measure: `px`, `em`, `rem`, `vh`, etc. On Github for CSS language blocks I see the HTML colors, no red for units of measure, but light purple for _functions_ like `url`, `rgb`, `hsl`, etc. I also see a difference for CSS language blocks in this markdown file. I'm going to combine all of that into something easy to build and easy to read.

I'm going with GitHub CSS language blocks for CSS:

1. HTML selectors: green
1. ID and class selectors AND properties: blue
1. single or double quotes: light-blue
1. numbers and hex colors: light-blue
1. functions purple, e.g.: rgb, hsl, url, anything before `(`
1. everything else white

<!--
Links:

1. [Regular-expressions.info](https://www.regular-expressions.info/)
1. [Lookarounds](https://www.regular-expressions.info/lookaround.html)
1. [Zero-Length Regex Matches](https://www.regular-expressions.info/zerolength.html)
-->

1. Units of measure: px, ex, em, rem, %, vw, vh, vmin, vmax, ch
   1. and for print: (cm, mm, in, pt, pc)
1. RegEx for hex colors: `/#[0-9a-fA-F]*/g`

| Name            | RegEx                               | Color class |
| :-------------- | :---------------------------------- | :---------- |
| idClassSelector | `/(?<=[#\.])([^\d][a-zA-Z_-\d]*)/g` | blue        |
| tagSelector     | `//g`                               | green       |
| cssProp         | `//g`                               |             |
| cssFunctionName | `//g`                               |             |

1. idClassSelector: `/(?<=[#\.])([^\d][a-zA-Z_-\d]*)/g`
   1. regex101: `/(?<=[#\.])[^\d\/][a-zA-Z0-9_-]*([^\r\n])[^;]$/g`
1. cssProp: `/([a-z-]*)(?=:)/g` or `/([a-z-]*):/g` or
   1. `/(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/g`
1. cssFunctionName: `/([\w]{3})(?=\()/g` or `/([\w]{3})\(/g`
1. `cssNumValue` and `cssStrValue` are not needed
1. cssUnits: `/(?<=\d)(em|rem|vh|vw|px|%|ch|ex|vmin|vmax)/g`
1. cssAtRules: media, supports, import, container, keyframes,... `/([@][a-z-]*)/g` **DONE**
1. cssVariable: `/([-]{2}[a-z-]*)/g` **DONE**

> how does prismjs match css selectors and https://prismjs.com/

At this point, you have to do your CSS selectors as a batch run, and then run everything else and then patch the two together

1. tagSelector: `/([a-z1-6]*)(?={?)(?=[:,\.\s])/g` almost but also grabbing classes and IDs
   1. or `/([a-z1-6]*)(?=[:,.\s])/g` almost but also grabbing classes and IDs
   1. or `/([a-z1-6]*)(?=[:,.])/g` also with problems worse than above
   1. Github also has the following green: `+-n`

```
A. https://github.com/PrismJS/prism/blob/master/components/prism-css-extras.js


B. https://github.com/PrismJS/prism/blob/master/components/prism-css.js
pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,

var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
		'selector': {
			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),

C. https://github.com/PrismJS/prism/blob/master/components/prism-scss.js
	// CSS selector regex is not appropriate for Sass
	// since there can be lot more things (var, @ directive, nesting..)
	// a selector must start at the end of a property or after a brace (end of other rules or nesting)
	// it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
	// the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
	// can "pass" as a selector- e.g: proper#{$erty})
	// this one was hard to do, so please be careful if you edit this one :)

(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))
1. (?=\S) = positive lokahead to match non-whitespace
2. [^@;{}()]? = do not match those chars if they occur
3. (?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+ =
   4. (?: = Non-capturing group
      5. [^@;{}()\s] do not match those chars or spaces - OR statement...
      6. \s+ = match 1 or more whitespace
      7. (?!\s) = negative lookahead for a space - OR
      8. #\{\$[-\w]+\})+ =
9. (?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))
   10.

			'placeholder': /%[-\w]+/,
			'variable': /\$[-\w]+|#\{\$[-\w]+\}/

D. https://github.com/PrismJS/prism/blob/master/components/prism-sass.js
^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*
```

```css
/* Comment type 1 */
// Comment type 2
*,
*:before,
*:after {
  box-sizing: border-box;
}
/* `ex`, `vmin`, `vmax` */
/* @import url(&apos;https://fonts.googleapis.com/css?family=Inter:400,600&apos;); */
h1 p,
p.class,
p:first-child,
a:hover,
.bem__class--name1,
li > a,
.card *,
div + img,
ul > li[class='a'],
li:nth-child(-n + 3),
a:hover,
div ~ img,
blockquote,
li:nth-child(-n + 3),
li {
  font-family: 'Trebuchet MS', Arial, sans-serif;
  background-image: url('./images/filename.jpg');
  font-size: 1rem;
  height: 500vh;
  width: 100vw;
  color: #f1f5f9;
  color: rgb(255, 0, 0);
  color: hsl(0, 100%, 50%);
  border: 1px solid black !important;
}

::selection {
  color: blue;
}

@media (min-width: 450px) {
  .hero-text p {
    padding-right: 0.75em;
  }
}

@keyframes slidein {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
@import 'custom.css';

:root {
  --main-bg-color: #333;
}

.card {
  background-color: var(--main-bg-color);
}
/* start here for testing */
@import url('https://fonts.googleapis.com/css?family=Inter:400,600');
:root {
  --white: hsl(0, 0%, 100%);
}
body,
h1,
.dark_block,
#myid > a:hover {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-image: url('./images/pic.jpg');
  font-size: 1rem;
  color: var(--white);
  border: 1px solid red !important;
}
```

Prism.js css

```js
var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

			'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
			'pseudo-class': /:[-\w]+/,
			'class': /\.[-\w]+/,
			'id': /#[-\w]+/,
			'attribute': {
				pattern: RegExp('\\[(?:[^[\\]"\']|' + string.source + ')*\\]'),
				greedy: true,
        					'attr-name': {
						pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
						lookbehind: true
					},
					'attr-value': [
						string,
						{
							pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
							lookbehind: true
						}
					],
					'operator': /[|~*^$]?=/
```

## SASS and SCSS RegEx and colors

| Name          | RegEx | Color class |
| :------------ | :---- | :---------- |
| comments      | `//g` |             |
| selectIdClass | `//g` |             |
| selectHtmlEl  | `//g` |             |
|               | `//g` |             |
|               | `//g` |             |

```scss
/* Comment type 1 */
// components (button, card, nav)
@use './components/card';
@use 'variables';
@use 'base';
@use 'sass:map';

$primary: #326dee !default;
$base-font-size: 1rem;
$bgBody: #f9f9f9;
$fontColor: #333;
$colors: (
  'primary': $primary,
  'secondary': $secondary,
  'blue': #1919e6,
);
$layout-values: flex-start, flex-end, center, space-between, space-around,
  space-evenly;

@each $val in $layout-values {
  .justify-#{$val} {
    justify-content: $val;
  }
}
@include breakpoints.lg {
  @for $i from 1 through $grid-columns {
    .col-#{$i}-lg {
      box-sizing: border-box;
      flex-grow: 0;
      width: math.div($i * 100%, $grid-columns);
    }
  }
}
// Keywords: from, through, in,
body {
  font-family: 'Trebuchet MS', Arial, sans-serif;
}
.lg-img {
  display: block;
  width: 30rem;
  height: auto;
  margin-bottom: 2rem;
}

::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

header {
  background-color: $headerBgClr;
  color: $headerClr;

  .header-container h1 {
    margin: 0 auto;
    width: 80%;
    max-width: 1100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
  }

  a {
    color: $headerClr;
    font-size: 1.125rem;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 0.25em;
      color: $orange;
    }
  }
}
.navbar {
  @extend %flex-layout;
  padding: variables.$base-padding variables.$base-padding * 2;
  box-shadow: variables.$base-box-shadow;
}
%flex-layout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
```

1. Prismscss: https://github.com/PrismJS/prism/blob/master/components/prism-scss.js
1. examples for `@`: https://prismjs.com/examples.html

```js
Prism.languages.scss = Prism.languages.extend('css', {
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: true,
  },
  atrule: {
    pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
    inside: {
      rule: /@[\w-]+/,
      // See rest below
    },
  },
  // url, compassified
  url: /(?:[-a-z]+-)?url(?=\()/i,
  // CSS selector regex is not appropriate for Sass
  // since there can be lot more things (var, @ directive, nesting..)
  // a selector must start at the end of a property or after a brace (end of other rules or nesting)
  // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
  // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
  // can "pass" as a selector- e.g: proper#{$erty})
  // this one was hard to do, so please be careful if you edit this one :)
  selector: {
    // Initial look-ahead is used to prevent matching of blank selectors
    pattern:
      /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
    inside: {
      parent: {
        pattern: /&/,
        alias: 'important',
      },
      placeholder: /%[-\w]+/,
      variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    },
  },
  property: {
    pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
    inside: {
      variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    },
  },
});

Prism.languages.insertBefore('scss', 'atrule', {
  keyword: [
    /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
    {
      pattern: /( )(?:from|through)(?= )/,
      lookbehind: true,
    },
  ],
});

Prism.languages.insertBefore('scss', 'important', {
  // var and interpolated vars
  variable: /\$[-\w]+|#\{\$[-\w]+\}/,
});

Prism.languages.insertBefore('scss', 'function', {
  'module-modifier': {
    pattern: /\b(?:as|hide|show|with)\b/i,
    alias: 'keyword',
  },
  placeholder: {
    pattern: /%[-\w]+/,
    alias: 'selector',
  },
  statement: {
    pattern: /\B!(?:default|optional)\b/i,
    alias: 'keyword',
  },
  boolean: /\b(?:false|true)\b/,
  null: {
    pattern: /\bnull\b/,
    alias: 'keyword',
  },
  operator: {
    pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
    lookbehind: true,
  },
});

Prism.languages.scss['atrule'].inside.rest = Prism.languages.scss;
```

## JavaScript RegEx and colors

Prism.js regex for template string:

```js
/`(?:\\.|\$\{[^{}]*\}|(?!\$\{)[^\\`])*`/;
```

`*BT` = backtick symbol - a backtick RegEx for JavaScript will have to be able to grab anything that is ever put in between backticks in JS, meaning everything!

| Name      | RegEx         | Color class |
| :-------- | :------------ | :---------- |
| backTicks | /\`(.\*?)\`/g | light-blue  |
|           | `//g`         |             |
|           | `//g`         |             |

```js
/* Comment type 1 */
// My attempt at getting rid of the empty span tags (SUX!)
let newLineArr = [];
const str1 = `<span class="lime-green"></span>`;
const str2 = `<span class="blue"></span>`;
const str3 = `<span class="light-blue"></span>`;

function removeDups(arr, str) {
  arr.forEach(line => {
    // console.log(line)
    if (line.includes(str)) {
      repeatLen = str.length;
      repeatInd = line.indexOf(str);
      console.log(repeatInd, repeatLen);
      preNewLine = line.slice(0, repeatInd);
      postNewLine = line.slice(repeatInd + repeatLen);
      newLine = `${preNewLine}${postNewLine}`;
    } else {
      newLine = line;
    }
  });
  newLineArr.push(newLine);
}

removeDups(darkHtmDblQuotes, str1);
removeDups(darkHtmDblQuotes, str2);
removeDups(darkHtmDblQuotes, str3);
```

1. Prism javascript: https://github.com/PrismJS/prism/blob/master/components/prism-javascript.js

## JSX RegEx and colors

The regular expressions and colors used here I believe will also work for Astro files, as well as Vue.js and Angular. The colors used in VS Code are basically a combination of JavaScript with HTML.

| Name         | RegEx                             | Color class |
| :----------- | :-------------------------------- | :---------- |
| dblQuote     | `/(&quot;[.\w\/:*?-]*\w&quot;)/g` |             |
| htmlBoolAttr | `/(\s\w*)(?=&gt;)/g`              |             |
| htmlAttr     | `/([\w-]*)(?==)/g`                |             |
| htmlTag      | `(?<=&lt;\/*)([\w]*)`             |             |
|              | `//g`                             |             |

```jsx
// Comment
import React, { useContext } from 'react';
import TarpContext from '../TarpContext';
import { FaTimes, FaCheck } from 'react-icons/fa';

function Config_FR() {
  const state = useContext(TarpContext);
  const deg2Rad = Math.PI / 180;

  let outputObj = [];
  let finalObj = [];
  let cover = 0;

  const userTarp = [state.tarpLength, state.tarpWidth];

  class Config_FR {
    constructor(configName, len, width) {
      this.configName = configName;
      this.len = len;
      this.width = width;
    }
    alpha = 30;
    beta = 50;

    calcs() {
      const l = this.len * 12;
      const w = this.width * 12;
      const tarpSize = [this.len, this.width];

      // for loop here

      finalObj.push(outputObj);
    }
  }
  const FRLT_25 = new Config_FR(
    'Flat-Roof LT 25',
    userTarp[0],
    userTarp[1],
    0.75,
    0.25,
    FRLT25Img
  );
  FRLT_25.calcs();

  return (
    <div>
      {finalObj.map((type, index) =>
        type[2].sleepClear <= 0 && type[2].sleepDiagClr < 6 ? null : (
          <div
            key={index}
            className="flex flex-col justify-center items-center my-8 bg-slate-100 border border-solid border-slate-400 sm:flex-row"
          >
            <img
              src={type[2].configImg}
              alt={type[2].configName + ` configuration`}
              className="w-11/12 border-2 boder-solid border-slate-400 sm:m-4 sm:w-5/12 md:w-1/2"
            />
            {/* Removed a lot of code here */}
          </div>
        )
      )}
    </div>
  );
}
```

## JSON RegEx and colors

1. Properties in quotes: green
1. String values: light-blue
1. Boolean values: blue

| Name      | RegEx                                  | Color class |
| :-------- | :------------------------------------- | :---------- |
| property  | `/(&quot;[.\w\/:*\{\s?-]*\w&quot;):/g` | green       |
| dblQuotes | see Global                             | light-blue  |

```json
[
  {
    "Chord": "Maj",
    "Intervals": ["1", "3", "5"],
    "steps": [0, 4, 7],
    "test": true,
    "Tendency": ["I", "IV"],
    "scales": [
      { "Major Scale": ["1st", " 4th", " 5th"] },
      { "Minor Pentatonic": ["2nd"] }
    ]
  }
]
```

```
[
  {
    &quot;Chord&quot;: &quot;Maj&quot;,
    &quot;Intervals&quot;: [&quot;1&quot;, &quot;3&quot;, &quot;5&quot;],
    &quot;steps&quot;: [0, 4, 7],
    &quot;Tendency&quot;: [&quot;I&quot;, &quot;IV&quot;],
    &quot;scales&quot;: [
      { &quot;Major Scale&quot;: [&quot;1st&quot;, &quot; 4th&quot;, &quot; 5th&quot;] },
      { &quot;Minor Pentatonic&quot;: [&quot;2nd&quot;] }
    ]
  }
]
```

Prism.js regular expressions for JSON:

```js
Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: true,
    greedy: true,
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true,
  },
  comment: {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true,
  },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: {
    pattern: /\bnull\b/,
    alias: 'keyword',
  },
};
```

## PHP RegEx and colors

| Name | RegEx | Color class |
| :--- | :---- | :---------- |
|      | `//g` |             |
|      | `//g` |             |

```php
<?php

/*
  Plugin Name: Word Count Plugin
  Description: Plugin to display read time, character & word count for posts
  Version: 1.0.0
*/

class WordCountAndTimePlugin {
  function __construct() {
    add_action('admin_menu', array($this, 'adminPage'));
    add_action('admin_init', array($this, 'settings'));
    add_filter('the_content', array($this, 'ifWrap'));
  }

  function settings() {
    add_settings_section('wcp_first_section', null, null, 'word-count-settings-page');

    add_settings_field('wcp_location', 'Display Location', array($this, 'locationHTML'), 'word-count-settings-page', 'wcp_first_section');
    register_setting('wordcountplugin', 'wcp_location', array('sanitize_callback' => array($this, 'sanitizeLocation'), 'default' => '0'));
  }
}
$wordCountAndTimePlugin = new WordCountAndTimePlugin();
```

## Markdown RegEx and colors

| Name | RegEx | Color class |
| :--- | :---- | :---------- |
|      | `//g` |             |
|      | `//g` |             |

```markdown
<!-- Later... -->

[Link](https://example.com)

1. list item
```

## Other languages RegEx and colors

I only use the languages listed above. As a result, I have not done any coding or finding regular expressions for other languages. Let me know if you would like to contribute to this repo for other langauges.

I would like to have:

1. Git Bash for git and npm/npm commands
1. Shell (maybe)

Here are some code blocks

Git Bash

```bash
git init
git add .
git commit -m "First commit"
```

Batch files `*.bat`

```bat
set input=
set /p input= Choice:
if %input%==1 goto Start2 if NOT goto Start 2
if %input%==2 goto Exit if NOT goto Start 2
```

Powershell `*.ps1`

```ps1
Get-ExecutionPolicy -List
Get-Process
Get-Process | measure VirtualMemorySize -Sum
Get-Service | Where-Object {$_.status -eq "stopped"}
```

Shell `*.sh`

```sh
# User input
read -p "Enter your name: " USERNAME
echo "Hello $USERNAME"

# If Statement
if [ "$NAME" == "Jim" ]
then
  echo "Your name is Jim"
fi
```
