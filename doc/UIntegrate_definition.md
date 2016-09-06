# UI Integration Framework definition.json file

The definition.json file defines the listing for your app for our apps page and instructs Egnyte on how custom actions should be exposed in our UI.

## Annotated definition.json

FUTURE means a field reserved for future use but not yet available

```js
{
    "appId": <GUID>, // unique identificator for your app. no special characters
    "domains": [<list of domains to restrict this integration to>]
    "name": <app name>,
    "apiKey": <public API key>,
    "company": {
        "name": <company name>,
        "website": <company website> (optional)
    },
    "support": { // at least a web or email value is required
        "web": <support website> (optional),
        "email": <support email address> (optional),
        "phone": <support phone number>  (optional)
    },
    "userManual": <url to user manual> (optional),
    "categories": [<suggested set of categories, subset of ["productivity", "collaboration", "businessAutomation", "securityAdministration", "projectManagement", "migrationSynchronization"]],
    "industries": [<suggested set of industries, FUTURE>],
    "type": "egnyte_ui|web|mobile|desktop", // FUTURE, if you're making a UI Integration, use "egnyte_ui"
    "userSettings": <url to index of the userSettings static js app (optional)>,
    "globalSettings": <url to index of the globalSettings static js app (optional), FUTURE>,
    "description": <short description for appstore>,
    "longDescription": <long description for appstore> (optional),
    "appLogo": <url to app logo image, visible in the appstore, white or transparent background, no padding, preferred up to 236 x 126 px>,
    "invocationAppLogo": <url to app logo image, visible in invocation loading screen, white or transparent background, no size/shape restrictions, defaults to appLogo value> (optional), //We are really not resizing it, if you provide a fullhd image it'll look silly
    "version": text (optional) FUTURE,
    "screenshots" : {
        "video": [<array with a YouTube video url, preferred 16:9 ratio>] (max 1, optional), // in order not to break CFS
        "images": [<array of image urls, preferred 16:9 ratio, preferred at least 425 x 239 px>] (3+ required, videos can count towards this number)
    },
    "url": <url to app>, // only for links/downloadable apps, skip this field for UI Integration Framework apps
    "supportedPlatforms": ["windows|mac|linux|ios|android|wp"], // only for type other than (web|egnyte_ui), skip this field for UI Integration Framework apps
    "integrations": { // only required for "type" === "egnyte_ui"
        "someId": { // not visible to customers, helps tracking what shows up in context menu. no special characters.
            "entryPoint": <context_menu | more_menu>
            "allowedPaths": [<restrict the integration to these file system paths>,...] (simple glob string starting from root, optional), //the glob syntax is simplified to only allow * as a special character
            "permissionLevels": [<restrict the integration to these permission levels> (optional)],
            "types": ["file","folder"],
            "extensions": ["xls","xlsx"] (optional),
            "accessLevel": <selection | folder | fileSystem> (optional) FUTURE,
            "serviceUrl": <url of a custom remote service or static app>,
            "invocationMethod": <post_to_tab | post_headless FUTURE | get_to_modal FUTURE>,
            "icon": <icon name from fontawesome 3.2 OR icon image url (14 x 14 px, solid color #626364, transparent background)> (optional),
            "selectionQuantity": <"single" | "multiple" | [2,5]>, //default: not defined == always
            "text": "text to show as menu option if applicable" (optional, defaults to someId value),
            "tooltip": "tooltip text" (optional)
        },
        {... optionally more integrations ...}
    }
}
```


## Example definition.json

```js
{
    "appId": "abccompany",
    "name": "ABC sign",
    "company": {
        "name": "ABC Company, Inc."
    },
    "apiKey": *** ,
    "support": {
        "web": "https://example.com/abccompany/helpdesk"
    },
    "categories": ["productivity", "collaboration"],
    "type": "web",
    "appLogo": "https://example.com/abccompany/static/abc_company_logo.png",
    "description": "Send documents for electronic signature using ABC Company.",
    "longDescription": "Send documents from your Egnyte account to ABC Company for signing. Once the e-signature workflow is complete, the signed document is automatically saved back to your Egnyte account.",
    "screenshots": {
        "images": [
            "https://example.com/abccompany/static/screen1",
            "https://example.com/abccompany/static/screen2",
            "https://example.com/abccompany/static/screen3"
        ]
    },
    "userSettings": "https://example.com/abccompany/user/setup",
    "integrations": {
        "sendFiles": {
            "entryPoint": "context_menu",
            "types": [
                "file"
            ],
            "serviceUrl": "https://example.com/abccompany/files/invoke",
            "extensions": [
                "pdf",
                "doc",
                "docx"
            ],
            "permissionLevels": [
                "owner",
                "full",
                "editor"
            ],
            "invocationMethod": "post_to_tab",
            "icon": "https://example.com/abccompany/static/abccompany_icon.png",
            "text": "Send with ABC Company"
        },
        "view": {
            "entryPoint": "more_menu",
            "types": [
                "folder"
            ],
            "serviceUrl": "https://example.com/abccompany/envelopes/invoke",
            "permissionLevels": [
                "owner",
                "full",
                "editor",
                "viewer"
            ],
            "invocationMethod": "post_to_tab",
            "icon": "list-alt",
            "text": "Check Status of ABC Company Requests"
        }
    }
}
```
