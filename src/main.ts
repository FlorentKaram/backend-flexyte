import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    // swagger title
    .setTitle('Flexyte API')
    // swagger description
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'acces-token',
    )
    //your api version
    .setVersion('1.0.0')
    .build();
  
  app.use(json({ limit: '14mb' }));
  app.use(urlencoded({ extended: true, limit: '14mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipUndefinedProperties: false,
    }),
  );
  app.setGlobalPrefix('backendFlexyte/');
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('backendFlexyte/' + 'api', app, document);

  await app.listen(3000);
  console.log('Swagger running on http://localhost:3000/backendFlexyte/api/');
}
bootstrap();
