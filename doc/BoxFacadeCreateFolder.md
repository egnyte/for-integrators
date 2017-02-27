# Create folder

Box reference: [Create Folder](https://docs.box.com/reference#create-a-new-folder)

Box Facade [base paths](BoxFacadeBasePaths.md)

## Create folder

`POST /2.0/folders/`

### Example request

`curl -v -X POST -H "Authorization: Bearer <ACCESS_TOKEN>" https://<BASE_PATH>/2.0/folders/ -k --data '{"name": "NEW_FOLDER", "parent": {"id": "<FOLDER_ID>"}}'`

### Response

Unsupported fields replaced with `null`:

```json
{
    "created_at": "2016-10-19T17:19:27+02:00",
    "created_by": null,
    "description": "",
    "etag": null,
    "folder_upload_email": null,
    "id": "96d400d3-e4f5-4435-af0f-0f1e45f6073a",
    "item_collection": {
        "entries": [],
        "limit": 100,
        "offset": 0,
        "total_count": 0
    },
    "item_status": "active",
    "modified_at": "2016-10-19T17:19:27+02:00",
    "modified_by": null,
    "name": "NEW_FOLDER",
    "owned_by": null,
    "parent": {
        "etag": null,
        "id": "f1184280-e1ba-472b-a5ed-23435e798a93",
        "name": "BOX",
        "sequence_id": null,
        "type": "folder"
    },
    "path_collection": {
        "entries": [
            {
                "etag": null,
                "id": "becc272b-3474-4583-8ffc-fb2fd4229858",
                "name": "",
                "sequence_id": null,
                "type": "folder"
            },
            {
                "etag": null,
                "id": "1544c9f0-c5df-4cce-94f5-f3c0c4353c43",
                "name": "Shared",
                "sequence_id": null,
                "type": "folder"
            },
            {
                "etag": null,
                "id": "e014fb7b-3a65-4d47-a928-16d7ada9cf3f",
                "name": "TEST",
                "sequence_id": null,
                "type": "folder"
            },
            {
                "etag": null,
                "id": "f1184280-e1ba-472b-a5ed-23435e798a93",
                "name": "PARENT_FOLDER",
                "sequence_id": null,
                "type": "folder"
            }
        ],
        "total_count": 4
    },
    "sequence_id": null,
    "shared_link": null,
    "size": 0,
    "type": "folder"
}
```

### Errors

* 400 - bad request (folder name contains illegal characters, folder name too long, no folder name provided, etc.)
* 403 - unsifficient permissions (not allowed to create folder at specified location)
* 404 - parent doesn't exist
* 409 - folder already exists

**NOTE** that:

* Illegal name error is changed from

*"Names cannot contain non-printable ASCII, / or \\, leading or trailing whitespace. The special names \".\" or \"..\" are also unsupported."*

to

*"File names cannot contain leading or trailing spaces, trailing periods, control characters, or any of the following special characters: * ? / \\ : < > \" |"*

* Folder size in not available, so `size` value is always 0.
