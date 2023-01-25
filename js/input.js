const inputText = 
``;

const inputHTML =
``;

const inputCSS =
`/* Single line comment, The CSS below is just an example */
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
``;

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
``;

const inputPHP =
`<?php

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
?>
<div class="container">
  <h3 class="custom-title"><?php esc_html_e('Latest Articles ', 'tower') ?></h3>`;