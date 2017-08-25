(function($) { 
	$.config = {
		'home_role1': 'panel_admin.html', //admin
		'home_role2': 'panel_oferente.html', //oferente
		'home_role3': 'panel_aspirante.html' //aspirante
	};


	$.get = function(key)   {  
        key = key.replace(/[\[]/, '\\[');  
        key = key.replace(/[\]]/, '\\]');  
        var pattern = "[\\?&]" + key + "=([^&#]*)";  
        var regex = new RegExp(pattern);  
        var url = unescape(window.location.href);  
        var results = regex.exec(url);  
        if (results === null) {  
            return null;  
        } else {  
            return results[1];  
        }  
    }

    $.autenticar = function( user , pass ){
    	var rol = 0;
    	if( user == 'admin@correo.com' && pass == '123' ){
			rol = 1;
		}
    	if( user == 'oferente@correo.com' && pass == '123' ){
			rol = 2;
		}
		if( user == 'aspirante@correo.com' && pass == '123' ){
			rol = 3;
		}
		sessionStorage.setItem("rol", rol);
		if( rol > 0 ){
			return true;
		}else{
			return false;
		}
    } 

    $.cerrarSesion = function(){
    	sessionStorage.setItem('rol', 0);
    	window.location.replace("index.html");
    }

    $.getRol = function(){
    	var rol;
    	rol = sessionStorage.getItem("rol");
    	if( rol > 0 ){
    		return rol;
    	}else{
    		return 0;
    	}
    }

    $.showMsg = function( type , msg ){
    	if( type == 'err' ){
    		$("#contenedor_msg").html('<div class="alert alert-danger" role="alert">'+ msg +'</div>');
    	}else if( type == 'ok' ){
    		$("#contenedor_msg").html('<div class="alert alert-success" role="alert">'+ msg +'</div>');
    	}
    }

    $.loadTemplate = function(){
    	var rol = $.getRol();
        $('.role_d').hide();
        var msg_url_ban = false;
    	$('.templatecustom').each(function(){
			$(this).load( 'html/' + $(this).attr('value') + '.html' , function(){
				$('.role_d', $(this)).hide();
                $('.role_'+ rol).show();
                if( !msg_url_ban ){
                    //leer mensajes de url
                    var msg_url_ok = $.get('msg');
                    if( msg_url_ok ){
                        $.showMsg( "ok", msg_url_ok );
                    }
                }
			});
		});
    }
})(jQuery);