$(document).ready(function(){
    	
    	//carga templates
    	$.loadTemplate();

		//login
		$("#form_login").submit(function(){
			var user = $("#exampleInputEmail1").val();
			var pass = $("#exampleInputPassword1").val();
			var is_user = $.autenticar( user, pass );
			if( is_user == true ){
				var rol_redirect = $.getRol();
				if( rol_redirect == 1 ){ 
					window.location.replace( $.config.home_role1 ); 
				}else if( rol_redirect == 2 ){
					window.location.replace( $.config.home_role2 );
				}else if( rol_redirect == 3 ){
					window.location.replace( $.config.home_role3 );
				}
			}else{
				$.showMsg('err', 'Usuario y/o contraseña no validos');
				
			}
			return false;
		});

		$("body").delegate("#cerrar_sesion", "click", function(){
			$.cerrarSesion();
		});

		

    	//campos dinamicos
    	$('#btn_agregar_campo').click(function(){
			var nombre_campo = $("#nombre_campo_dinamico").val();
			var tipo_campo = $("#tipo_campo_dinamico").val();	
			var posicion_campo = $("#posicion_campo_dinamico").val();
			
			var contenido_campo = '';
			
			switch(tipo_campo) {
			    case 'Texto corto':
			    case 'Número':
			    case 'Correo electrónico':
			    case 'Fecha':
			        contenido_campo = '<input type="text" class="form-control" />';
			        break;
			    case 'Texto Largo':
			        contenido_campo = '<textarea class="form-control" rows="6"></textarea>';
			        break;
			    default:
			        break;
			}
			var contenido_marco_campo = '<div class="form-group"><label>'+ nombre_campo +'</label>'+ contenido_campo +'</div>';
		    
		    $("#campos_dinamicos_contenedor").append( contenido_marco_campo );
			
		});

		//checkbox_all
		$('#checkboxall').change(function(){
			var c = this.checked;
    		$(':checkbox').prop('checked',c);
		});

		//btn-delete
		$("body").delegate(".btn-delete", "click", function(){
			var msg = $(this).attr('msg');
			var msg_post = $(this).attr('msg_post');
			var redirect = $(this).attr('redirect');
			if( msg == undefined ){
				msg = "Esta seguro que desea realizar esta acción, sera irreversible.";
			}
			if( msg_post == undefined ){
				msg_post = "Se elimino el elemento correctamente.";
			}
			bootbox.confirm({
			    message: msg,
			    buttons: {
			        confirm: {
			            label: 'Confirmar',
			            className: 'btn-success'
			        },
			        cancel: {
			            label: 'Cancelar',
			            className: 'btn-danger'
			        }
			    },
			    callback: function (result) {
			    	if( result ){
			    		if( redirect != undefined){
				    		window.location.replace( redirect + '?msg=' + msg_post );
				    	}else {
				    		$.showMsg( "ok", msg_post );
				    	}
			    	}
			    }
			});

		});

		

});
