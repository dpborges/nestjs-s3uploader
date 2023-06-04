import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({ 
    region: this.configService.getOrThrow('AWS_S3_REGION')
  });

  constructor(
    private readonly configService: ConfigService
  ) {}

  async upload(s3Key: string, file: Buffer) {
    await this.s3Client.send(new PutObjectCommand({
      Bucket: 'test.pitchinclub.com',
      Key: s3Key,
      Body: file
    }));
  }

}
