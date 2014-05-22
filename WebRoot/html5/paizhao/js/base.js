(function () {
    var takePicture = document.querySelector("#take-picture"),
        showPicture = document.querySelector("#show-picture");

    if (takePicture && showPicture) {
            takePicture.onchange = function (event) {
            var files = event.target.files,file;
            if (files && files.length > 0) {
                file = files[0];
                try {
                       var URL = window.URL || window.webkitURL;
                       var imgURL = URL.createObjectURL(file);
                       showPicture.src = imgURL;
                       URL.revokeObjectURL(imgURL);
                }
                catch (e) {
                    try {
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            }
        };
    }
})();