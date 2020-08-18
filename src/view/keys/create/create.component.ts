import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyType } from '@model/keys/key.model';

export type CreateOnSubmitEvent = {
  id: string;
  type: KeyType;
  privateKey: string;
};

@Component({
  selector: 'view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  @Input()
  privateKey?: string | null;

  @Output()
  appMnemonic: EventEmitter<string>;

  @Output()
  appSubmit: EventEmitter<CreateOnSubmitEvent>;

  constructor() {
    this.appMnemonic = new EventEmitter();
    this.appSubmit = new EventEmitter();
  }

  ngOnInit(): void {}

  onBlurMnemonic(mnemonic: string) {
    this.appMnemonic.next(mnemonic);
  }

  onSubmit(id: string, type: KeyType, privateKey: string) {
    this.appSubmit.emit({ id, type, privateKey });
  }
}
