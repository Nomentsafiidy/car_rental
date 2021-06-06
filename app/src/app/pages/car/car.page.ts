import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Car } from 'src/app/models/car';

@Component({
    selector: 'app-car',
    templateUrl: './car.page.html',
    styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
    public cars: Car[] = [];
    private keyWord: string = '';

    constructor(private httpClient: HttpClient) {}

    ngOnInit() {
        this.fetchData(this.keyWord);
    }

    fetchData(keyWord: string) {
        this.httpClient
            .post(environment.apiUrl + 'getCars', {
                keyWord: keyWord,
            })
            .subscribe((res: any) => {
                this.cars = res.cars;
            });
    }

    keyWordChange(event: any) {
        this.fetchData(this.keyWord);
    }
}
