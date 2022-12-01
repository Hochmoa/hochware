import {Component, ViewChild} from '@angular/core';
import {DesktopIcon} from "../../desktop/desktop.component";
import {WindowComponent, WindowType} from "../../window/window.component";

@Component({
  selector: 'content-cv-folder',
  templateUrl: './content-cv-folder.component.html',
  styleUrls: ['./content-cv-folder.component.scss']
})
export class ContentCvFolderComponent {
  @ViewChild('windowComponentCVEnglish') windowComponentCVEnglish!: WindowComponent;
  @ViewChild('windowComponentCVGerman') windowComponentCVGerman!: WindowComponent;
  iconCvEnglish: DesktopIcon = {
    imgSrc: 'assets/text-file.png',
    text: "CV_English.pdf",
    doubleClick: () => {
      this.openPdf("en");

    },
    id: 99
  }
  iconCvGerman: DesktopIcon = {
    imgSrc: 'assets/text-file.png',
    text: "CV_German.pdf",
    doubleClick: () => {
      this.openPdf("de");
    },
    id: 99
  };

  openPdf(lang: string) {
    if (lang == "en") this.windowComponentCVEnglish.open(WindowType.CVEnglish);
    if (lang == "de") this.windowComponentCVGerman.open(WindowType.CVEnglish);
  }
}
