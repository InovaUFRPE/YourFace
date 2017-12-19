import jwt from 'jwt-simple';

import CoordenadorController from '../controllers/coordenador';

export default(app)=>{
	const coordenadorController = new CoordenadorController(app.datasource.models.Coordenador);


	app.route('/coordenador')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		coordenadorController.getAll().then(response => {
			

			
			res.status(response.statusCode)
			res.json(response.data)
		});

	})
	.post((req, res)=>{
		coordenadorController.create(req.body).then(response =>{
			res.status(response.statusCode);
			res.json(response.data);
		});
	});


	app.route('/coordenador/:cpf')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		coordenadorController.getById(req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})

	.put((req, res)=> {
		coordenadorController.update(req.body, req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	.delete((req, res)=> {
		coordenadorController.delete(req.params).then(response => {
			res.status(response.statusCode);
			res.json(response.data);
		});
	});
}