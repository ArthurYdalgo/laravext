import {DOMParser, parseHTML} from 'linkedom';

// Standard way: text/html, text/xml, image/svg+xml, etc...
// const document = (new DOMParser).parseFromString(html, 'text/html');

// Simplified way for HTML
const {
  // note, these are *not* globals
  window, document, customElements,
  HTMLElement,
  Event, CustomEvent
  // other exports ..
} = parseHTML(`
  <!doctype html>
  <html lang="en">
    <head>
      <title>Hello SSR</title>
    </head>
    <body>
      <form>
        <input name="user">
        <button>
          Submit
        </button>
      </form>
      <script>
        window.foo = 'bar';
    </script>
    </body>
  </html>
`);

// builtin extends compatible too 👍

document.body.appendChild(
  document.createElement('custom-element')
);


console.log(document.toString());
// the SSR ready document

document.querySelectorAll('form, input[name], button');
// the NodeList of elements
// CSS Selector via CSSselect