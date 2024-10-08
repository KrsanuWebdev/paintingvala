
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = Number(configService.get('PORT') ?? '3500'); 
  await app.listen( port ,()=>{
    console.log(`server is running on port ${port}`);
  });
}
bootstrap();
