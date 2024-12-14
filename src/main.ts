import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function main() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*',
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT);

  console.log(
    `################################################################ \n  * 🚀 Application is running on: http://127.0.0.1:${process.env.PORT}/api 🚀 *\n ###############################################################`,
  );
}
main();
