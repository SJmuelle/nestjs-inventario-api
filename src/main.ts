import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configurarApp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configurarApp(app);
  const config = new DocumentBuilder()
    .setTitle('Inventario API')
    .setDescription('Gestión de productos y movimientos de stock')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
