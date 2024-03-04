import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { isEmail } from 'class-validator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ){}

    public async signup(signupDto: SignupDto){
        if (
            await this.userRepository.existsBy({ email: signupDto.email }) ||
            await this.userRepository.existsBy({ username: signupDto.username})  
        ) throw new NotFoundException();
      
        signupDto.password = await bcrypt.hash(signupDto.password, 10)
        await this.userRepository.save(signupDto);
    }

    public async signin(signinDto: SigninDto){
        const validEmail = isEmail(signinDto.usernameOrEmail)
        const user = await this.userRepository.findOneBy(validEmail ? 
        {email: signinDto.usernameOrEmail} : {username: signinDto.usernameOrEmail})

        if(!user) throw new HttpException('Not found user', HttpStatus.NOT_FOUND)

        if(!bcrypt.compare(signinDto.password, user.password)){
            throw new UnauthorizedException()
        }

        const payload = { sub: user.id }

        return {"Access-Token": await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET})}
    }
}
