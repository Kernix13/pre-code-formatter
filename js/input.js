const inputText = 
``;

const inputHTML =
``;

const inputCSS =
``;

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
  padding: variables$base-padding variables$base-padding * 2;
  box-shadow: variables$base-box-shadow;
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
``;

const inputJSON =
``;

const inputPHP =
``;