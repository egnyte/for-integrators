# UI Integration Framework Invocation flow

## Basic flow of the invocation

![flow diagram](UIntegrate_flow_diagram.mermaid.png)

## Suggested way of implementing a secure flow for POST to open new tab invocation pattern

![flow diagram](UIntegrate_flow_diagram_session.mermaid.png)

### invocationInput

```js
{
    "items": [
        {<storage item object that user selected>},
        ...
    ],
    "domain": "acme.egnyte.com",
    "token": "public API token",
    "config": <settings saved via userSettings screen>
}
```

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


# UI Integration Framework User Settings flow

![flow diagram](UIntegrate_settings_diagram.mermaid.png)

### userSettings
`userSettings` is a field from definition.json
Settings flow is only opened if the field exists.
`userSettings` is expected to be a valid URL without query parameters.

### queryParameters
Query parameters appended by the appstore to settings URL are as follows:
```
?domain=acme.egnyte.com&token=T&save_url=saveUrl
```

Sending a post to `saveUrl` saves settings and they will be sent to the app on every invocation. If user cancels, the app remains installed and it needs to prompt for settings on invocation if necessary.


# Resolving branded domains

To resolve a domaain with branding:

- user inputs a `domain`
- check if domain is `somename.egnyte.com` if it is not, proceed
- make a GET request to `domain`/rest/public/1.0/env-pub to receive JSON
- read `workgroup.name` field from the response
- use `workgroup.name`.egnyte.com as egnyte domain to access public API
