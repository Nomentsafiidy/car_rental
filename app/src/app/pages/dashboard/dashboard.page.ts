import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Car } from 'src/app/models/car';
import { Rent } from 'src/app/models/rent';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    public cars: Car[] = [];
    public carId: number;
    public startDate: number;
    public endDate: number;
    public rents: Rent[] = [];
    constructor(private httpClient: HttpClient, private modalController: ModalController) {}

    async ngOnInit() {
        await this.fetchCars();
        if (this.cars && this.cars.length !== 0) this.carId = this.cars[0].id;
        this.startDate = new Date().getTime();
        this.endDate = new Date('2021-12-31').getTime();
        this.fetchData(this.carId, this.startDate, this.endDate);
    }

    fetchCars() {
        return new Promise((resolve) => {
            this.httpClient
                .post(environment.apiUrl + 'getCars', {
                    keyWord: '',
                })
                .subscribe((res: any) => {
                    this.cars = res.cars;
                    resolve(null);
                });
        });
    }

    fetchData(carId: number, startDate: number, endDate: number) {
        this.httpClient
            .post(environment.apiUrl + 'getCarRentInfo', {
                id: carId,
                startDate: startDate,
                endDate: endDate,
            })
            .subscribe((res: any) => {
                console.log('res', res);
                // this.cars = res.cars;
                if (res.success) {
                    this.rents = res.cars;
                } else {
                    this.rents = [];
                }
            });
    }

    getTotal() {
        let t = 0;
        this.rents.forEach((rent) => {
            t += rent.daysNumber * rent.dailyRent;
        });
        return t;
    }

    carChange(event: any) {
        this.carId = event.detail.value;
        this.fetchData(this.carId, this.startDate, this.endDate);
    }

    startDateChange(event: any) {
        this.startDate = new Date(event.detail.value).getTime();
        this.fetchData(this.carId, this.startDate, this.endDate);
    }

    endDateChange(event: any) {
        this.endDate = new Date(event.detail.value).getTime();
        this.fetchData(this.carId, this.startDate, this.endDate);
    }
}
