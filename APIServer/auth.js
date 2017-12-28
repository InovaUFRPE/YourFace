import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

module.exports = app => {

	const Coord = app.datasource.models.Coordenador;
	const prof = app.datasource.models.Professor;

	var params = {  
		secretOrKey: app.config.jwtSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeader(),
		//jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
	};

	const strategy = new Strategy(params, (payload, done) => {

		Coord.findById(payload.cpf).then(user => {
			
			if (user) {
				return done(null, {
					cpf: user.cpf
				});
			}
			prof.findById(payload.cpf).then(user => {
				if (user) {
					return done(null, {
						cpf: user.cpf
					});
				}
				return done(null, false);
			}).catch(error => done(error, null));
			return done(null, false);
		}).catch(error => done(error, null));
	});
	passport.use(strategy);
	return {
		initialize: () => {
			return passport.initialize()
		},
		authenticate: () => {
			return passport.authenticate("jwt", app.config.jwtSession);
		},
	};
};