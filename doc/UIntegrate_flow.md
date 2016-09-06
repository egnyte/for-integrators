# UI Integration Framework

UI Integration Framework enables app developers to hook into the Egnyte Web UI to expose custom actions for their app. Currently, you can extend actions that can be performed on selected item(s) in the "More" menu and the Context menu. To get started with the UI Integration Framework, please contact partners@egnyte.com.

For a live demo of how UI Integrations work, try Example UI Integration app in your sandbox domain and see the [example app's code repository](https://github.com/egnyte/example-UIntegration)

# UI Integration Framework Invocation flow

When a user clicks on a button you've exposed, Egnyte server will send a POST request to your application's server with `invocationInput` containing the items that were selected and a token to access the Public API to work on those items. It expects a URL to open in the browser tab.

## Basic flow of the invocation

![flow diagram](UIntegrate_flow_diagram.mermaid.png)



## Suggested steps to ensure invocation is securely handled

![flow diagram](UIntegrate_flow_diagram_session.mermaid.png)

### invocationInput

```js
{
    "items": [
        {<storage item object that user selected>},
        ...
    ],
    "userInfo": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "username": "jdoe"
    },
    "domain": "acme.egnyte.com",
    "token": "public API token",
    "config": <settings saved via userSettings screen>,
    "configSaveUrl": <saveUrl>,
    "configSaveToken": <T>
}
```

Contents of `invocationInput` are sent to your app by Egnyte back-end to prevent them from passing throught the browser. Please make sure the `redirect` doesn't refer to them directly and they are not stored in cookies or localStorage.

configSaveUrl and configSaveToken can be used to update settings if necessary. For more context on them see User Settings flow below.


### browserFacingUrl

A one time use URL that contains an ID pointing to an invocationInput.
browserFacingUrl should expire in 2 to 5 minutes.

### finalUrl

A URL that is provided to the user with the UI for the application.

If one user session should be able to work with multiple invocations in separate tabs, make sure the finalUrl contains an ID pointing to invocationInput

The ID should only work for the user session that owns it.


## Assumptions you should make

1. When the user opens the tab with integration, they may leave it open for a day and come back to it. Handle that or prepare to display a nice screen to them telling the user to open it again.

2. Assume every invocation gets a different token. They match currently, but if you store one token and ignore others, you will get into trouble later. The tokens will get scoped to files/folders in single invocation.

3. Users will try to open more than one tab with integration. Handle this nicely even if you want them to only use one at the time. You can close

## Notify Egnyte of Changes (Optional)

While the app is open, it can communicate with Egnyte's Web UI using three events: completion, error, and refresh. For more information on sending events, please refer to [this section](https://github.com/egnyte/egnyte-js-sdk/blob/master/src/docs/uintegrate.md) of the JavaScript SDK.


# UI Integration Framework User Settings flow

User Settings flow occurs when a user installs the integration app. This flow is optional and only triggered if the userSettings Url is set in the definition.json. This flow is often used to save a user's authentication token. Egnyte generates a one-time use token and opens userSettings Url in a pop-up. Your application can then make a POST request to saveUrl provided. Egnyte saves the user settings data and sends these back with every invocation.

![flow diagram](UIntegrate_settings_diagram.mermaid.png)

When a user clicks to install your application, Egnyte produces a one-time use token, T, and opens the userSettings Url (defined in definition.json) in a new tab with the token appended to the Url.

Your application handles the GET request and lets the user provide his settings for your application. Your application sends a POST request to saveUrl with a JSON body that includes the token and data containing the user settings.

### userSettings
`userSettings` is a field from definition.json
Settings flow is only opened if the field exists.
`userSettings` is expected to be a valid URL without query parameters.

### queryParameters
Query parameters appended by the appstore to settings URL are as follows:
```
?domain=acme.egnyte.com&token=T&save_url=saveUrl
```

### POST to saveUrl
Sending a POST to `saveUrl` saves settings and they will be sent to the app on every invocation. If user cancels, the app remains installed and it needs to prompt for settings on invocation if necessary.

Token `T` is invalidated after a single request and can't be used anymore.

POST body:
```js
{
  "token": T,
  "data": {
    <key:value map of user settings>
  }
}
```


# Resolving branded domains

To resolve a domaain with branding:

- user inputs a `domain`
- check if domain is `somename.egnyte.com` if it is not, proceed
- make a GET request to `domain`/rest/public/1.0/env-pub to receive JSON
- read `workgroup.name` field from the response
- use `workgroup.name`.egnyte.com as egnyte domain to access public API
