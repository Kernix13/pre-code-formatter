const inputText = 
``;

const inputHTML =
`<h3>HTML Example</h3>
<nav class="main-nav">
  <ul class="nav-list">
    <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="/contact">Contact</a></li>
  </ul>
</nav>`;

const inputCSS =
`/* The CSS below does not make sense, it's just an example */
body,
h1,
.dark_block,
.bem__Class--name,
a:hover {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-image: url('/images/picjpg');
  font-size: 1rem;
  background-color: #333;
  color: var(--text-main);
  border: 1px solid red !important;
}`;

const inputSASS =
`
@use './components/card';
@use 'base';
$primary: #326dee !default;
$base-font-size: 1rem;
$bgBody: #f9f9f9;
$colors: (
  'primary': $primary,
  'secondary': $secondary,
  'blue': #1919e6,
);
$layout-values: flex-start, flex-end, center, space-between, space-around, space-evenly;

@each $val in $layout-values {
  .justify-#{$val} {
    justify-content: $val;
  }
}
::placeholder {
  color: rgba(0, 0, 0, 0.5);
}
header {
  background-color: $headerBgClr;
  color: $headerClr;

  p {
    color: 
    img {
      width
    }
  }
  .header-container h1 {

    margin: 0 auto;
    width: 80%;
    max-width: 1100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    color: $headerClr;
    font-size: 1.125rem;

  &:hover {
      text-decoration: underline;
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
/* Comment */`;

const inputJS =
`const str = 'string for';
const num = 1.618;
const isNull = null;
const isUndefined = undefined;
let bool = true;
for (let item of arr)
const arr1 = [1, 12.36, 'word while'];
const obj = {
  a: 'word',
  b: '42',
  firstName: "Jim",
  "test": false
};
async function fxName(arr) {
  const output = await arr.forEach(item => {
    console.log(typeof item);
  });
  return output;
}
fxName(arr1);
if (bool !== true) {
  console.log(true);
} else {
  console.log(false);
}
const someNum = Math.random() * 10;
const today = new Date().getFullYear();
/* Start JavaScript classes */`;

const inputJSON =
`
{
  "Chord": "",
  "Intervals": ["1", "3", "5"],
  "steps": [0, 4, 7],
  "test": true,
  "Tendency": ["I", "IV"],
  "scales": [
    { "Major Scale": ["1st", " 4th", " 5th"] },
    { "Minor Pentatonic": ["2nd"] }
  ]
}`;

const inputMD =
`<!-- Markdown comment the same as for HTML -->
# MARKDOWN CHEAT SHEET
#### How about H4 as a comparison

[Link](https://example.com)
[Link text](URL 'Optional link title')
![picture alt text](https://url.com/images/filename.png 'Title is optional')
[Strike thru section](#strike-thru-section)
<span><img alt="alt" src="https://url.com/images/filename.jpg"></span>
<div align="right">&#8673; <a href="#back-to-top" title="Title">Back to Top</a></div>
Some other important footnote.[^2]
[^1]: This is footnote number one.
[^2]: Here is the second footnote.

- [ ] Incomplete _task_
- [x] Completed **task**

1. list item
1. Ordered item 2
   1. Child item 1

- bullet point
- List item 2
  - Child item 1

> Blockquote
> > Indented blockquote
> img tags as block level _unless_ nested in table cells

- this code or text is the old version
+ this is what it was changed to`;

const inputPHP =
`
class WordCountAndTimePlugin {
  function __construct() {
  add_action('admin_menu', array($this, 'adminPage'));
  add_action('admin_init', array($this, 'settings'));
  add_filter('the_content', array($this, 'ifWrap'));
  }

  function settings() {
  add_settings_section('wcp_first_section', null, null, 'word-count-settings-page');

  add_settings_field('wcp_location', 'Display Location',
  array($this, 'locationHTML'), 'word-count-settings-page', 'wcp_first_section');
  register_setting('wordcountplugin', 'wcp_location',
  array('sanitize_callback' => array($this, 'sanitizeLocation'), 'default' => '0'));
  }
}
$wordCountAndTimePlugin = new WordCountAndTimePlugin();
?>
<div class="container">
  <h3 class="custom-title"><?php esc_html_e('Latest Articles', 'tower') ?></h3>
</div>`;