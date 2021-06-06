// Import Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import Ionic Libraries
import { IonicModule } from '@ionic/angular';
// Import Own
import { CarComponent } from './car.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    declarations: [CarComponent],
    entryComponents: [CarComponent],
    exports: [CarComponent],
})
export class CarComponentModule {}
