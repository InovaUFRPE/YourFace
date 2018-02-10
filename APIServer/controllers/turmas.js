import httpStatus from 'http-status';

const defaultResponse = (data, statusCode = httpStatus.OK) => ({
	data,
	statusCode,
});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);


class TurmaController{
	constructor(turma){
		this.turma = turma;
	}
	getAll(){
		return this.turma.findAll({})
		.then(result => defaultResponse(result))
		.catch(error => errorResponse(error.message));
	}
	getAllById(params){
		return this.turma.findAll({where: params})
		.then(result => defaultResponse(result))
		.catch(error => errorResponse(error.message));
	}
	getById(params){
		return this.turma.findOne({where: params})
		.then(result => defaultResponse(result))
		.catch(error => errorResponse(error.message));
	}
	create(data){
		return this.turma.create(data)
		.then(result=> defaultResponse(result, httpStatus.CREATED))
		.catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
	}
	update(data, params){
		return this.turma.update(data,{where:params})
		.then(result=> defaultResponse(result))
		.catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
	}
	delete(params){
		return this.turma.destroy({where: params})
		.then(result => defaultResponse(result, httpStatus.NO_CONTENT))
		.catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
	}
}

export default TurmaController;
