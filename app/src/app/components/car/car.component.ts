import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Car } from 'src/app/models/car';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-car',
    templateUrl: './car.component.html',
    styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
    @Input() car: Car;
    public carFrom: FormGroup;

    constructor(private modalController: ModalController, private httpClient: HttpClient) {}

    ngOnInit() {
        this.initFormGroup();
        this.setValueToForm();
    }

    initFormGroup() {
        this.carFrom = new FormGroup({
            designation: new FormControl({}, [Validators.required]),
            dailyRent: new FormControl({}, [Validators.required]),
        });
    }

    setValueToForm() {
        if (this.carFrom) {
            this.carFrom.get('designation').setValue(this.car.designation ? this.car.designation : null);
            this.carFrom.get('dailyRent').setValue(this.car.dailyRent ? this.car.dailyRent : null);
        }
    }

    /**
     * on save Change
     */
    saveChange() {
        this.car.designation = this.carFrom.get('designation').value;
        this.car.dailyRent = this.carFrom.get('dailyRent').value;
        let apiUrl: string = '';
        if (this.car.id > 0) {
            apiUrl = 'updateCar';
        } else {
            apiUrl = 'addCar';
        }

        this.httpClient.post(environment.apiUrl + apiUrl, this.car).subscribe((_res: any) => {
            this.modalController.dismiss({
                dismissed: true,
                changed: true,
            });
        });
    }
}
