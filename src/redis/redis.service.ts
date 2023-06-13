import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';
import { SetRedisto } from './dto/set-redis.dto';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
  ) {}
  onModuleDestroy() {
    this.redisClient.quit();
  }

  ping() {
    return this.redisClient.ping();
  }

  async set(setRedisDto: SetRedisto) {
    const { key, value } = setRedisDto;
    await this.redisClient.set(key, value);
    return `Set value to Redis ${value}`;
  }

  async get(key: string) {
    const retrievedValue = await this.redisClient.get(key);
    return `Retrieved value: ${retrievedValue}`;
  }
}
