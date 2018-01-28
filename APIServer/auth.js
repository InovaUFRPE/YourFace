import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

module.exports = app => {

	const Coord = app.datasource.models.Coordenador;

	var params = {
		secretOrKey: app.config.jwtSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeader(),
		//jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
	};

	const strategy = new Strategy(params, (payload, done) => {
		console.log(payload.cpf)

		Coord.findById(payload.cpf).then(user => {
			if (user) {
				return done(null, {
					cpf: user.cpf
				});
			}
			return done(null, false);
		});
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
