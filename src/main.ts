
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
let server: Handler ;

async function bootstrapServerless() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: any, context: Context) => {
  server = server ?? (await bootstrapServerless());
  return server(event, context);
};


async function bootstrap() { 
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = Number(configService.get('PORT') ?? '3500'); 
  await app.listen( port ,()=>{
    console.log(`server is running on port ${port}`);
  });
}
bootstrap();
