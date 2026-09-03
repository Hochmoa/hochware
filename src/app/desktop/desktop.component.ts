import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DesktopIconComponent} from "../desktop-icon/desktop-icon.component";
import {WindowComponent, WindowType} from "../window/window.component";
import {IconType, NotifyMessageComponent} from "../notify-message/notify-message.component";

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit, AfterViewInit {

  @ViewChild('windowComponentAbout') windowComponentAbout!: WindowComponent;
  @ViewChild('windowComponentCVFolder') windowComponentCVFolder!: WindowComponent;

  @ViewChild('windowComponentImpressum') windowComponentImpressum!: WindowComponent;
  @ViewChild('windowComponentRacoon') windowComponentRacoon!: WindowComponent;
  @ViewChild('windowComponentPics') windowComponentPics!: WindowComponent;
  @ViewChild('notifyMessage') notifyMessage!: NotifyMessageComponent;

  desktopIcons: DesktopIcon[][] = [[
    {
      imgSrc: 'assets/my-computer.png',
      text: 'My Computer',
      id: 0,
      doubleClick: () => {
        this.notifyMessage.open("Task failed successfully.", IconType.Success)
      }
    },
    {
      imgSrc: 'assets/network.png',
      text: 'Network Neightborhood',
      id: 1,
      doubleClick: () => {
        this.notifyMessage.open("Task failed successfully.", IconType.Success)
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
        this.windowComponentRacoon.open(WindowType.Racoon)
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
        this.windowComponentCVFolder.open(WindowType.FolderCV)
      }
    },
    {
      imgSrc: 'assets/printer.png',
      text: 'Printer',
      id: 7,
      doubleClick: () => {
        this.windowComponentPics.open(WindowType.Pics)
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
  }
}

export class DesktopIcon {
  imgSrc!: string;
  text!: string;
  selected?: boolean;
  id!: number;
  doubleClick!: Function;
}
