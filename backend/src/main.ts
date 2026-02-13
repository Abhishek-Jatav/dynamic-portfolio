import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

function normalizeOrigins(origins?: string) {
  if (!origins) return [];

  return origins
    .split(',')
    .map((o) => o.trim().toLowerCase().replace(/\/$/, ''))
    .filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ Allowed origins from ENV
  const allowedOrigins = [
    ...normalizeOrigins(process.env.FRONTEND_URI_PROD),
    ...normalizeOrigins(process.env.FRONTEND_URI_DEV),
  ];

  console.log('✅ Allowed CORS Origins:', allowedOrigins);

  // ✅ CORS setup
  app.enableCors({
    origin: (origin, callback) => {
      // allow server-to-server / postman
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.toLowerCase().replace(/\/$/, '');

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.error('❌ Blocked CORS origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });

  // ✅ PORT
  const port = process.env.PORT || 4000;

  await app.listen(port);

  console.log(`🚀 Backend running on port ${port}`);
}

bootstrap();
