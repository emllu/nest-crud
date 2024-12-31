import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from "argon2";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password.toString());

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toString(),
        hash: hash,
      },
    });

    delete user.hash;
    return user;
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findFirst({
        where: {
          email:dto.email,  // Query by unique email
        },
      });
      

    if (!user) {
      throw new ForbiddenException('Credential not found');
    }

    const passwordMatch = await argon.verify(user.hash, dto.password.toString());
    if (!passwordMatch) {
      throw new ForbiddenException('The password is incorrect');
    }

    delete user.hash;
    return this.signToken(user.id,user.email );
  }

  async signToken (userid:number,email:string){
    const payload={
      sub:userid,
      email

  }
  const token=await JWT.asyncSign(payload,{expiresIn:'1d',secret:"hello"})
return {accessToken:token}

  };
}
