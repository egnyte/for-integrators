var akey;

function startApp() {
    var contentNode = document.getElementById("content");

    if (!akey) {
        akey = prompt("Your Public API key");
    }


    var eg = Egnyte.init("put domain here if already known", {
        key: akey
    });
    eg.prompt(targetNode, {
        texts: {
            question: "Your egnyte domain address"
        },
        result: function(choice) {
            eg.setDomain(choice); //update the domain on current instance
            openFilepicker(eg)
        }
    });


}

function openFilepicker(eg) {
    eg.API.auth.requestTokenPopup(function() {
        console.log("Your token: " + eg.API.auth.getToken());

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
            //     return ext === 'png';
            // }
        });

    }, function() {
        console.log("Auth failed");
    }, window.location.href + "/token.html");
}
