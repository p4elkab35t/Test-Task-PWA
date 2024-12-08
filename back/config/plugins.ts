export default ({ env }) => ({
	// ...
	io: {
		enabled: true,
		config: {
			// This will listen for all supported events on the article content type
			contentTypes: ['api::user.update', 'api::product.update'],
		},
	},
	"users-permissions": {
      config: {
		jwt: {
			expiresIn: '7d',
		},
        register: {
          allowedFields: ["nickname", "email", "password"],
        },
      },
    },
	// ...
});