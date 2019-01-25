var user_choice = 'x1337x.ws';

function main() {
    var j = $('.scene-title');
    var url = 'https://' + user_choice + '/search/' + j.text().replace('!', '').replace('?', '') + '/1/';

    $.ajax({
        url: url,
        type: 'get',
        success: function (data, _statusText, xhr) {
            var status = Number(xhr.status);
            console.log('Status code: ' + status);
            var res = data.match(new RegExp('<a href="/torrent/.+/">', ''));
            var url2 = 'https://' + user_choice + '' + res[0].split('"')[1];
            $('.video-data.clearfix ul').prepend('<li class="external-added"><a target="_blank" href="' + url2 + '"><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/magnet-443-1049201.png" height=22 width=22/></a></li>');
        },
        error: function () {
            alert('Looks like the torrent wesite didn\'t respond. Please try opening it manually once.');
            window.open('https://' + user_choice + '');
        }
    });
}

$(document).ready(main);