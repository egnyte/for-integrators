# Download file

Box reference: [Download File](https://docs.box.com/reference#download-a-file)

Box Facade [base paths](BoxFacadeBasePaths.md)

## Unsupported headers:

* `BoxApi`

## Download file

`GET /2.0/files/GROUP_ID/content`

Egnyte has two file identifiers: *group_id* (unique for file) and *entry_id* (unique for file version). The former is used to point to a specific file. The latter is used to specify the version of the file chosen before.

### Example request

`curl -i -H "Authorization: Bearer <ACCESS_TOKEN>" -H "Range: bytes:0-99" https://<BASE_PATH>/2.0/files/<GROUP_ID>/content?version=<ENTRY_ID>`

Here `ENTRY_ID` is the version of file specified by its `GROUP_ID`.

### Response

`302 Found` to a URL at `https://<BASE_PATH>/2.0/files/<DOWNLOAD_REQUEST_ID>/download`.

**NOTE** we do not cover the case when the file is not ready to be downloaded (Box returns `202 Accepted` with `Retry-After` header).

### Errors

* 400 - bad request (download request does not exist)
* 401 - request not authorized
* 404 - file not found, version of file not found
