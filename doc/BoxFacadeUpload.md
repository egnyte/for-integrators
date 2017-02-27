# Upload file

Box reference: [Upload File](https://docs.box.com/reference#upload-a-file)

Box Facade [base paths](BoxFacadeBasePaths.md)

**NOTE** that unlike Box, Box Facade exposes upload file endpoint at the same basepath (see above).

## Unsupported body parameters

* `content_created_at`
* `content_modified_at`

## Upload file

`POST /api/2.0/files/content`

### Example request

`curl -v -X POST -H "Authorization: Bearer <ACCESS_TOKEN>" https://<BASE_PATH>/api/2.0/files/content -k -F attributes='{"name":"TARGET_FILE_NAME.png", "parent":{"id":"<FOLDER_ID>"}}' -F file=@LOCAL_FILE_NAME.png`

### Response

Unsupported fields replaced with `null`:

```json
{
    "entries": [
        {
            "content_created_at": null,
            "content_modified_at": null,
            "created_at": null,
            "created_by": null,
            "description": "",
            "etag": null,
            "file_version": {
                "id": "26ec2b6a-2acf-46a4-8a7d-3f3f4fda2816",
                "sha512": "3f8fc7dc2630e7a6d779b82e42f6674de850822aaaebee67968f0b91081b6c6d17a40ba58e5fe5eb252ce0ddc6dff97e3e6ab75e794a71aa90066578b6e507a7",
                "type": "file_version"
            },
            "id": "4c96f7e9-0d94-49c7-a451-57bba08b9582",
            "item_status": "active",
            "modified_at": "2016-10-19T14:50:38+02:00",
            "modified_by": null,
            "name": "TARGET_FILE_NAME.png",
            "owned_by": null,
            "parent": {
                "etag": null,
                "id": "f1184280-e1ba-472b-a5ed-23435e798a93",
                "name": "UPLOAD_HERE",
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
                        "name": "UPLOAD_HERE",
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
    ],
    "total_count": 1
}
```

**NOTE:**

* the following response field was renamed: `sha1` to `sha512`.
* `id` field is `group_id` of the file (unique file identifier in Egnyte).
* `id` filed inside the `file_version` is `entry_id` of the file (file version identifier in Egnyte).

### Errors

* 400 - bad request (not supported fields provided, file specified before attributes, no local file specified, file name contains illegal characters, file name is too long, etc.)
* 403 - not enough permissions (to write to target folder)
* 404 - target folder not found

Error response example:

```json
{
    "code": "bad_request",
    "help_url": "https://developers.egnyte.com",
    "message": "Wrong file field name",
    "request_id": 39212,
    "type": "error"
}
```

**NOTE** that:

* `context_info` for `item_name_invalid` error is changed from

*"Names cannot contain non-printable ASCII, / or \\, leading or trailing whitespace. The special names \".\" or \"..\" are also unsupported."*

to

*"File names cannot contain leading or trailing spaces, trailing periods, control characters, or any of the following special characters: * ? / \\ : < > \" |"*

* If file already exists at specified location, the new version of it will be created, instead of throwing 409.
* Files cannot have descriptions, so `description` value is always an empty string.
