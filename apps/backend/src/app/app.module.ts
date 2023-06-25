import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { getDataSourceConfig } from '../data-source';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { LanguagesModule } from '../languages/languages.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsModule } from '../words/words.module';

@Module({
  imports: [
    WordsModule,
    LanguagesModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}`
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => getDataSourceConfig(),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();

        return dataSource;
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
