import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    // swagger title
    .setTitle('Starker API')
    // swagger description
    .addBearerAuth({
      type: 'http', scheme: 'bearer', bearerFormat: 'JWT'
    }, 'acces-token'
    )
    //your api version
    .setVersion('1.0.0')
    .build();

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      skipUndefinedProperties: false
    }
  ));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Swagger running on http://localhost:3000/api/');
}
bootstrap();
