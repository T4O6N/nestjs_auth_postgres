import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { setupSwagger } from './common/swagger/swagger.config';
import * as cookieParser from 'cookie-parser';

async function main() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*',
  };

  app.use(cookieParser());

  app.enableCors(corsOptions);

  if (process.env.SWAGGER_ENABLE === 'true') {
    setupSwagger(app);
  }

  await app.listen(process.env.PORT);

  console.log(
    `################################################################ \n  * 🚀 Application is running on: http://127.0.0.1:${process.env.PORT}/api 🚀 *\n ###############################################################`,
  );
}
main();
