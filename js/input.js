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
`@use '/components/card';
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
    color: $headerClr;
    img {
      max-width: 100%;
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
`str.slice()
arr.slice()
str.concat(str2, str3, …)
arr.concat(arr2, arr3, …)
str.includes(value)
arr.includes(value)
str.indexOf(value)
arr.indexOf(value)
str.lastIndexOf(value)
arr.lastIndexOf(value)
str.length
arr.length
str[index]
arr[index]
str.charAt(index)
arr.at(index)
str.substring()
arr.splice()
str.split()
arr.join()`;

const inputJSON =
`{
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
`Footnote.[^1]
Another footnote.[^2]

[^1]: This is footnote number one.
[^2]: Here is the second footnote.`;

const inputPHP =
`if ( have_posts() ) :
  while ( have_posts() ) :
  the_post();
    get_template_part( 'template-parts/content', 'front-page' ); ?>

  <aside class="bgcolor4"></aside>
    <div class="container"></div>
      <h3 class="custom-title">
      <?php esc_html_e('Latest Articles ', 'tower') ?>
      </h3>
      <div class="row"></div>
        <?php
        $posts = get_posts([
      'post_type'	 => 'post',
      'category_name'  => 'code',
      'posts_per_page' => 3,
    ]);

    foreach ($posts as $post) {
      setup_postdata($post); ?>

      <div class="recent-row">`;