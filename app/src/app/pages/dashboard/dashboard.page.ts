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
    //
    public carsInfo: any[] = [];
    public rentStartDate: number;
    public rentEndDate: number;
    constructor(private httpClient: HttpClient, private modalController: ModalController) {}

    async ngOnInit() {
        await this.fetchCars();
        if (this.cars && this.cars.length !== 0) this.carId = this.cars[0].id;
        this.startDate = new Date().getTime();
        this.endDate = new Date('2021-12-31').getTime();
        this.rentStartDate = new Date().getTime();
        this.rentEndDate = new Date('2021-12-31').getTime();
        this.fetchData(this.carId, this.startDate, this.endDate);
        this.getRentGroupByCar(this.rentStartDate, this.rentEndDate);
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

    getRentGroupByCar(startDate: number, endDate: number) {
        this.httpClient
            .post(environment.apiUrl + 'getRentInfoGroupByCar', {
                startDate: startDate,
                endDate: endDate,
            })
            .subscribe((res: any) => {
                this.carsInfo = [];
                if (res.rents && res.rents.length !== 0) {
                    res.rents.forEach((element) => {
                        let tmp = {
                            name: '',
                            nbRent: 0,
                            priceRent: 0,
                        };

                        let tp = 0;
                        let tn = 0;
                        element.rent.forEach((aze) => {
                            tp += aze.daysNumber * aze.dailyRent;
                            tn += 1;
                        });
                        tmp.name = element.car.designation;
                        tmp.nbRent = tn;
                        tmp.priceRent = tp;

                        this.carsInfo.push(tmp);
                    });
                    console.log('this.carsInfo', this.carsInfo);
                }
                console.log('res', res);
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

    rentStartDateChange(event: any) {
        this.rentStartDate = new Date(event.detail.value).getTime();
        this.getRentGroupByCar(this.rentStartDate, this.rentEndDate);
    }

    endDateChange(event: any) {
        this.endDate = new Date(event.detail.value).getTime();
        this.fetchData(this.carId, this.startDate, this.endDate);
    }

    rentEndDateChange(event: any) {
        this.rentEndDate = new Date(event.detail.value).getTime();
        this.getRentGroupByCar(this.rentStartDate, this.rentEndDate);
    }
}
