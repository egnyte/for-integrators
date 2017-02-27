# Get Folder's Items

Box reference: [Get Folder's Items](https://docs.box.com/reference#get-a-folders-items)

Box Facade [base paths](BoxFacadeBasePaths.md)

## Get Folder's Items

`GET /2.0/folders/FOLDER_ID/items`

**NOTE** root directory has id 0.

### Query params

`limit` and `offset`

### Example request

`curl -i -H "Authorization: Bearer <ACCESS_TOKEN>" https://<BASE_PATH>/2.0/folders/<FOLDER_ID>/items`

### Response

Unsupported fields replaced with `null`:

```json
{
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
```
