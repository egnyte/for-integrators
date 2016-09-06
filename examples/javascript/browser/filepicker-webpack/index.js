var Egnyte = require("egnyte-js-sdk/dist/egnyte");
//Why? Because webpack doesn"t handle the browser field from package.json so we need to use a pre-bundled version
//Next major version of the SDK will handle this differently


var atoken, adomain;

window.startApp = function() {
    var contentNode = document.createElement("div");
    document.body.appendChild(contentNode);

    if (!atoken) {
        adomain = prompt("Your Egnyte domain for testing");
        atoken = prompt("Public API access token for that domain");
    }


    var eg = Egnyte.init(adomain, {
        token: atoken
    });

    eg.filePicker(contentNode, {
        selection: function(fileData) {
            console.info(fileData);
        },
        cancel: function() {
            console.warn("cancelled");
        },
        error: function(e) {
                console.error(e);
        }
        //some other options:
        // ,select: {
        //     folder: true,
        //     file: false,
        //     multiple: true
        // }
        // ,filterExtensions: function (ext) {
        //     return ext === "png";
        // }
    });

}
