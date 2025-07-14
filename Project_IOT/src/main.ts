import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('The first NestJs project')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('User, Post, Profile')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    
    app.useGlobalPipes(new ValidationPipe({ transform: true })); // Ensures proper validation and transformation
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();