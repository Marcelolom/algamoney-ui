import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MsgComponent } from './msg/msg.component';

@NgModule({
  imports: [ CommonModule  ],
  declarations: [ MsgComponent ],
  exports: [ MsgComponent ]
})
export class SharedModule { }
