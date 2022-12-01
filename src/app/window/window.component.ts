import {ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DesktopIconComponent} from "../desktop-icon/desktop-icon.component";
import {CdkDragStart} from "@angular/cdk/drag-drop";

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent {
  title!: string;
  width: number = 600;
  height: number = 300;
  @Input() shown: boolean = false;
  titleIconPath!: string;
  windowType!: WindowType;
  WindowType = WindowType;
  dragging!: boolean;
  grabSuggest!: boolean;
  pdfSrc!: string;

  constructor(private changeDetection: ChangeDetectorRef) {
  }

  @ViewChild("windowComponent") windowComponent!: ElementRef;

  open(type: WindowType) {
    this.windowType = type;
    switch (type) {
      case WindowType.About: {
        this.title = "About.txt";
        this.titleIconPath = "assets/text-file.png";
        let e = this.windowComponent.nativeElement;
        e.style.transform = `translate3d(${window.innerWidth / 2 - this.width / 2}px, ${window.innerHeight / 2 - this.height / 2}px, 0px)`;
        break;
      }
      case WindowType.Racoon: {
        this.title = "Racoon.exe";
        this.titleIconPath = "assets/text-file.png";
        this.width = 400;
        this.height = 338;
        let e = this.windowComponent.nativeElement;
        e.style.transform = `translate3d(${window.innerWidth / 2 - this.width / 2}px, ${window.innerHeight / 2 - this.height / 2}px, 0px)`;
        break;
      }
      case WindowType.CVEnglish: {
        this.title = "CV_English.pdf";
        this.titleIconPath = "assets/text-file.png";
        this.pdfSrc = "assets/CV_English.pdf";
        this.width = 600;
        this.height = 500;
        let e = this.windowComponent.nativeElement;
        e.style.transform = `translate3d(0px,-300px, 0px)`;
        break;
      }
      case WindowType.CVGerman: {
        this.title = "CV_German.pdf";
        this.titleIconPath = "assets/text-file.png";
        this.pdfSrc = "assets/CV_German.pdf";
        this.width = 600;
        this.height = 500;
        let e = this.windowComponent.nativeElement;
        e.style.transform = `translate3d(0px,-300px, 0px)`;
        break;
      }
      case WindowType.FolderCV: {
        this.title = "CVs";
        this.titleIconPath = "assets/folder.png";
        let e = this.windowComponent.nativeElement;
        e.style.transform = `translate3d(${window.innerWidth / 2 - this.width / 2}px, ${window.innerHeight / 2 - this.height / 2}px, 0px)`;
        break;
      }
    }


    this.shown = true;
    this.changeDetection.detectChanges()
  }

  close() {
    this.shown = false;
  }

  checkDrag(event: CdkDragStart<any>): void {
    console.log(event);
    if (!this.grabSuggest) {
      event.event.preventDefault();
    }
  }
}

export enum WindowType {
  About, FolderCV, CVGerman, CVEnglish, Racoon
}
