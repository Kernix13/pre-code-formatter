# Regular expressions used for this app

When it comes to code blocks in a `pre` tag on a docs page or a blog post, you can have the entire code block in a single color. If it is a dark code block, then the code will be white or light gray, and if it's a light code block it will be black or dark gray.

That's fine. However, a code block with color syntax highlighting not only looks good, but it is easier to read. As a result, a syntax highlighted code block will make your blog posts look better than other peopels's posts.

But how many colors would you need? You can try to recreate your own code editor, or look at other blog posts, documentation pagees, and language block markdown files.

Since I am adding span tags with a color class around every RegEx match, I would like to have only enough colors to make the code readable and have differentiation between different languages.

## Colors and classes

I do not want to add span tags around characters like `(){}[],;:`, etc. Therefore, all code not wrapped in a `span.color` tag will be white for dark code bloacks, and black for light code blocks.

All languages seem to use light-blue for values in single-quotes, double-quotes, and backticks so I will use RegEx to add a `span.light-blue` around those symbols and the contents.

## VS Code colors

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

## HTML RegEx and colors

**NOTE**: the HTML atttribute RegEx has to be run first or else it will wrap tags around `span.color` tags added for other scans of the code.

| Name         | RegEx                             |
| :----------- | :-------------------------------- |
| dblQuote     | `/(&quot;[.\w\/:*?-]*\w&quot;)/g` |
| htmlBoolAttr | `/(\s\w*)(?=&gt;)/g`              |
| htmlAttr     | `/([\w-]*)(?==)/g`                |
| htmlTag      | `(?<=&lt;\/*)([\w]*)`             |

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
```

### Misc HTML regex to most likely be deleted later

1. Match opening and closing HTML tags with content between
   1. `/^<([a-z1-6]+)([^<]+)*(?:>(.*)<\/\1>| *\/>)$/`
1. Match the src attribute of an HTML image tag
   1. `/^<\s*img[^>]+src\s*=\s*(["'])(.*?)\1[^>]*>$/`
1. Match standard CSS comments
   1. `/\/\*[^*]*\*+([^/*][^*]*\*+)*\//`
1. my current regex: `/"[\w\/-]*/gm`

Quotes, double-quotes, and backticks:

1. THIS GRABS TEXT BETWEEN DOUBLE-QUOTES: `/"[.\w\/:*?-]*/g`
   1. match with entity replacement: `/&quot;[.\w\/:*?-]*/g`
1. THIS GRABS TEXT BETWEEN SINGLE-QUOTES: `/'[.\w\/:*?-]*/g`
   1. match with entity replacement: `/&apos;[.\w\/:*?-]*/g`
1. THIS GRABS TEXT BETWEEN BACK-TICKS: `/[.\w\/:*?-]\*/g

HTML tags:

1. OPENING html tag: `/<.*?>/g` - but I need the element name not the LT and GT signs
1. CLOSING html tag: `/<\/.*?>/g`
1. Opening tag entity and html tag: `/(&lt;[\w]*)/g`
1. opening html element only (positive lookbehind): `/(?<=&lt;)[\w]*/g` or `/((?<=&lt;)[\w]*)/g`
1. Closing tag entity and html tag: `//g`
1. closing html element only (???): `/(?<=&lt;\/)[\w]*/g` or `/((?<=&lt;\/)[\w]*)/g`
1. both tags: `/((?<=&lt;\/*)[\w]*)/g`
1. attribute selector BUT with `-`: `/[\w-]*(?==)/g`

## CSS RegEx and colors

Lookaheads: https://www.regular-expressions.info/lookaround.html
Zero-Length Regex Matches: https://www.regular-expressions.info/zerolength.html

| Name          | RegEx |
| :------------ | :---- |
| comments      | `//g` |
| selectIdClass | `//g` |
| selectHtmlEl  | `//g` |
|               | `//g` |
|               | `//g` |

```css
/* Comment type 1 */
// Comment type 2
*,
*:before,
*:after {
  box-sizing: border-box;
}

blockquote,
.class,
#id,
.bem__class--name {
  font-family: 'Trebuchet MS', Arial, sans-serif;
  font-size: 1rem;
  height: 100vh;
  color: #333;
  color: rgb(255, 0, 0);
  color: hsl(0, 100%, 50%);
  border: 1px solid black;
}

::selection {
  color: blue;
}
```

## SASS and SCSS RegEx and colors

| Name          | RegEx |
| :------------ | :---- |
| comments      | `//g` |
| selectIdClass | `//g` |
| selectHtmlEl  | `//g` |
|               | `//g` |
|               | `//g` |

```scss
/* Comment type 1 */
// Just examples

@use 'variables';
@use 'base';

$bgBody: #f9f9f9;
$fontColor: #333;

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

  .header-container {
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
```

## JavaScript RegEx and colors

`*BT` = backtick symbol - a backtick RegEx for JavaScript will have to be able to grab anything that is ever put in between backticks in JS, meaning everything!

| Name        | RegEx                             |
| :---------- | :-------------------------------- |
| singleQt    | `/(&apos;[.\w\/:*?-]*\w&apos;)/g` |
| `*backTick` | `/(BT[.\w\/:*?-]\*\wBT)/g`        |
|             | `/BT([.\w\/:*?-]\*\w)BT/g`        |
|             | `//g`                             |
|             | `//g`                             |

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

## JSX RegEx and colors

The regular expressions and colors used here I believe will also work for Astro files, as well as Vue.js and Angular. The colors used in VS Code are basically a combination of JavaScript with HTML.

| Name         | RegEx                             |
| :----------- | :-------------------------------- |
| dblQuote     | `/(&quot;[.\w\/:*?-]*\w&quot;)/g` |
| htmlBoolAttr | `/(\s\w*)(?=&gt;)/g`              |
| htmlAttr     | `/([\w-]*)(?==)/g`                |
| htmlTag      | `(?<=&lt;\/*)([\w]*)`             |
|              | `//g`                             |

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

| Name | RegEx |
| :--- | :---- |
|      | `//g` |
|      | `//g` |

```json
[
  {
    "Chord": "Maj",
    "Intervals": ["1", "3", "5"],
    "steps": [0, 4, 7],
    "Tendency": ["I", "IV"],
    "scales": [
      { "Major Scale": ["1st", " 4th", " 5th"] },
      { "Minor Pentatonic": ["2nd"] }
    ]
  }
]
```

## PHP RegEx and colors

| Name | RegEx |
| :--- | :---- |
|      | `//g` |
|      | `//g` |

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

| Name | RegEx |
| :--- | :---- |
|      | `//g` |
|      | `//g` |

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
