//Eventos globales Ajax
$(document).on({
    'ajaxStart': handleAjaxEvent('start'),
    'ajaxStop':  handleAjaxEvent('stop'),
});

function handleAjaxEvent(evento) {
    console.log('Ajax '+ evento);
}



$.ajax({
    url: '....',
    dataType: "json",
    global: false, /*Impide que se ejecuten los eventos globales de Ajax*/
    beforeSend: handleAjaxEvent('start'),    
})
.done(function() {
    // Datos recibidos desde Api
})
.always(function() {
    handleAjaxEvent('stop')
});


