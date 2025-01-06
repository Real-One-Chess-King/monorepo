import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import * as mongooseAutopopulate from 'mongoose-autopopulate'; // Import the plugin

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally without importing it in other modules
      envFilePath: '.env', // Path to the .env file
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        MONGO_URI: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().min(8).required(),
        JWT_EXPIRATION: Joi.string()
          .pattern(/^[0-9]+[smhd]$/)
          .required(), // e.g., 3600s, 1h
      }),
      // You can add validationSchema here for environment variable validation
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,

      playground: process.env.NODE_ENV === 'production',
      plugins:
        process.env.NODE_ENV !== 'production'
          ? [ApolloServerPluginLandingPageLocalDefault()]
          : [],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        connectionFactory: (connection) => {
          connection.plugin(mongooseAutopopulate); // Apply the autopopulate plugin
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
