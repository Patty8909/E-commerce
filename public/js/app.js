$('.carousel').carousel()

$(document).ready(function() {
  var template = $('#commerce').html();
  var handtemplate = Handlebars.compile(template);
 // console.log(handtemplate);

  function categoria(data) {
     console.log(data.results);
    $.each(data.results, function(i, array) {
      // console.log(array.title);
      // console.log(array.thumbnail);
      // console.log(array.price);
      var html = handtemplate(array);
      console.log(html);
      $('#producto').append(html);
    });
  }

  $('.link').on('click', function() {
    var valor = $(this).text();
    console.log(valor);
    var urlcat = `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${valor}#json`;

    $.ajax({
      url: urlcat
    }).done(categoria);
  });

  var input = $('#input');

  $('#btn').on('click', function() {
    if (input.val()) {
      var valorInput = input.val();
      console.log(valorInput);
      var urlcat = `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${valorInput}#json`;
      
      $.ajax({
        url: urlcat
      }).done(categoria);
    }
  });
});


