import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.scss"],
})
export class FileUploaderComponent implements OnInit {
  @Input() accept: string;
  @Input() fileSrc: string;
  @Output() onFileUpload = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleFileUpload(event: any) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.fileSrc = e.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
    this.onFileUpload.emit({
      fileSrc: this.fileSrc,
      file: event.target.files[0],
    });
  }
}
