import { UploadService } from './upload.service';
import { Post, Controller, UseInterceptors, UploadedFile,
  // ParseFilePipeBuilder 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
const log = console.log;

@Controller('upload')
export class UploadController {
  
  constructor(
    private readonly uploadService: UploadService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))  // 'file' is the fieldname used in the body of our post request
  async uploadFile(@UploadedFile(
      // new ParseFilePipe({               /* Used for file validation but requires nest version 9 */
      //   validators: [
      //     new MaxFileSizeValidator({ maxSize: 1000 }),
      //     new FileTypeValidator({ fileType: 'image/jpeg'})
      //   ],
      // })
    ) file: Express.Multer.File) {  /* defines file of type Multer */
   
    // file is now cast to a multer object where buffer holds the content and 
    // originalname is actual name of file. When you log file object it 
    // will also display fieldname, encoding, and mimetype
    log(file); 

    // here we upload to s3 using original name and the content multer placed in buffer
    await this.uploadService.upload(file.originalname, file.buffer)
  }

}
