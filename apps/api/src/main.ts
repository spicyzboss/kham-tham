import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

const loggerEnvironment = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
}

async function launch() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: loggerEnvironment[ENV] ?? true,
    }),
    {
      abortOnError: false,
      logger: false
    }
  );

  await app.listen(PORT, '0.0.0.0');
}

launch();
