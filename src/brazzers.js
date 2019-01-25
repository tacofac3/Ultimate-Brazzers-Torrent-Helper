var extension_name = "Ultimate brazzers torrent helper";

$(document).ready(function () {
    var uri = window.location.pathname;
    console.log(uri + " in brazers.js");
    if (uri == '/popup.html') {

    } else {
        chrome.storage.sync.get(["data"], function (items) {
            var site = items.data;
            console.log("FINAL SITE IS " + site);
            var j = $('.scene-title');
            var url = 'https://' + site + '/search/' + j.text().replace('!', '').replace('?', '') + '/1/';
            console.log(url);
            $.ajax({
                url: url,
                type: 'get',
                success: function (data, _statusText, xhr) {
                    var status = Number(xhr.status);
                    console.log('Status code: ' + status);
                    var res = data.match(new RegExp('<a href="/torrent/.+/">', ''));
                    var url2 = 'https://' + site + '' + res[0].split('"')[1];
                    $('.video-data.clearfix ul').prepend('<li class="external-added"><a target="_blank" href="' + url2 + '"><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/magnet-443-1049201.png" height=22 width=22/></a></li>');
                },
                error: function (jqXHR, exception) {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Looks like the torrent wesite didn\'t respond. Please try opening it manually once.\nIf the issue persists (your ISP blocks the site) then try using anohter site by clicking on the ' + extension_name + ' extension';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else if (jqXHR == 503) {
                        mag = 'The site is protected by cloudflare. Please click on ok to open the site manually once.\nIf the issue persists (your ISP blocks the site) then try using anohter site by clicking on the ' + extension_name + ' extension';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                    window.open('https://' + site + '');
                }
            });
        });
    }
});