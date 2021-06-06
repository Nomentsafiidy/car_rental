// Import Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import Ionic Libraries
import { IonicModule } from '@ionic/angular';
// Import Own
import { RentComponent } from './rent.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    declarations: [RentComponent],
    entryComponents: [RentComponent],
    exports: [RentComponent],
})
export class RentComponentModule {}
