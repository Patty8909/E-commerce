

$(document).ready(function() {
  $('.carousel').carousel();
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

    // configuración inicial del carrito 
    paypal.minicart.render({
      strings: {
        button: 'Pagar'
        , buttonAlt: 'Total'
        , subtotal: 'Total:'
        , empty: 'No hay productos en el carrito'
      }
    });
    // Eventos para agregar productos al carrito

    $('.item').click(function (e) {
      e.stopPropagation();
      paypal.minicart.cart.add({
        business: 'sistemasnik20@gmail.com', // Cuenta paypal para recibir el dinero
        item_name: $(this).attr('titulo'),
        amount: $(this).attr('precio'),
        currency_code: 'PEN',

      });
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


