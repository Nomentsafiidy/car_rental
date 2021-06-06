import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenterPageRoutingModule } from './renter-routing.module';

import { RenterPage } from './renter.page';
import { HttpClientModule } from '@angular/common/http';
import { RenterComponentModule } from 'src/app/components/renter/renter-module';
@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RenterPageRoutingModule, HttpClientModule, RenterComponentModule],
    declarations: [RenterPage],
})
export class RenterPageModule {}
