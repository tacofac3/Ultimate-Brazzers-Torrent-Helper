var old = '';
var warned = false;

function sortTable(pos) {
    var rows = $('#mytable tbody tr').get();
    rows.sort(function (a, b) {

        var A = Number($(a).children('td').eq(pos).text());
        var B = Number($(b).children('td').eq(pos).text());

        if (A < B) {
            return 1;
        }
        if (A > B) {
            return -1;
        }
        return 0;
    });

    $.each(rows, function (_index, row) {
        $('#mytable').children('tbody').append(row);
    });
}

function main() {
    var table = $('.table-list.table.table-responsive.table-striped');
    table.attr('id', 'mytable');

    $('.coll-2').click(function () {
        sortTable(1);
    });
    $('.coll-3').click(function () {
        sortTable(2);
    });


    $(".js-modal-url").mouseenter(function () {
        var origin = $(this);
        old = origin.html();
        var url = origin.attr('href');

        // Handles URLs like https://22pixx.xyz/ia-o/2019/01/123456789.jpeg.html
        if (url.search('jpeg.html') !== -1) {
            url = url.replace('.html', '').replace('a-i', '').replace('b-i', '').replace('ia-', '');
            var imageTag = '<div style="position:relative;">' + '<img src="' + url + '" alt="' + url + '" height="300" />' + '</div>';
            console.log(imageTag);
            origin.html(imageTag);
        }
        // Handles pixsense.net text type links
        else if (origin.text().includes('pixsense.net')) {
            url = url.replace('pixsense', 'imgfile');
            $.ajax({
                url: url,
                type: 'get',
                success: function (data, _statusText, xhr) {
                    var status = Number(xhr.status);
                    console.log('Status code: ' + status);
                    url = $(data).find('.big_img_box').children('img').attr('src');
                    url = url.replace('http://', 'https://');
                    var imageTag = '<div style="position:relative;">' + '<img src="' + url + '" alt="' + url + '" height="300" />' + '</div>';
                    console.log(imageTag);
                    origin.html(imageTag);
                },
                error: function (jqXHR, exception) {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Please allow unsafe scripts to run by clicking the shield icon near the star in the address bar.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    if (!warned) {
                        alert(msg);
                        warned = true;
                    }
                }
            });
        }
    });
    $(".js-modal-url").mouseleave(function () {
        // $(this).html(old);
    });
}

$(document).ready(main);