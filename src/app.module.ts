// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ExemploModule } from './exemplo/exemplo.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),

//    // MongooseModule.forRoot(process.env.MONGO_URI!),

//     ExemploModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { PraticaModule } from './pratica/pratica.module';

// @Module({
//  imports: [
//    ConfigModule.forRoot({
//      isGlobal: true,
//    }),
//    PraticaModule,
//  ],
//  controllers:[AppController],
//  providers:[AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PraticaModule } from './pratica/pratica.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    //MongooseModule.forRoot('mongodb+srv://rebeca:040927@cluster0.hw05mxq.mongodb.net/proj_aula7?retryWrites=true&w=majority&appName=Cluster0'),

    PraticaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}