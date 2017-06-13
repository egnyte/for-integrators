# File Picker Service *Beta*

File Picker Service (aka FPaaS) provides a simple API to open an interactive Egnyte file picker without implementing any of the authentication and interactions required.

**Browser support**

All modern browsers and IE11.

While it should work in IE10 but it's not officially supported.

## Running File Picker

### Attaching the script

The go-to way is to download the clientside script and host it with your code.

During *Beta* you can attach this script directly from our server to make sure it's being updated. Otherwise, you might need to update the script at some point before *Beta* ends.

We will maintain the script there after beta is finished, so using the script provided from Egnyte servers and switching to hosting it later is the least-maintenance route. We recommend it if you can include third-party scripts.

```html
<script src="https://us-partner-integrations.egnyte.com/services/pick/popup.js"></script>
```

After *Beta*, the script will become stable and will no longer require you introduce any changes to it, so can be safely copied and hosted by your own app.

### Using the service

Get the script attached to the page and:

```
EgnyteService.openPicker({
        key: "YOUR_API_KEY_FOR_PUBLIC_APIS",
        feature: {
            action: "ACTION_NAME",
            settings: {}, //action specific
            pickerOptions: {} //options to pass to File Picker    
        },
        targetNode: document.querySelector("SELECTOR_FOR_DOM_NODE_TO_RENDER_IN"),
        success: function (result) {
            //handle success here.
            //result has different values depending on feature
        },
        error: function (err) {
            //Unrecoverable error, message the user and give them an option to try again
        }
    })
```

*Example*

```
EgnyteService.openPicker({
        key: "khwt5ru2a8mtuveyts9ydg6e",
        feature: {
            action: "createLink"
        },
        targetNode: document.querySelector("#pickerWrapper"),
        success: function (result) {

        },
        error: function (err) {

        }
    })
```

## Error responses

`error` callback is called with the following object:

```
{
    "error": "<error message>",
    "user": "<optional: username, when available at the time of error>",
    "domain": "<optional: Egnyte domain, when available at the time of error>",
}
```


## Available actions

### createLink

Creates a link to an item user selected in File Picker.

Link type can be set in `feature.settings.accessibility` and it can be "anyone", "domain", "direct". If it is not set it will take default value configured in Egnyte Connect.

Success:
```
{
    "user": "<username>",
    "domain": "<egnyte domain>",
    "data": {
        url: "<share link>",
        name: "<name of file / folder>"
    }
}
```

If selected accessibility is not allowed by the domain, the service will try to create the next best thing.
- "anyone" not allowed => use "domain"
- no "share Links" allowed at all => use "direct"

### createLinkAccessibility

Creates a link to an item user selected in File Picker.

Same as createLink, but link type is chosen by the user after they choose a file.

Success:
```
{
    "user": "<username>",
    "domain": "<egnyte domain>",
    "data": {
        url: "<share link>",
        name: "<name of file / folder>"
    }
}
```

### getSelection

Returns details about selected file or folder. `data` is exactly matching what Egnyte Public API returns for the item.

Folder:
```
{
    "user": "<username>",
    "domain": "<egnyte domain>",
    "data": {
        folder_id : "<id>"
        is_folder : true
        lastModified : "<last modified timestamp>"
        name : "<selection name>"
        path : "<path to selection>"
    }
}
```

File:
```
{
    "user": "<username>",
    "domain": "<egnyte domain>",
    "data": {
        "checksum": "<checksum>",
        "size": <number>,
        "path": "<path to selection>",
        "name": "<selection name>",
        "locked": <bool>,
        "is_folder": false,
        "entry_id": "<entry_id>",
        "group_id": "<group_id>",
        "last_modified": "<date>",
        "uploaded_by": "<user name>",
        "num_versions": <number>
    }
}
```
