import { Controller, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class PrismaController {
   constructor( private prisma:PrismaService){}
   
}
