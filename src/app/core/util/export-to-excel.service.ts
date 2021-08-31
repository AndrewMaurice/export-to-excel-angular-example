import { FileBufferSaverUtilService } from './file-buffer-saver-util.service';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpParams } from '@angular/common/http';
import { GenericHttpService } from '../http/generic-http-service.service';
import { FileSaverExtentions } from 'src/app/shared/models/file-saver-types-and-extentions.model';

@Injectable({
  providedIn: 'root'
})
export class ExportToExcelService {

  constructor(private excelFileSaverUtiService: FileBufferSaverUtilService,
              private dataService: GenericHttpService) {}

  async exportJsonToExcelFromRemoteUrl(fileName: string,  remoteUrl: string, params?: any): Promise<void> {

    const dataToBeExported = await this.fetchDataToBeExported(remoteUrl, params);


    return new Promise(resolve => {

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToBeExported);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(wb, ws, 'Data');

      XLSX.writeFile(wb, `${fileName} ${new Date().toISOString()}${FileSaverExtentions.excel}`);

      resolve();
    });
  }

  async exportReadyJsonToExcel(fileName: string, dataToBeExported: any[]): Promise<void> {
    return new Promise(resolve => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToBeExported);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(wb, ws, 'Data');

      XLSX.writeFile(wb, `${fileName} ${new Date().toISOString()}${FileSaverExtentions.excel}`);
      resolve();
    });
  }

  private async fetchDataToBeExported(remoteUrl: string, params?: any): Promise<any> {
    return new Promise(resolve => {
      resolve(this.dataService
        .getData(remoteUrl, params)
        .toPromise()
        .then((res) => {
          return res.data;
        }));
    });
  }



}
