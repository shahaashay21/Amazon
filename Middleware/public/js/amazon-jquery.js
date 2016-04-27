$(document).ready(function(e){
	
	//Carousel
	$('.carousel').carousel({
	  interval: 3000
	})
	//INITIALIZE TOOLTIP
	$('[data-toggle="tooltip"]').tooltip();


	// REGISTER VALIDATION
	$('#fname').on('keyup click focus blur change', function(){
		nullFieldValidation('fname');
	});

	$('#pass').on('keyup click focus blur change', function(){
		nullFieldValidation('pass');
	});

	$('#verify-pass').on('keyup click focus blur change', function(){
		nullFieldValidation('verify-pass');
	});

	$('#lname').on('keyup click focus blur change', function(){
		nullFieldValidation('lname');
	});

	$('#email').on('keyup click focus blur change', function(){
		nullFieldValidation('email');
	});


	//LOGIN VALIDATION
	$('#email-login').on('keyup click focus blur change', function(){
		nullFieldValidation('email-login');
	});
	$('#pass-login').on('keyup click focus blur change', function(){
		nullFieldValidation('pass-login');
	});

});


function nullFieldValidation(id){
	var idname = '#'+id;
	var idvalue = $(idname).val();
	var err = 0;

	if(id == 'pass'){
		if(idvalue.length < 6){
			err = 1;
			$('.min6char').show();
		}else{
			err = 0;
			$('.min6char').hide();
		}
	}

	if(id == 'email' || id == 'email-login'){
		var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
		if (reg.test(idvalue)){
			err = 0;
		}
		else{
			err = 1;
		}
	}

	if(id == 'verify-pass'){
		var passvalue = $('#pass').val();
		if(idvalue == passvalue){
			err = 0;
		}else{
			err = 1;
		}
	}


	// IF ANY ERROR
	if(idvalue == null || idvalue == '' || err == 1){
		$(idname).parent().addClass('has-error');
		$(idname).next().addClass('glyphicon-remove');
		$(idname).parent().removeClass('has-success');
		$(idname).next().removeClass('glyphicon-ok');
	}else{
		$(idname).parent().removeClass('has-error');
		$(idname).next().removeClass('glyphicon-remove');
		$(idname).parent().addClass('has-success');
		$(idname).next().addClass('glyphicon-ok');
	}
}


//CHECK BEFORE REGISTER
function registerSubmit(){
//	 console.log('reg-submit');
	if($('#fname').parent().hasClass('has-success') && $('#lname').parent().hasClass('has-success') && $('#email').parent().hasClass('has-success') && $('#pass').parent().hasClass('has-success') && $('#verify-pass').parent().hasClass('has-success')){
		return true;
	}else{
		nullFieldValidation('fname');
		nullFieldValidation('lname');
		nullFieldValidation('pass');
		nullFieldValidation('email');
		nullFieldValidation('verify-pass');
		return false;
	}
}


//CHECK BEFORE REGISTER
function loginSubmit(){
//	 console.log('reg-submit');
	if($('#email-login').parent().hasClass('has-success') && $('#pass-login').parent().hasClass('has-success')){
		return true;
	}else{
		nullFieldValidation('email-login');
		nullFieldValidation('pass-login');
		return false;
	}
}