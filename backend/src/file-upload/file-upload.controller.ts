import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import MulterConfigService from './multer-config.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private multerConfigService: MulterConfigService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(@UploadedFile() file: any): string {
    return file.filename;
  }

  @Get('view/:filename')
  viewFile(@Param('filename') filename: string, @Res() res) {
    if (filename == 'null') {
      res.status(404).end();
    }
    if (filename != 'null') {
      res.sendFile(filename, {
        root: this.multerConfigService.destConfigDirectory,
      });
    }
  }
}
