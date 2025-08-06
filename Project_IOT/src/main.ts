import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './common/midlleware/allExeptionFilter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    const configService = app.get(ConfigService)
    const config = new DocumentBuilder()
        .setTitle('The first NestJs project')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('User, Post, Profile')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    
    app.useGlobalPipes(new ValidationPipe({ transform: true })); // Ensures proper validation and transformation
    const port = configService.get<string>('PORT')
    await app.listen(port ?? 3000);
}
bootstrap();