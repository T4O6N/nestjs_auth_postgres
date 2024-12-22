import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('Auth API Docs')
        .setDescription('Auth API description')
        .addBearerAuth({
            description: 'Default JWT Authorization',
            type: 'http',
            in: 'headers',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        })
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    const customeSiteTitle: SwaggerCustomOptions = {
        customSiteTitle: 'Auth API Docs',
        swaggerOptions: {
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true,
        },
    };
    SwaggerModule.setup('api', app, document, customeSiteTitle);
}
