import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { CarPageRoutingModule } from './car-routing.module';

import { CarPage } from './car.page';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, CarPageRoutingModule, HttpClientModule],
    declarations: [CarPage],
})
export class CarPageModule {}
