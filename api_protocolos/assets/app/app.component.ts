import { Component } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from './file.service';
import {saveAs} from 'file-saver';

const uri = 'http://ec2-3-16-225-181.us-east-2.compute.amazonaws.com:3004/file/upload';
const uriLocal ="http://localhost:3004/file/upload ";
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers:[FileService]
})
export class AppComponent {

    uploader:FileUploader = new FileUploader({url:uriLocal});
    // uploader:FileUploader = new FileUploader({url:uri});
    attachmentList:any = [];

    constructor(private _fileService:FileService){

        this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
            this.attachmentList.push(JSON.parse(response));
        }
    }

    download(index, "tipopdf"){
        var filename = this.attachmentList[index].uploadname;
        
        this._fileService.downloadFile(filename, tipopdf)
        .subscribe(
            data => saveAs(data, filename, tipopdf),
            error => console.error(error)
        );
    }
}