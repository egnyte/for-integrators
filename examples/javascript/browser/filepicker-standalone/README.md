# File picker example standalone

This is the most basic example of how to use Egnyte SDK file picker along with in-browser auth.

`app.js` contains the code for the whole example

`token.html` which is used for passing the token from popup to main page comes from egnyte-js-sdk and can be found here: https://github.com/egnyte/egnyte-js-sdk/blob/master/dist/resources/token.html

`egnyte.min.js` comes from https://github.com/egnyte/egnyte-js-sdk/blob/master/dist/

See [SDK docs](https://github.com/egnyte/egnyte-js-sdk/) for more details

- If your integration has a back-end, please consider using Auth Code flow with token being issued to your back-end instead.

## How to run

```
npm install
npm start
```

`npm start` will start a server on [https://localhost:8080/](https://localhost:8080/)

Prepare your Egnyte domain and an API Key you can use with it and open [https://localhost:8080/](https://localhost:8080/) - the demo will prompt for those.
