import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DesktopComponent, DesktopIcon} from "../desktop/desktop.component";
import {CdkDragStart} from "@angular/cdk/drag-drop";

@Component({
  selector: 'desktop-icon',
  templateUrl: './desktop-icon.component.html',
  styleUrls: ['./desktop-icon.component.scss']
})
export class DesktopIconComponent {
  @Input() icon!: DesktopIcon;
  @Input() notDraggable?: boolean;
  @Output() setSelected: EventEmitter<DesktopIconComponent> = new EventEmitter<DesktopIconComponent>();
  @Input() blackText?: boolean;
  dragging: boolean = false;

}
