import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'task-bar',
  templateUrl: './task-bar.component.html',
  styleUrls: ['./task-bar.component.scss']
})
export class TaskBarComponent implements OnInit {
  systemTime!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.systemTime = this.getDateFormatted();
    setInterval(() => {
      this.systemTime = this.getDateFormatted();
    }, 60000);
  }

  getDateFormatted(): string {
    let date = new Date();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let prefix = "AM";
    if (hours > 12) {
      hours -= 12;
      prefix = "PM";
    }
    let str = "";
    if (hours < 10) str += "0";
    str += hours + ":";
    if (minutes < 10) str += "0";
    str += minutes;
    return str + " " + prefix;
  }
}
