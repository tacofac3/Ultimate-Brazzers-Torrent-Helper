console.log("Data norm is called");
var myData;
var uri = window.location.pathname;
console.log(uri + " in datanorm");
if (uri == '/popup.html') {
    var myData;
    $(document).ready(function () {
        console.log("Datanorm says => Document is ready");
        // On checkbox checked
        $('input[type=radio][name=userChoice]').change(function () {
            myData = $(this).attr('id');
            // Update local storage
            chrome.storage.sync.set({
                "data": myData
            }, function () {});
            console.log("myData has been changed to " + myData);
        });

        // Gets the data from local storage
        chrome.storage.sync.get(["data"], function (items) {
            if (items.data == null) {
                console.log("we need to set the default site");
                chrome.storage.sync.set({
                    "data": "x1337x.ws"
                }, function () {});
                items.data = "x1337x.ws";
            } else {
                console.log("We already know the data is " + items.data);
            }
            // Sets the checkbox
            checkit(items.data);
        });

        opted = myData;
    });
}

function checkit(id) {
    $('#' + id.replace('.', '\\.')).click();
}


//checkit('1337x\\.to');