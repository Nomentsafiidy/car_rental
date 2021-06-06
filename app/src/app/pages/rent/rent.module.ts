import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentPageRoutingModule } from './rent-routing.module';

import { RentPage } from './rent.page';

import { RentComponentModule } from 'src/app/components/rent/rent-module';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RentPageRoutingModule, RentComponentModule],
    declarations: [RentPage],
})
export class RentPageModule {}
