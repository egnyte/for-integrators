# Get Folder's Info

Box reference: [Get Folder's Info](https://docs.box.com/reference#get-folder-info)

Box Facade [base paths](BoxFacadeBasePaths.md)

## Get Folder's Info

`GET /2.0/folders/FOLDER_ID`

NOTE:

### Example request

`curl -i -H "Authorization: Bearer <ACCESS_TOKEN>" https://<BASE_PATH>/2.0/folders/<FOLDER_ID>`

### Response

Unsupported fields replaced with `null`:

```json
{
    "type": "folder",
    "id": "96d400d3-e4f5-4435-af0f-0f1045f6073a",
    "sequence_id": null,
    "etag": null,
    "name": "someFolder",
    "created_at": null,
    "modified_at": "2016-10-19T17:19:27+02:00",
    "description": "",
    "size": 0,
    "path_collection": {
        "entries": [
            {
                "etag": null,
                "id": "becc272b-3474-4003-8ffc-fb2fd4229858",
                "name": "",
                "sequence_id": null,
                "type": "folder"
            },
            {
                "etag": null,
                "id": "1544c9f0-c5df-4cce-04f5-f3c0c4353c43",
                "name": "Shared",
                "sequence_id": null,
                "type": "folder"
            },
            {
                "etag": null,
                "id": "e014fb7b-3a65-0047-a928-16d7ada9cf3f",
                "name": "TEST",
                "sequence_id": null,
                "type": "folder"
            },
            {
                "etag": null,
                "id": "f1184280-e1ba-400b-a5ed-23435e798a93",
                "name": "PARENT_FOLDER",
                "sequence_id": null,
                "type": "folder"
            }
        ],
        "total_count": 4
    },
    "created_by": null,
    "modified_by": null,
    "trashed_at": null,
    "purged_at": null,
    "content_created_at": null,
    "content_modified_at": null,
    "owned_by": null,
    "shared_link": null,
    "folder_upload_email": null,
    "parent": {
        "etag": null,
        "id": "f1184280-e1ba-472b-a50d-23435e798a93",
        "name": "BOX",
        "sequence_id": null,
        "type": "folder"
    },
    "item_status": "active",
    "item_collection": {
        "total_count": 2,
        "entries": [{
            "type": "folder",
            "id": "aa184280-e1ba-472b-a5ed-23435e798a93",
            "sequence_id": null,
            "etag": null,
            "name": "otherName"
        }, {
            "type": "file",
            "id": "bb184280-e1ba-472b-a5ed-23435e798a93",
            "file_version": {
                "type": "file_version",
                "id": "96d400d3-e4f5-4435-af0f-0f1e45f6273a",
                "sha512": "3f8fc7dc2630e7a6d0079b82e42f6674de850822aaaebee67968f0b91081b6c6d17a40ba58e5fe5eb252ce0ddc6dff97e3e6ab75e794a71aa90066578b6e507a7"
            },
            "sequence_id": null,
            "etag": null,
            "sha512": "3f8fc7dc2630e7a6d779b80042f6674de850822aaaebee67968f0b91081b6c6d17a40ba58e5fe5eaaace0ddc6dff97e3e6ab75e794a71aa90066578b6e507a7",
            "name": "lastName"
        }],
        "offset": 0,
        "limit": 100,
        "order": [{
            "by": "type",
            "direction": "ASC"
        }, {
            "by": "name",
            "direction": "ASC"
        }]
    }
}
```
