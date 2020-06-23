$(function(){
	var input_toggle=false;

	$('#mce-EMAIL').on('input propertychange paste', function() {
		toggleButton();
		$('#mce-error-response').hide();
	});

	function toggleButton(){
		var value = $('#mce-EMAIL').val();
	    if ( value.length > 0 && value != "" ){
	    	$('#mc-embedded-subscribe').addClass('visible');
	    }else{
	    	$('#mc-embedded-subscribe').removeClass('visible');
	    }
	}


	var $form = $('form');

    if ( $form.length > 0 ) {
        $('form input[type="submit"]').bind('click', function ( event ) {
            if ( event ) event.preventDefault();
            	register($form);
        	});
    }


	function register($form) {
	    $.ajax({
	        type: $form.attr('method'),
	        url: $form.attr('action'),
	        data: $form.serialize(),
	        cache       : false,
	        dataType    : 'json',
	        contentType: 'application/json; charset=utf-8',
	        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
	        success     : function(data) {
	            if (data.result != "success") {
	            	$('#mc-embedded-subscribe').removeClass('visible');
	            	$('#mce-error-response').text(data.msg.slice(3)).show();
	            	console.log(data.msg);
	                // Something went wrong, do something to notify the user. maybe alert(data.msg);
	            } else {
	            	console.log(data.msg)
	            	$('form').hide();
	            	$('#pre-thankyou').hide();
	            	$("#thankyou").show();
	 
	            }
	        }
		});
	}

});