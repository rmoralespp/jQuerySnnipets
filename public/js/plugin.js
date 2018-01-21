;(function($, window, undefined){
    var Plugin = function(elemento, opciones) {
        this.elemento = elemento;
        this.$elemento = $(elemento);

        if(this.init) {
            this.init(opciones);
        }
    }

    Plugin.prototype = {
        default: {
           anterior:  'anterior',
           siguiente: 'siguiente'
        },

        init: function(opciones) {
           this.config = $.extend({}, this.default, opciones);
        }, 

        prueba: function() {
            console.log('esto es una prueba');
        }
    }

    $.fn.plugin1 = function(opciones) {
        if (typeof opciones == 'string') {
            metodo = opciones;
            args = Array.prototype.slice.call(arguments, 1);

            var plugin1 = this.data('plugin1') ?
                this.data('plugin1') :
                new Plugin(this);

            if (plugin1[metodo]) {
                plugin1[metodo].apply(plugin, args);
            }
        }
        else if (typeof opciones == 'object' || !opciones) {
            this.data('plugin1', new Plugin(this, opciones))
        }
        else {
             $.error('Error, parametro incorrecto')
        }
        return this;    
    }
    window.plugin = Plugin;
})(jQuery, window)


var $parrafos = $('p');

var plugin = new plugin($('p:first'));
console.log(plugin.prueba());