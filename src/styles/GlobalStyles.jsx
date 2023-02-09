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
    background: #F5F5F7;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
