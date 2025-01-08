import { startMongoContainer } from './setup';

module.exports = async () => {
  console.log('Global Setup: Starting MongoDB container...');
  const { uri } = await startMongoContainer(); // sets process.env.MONGO_URI
  console.log(
    'Global Setup: Mongo container started at',
    process.env.MONGO_URI,
  );
  process.env.MONGO_URI = uri;
};
