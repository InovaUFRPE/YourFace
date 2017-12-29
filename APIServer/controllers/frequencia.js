import httpStatus from 'http-status';

const defaultResponse = (data, statusCode = httpStatus.OK) => ({
	data,
	statusCode,
});

const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class FrequenciaController{
	
	constructor(Frequencia){
		this.Frequencia = Frequencia;
	}
	
	getAll(){
		return this.Frequencia.findAll({})
		.then(result => defaultResponse(result))
		.catch(error => errorResponse(error.message));
	}
	getAllById(params){
		return this.Frequencia.findAll({where: params})
		.then(result => defaultResponse(result))
		.catch(error => errorResponse(error.message));
	}
	getById(params){
		return this.Frequencia.findOne({where: params})
		.then(result => defaultResponse(result))
		.catch(error => errorResponse(error.message));
	}
	
	create(data){
		return this.Frequencia.create(data)
		.then(result=> defaultResponse(result, httpStatus.CREATED))
		.catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
	}

	update(data, params){
		return this.Frequencia.update(data,{where:params})
		.then(result=> defaultResponse(result))
		.catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
	}

	delete(params){
		return this.Frequencia.destroy({where: params})
		.then(result => defaultResponse(result, httpStatus.NO_CONTENT))
		.catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));	
	}
}
export default FrequenciaController;