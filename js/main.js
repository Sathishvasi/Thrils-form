
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        });
        
        let radioInput = $(this).find('input');
         $(radioInput).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).closest('.validate-input').addClass('true-validate');
            }
        });
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if(check){
            let formEle = $('.contact100-form').serializeArray();
            let createObj = [];
            formEle.forEach((v,i)=>{
                let header = v.name;
                let value = v.value;
                createObj[header] = value;
            });
            console.log(createObj)

            $('.contact100-form')[0].reset();
            $('.validate-input').removeClass('true-validate');
            $('#snackbar').text("Your Form Submitted Successfully!").addClass('show');
        }else{
            $("html, body").animate({ scrollTop: "0" }, 2000);
            $('#snackbar').text("Please fill all the fields!").addClass('show');
        }

        setTimeout(function(){ 
            $('#snackbar').removeClass('show');
        }, 3000);

        return false;
    });


    $('input[name="time"]').click(function(){
        $('input[name="time-input"]').val('');
    });

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });

        let radioInput = $(this).find('input');
        $(radioInput).focus(function(){
            hideValidate($(this));
            $(this).parent().removeClass('true-validate');
         });
    });

    function validateRadioEle(input){
        if($(input).is(':checked')){
            return true;
        }
    }

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else if($(input).hasClass('radio-group')){
            let radioChecked;
            let radioInput = $(input).find('input');
            for(var i = 0; i< radioInput.length;i++){
                radioChecked = validateRadioEle($(radioInput[i]));
                if(radioChecked === true){
                    break;
                }
            }
            return radioChecked ? radioChecked : false;
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).closest('.validate-input');

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).closest('.validate-input');
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }
    

    /*==================================================================
    [ Show / hide contact ]*/
    $('.btn-hide-contact100').on('click', function(){
        $('.container-contact100').fadeOut(300);
    });

    $('.btn-show-contact100').on('click', function(){
        $('.container-contact100').fadeIn(300);
        $('.container-contact100').css('display','flex')
    });

})(jQuery);