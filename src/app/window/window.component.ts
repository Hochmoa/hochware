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

        break;
      }
      case WindowType.CVEnglish: {

        break;
      }
      case WindowType.CVGerman: {

        break;
      }
      case WindowType.FolderCV: {

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
