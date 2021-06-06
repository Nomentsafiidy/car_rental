import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Car } from 'src/app/models/car';
import { Rent } from 'src/app/models/rent';
import { Renter } from 'src/app/models/renter';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-rent',
    templateUrl: './rent.component.html',
    styleUrls: ['./rent.component.scss'],
})
export class RentComponent implements OnInit {
    public cars: Car[] = [];
    public renters: Renter[] = [];
    @Input() rent: Rent;
    constructor(private httpClient: HttpClient, private modalController: ModalController) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.httpClient
            .post(environment.apiUrl + 'getCars', {
                keyWord: '',
            })
            .subscribe((res: any) => {
                this.cars = res.cars;
            });
        this.httpClient
            .post(environment.apiUrl + 'getRenters', {
                keyWord: '',
            })
            .subscribe((res: any) => {
                this.renters = res.renters;
            });
    }

    renterChange(event: any) {
        this.rent.renterId = event.detail.value;
        console.log(this.rent.renterId);
    }

    carChange(event: any) {
        this.rent.carId = event.detail.value;
    }

    dateChange(event: any) {
        this.rent.date = new Date(event.detail.value).getTime();
    }

    rentValid() {
        return this.rent.daysNumber && this.rent.date;
    }

    /**
     * on save Change
     */
    saveChange() {
        console.log(this.rent);
        let apiUrl: string = '';
        if (this.rent.id > 0) {
            apiUrl = 'updateRent';
        } else {
            apiUrl = 'addRent';
        }

        this.httpClient.post(environment.apiUrl + apiUrl, this.rent).subscribe((_res: any) => {
            this.modalController.dismiss({
                dismissed: true,
                changed: true,
            });
        });
    }
}
