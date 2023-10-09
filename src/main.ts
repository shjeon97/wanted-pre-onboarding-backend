import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 기본 logger 변경
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(
              'wanted-pre-onboarding',
              {
                prettyPrint: true,
              },
            ),
          ),
        }),
      ],
    }),
  });

  // 전역 유효성 검사 파이프 정의
  app.useGlobalPipes(new ValidationPipe());

  // swagger 정의서
  const config = new DocumentBuilder()
    .setTitle('wanted-pre-onboarding API')
    .setDescription('wanted-pre-onboarding API description')
    .setVersion('1.0')
    .addTag('wanted-pre-onboarding')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  try {
    await app.listen(process.env.PORT, '0.0.0.0', () =>
      console.log(
        `Running on Port ${process.env.PORT} ${process.env.NODE_ENV}`,
      ),
    );
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
