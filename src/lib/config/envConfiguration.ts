export const envConfiguration = () => {
	return {
		DB_URL: process.env.DB_URL,
		ENVIRONMENT: process.env.NODE_ENV,
		PORT: process.env.PORT,
	};
};
