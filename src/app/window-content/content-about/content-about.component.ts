import {ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'content-about',
  templateUrl: './content-about.component.html',
  styleUrls: ['./content-about.component.scss']
})
export class ContentAboutComponent {
  text: string = "Surprise! This is not actually Windows NT.\n\n" +
    "Handcrafted with love by Martin Hochmair, before Agentic Coding was a thing\n\n" +
    "No external Libraries used except for:\n" +
    "-Angular\n" +
    "-Angular/CDK\n" +
    "-PDFViewer"
}
