import { stopMongoContainer } from './setup';

module.exports = async () => {
  console.log('Global Teardown: Stopping MongoDB container...');
  await stopMongoContainer();
  console.log('Global Teardown: Mongo container stopped.');
};
