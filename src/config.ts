const { PORT, NODE_ENV, MONGO_URL } = process.env;

const config = {
  port: PORT ? parseInt(PORT, 10) : 3000,
  env: NODE_ENV || 'development',
  mongoUrl: MONGO_URL || 'mongodb://localhost/test',
};

export { config };
