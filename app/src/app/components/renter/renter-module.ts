// Import Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import Ionic Libraries
import { IonicModule } from '@ionic/angular';
// Import Own
import { RenterComponent } from './renter.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    declarations: [RenterComponent],
    entryComponents: [RenterComponent],
    exports: [RenterComponent],
})
export class RenterComponentModule {}
