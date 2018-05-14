import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';

import { PainelRoutingModule } from './painel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,

    PanelModule,
    ChartModule,

    SharedModule,
    PainelRoutingModule
  ],
  declarations: [DashboardComponent],
  providers: [DecimalPipe]
})

export class PainelModule { }
