import {ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DesktopIconComponent} from "../desktop-icon/desktop-icon.component";
import {CdkDragStart} from "@angular/cdk/drag-drop";

@Component({
  selector: 'notify-message',
  templateUrl: './notify-message.component.html',
  styleUrls: ['./notify-message.component.scss']
})
export class NotifyMessageComponent {
  title!: string;
  width: number = 300;
  height: number = 100;
  @Input() shown: boolean = false;
  titleIconPath!: string;
  iconType!: IconType;
  IconType = IconType;
  dragging!: boolean;
  grabSuggest!: boolean;
  message!: string;
  @Input() cookieMsg?: boolean = false;

  constructor(private changeDetection: ChangeDetectorRef) {
  }

  @ViewChild("notifyComponent") notifyComponent!: ElementRef;
  callback?: Function;

  open(message: string, type: IconType, higher?: boolean, callback?: Function) {
    this.iconType = type;
    this.callback = callback;
    this.message = message;
    let e = this.notifyComponent.nativeElement;
    e.style.transform = `translate3d(${window.innerWidth / 2 - this.width / 2}px, ${window.innerHeight / 2 - this.height / 2}px, 0px)`;
    this.shown = true;
    if (higher) this.height += 50;
    this.changeDetection.detectChanges()
  }

  close() {
    if (this.callback) this.callback();
    this.shown = false;
  }

  checkDrag(event: CdkDragStart<any>): void {
    console.log(event);
    if (!this.grabSuggest) {
      event.event.preventDefault();
    }
  }
}

export enum IconType {
  Success, Warning, Error
}
