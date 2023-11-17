import { ResourceDto } from '@common/resources/paginate.resource';
import { Expose, Type } from 'class-transformer';

class UserResource {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: string;
}

export class AuthResource {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => UserResource)
  user: UserResource;
}

export class AuthResourceDto extends ResourceDto {
  @Expose()
  @Type(() => AuthResource)
  data: AuthResource;
}
