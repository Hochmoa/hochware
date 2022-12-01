import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'content-pdf',
  templateUrl: './content-pdf.component.html',
  styleUrls: ['./content-pdf.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentPdfComponent {
  @Input() pdfSrc!: string;
}
