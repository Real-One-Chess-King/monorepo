import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
          connectSrc: [
            "'self'",
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:8080',
          ],
          defaultSrc: ["'self'"],
        },
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:8080',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.USER_SERVER_PORT || 3000, '0.0.0.0');
}
bootstrap();
