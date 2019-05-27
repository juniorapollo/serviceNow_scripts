/* https://dev55390.service-now.com/nav_to.do?uri=%2Fsys_script_include_list.do%3Fsysparm_userpref_module%3D2fa30e560a0a0aa30054b21afb8654cf%26sysparm_clear_stack%3Dtrue */

/* Criar SERVER_SIDE */

var getMatricula = Class.create();
getMatricula.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	/*Retur Matricula*/
	byId: function(){
		var matricula = this.getParameter('sysparm_matricula'); // Nome do Campo passado no Cliente-side GlideAJAX
		var gr = new GlideRecord('u_mat_teste'); // Nome da Tabela
		var obj = [];
		gr.addQuery('u_matricula', matricula);
		gr.query();
		
		while(gr.next()){
			obj.push({matricula : gr.getValue('u_matricula'),
					  aluno     : gr.getValue('u_aluno'),
					  curso     : gr.getValue('u_curso'),
					  situacao  : gr.getValue('u_situacao')});
		}
	
		return JSON.stringify(obj);			
	
	},
	
	//Return List
	byCpf: function(){
		var cpf = this.getParameter('sysparm_cpf_aluno');
		var gr = new GlideRecord('u_mat_teste');
		var obj = [];
		gr.addQuery('u_cpf',cpf);
		gr.query();
		
		while(gr.next()){
			obj.push({matricula : gr.getValue('u_matricula'),
					  aluno     : gr.getValue('u_aluno'),
					  curso     : gr.getValue('u_curso'),
					  situacao  : gr.getValue('u_situacao')});
		}
	
		return JSON.stringify(obj);			
	
	},
	
	
	
	
    type: 'getMatricula'
});
