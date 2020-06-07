import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'flikshop-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;

  constructor() { }

  ngOnInit() {
  }

}
