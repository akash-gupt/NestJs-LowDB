import  {IsString, IsEmail, IsNotEmpty} from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}