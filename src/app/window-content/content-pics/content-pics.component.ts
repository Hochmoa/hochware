import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {DesktopIcon} from '../../desktop/desktop.component';
import {DesktopIconComponent} from '../../desktop-icon/desktop-icon.component';
import {WindowComponent} from '../../window/window.component';
import {GalleryFolder, GalleryService} from '../../gallery/gallery.service';

/** Explorer-style folder view over the photo tree, with a nested image viewer window. */
@Component({
  selector: 'content-pics',
  templateUrl: './content-pics.component.html',
  styleUrls: ['./content-pics.component.scss']
})
export class ContentPicsComponent implements OnInit {
  /** True while the hosting window is visible; gates keyboard shortcuts. */
  @Input() active: boolean = false;
  @ViewChild('viewerWindow') viewerWindow!: WindowComponent;

  root?: GalleryFolder;
  /** Folder trail from root to the current folder. */
  trail: GalleryFolder[] = [];
  icons: DesktopIcon[] = [];
  loadError = false;

  constructor(private gallery: GalleryService) {
  }

  ngOnInit(): void {
    this.gallery.load().subscribe({
      next: root => {
        this.root = root;
        this.trail = [root];
        this.buildIcons();
      },
      error: () => this.loadError = true
    });
  }

  get current(): GalleryFolder | undefined {
    return this.trail[this.trail.length - 1];
  }

  get address(): string {
    return 'C:\\' + this.trail.map(f => f.name).join('\\');
  }

  get canGoUp(): boolean {
    return this.trail.length > 1;
  }

  enter(folder: GalleryFolder): void {
    this.trail = [...this.trail, folder];
    this.buildIcons();
  }

  up(): void {
    if (!this.canGoUp) return;
    this.trail = this.trail.slice(0, -1);
    this.buildIcons();
  }

  openImage(index: number): void {
    if (!this.current) return;
    this.viewerWindow.openImage(this.current.images, index);
  }

  setSelected(event: DesktopIconComponent): void {
    setTimeout(() => {
      event.icon.selected = true;
      this.icons.filter(i => i.id != event.icon.id).forEach(i => i.selected = false);
    }, 40);
  }

  unselectAll(): void {
    this.icons.forEach(i => i.selected = false);
  }

  @HostListener('window:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (!this.active || (this.viewerWindow && this.viewerWindow.shown)) return;
    if (event.key === 'Backspace' && this.canGoUp) {
      event.preventDefault();
      this.up();
    }
  }

  private buildIcons(): void {
    const folder = this.current;
    if (!folder) return;
    let id = 0;
    this.icons = [
      ...folder.folders.map(f => ({
        imgSrc: 'assets/folder.png',
        text: f.name,
        id: id++,
        doubleClick: () => this.enter(f)
      })),
      ...folder.images.map((img, index) => ({
        imgSrc: 'assets/image-file.png',
        text: img.name,
        id: id++,
        doubleClick: () => this.openImage(index)
      }))
    ];
  }
}
