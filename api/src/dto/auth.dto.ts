import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginRequestDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  password: string
}

export class SignupRequestDto extends LoginRequestDto {
  @IsString()
  @MinLength(8)
  passwordDuplicate: string
}
