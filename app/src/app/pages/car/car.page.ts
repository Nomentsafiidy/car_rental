import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Car } from 'src/app/models/car';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-car',
    templateUrl: './car.page.html',
    styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
    public cars: Car[] = [];
    private keyWord: string = '';

    constructor(private httpClient: HttpClient, public alertController: AlertController, public toastController: ToastController) {}

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

    async onDelete(car: Car) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirm!',
            message: 'Voulez supprime <strong>' + car.designation + '</strong>!!!',
            buttons: [
                'Annuler',
                {
                    text: 'Oui',
                    handler: () => {
                        this.httpClient.get(environment.apiUrl + 'deleteCar/' + car.id).subscribe(async (res: any) => {
                            console.log('res delete', res);
                            const toast = await this.toastController.create({
                                message: 'Voiture supprimé',
                                duration: 2000,
                                color: 'success',
                            });
                            toast.present();
                            this.fetchData(this.keyWord);
                        });
                    },
                },
            ],
        });

        await alert.present();
    }

    keyWordChange(event: any) {
        this.fetchData(this.keyWord);
    }
}
