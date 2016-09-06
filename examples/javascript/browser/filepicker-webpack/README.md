# File picker example standalone

This is the most basic example of how to use Egnyte SDK file picker with webpack.

`index.js` contains the code for the whole example

Webpack doesn't support `browser` field in package.json, so you have to use a pre-bundled version of the SDK. Next major version of SDK will be rewritten to have separate main files for browser and node.js

See [SDK docs](https://github.com/egnyte/egnyte-js-sdk/) for more details on usage.

- If your integration has a back-end, please consider using Auth Code flow with token being issued to your back-end instead.

## How to run

```
npm install
npm start
```

`npm start` will start a webpack-dev-server on [https://localhost:8080/](https://localhost:8080/)

Prepare your Egnyte domain and an API access token you can use with it and open [https://localhost:8080/](https://localhost:8080/) - the demo will prompt for those.

You can get the access token from browser console in filepicker-standalone example if you don't have one already.
