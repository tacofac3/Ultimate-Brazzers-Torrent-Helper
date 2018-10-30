var old = ''

function sortTable(pos){
  var rows = $('#mytable tbody tr').get();
	rows.sort(function(a, b) {

  var A = Number($(a).children('td').eq(pos).text());
  var B = Number($(b).children('td').eq(pos).text());
  
  if(A < B) {
    return 1;
  }

  if(A > B) {
    return -1;
  }

  return 0;

  });

  $.each(rows, function(index, row) {
    $('#mytable').children('tbody').append(row);
  });
}

function main() {
    console.log('ok')
    
    var table = $('.table-list.table.table-responsive.table-striped');
    table.attr('id','mytable')
    
    $('.coll-2').click(function(){
        sortTable(1)
    });
    $('.coll-3').click(function(){
        sortTable(2)
    });
    
    
    $(".js-modal-url").mouseenter(function(){
        old = $(this).html()
        var url = $(this).attr('href')
        if (url.search('jpeg.html')!== -1) {
            url = url.replace('.html','').replace('a-i','').replace('b-i','')
            var imageTag='<div style="position:relative;">'+'<img src="'+url+'" alt="image" height="300" />'+'</div>';
            $(this).html(imageTag);
        }
    });
    $(".js-modal-url").mouseleave(function(){
        //$(this).html(old)
    });
}

$(document).ready(main);