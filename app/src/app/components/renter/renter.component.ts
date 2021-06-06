import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Renter } from 'src/app/models/renter';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-renter',
    templateUrl: './renter.component.html',
    styleUrls: ['./renter.component.scss'],
})
export class RenterComponent implements OnInit {
    @Input() renter: Renter;
    public renterForm: FormGroup;

    constructor(private modalController: ModalController, private httpClient: HttpClient) {}

    ngOnInit() {
        this.initFormGroup();
        this.setValueToForm();
    }

    initFormGroup() {
        this.renterForm = new FormGroup({
            name: new FormControl({}, [Validators.required]),
            address: new FormControl({}, [Validators.required]),
        });
    }

    setValueToForm() {
        if (this.renterForm) {
            this.renterForm.get('name').setValue(this.renter.name ? this.renter.name : null);
            this.renterForm.get('address').setValue(this.renter.address ? this.renter.address : null);
        }
    }

    /**
     * on save Change
     */
    saveChange() {
        this.renter.name = this.renterForm.get('name').value;
        this.renter.address = this.renterForm.get('address').value;
        let apiUrl: string = '';
        if (this.renter.id > 0) {
            apiUrl = 'updateRenter';
        } else {
            apiUrl = 'addRenter';
        }

        this.httpClient.post(environment.apiUrl + apiUrl, this.renter).subscribe((_res: any) => {
            this.modalController.dismiss({
                dismissed: true,
                changed: true,
            });
        });
    }
}
