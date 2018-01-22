;(function($, window, undefined) {
    var FormWizard = function(item_form, options) {
          this.$item_form = $(item_form);
          this.item_form = item_form;

          if (this.init) {
              this.init(options);
          }
    };

    FormWizard.prototype = {
     
        default_config : {
            initial_step: 1,
            steps_number: 1,
            speed_entry_effect: 1500, //ms
            onChange: function(){},
            onEntryEffect: function(speed){
                $(this).fadeIn(speed);
            },
        },
        init : function(options) {
            this.config   =  $.extend({}, this.default_config, options);
            this.$wrappers_container =  this.$item_form.find('div.formWizard-fields');
            this.wizard = {
                current_step : {number: this.config.initial_step, $wrappers: undefined},
                move : false
            };
            this.$visible_wrappers = this.wizard.current_step.$wrappers;
            // Construir los pasos e inicializar el wizard en el paso inicial
            this.$wrappers_container.children().css('display', 'none');
            this.steps = this.buildSteps();
            this.changeStep(this.config.initial_step); 
        },

        buildSteps: function() {
            var steps = [];
            for (var i = 1; i <= this.config.steps_number; i++) {
                steps.push({number: i, $wrappers: this.$wrappers_container.find(`div[data-step=${i}]`)});
            }
            return steps; 
        },

        nextStep: function() {
            this.changeStep(this.wizard.current_step.number + 1);
        },

        previousStep: function() {
            this.changeStep(this.wizard.current_step.number - 1);
        },

        changeStep: function(step_number) {
            if(step_number >= 1 &&  step_number <= this.config.steps_number) {
                var step_found = this.steps.find(function(step) {
                    return step.number == step_number;
                });
                if(step_found){
                    this.wizard.current_step = step_found;
                    this.updateVisibility();
                    // Establecer el contexto para el callback onChange
                    this.config.onChange.apply(this.wizard.current_step,
                        [this.wizard.current_step.$wrappers, this.wizard.current_step.number]);
                } 
            }
            
        }, 

        updateVisibility: function(){
            this.$visible_wrappers = this.wizard.current_step.$wrappers;
            this.$wrappers_container.children().css('display', 'none');
            this.config.onEntryEffect.apply(this.$visible_wrappers, [this.config.speed_entry_effect]);
        }
    };

    $.fn.formWizard = function(options) { 
        if (typeof options == 'object' || !options) {
            this.data('formWizard', new FormWizard(this, options))
        }
        else {
             $.error('Error, Se definió un parámetro incorrecto')
        }
        return this;    
    }

})(jQuery, window)


// Demo

/* Ejemplo para una configuracion por defecto
var $form = $('#form_test').formWizard();
*/

// Configuracion personalizada
var $form = $('#form_test').formWizard({
    // Propiedades configurables
    initial_step: 1, 
    steps_number: 3,
    speed_entry_effect: 1500,

    // Callbacks configurables
    onEntryEffect: efectoPersonalizado,
    onChange: cambioPasoPersonalizado
});

var wizard = $form.data('formWizard');


function cambioPasoPersonalizado($wrappers, step_number){
     // Acceso al Paso en curso por contexto
     var step = this;
     console.log(step.number);
     $wrappers.css('background-color','gray');
     
     // Acceso al Paso en curso por parámetros
     console.log(step_number);
     $wrappers.css('color','red');
}

function efectoPersonalizado(speed){
    // Acceso a los envoltorios de campos del Paso en curso por contexto
    var $wrappers  = this;
    $wrappers.slideDown(speed);
}


// Funciones disponibles
function anterior(){
    wizard.previousStep();
    return false;
}

function siguiente(){
    wizard.nextStep();
    return false;
}

function cambiarPaso(numero_paso){
    wizard.changeStep(numero_paso);
    return false;
}