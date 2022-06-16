import { createGlobalStyle } from 'styled-components';
import GilroyRegular from "./fonts/Gilroy-Regular.ttf";
import GilroyBold from "./fonts/Gilroy-Bold.ttf";
import GilroyMedium from "./fonts/Gilroy-Medium.ttf";

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    height: 100vh;
  }

  body {
    font-family: 'GilroyRegular', Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  a{
    cursor:pointer;
    color:#000;
    text-decoration:none;
    :hover{
        text-decoration:underline;
    }
  }

  p,
  label {
    font-family: 'Gilroy-Regular', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  h1,h2,h3,h4{
  font-family: "GilroyBold"
  }

  p{
    line-height:1rem;
  }

  p,div,input,li{
    font-family: "GilroyRegular"
  }

  label{
    font-family: "GilroyMedium"
  }

  @font-face {
    font-family: "GilroyBold";
    src: url(${GilroyBold}) format("truetype");
    font-weight: bold;
  }
  @font-face {
    font-family: "GilroyMedium";
    src: url(${GilroyMedium}) format("truetype");
    font-weight: normal;
  }
  @font-face {
    font-family: "GilroyRegular";
    src: url(${GilroyRegular}) format("truetype");
  }

  select {
    // A reset of styles, including removing the default dropdown arrow
    appearance: none;
    // Additional resets for further consistency
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
  }

`;
