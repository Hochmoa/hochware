import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {GalleryImage} from '../../gallery/gallery.service';

/** Shows one image of a folder; left/right arrows (keys or buttons) move through the folder. */
@Component({
  selector: 'content-image-viewer',
  templateUrl: './content-image-viewer.component.html',
  styleUrls: ['./content-image-viewer.component.scss']
})
export class ContentImageViewerComponent {
  @Input() images: GalleryImage[] = [];
  @Input() index: number = 0;
  /** True while the hosting window is visible; gates keyboard shortcuts. */
  @Input() active: boolean = false;
  @Output() indexChange = new EventEmitter<number>();
  @Output() closeRequest = new EventEmitter<void>();

  get image(): GalleryImage | undefined {
    return this.images[this.index];
  }

  get hasPrev(): boolean {
    return this.index > 0;
  }

  get hasNext(): boolean {
    return this.index < this.images.length - 1;
  }

  prev(): void {
    if (this.hasPrev) this.go(this.index - 1);
  }

  next(): void {
    if (this.hasNext) this.go(this.index + 1);
  }

  private go(index: number): void {
    this.index = index;
    this.indexChange.emit(index);
  }

  @HostListener('window:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (!this.active) return;
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
      case 'Escape':
        this.closeRequest.emit();
        break;
    }
  }
}
