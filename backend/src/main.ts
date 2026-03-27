import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

function normalize(origin?: string) {
  return origin?.toLowerCase().replace(/\/$/, '');
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

  // ✅ Allowed origins
  const allowedOrigins = [
    normalize(process.env.FRONTEND_URI_PROD),
    normalize(process.env.FRONTEND_URI_DEV),
  ].filter(Boolean);

  console.log('✅ Allowed CORS Origins:', allowedOrigins);

  // ✅ CORS
  app.enableCors({
    origin: (origin, callback) => {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      const normalizedOrigin = normalize(origin);

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.error('❌ Blocked CORS origin:', origin);
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  });

  // ✅ PORT
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Backend running on port ${port}`);
}

bootstrap();
