import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    word-break: keep-all;
  }
  
  a {
    color: black;
    text-decoration: none;
  }

  body {
    padding-top: 3.25em;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
