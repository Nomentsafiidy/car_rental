import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenterPageRoutingModule } from './renter-routing.module';

import { RenterPage } from './renter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenterPageRoutingModule
  ],
  declarations: [RenterPage]
})
export class RenterPageModule {}
