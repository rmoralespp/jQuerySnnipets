$(function() {
    console.log('Documento cargado'); 
});

/* Eventos
Texto: html, text, val
Raton: click, dblclick, mouseover, mouseout, mouseenter, mouseleave
Teclado: keypress, keydown, focus, blur
Formularios: submit, change, focus, blur
Document: load, resize, scroll, unload
*/

var $parrafos = $('p');

// Multiples eventos asociados a un selector
$parrafos.on({
    mouseover: function(e) {
        handleEvent('mouseover');
    },
    mouseenter: function() {
        handleEvent('mouseenter');
    },
    mouseout: function() {
        handleEvent('mouseout');
    },
    mouseleave: function() {
        handleEvent('mouseleave');
    },
    click: function() {
        handleEvent('click');
    },

});

function handleEvent(evento) {
    console.log(`${evento} on`);
}


// Pasarle un objeto al manejador del evento cuando se dispara el evento
// Disparar manualmente el evento click
$parrafos.on('dblclick', {nombre: 'Rolando'}, function(e) { 
      console.log(e.data.nombre)
      $parrafos.trigger("click");
});





