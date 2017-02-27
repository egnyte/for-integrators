function getLinkSettingsForDomain(egnyte) {
    return egnyte.API.manual.promiseRequest({
            url: egnyte.domain + "/pubapi/v1/links/settings",
            method: "GET"
        })
        .then(function(response) {
            return response.body
        });
}

//===============
// {
//     "expiration": { //expiration setting by admin
//         "default": null,
//         "max_allowed": null,
//         "upload_links": true //upload links allowed (not relevant to APIs)
//     },
//     "file_links": { //types of file link access allowed
//         "anyone": true,
//         "password": true,
//         "domain": true,
//         "recipients": true,
//         "default_type": "anyone"
//     },
//     "folder_links": { //types of file link access allowed
//         "anyone": true,
//         "password": true,
//         "domain": true,
//         "recipients": false,
//         "default_type": "anyone"
//     }
// }
// If `file_links` field is not present, sharing liunks is disabled.
//===============
// {
//     "expiration": {
//         "default": {
//             "value": 1,
//             "unit": "days"
//         },
//         "max_allowed": null,
//         "upload_links": true
//     },
//     "file_links": {
//         "anyone": true,
//         "password": true,
//         "domain": true,
//         "recipients": true,
//         "default_type": "anyone"
//     },
//     "folder_links": {
//         "anyone": true,
//         "password": true,
//         "domain": true,
//         "recipients": false,
//         "default_type": "anyone"
//     }
// }
