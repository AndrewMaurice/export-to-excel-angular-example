import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileBufferSaverUtilService {

  saveFileBuffer(fileBuffer: any, fileName: string, fileSaverExtension: string, fileSaverType: string): void {
    const dataToBeSaved: Blob = new Blob([fileBuffer], {
      type: fileSaverType
    });

    FileSaver.saveAs(dataToBeSaved, fileName + new Date().getMilliseconds() + fileSaverExtension);
  }
}
