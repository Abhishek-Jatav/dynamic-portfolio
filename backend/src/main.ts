import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Combine backend + frontend allowed origins
  const allowedOrigins = [
    ...(process.env.BACKEND_URI?.split(',') || []),
    ...(process.env.FRONTEND_URI?.split(',') || []),
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // allow requests with no origin (like Postman, mobile apps)
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
