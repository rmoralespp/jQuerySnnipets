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

var parrafos = $('p');

// Multiples eventos asociados a un selector
parrafos.on({
    mouseover: function(e) {
        handleEvent(e.data.nombre);
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
});

function handleEvent(evento) {
    console.log(`${evento} on`);
}



