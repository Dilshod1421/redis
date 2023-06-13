import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RedisService } from './redis.service';
import { SetRedisto } from './dto/set-redis.dto';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('ping')
  redisPing() {
    return this.redisService.ping();
  }

  @Post('set')
  set(@Body() setRedisDto: SetRedisto) {
    return this.redisService.set(setRedisDto);
  }

  @Get('get/:key')
  get(@Param('key') key: string) {
    return this.redisService.get(key);
  }
}
