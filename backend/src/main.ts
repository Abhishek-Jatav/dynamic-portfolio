import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unknown fields
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Combine backend + frontend allowed origins
  const allowedOrigins = [
    ...(process.env.BACKEND_URI?.split(',') || []),
    ...(process.env.FRONTEND_URI?.split(',') || []),
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  const port = process.env.BACKEND_PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Backend running on port ${port}`);
}

bootstrap();
