# Update File Info

Current implementation allows you to move and rename files.

Box reference: [Update File Info](https://docs.box.com/reference#update-a-files-information)

Box Facade [base paths](BoxFacadeBasePaths.md)

## Unsupported body parameters

* `description`
* `shared_link` (and its childs `access`, `unshared_at`, `permissions`, `download`, `preview`)
* `tags`

## Update File Info

`PUT /2.0/files/GROUP_ID`

Egnyte has two file identifiers: *group_id* (unique for file) and *entry_id* (unique for file version). The former is used for the request.

### Example request

`curl -v -X PUT -H "Authorization: Bearer ACCESS_TOKEN" https://BASE_PATH/2.0/files/GROUP_ID -k --data '{"name": "NEWNAME.png", "parent": {"id": "DESTINATION_FOLDER_ID"}}'`

### Response

Unsupported fields replaced with `null`:

```json
{
    "content_created_at": null,
    "content_modified_at": null,
    "created_at": null,
    "created_by": null,
    "description": "",
    "etag": null,
    "file_version": {
        "id": "8282a30b-0c3d-4e9e-9348-8873528483e1",
        "sha512": "3f8fc7dc2630e7a6d779b82e42f6674de850822aaaebee67968f0b91081b6c6d17a40ba58e5fe5eb252ce0ddc6dff97e3e6ab75e794a71aa90066578b6e507a7",
        "type": "file_version"
    },
    "id": "c6177111-1adf-4a51-9d67-b6cc9049db92",
    "item_status": "active",
    "modified_at": "2016-09-26T11:42:12+02:00",
    "modified_by": null,
    "name": "NEWNAME.png",
    "owned_by": null,
    "parent": {
        "etag": null,
        "id": "afa9c818-c604-4472-bff0-bf445ba1794c",
        "name": "NEWLOCATION",
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
                "id": "afa9c818-c604-4472-bff0-bf445ba1794c",
                "name": "NEWLOCATION",
                "sequence_id": null,
                "type": "folder"
            }
        ],
        "total_count": 4
    },
    "purged_at": null,
    "sequence_id": null,
    "sha512": "3f8fc7dc2630e7a6d779b82e42f6674de850822aaaebee67968f0b91081b6c6d17a40ba58e5fe5eb252ce0ddc6dff97e3e6ab75e794a71aa90066578b6e507a7",
    "shared_link": null,
    "size": 10193,
    "trashed_at": null,
    "type": "file"
}
```
**NOTE**

* the following response field was renamed: `sha1` to `sha512`.
* `id` field is `group_id` of the file (unique file identifier in Egnyte).
* `id` filed inside the `file_version` is `entry_id` of the file (file version identifier in Egnyte).

### Errors

* 400 - name invalid (too long, contains illegal characters, etc.)
* 401 - not authorized
* 403 - unsifficient permissions (not allowed to access file, not allowed to access parent, etc.)
* 404 - not found (file not found, parent not found, etc.)
* 501 - unsupported parameter(s) provided

**NOTE** that:

* `context_info` for `item_name_invalid` error is changed from

*"Names cannot contain non-printable ASCII, / or \\, leading or trailing whitespace. The special names \".\" or \"..\" are also unsupported."*

to

*"File names cannot contain leading or trailing spaces, trailing periods, control characters, or any of the following special characters: * ? / \\ : < > \" |"*

* If target path is taken, the file will be moved as a new version, instead of throwing 409.
* If both target file and parent folder doesn’t exist, context_info returned on error will contain only one of those errors, not both.
* Files cannot have descriptions, so `description` value is always an empty string.
