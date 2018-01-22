/* Demo utilizando plugin formWizard

Ejemplo para una configuracion por defecto
    var $form = $('#form_test').formWizard();
*/

//Ejemplo para una configuracion personalizada
var $form = $('#form_test').formWizard({
    // Propiedades configurables
    initial_step: 1, 
    steps_number: 3,
    speed_entry_effect: 1500,
    figure_visibility: true,
    figure_steps:  [
        {name: "n1", description: "description 1"},
        {name: "n2"},
        {name: "n3", description: "description 3"}
    ],
    // Callbacks configurables
    onEntryEffect: efectoPersonalizado,
    onChange: cambioPasoPersonalizado,
    onClickFigureStep: function () {
        console.log(this);
    },
});

var wizard = $form.data('formWizard');


function cambioPasoPersonalizado($wrappers, step_number){
     // Acceso al Paso en curso por contexto
     var step = this;
     console.log(step.number);
     step.$wrappers.css('background-color','gray');
     
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