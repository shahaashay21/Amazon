$(document).ready(function(e){

	$('.reg-form').submit(function(e){
		e.preventDefault();
		
		var data = $('.reg-form').serializeArray();
		$.ajax({
			method: 'POST',
			url: 'reg',
			data: data,
			dataType: 'JSON',
			success: function(res){
				console.log(res);
				if(res == 'available'){
					$('.emailregistered').show();
					$("#email").parent().removeClass('has-success');
					$("#email").parent().addClass('has-error');
					$("#email").next().removeClass('glyphicon-ok');
					$("#email").next().addClass('glyphicon-remove');
				}
				if(res == 'Registered'){
					window.location = '/login';
				}
			}
		})
	});
});