import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DesktopComponent, DesktopIcon} from "../desktop/desktop.component";

@Component({
  selector: 'desktop-icon',
  templateUrl: './desktop-icon.component.html',
  styleUrls: ['./desktop-icon.component.scss']
})
export class DesktopIconComponent {
  @Input() icon!: DesktopIcon;
  @Output() setSelected: EventEmitter<DesktopIconComponent> = new EventEmitter<DesktopIconComponent>();
  dragging: boolean = false;
}
