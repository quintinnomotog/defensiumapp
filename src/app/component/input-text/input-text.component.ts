import { Component, Input, OnInit } from '@angular/core';
import { IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  imports: [IonLabel]
})
export class InputTextComponent  implements OnInit {

  @Input()
  public type: string = "text";

  @Input()
  public label: string = "";

  public isFoco: boolean = false;

  constructor() { }

  ngOnInit() { }

  public onHabilitarFoco(event: any) {
    return !event.target.value ? this.isFoco = false : true;
  }

}
