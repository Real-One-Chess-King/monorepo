// test/setup.ts

import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import * as dotenv from 'dotenv';

let mongoContainer: StartedTestContainer;

/**
 * Starts a MongoDB container and returns its URI.
 */
export const startMongoContainer = async (): Promise<{ uri: string }> => {
  const containerPort = 27017;
  const pass = 'pass';
  const username = 'root';
  const dbName = 'mydatabase';
  mongoContainer = await new GenericContainer('mongo:6.0') // Specify a stable MongoDB version
    .withExposedPorts(containerPort)
    .withName('mongodb-test')
    .withDefaultLogDriver()
    .withEnvironment({
      MONGO_INITDB_DATABASE: dbName,
      MONGO_INITDB_ROOT_USERNAME: username,
      MONGO_INITDB_ROOT_PASSWORD: pass,
    })
    .withWaitStrategy(Wait.forLogMessage('Waiting for connections'))
    .start();

  const host = mongoContainer.getHost();
  const port = mongoContainer.getMappedPort(containerPort);
  const uri = `mongodb://${username}:${pass}@${host}:${port}/${dbName}?authSource=admin`;

  dotenv.config({ path: '.env.test' });

  process.env.MONGO_URI = uri;
  return { uri };
};

/**
 * Stops the MongoDB container.
 */
export const stopMongoContainer = async (): Promise<void> => {
  if (mongoContainer) {
    await mongoContainer.stop();
  }
};
