import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      returnURL: 'http://localhost:3100/api/v1/backend/auth/steam/callback',
      realm: 'http://localhost:3100/',
      apiKey: configService.get<string>('STEAM_API_KEY'), // Replace with your Steam API key
    });
  }

  async validate(identifier: string, profile: any): Promise<any> {
    const user = { steamId: identifier, profile };
    return user;
  }
}
