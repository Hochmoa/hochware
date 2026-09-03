import {ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CdkDragStart} from "@angular/cdk/drag-drop";
import {GalleryImage} from "../gallery/gallery.service";

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
  viewerImages: GalleryImage[] = [];
  viewerIndex: number = 0;

  constructor(private changeDetection: ChangeDetectorRef) {
  }

  @ViewChild("windowComponent") windowComponent!: ElementRef;

  open(type: WindowType) {
    this.windowType = type;
    switch (type) {
      case WindowType.About: {
        this.title = "About.txt";
        this.titleIconPath = "assets/text-file.png";
        this.center();
        break;
      }
      case WindowType.Racoon: {
        this.title = "Racoon.exe";
        this.titleIconPath = "assets/text-file.png";
        this.width = 400;
        this.height = 338;
        this.center();
        break;
      }
      case WindowType.CVEnglish: {
        this.title = "CV_English.pdf";
        this.titleIconPath = "assets/text-file.png";
        this.pdfSrc = "assets/CV_English.pdf";
        this.width = 600;
        this.height = 500;
        this.moveTo(0, -300);
        break;
      }
      case WindowType.CVGerman: {
        this.title = "CV_German.pdf";
        this.titleIconPath = "assets/text-file.png";
        this.pdfSrc = "assets/CV_German.pdf";
        this.width = 600;
        this.height = 500;
        this.moveTo(0, -300);
        break;
      }
      case WindowType.FolderCV: {
        this.title = "CVs";
        this.titleIconPath = "assets/folder.png";
        this.center();
        break;
      }
      case WindowType.Pics: {
        this.title = "Pics";
        this.titleIconPath = "assets/printer.png";
        this.width = Math.min(640, window.innerWidth - 20);
        this.height = Math.min(460, window.innerHeight - 60);
        this.center();
        break;
      }
    }

    this.shown = true;
    this.changeDetection.detectChanges()
  }

  /** Opens this window as an image viewer over the given folder images, starting at index. */
  openImage(images: GalleryImage[], index: number) {
    this.windowType = WindowType.ImageViewer;
    this.viewerImages = images;
    this.viewerIndex = index;
    this.titleIconPath = "assets/image-file.png";
    this.width = Math.min(800, window.innerWidth - 20);
    this.height = Math.min(600, window.innerHeight - 60);
    this.updateViewerTitle();
    // Nested inside the explorer window: offset so the viewer sits roughly centred on screen.
    const host = this.windowComponent.nativeElement.parentElement?.getBoundingClientRect();
    if (host) {
      this.moveTo(window.innerWidth / 2 - this.width / 2 - host.left, window.innerHeight / 2 - this.height / 2 - host.top);
    } else {
      this.center();
    }
    this.shown = true;
    this.changeDetection.detectChanges();
  }

  onViewerIndexChange(index: number) {
    this.viewerIndex = index;
    this.updateViewerTitle();
  }

  close() {
    this.shown = false;
  }

  checkDrag(event: CdkDragStart<any>): void {
    if (!this.grabSuggest) {
      event.event.preventDefault();
    }
  }

  private updateViewerTitle() {
    const img = this.viewerImages[this.viewerIndex];
    this.title = img ? img.name + " (" + (this.viewerIndex + 1) + "/" + this.viewerImages.length + ")" : "Image";
  }

  private center() {
    this.moveTo(window.innerWidth / 2 - this.width / 2, window.innerHeight / 2 - this.height / 2);
  }

  private moveTo(x: number, y: number) {
    this.windowComponent.nativeElement.style.transform = "translate3d(" + x + "px, " + y + "px, 0px)";
  }
}

export enum WindowType {
  About, FolderCV, CVGerman, CVEnglish, Racoon, Pics, ImageViewer
}
