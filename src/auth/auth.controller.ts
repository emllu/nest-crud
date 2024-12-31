import { Controller, Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import * as argon2 from "argon2"
@Controller('auth')

export class AuthController {
    constructor(private authService:AuthService){}

@Post('signup')
signup(@Body() dto:AuthDto){
    return this.authService.signup(dto);
    console.log(this.authService.signup(dto)
    )


}



  @Post('signin')
signin(@Body() dto:AuthDto){
    return this.authService.signin(dto)
}
    
}
