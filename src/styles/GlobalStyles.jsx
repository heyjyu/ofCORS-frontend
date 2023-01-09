import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }
  
  a {
    color: black;
    text-decoration: none;
  }

  body {
    padding-top: 3em;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
