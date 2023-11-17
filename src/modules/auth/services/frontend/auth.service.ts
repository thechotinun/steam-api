import { TokenTypeEnum } from '@common/enums/o-auth/token-type.enum';
import { OauthUser } from '@entities/o-auth-user.entity';
import { User } from '@entities/user.entity';
import { AuthException } from '@exceptions/app/auth.exception';
import { LoginDto } from '@modules/auth/dto/backend/login.dto';
import { UserService } from '@modules/user/services/backend/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OauthUserRepository } from '@repositories/o-auth.repository';
import { compare } from 'bcrypt';
import { get } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(OauthUserRepository)
    private readonly oAuthUserRepository: OauthUserRepository,
  ) {}

  comparePassword = async (password: string, userPassword: string) =>
    await compare(password, userPassword);

  async signIn(credential: LoginDto) {
    const { email, password } = credential;
    const user = await this.userService.findOne(email);

    if (!this.comparePassword(password, user.password)) {
      throw new UnauthorizedException();
    }

    const oAuth: OauthUser = await this.createOauthUser(user);

    return await this.getTokens(oAuth, user.email);
  }

  async createOauthUser(user: User): Promise<OauthUser> {
    try {
      const created: OauthUser = await this.oAuthUserRepository.create({
        user: user.id,
      });

      return await this.oAuthUserRepository.save(created);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getTokens(oAuth: OauthUser, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: oAuth.accessToken,
          email,
        },
        {
          secret: this.configService.get<string>('jwt.frontend.access.secret'),
          expiresIn: this.configService.get<string>(
            'jwt.frontend.access.expire',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: oAuth.refreshToken,
        },
        {
          secret: this.configService.get<string>('jwt.frontend.refresh.secret'),
          expiresIn: this.configService.get<string>(
            'jwt.frontend.refresh.expire',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateToken(token: string): Promise<OauthUser> {
    try {
      const tokenPayload = await this.jwtService.verify(token, {
        secret: this.configService.get<string>('jwt.frontend.access.secret'),
      });

      return await this.oAuthUserRepository.findToken(
        get(tokenPayload, 'sub'),
        TokenTypeEnum.ACCESS_TOKEN,
      );
    } catch (error) {
      throw AuthException.Unauthorized();
    }
  }
}
