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
            // Properties
            initial_step: 1,
            steps_number: 1,
            speed_entry_effect: 1500, //ms
            figure_visibility: true,
            figure_steps: [],
            
            // Events
            onChange: function(){},
            onEntryEffect: function(speed){
                $(this).fadeIn(speed);
            },
            onMouseoverFigureStep:  function () {},
            onMouseoutFigureStep:   function () {},
            onMouseenterFigureStep: function () {},
            onMouseleaveFigureStep: function () {},
            onClickFigureStep: function () {},
    
        },
        init : function(options) {
            this.config   =  $.extend({}, this.default_config, options);
            this.$wrappers_container =  this.$item_form.find('div.formWizard-content');
            this.wizard = {
                current_step : {
                    number: this.config.initial_step, 
                    $wrappers: undefined,
                    $figure_step: undefined
                },
                move : false
            };
            // Construir los pasos e inicializar el wizard en el paso inicial
            this.$wrappers_container.children().css('display', 'none');
            this.steps =  this.buildSteps();
            this.buildFigure();
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
                    this.updateVisibility(step_found);
                    this.changeFigureStep(step_found.number);
                    // Establecer el contexto para el callback onChange
                    this.config.onChange.apply(this.wizard.current_step, [step_found.$wrappers, step_found.number]);
                } 
            }
            
        }, 

        updateVisibility: function(step_found) {
            this.$wrappers_container.children().css('display', 'none');
            // Establecer el contexto para el callback onEntryEffect
            this.config.onEntryEffect.apply(step_found.$wrappers, [this.config.speed_entry_effect]);
        },

        // Figure manage..............................................................................
        changeFigureStep: function (step_number) {
            if(step_number >= 1 &&  step_number <= this.config.steps_number && this.config.figure_visibility) {
                $('ul.wizard-figure > li').removeClass('active');
                $(`ul.wizard-figure > li:nth-child(${step_number})`).addClass('active');
                                                                    
            }
            
        },
       
        buildFigure: function() {
            if (this.config.figure_visibility) {
                var $figure = $('<ul class="wizard-figure"></ul>');
                if (this.config.figure_steps.length == this.config.steps_number) { 
                    var figure_steps = this.config.figure_steps;
                    for (var i = 0; i < figure_steps.length; i++) {
                        $figure.append(this.buildFigureStep(
                            figure_steps[i].number || parseInt(i+1), 
                            figure_steps[i].name || parseInt(i+1), 
                            figure_steps[i].description || 'Step '+ parseInt(i+1)
                        ));
                    }
                }
                else {
                    for (var i = 1; i <= this.config.steps_number; i++) {
                        $figure.append(this.buildFigureStep(i, i, "Step "+i) );            
                    }
                }
                this.$item_form.prepend($figure);
                this.onEventsFigureStep();
            }
        },

        buildFigureStep: function(number, name, description) {
              return `
              <li>
                  <a>
                      <span hidden class="step-number">${number}</span>
                      <span class="step-name">${name}</span>
                      <span class="step-description">${description}</span>
                  </a>
              </li>`;
        },

         // Figure Events..........................
        onEventsFigureStep: function () {
            var $selector = $(`ul.wizard-figure > li > a`);
            var that = this;
            return $selector.on({
                click: function() {
                    var step_number = parseInt($(this).find('span.step-number').text() || 1);
                    that.changeStep(step_number);
                    that.config.onClickFigureStep.apply(this);
                },          
            });
            
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

