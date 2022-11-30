import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DesktopIconComponent} from "../desktop-icon/desktop-icon.component";
import {WindowComponent, WindowType} from "../window/window.component";

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit, AfterViewInit {

  @ViewChild('windowComponentAbout', {static: true}) windowComponentAbout!: WindowComponent;
  @ViewChild('windowComponentCVFolder', {static: true}) windowComponentCVFolder!: WindowComponent;
  @ViewChild('windowComponentCVEnglish', {static: true}) windowComponentCVEnglish!: WindowComponent;
  @ViewChild('windowComponentCVGerman', {static: true}) windowComponentCVGerman!: WindowComponent;
  @ViewChild('windowComponentImpressum', {static: true}) windowComponentImpressum!: WindowComponent;
  @ViewChild('windowComponentRacoon', {static: true}) windowComponentRacoon!: WindowComponent;
  desktopIcons: DesktopIcon[][] = [[
    {
      imgSrc: 'assets/my-computer.png',
      text: 'My Computer',
      id: 0,
      doubleClick: () => {

      }
    },
    {
      imgSrc: 'assets/network.png',
      text: 'Network Neightborhood',
      id: 1,
      doubleClick: () => {

      }
    },
    {
      imgSrc: 'assets/internet-explorer.png',
      text: 'Internet Explorer',
      id: 2,
      doubleClick: () => {
        window.open("https://thinkadnet.com/2022/09/top-5-reasons-to-stop-using-internet-explorer/", '_blank');

      }
    },
    {
      imgSrc: 'assets/recycle-bin.png',
      text: 'Recycle Bin',
      id: 3,
      doubleClick: () => {
        window.open("https://en.wikipedia.org/wiki/Raccoon", '_blank');
      }
    },
    {
      imgSrc: 'assets/opera.png',
      text: 'Opera',
      id: 4,
      doubleClick: () => {
        window.open("https://www.hongkiat.com/blog/reasons-to-use-opera-browser", '_blank');

      }
    }
  ], [
    {
      imgSrc: 'assets/text-file.png',
      text: 'About',
      id: 5,
      doubleClick: () => {
        this.windowComponentAbout.open(WindowType.About)
      }
    },
    {
      imgSrc: 'assets/folder.png',
      text: 'CVs',
      id: 6,
      doubleClick: () => {
        this.windowComponentAbout.open(WindowType.FolderCV)
      }
    }
  ]]

  setSelected(event: DesktopIconComponent): void {
    setTimeout(() => {
      event.icon.selected = true;
      this.desktopIcons.flat().filter(s => s.id != event.icon.id).forEach(s => s.selected = false);
    }, 40)
  }

  unselectedAll() {
    this.desktopIcons.flat().forEach(s => s.selected = false);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.windowComponentAbout.open(WindowType.About);
  }
}

export class DesktopIcon {
  imgSrc!: string;
  text!: string;
  selected?: boolean;
  id!: number;
  doubleClick!: Function;
}
