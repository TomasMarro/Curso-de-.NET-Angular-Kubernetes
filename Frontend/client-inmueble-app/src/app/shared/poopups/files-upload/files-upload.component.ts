import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



export interface DialogData{
  multiple: boolean;
  crop : boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {
  isHovering !: boolean ;

  files : File[] = [];
  imageFile !: File ;
  isError !: boolean;

  filesUrls : string[] = [];

  constructor(
      private dialogRef: MatDialogRef<FilesUploadComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData

  ) { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean)
  {
    this.isHovering = event;
  }

  onDrop(files: FileList) : void{
    this.dropGeneral(files);
  }

  onDropFile(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.dropGeneral(event.target.files);
    }
  }



  dropGeneral(files: FileList | null): void {
    if (!files || files.length === 0) {
      this.isError = true;
      return;
    }

    this.isError = false;

    if (this.data.crop && files.length > 1) {
      this.isError = true;
      return;
    }

    for (let index = 0; index < files.length; index++) {
      const file = files.item(index);
      if (file) {
        this.files.push(file);
      }
    }

    console.log(this.files);
  }

  onUploadCompleted(url: string): void {
    this.filesUrls.push(url);
    console.log(this.filesUrls);
  }

  onComplete(): void
  {
    const res = this.data.multiple ? this.filesUrls : this.filesUrls[0];
    this.dialogRef.close(res);
  }
  onClose(): void
  {
    this.dialogRef.close();
  }

}
