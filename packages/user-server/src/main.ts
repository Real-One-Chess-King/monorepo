import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

console.log('hey 1');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `'unsafe-inline'`, `https:`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
      // contentSecurityPolicy: {
      //   directives: {
      //     imgSrc: [
      //       `'self'`,
      //       'data:',
      //       'apollo-server-landing-page.cdn.apollographql.com',
      //     ],
      //     scriptSrc: [
      //       `'self'`,
      //       `https: 'unsafe-inline'`,
      //       'http://localhost:3003', // Keep for local testing
      //       'http://127.0.0.1:3003',
      //     ],
      //     manifestSrc: [
      //       `'self'`,
      //       'apollo-server-landing-page.cdn.apollographql.com',
      //     ],
      //     frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
      //   },
      // },
    }),
  );
  // app.enableCors({
  //   origin: [
  //     'http://localhost:3003',
  //     'http://127.0.0.1:3003', // Allow Docker container access
  //   ],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  //   allowedHeaders: [
  //     'Content-Type',
  //     'Authorization',
  //     'x-apollo-operation-name',
  //     'apollo-require-preflight',
  //   ],
  // });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.USER_SERVER_PORT ?? 3000, '0.0.0.0');
}
bootstrap();
