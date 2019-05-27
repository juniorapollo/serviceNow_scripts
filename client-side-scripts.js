/* CLIENT SIDE */


/*Valida CPF*/
function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }
	g_form.hideFieldMsg('cpf_aluno');

    var onlyNumbers = newValue.replace(/[^0-9]/g, '');

    if(onlyNumbers.toString().length != 11){

        g_form.setValue('cpf_aluno', '');

        g_form.showFieldMsg('cpf_aluno','CPF inválido', 'error');

        return;

    }

    if(!newValue.match(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)){

        var formated = newValue.substr(0,3) + '.' + newValue.substr(3,3) + '.' + newValue.substr(6,3) + '-' + newValue.substr(9,2);

        g_form.setValue('cpf_aluno', formated);

    }
	
    var Soma = 0;
    var Resto;    

    if (onlyNumbers == "00000000000" || onlyNumbers == "11111111111" || onlyNumbers == "22222222222" || onlyNumbers == "33333333333" ||  onlyNumbers == "44444444444" || onlyNumbers == "55555555555" || onlyNumbers == "66666666666" || onlyNumbers == "77777777777" || onlyNumbers == "88888888888" || onlyNumbers == "99999999999") {

        g_form.setValue('u_cpf', '');

        g_form.showFieldMsg('u_cpf','CPF inválido', 'error');

        return;

    } 
    

    for (var i = 1; i <= 9; i++){
        Soma = Soma + parseInt(onlyNumbers.substring(i-1, i)) * (11 - i);
    }   

    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)){
        Resto = 0;
    }    

    if (Resto != parseInt(onlyNumbers.substring(9, 10))){

        g_form.setValue('u_cpf', '');

        g_form.showFieldMsg('u_cpf','CPF inválido', 'error');

    }

    Soma = 0;

    for (i = 1; i <= 10; i++) {

        Soma = Soma + parseInt(onlyNumbers.substring(i-1, i)) * (12 - i);

    }

    Resto = (Soma * 10) % 11;

    

    if ((Resto == 10) || (Resto == 11)){

        Resto = 0;

    }

    

    if (Resto != parseInt(onlyNumbers.substring(10, 11) )){

        g_form.setValue('u_cpf', '');

        g_form.showFieldMsg('u_cpf','CPF inválido', 'error');

    }

   //Type appropriate comment here, and begin script below
   
} 
/*Fim Valida CPF*/



/*EXEMPLO DE GLIDEAJAX */

function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }
	var cpf = g_form.getValue('variables.cpf_aluno').replace(/[^0-9]/g, '');
	var ga = new GlideAjax('getMatricula');
	ga.addParam('sysparm_name', 'byCpf');
	ga.addParam('sysparm_cpf_aluno', cpf);

    ga.getXML(assignGrp);
     
	function assignGrp(response){
        var resp = JSON.parse(response.responseXML.documentElement.getAttribute("answer"));
		if(resp){
			g_form.setDisplay('variables.aluno', true);
			g_form.setDisplay('variables.matricula',true);
			g_form.clearOptions('variables.matricula');
			g_form.setValue('variables.aluno', resp[0].aluno);
			
			g_form.addOption('variables.matricula', '' , 'Selecione a Matrícula');  
			
			if( resp.size() > 1){
				g_form.setDisplay('variables.curso', false);
				g_form.setDisplay('variables.situacao', false);
				g_form.setDisplay('variables.nova_situacao', false);
				g_form.setDisplay('variables.descricao', false);
				
				
				resp.forEach(function (data , index) {
					//console.log(index+1 + ' - ' + data.matricula + " says hello to " + data.aluno)
					g_form.addOption('variables.matricula', data.matricula , data.matricula + ' - ' + data.curso);  
				});
			}else{
				g_form.setDisplay('variables.curso',true);
				g_form.setDisplay('variables.situacao',true);
				g_form.setDisplay('variables.nova_situacao', true); 
				g_form.setDisplay('variables.descricao', true); 
				
				resp.forEach(function (data , index) {
					//console.log(index+1 + ' - ' + data.matricula + " says hello to " + data.aluno)
					g_form.addOption('variables.matricula', data.matricula , data.matricula + ' - ' + data.curso);  
					
					g_form.setValue('variables.curso', data.curso);
					g_form.setValue('variables.situacao', data.situacao);
				});
				
				
			}
					
		}else{
			
			console.log('Nao retornou resultado');
		}
		//g_form.setValue('variables.descricao', answer.u_cpf_aluno);
		/*g_form.setValue('variables.curso', 'Administração');
		g_form.setValue('variables.situacao', 'Ativo')*/
	 }
	
	//Type appropriate comment here, and begin script below
   
	
	/*g_form.setDisplay('variables.matricula',true);
	g_form.setDisplay('variables.curso',true);
	g_form.setDisplay('variables.situacao',true);
	
	var cpf = g_form.getValue('variables.cpf_aluno');
	var matriculaRandom = Math.floor(Math.random() * 90000000000).toFixed(0);
	
	g_form.setValue('variables.matricula', matriculaRandom);
	g_form.setValue('variables.curso', 'Administração');
	g_form.setValue('variables.situacao', 'Ativo');*/
	
	   return;
	//console.log(cpf);
	//console.log(Math.floor(Math.random() * 90000000000).toFixed(0));
	
   //Type appropriate comment here, and begin script below

   //Type appropriate comment here, and begin script below
   
}

/*FIM EXEMPLO DE GLIDEAJAX*/


/*2 EXEMPLO DE GLIDEAJAX */
function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      
	   return;
   }

	var matricula = newValue;
	var ga = new GlideAjax('getMatricula');
	
	ga.addParam('sysparm_name', 'byId');
	ga.addParam('sysparm_matricula', matricula);
    ga.getXML(assignGrp);
     
	function assignGrp(response){
        var resp = JSON.parse(response.responseXML.documentElement.getAttribute("answer"));
		console.log(resp);
		if(resp){
			g_form.setDisplay('variables.aluno', true);
			g_form.setDisplay('variables.matricula',true);
			g_form.clearOptions('variables.matricula');
			
			if( resp.size() > 1){
				g_form.setDisplay('variables.curso', false);
				g_form.setDisplay('variables.situacao', false);
				g_form.setDisplay('variables.nova_situacao', false);
				g_form.setDisplay('variables.descricao', false);
				
				
				resp.forEach(function (data , index) {
					//console.log(index+1 + ' - ' + data.matricula + " says hello to " + data.aluno)
					g_form.addOption('variables.matricula', data.matricula , data.matricula + ' - ' + data.curso);  
				});
			}else{
				g_form.setDisplay('variables.curso',true);
				g_form.setDisplay('variables.situacao',true);
				g_form.setDisplay('variables.nova_situacao', true); 
				g_form.setDisplay('variables.descricao', true); 
				
				resp.forEach(function (data , index) {
					//console.log(index+1 + ' - ' + data.matricula + " says hello to " + data.aluno)
					g_form.addOption('variables.matricula', data.matricula , data.matricula + ' - ' + data.curso);  
					
					g_form.setValue('variables.curso', data.curso);
					g_form.setValue('variables.situacao', data.situacao);
				});
				
				
			}
					
		}else{
			console.log(resp);
			console.log('Nao retornou resultado');
		}
		
	
	}

   //Type appropriate comment here, and begin script below
   
}
/* FIM ******************* */


/*OCULTA CAMPO < READONLY< CLEAR MENSAGEM */

function onLoad() {
	/*Readonly*/
	g_form.setReadOnly('usuario', true);
	g_form.setReadOnly('aluno', true);
	g_form.setReadOnly('curso', true);
	g_form.setReadOnly('situacao', true);
	
	/*Limpa Mensagens*/
	g_form.clearMessages();
	
	/*g_form.addInfoMessage('Alterar a Situação Acadêmica do Aluno');*/
	
	/*Oculta os Campos*/
	g_form.setDisplay('variables.aluno', false);
	g_form.setDisplay('variables.matricula',false);
	g_form.setDisplay('variables.curso',false);
	g_form.setDisplay('variables.situacao',false);
	g_form.setDisplay('variables.nova_situacao', false);
	g_form.setDisplay('variables.descricao', false);  
	
	//var inputCpf = g_form.getControl('cpf_aluno');
	//inputCpf.maxLength = 14;
	
	var inputSolicitante = g_form.getControl('usuario');
	inputSolicitante.readOnly = true;
	
		
	/*var objNovaSituacao = [];
	objNovaSituacao.push({valor : 1  , label: 'Matriculado'    },
						 {valor : 11 , label: 'Cancelado'      },
						 {valor : 09 , label: 'Formando'       }, 
						 {valor : 27 , label: 'Pré-Matriculado'});
	
	//Montar combo de  Situação a Corrigir
	for(var i= 0; i < objNovaSituacao.length; i++) {
		g_form.addOption('variables.nova_situacao', objNovaSituacao[i].valor , objNovaSituacao[i].label); 	
	}	*/
	
    
	//g_form.addErrorMessage('This is an error');

}

/*  *********  */






