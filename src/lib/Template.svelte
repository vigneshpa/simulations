<header><slot name="header">Learning physics visually</slot></header>
<div class="content">
  <slot name="info" />
  <div class="responsiveGrid">
    <div class="sim"><div id="view"><slot name="view" /></div></div>
    <div class="controls"><slot name="controls" /></div>
  </div>
</div>
<footer>
  <slot name="footer">
    source code is avilable at <a href="https://GitHub.com/vigneshpa/simulations" target="_blank">GitHub.com</a>
  </slot>
</footer>

<style lang="scss">
  :global {
    :root {
      --background: white;
      --color: black;
      --a-color: rgb(23, 80, 155);
      --image-filter: none;
      --shadow: 0px 0px 5px grey;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --background: rgb(46, 46, 46);
        --color: white;
        --image-filter: invert(80%);
        --a-color: rgb(125, 181, 255);
        --shadow: 0px 0px 2px white;
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: var(--color);
      background-color: var(--background);
      -webkit-tap-highlight-color: transparent;
      line-height: 28px;
      line-height: 1.8rem;
    }
    a {
      color: var(--a-color);
    }
    label {
      padding: 0px 3px;
      display: inline-block;
      min-width: 100px;
      text-align: center;
    }
  }
  header {
    box-shadow: var(--shadow);
    color: var(--color);
    background-color: var(--background);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0.5em 0.2em;
    font-size: 1.2em;
    z-index: 2;
  }

  .content {
    margin: 0;
    margin-top: 80px;
    margin-bottom: 80px;
  }

  .responsiveGrid {
    margin: 0;
    padding: 25px;

    display: grid;
    grid-template-columns: auto auto;
  }
  @media only screen and (max-width: 1000px) {
    .responsiveGrid {
      grid-template-columns: auto;
    }
  }

  .controls {
    box-shadow: var(--shadow);
    border-radius: 1em;
    padding: 1em;
    margin-top: 30px;
    z-index: 0;
  }

  .sim {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 0.3em;
    box-shadow: var(--shadow);
    background-color: var(--background);
    z-index: 1;
  }
</style>
