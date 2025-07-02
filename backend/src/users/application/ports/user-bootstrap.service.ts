import { OnApplicationBootstrap } from '@nestjs/common';

export abstract class UserBootstrapService implements OnApplicationBootstrap {
  abstract onApplicationBootstrap(): Promise<void>;
}
