function getNonCollidingFileName(targetFolderId, expectedFileName, extension) {
    return egnyte.API.storage.folderId(targetFolderId).get()
        .then(function(parent) {
            var fileNames = parent.files.map(function(el) {
                return el.name;
            });
            //depending on your usecase, you might need to make sure you're not colliding with folders too
            // var fileNames = parent.files.concat(parent.folders).map(function(el) {
            //     return el.name;
            // });

            var fileName = expectedFileName;
            var counter = 0;
            while (fileNames.indexOf(fileName) !== -1) {
                counter++;
                fileName = expectedFileName + "_" + counter + "" + extension;
            }

            return fileName;
        })
}

// ES6

function getNonCollidingFileName(targetFolderId, expectedFileName, extension) {
    return egnyte.API.storage.folderId(targetFolderId).get()
        .then((parent) => {
            const fileNames = parent.files.map(el => el.name);
            //depending on your usecase, you might need to make sure you're not colliding with folders too
            // const fileNames = parent.files.concat(parent.folders).map(el => el.name)

            let fileName = expectedFileName;
            let counter = 0;
            //array.includes is not available in some mostly es6 compatible envs
            while (fileNames.includes(fileName)) {
                counter++;
                fileName = `${expectedFileName}_${counter}${extension}`;
            }

            return fileName;
        })
}
