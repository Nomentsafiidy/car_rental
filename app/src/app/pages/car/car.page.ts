import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Car } from 'src/app/models/car';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CarComponent } from 'src/app/components/car/car.component';

@Component({
    selector: 'app-car',
    templateUrl: './car.page.html',
    styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
    public cars: Car[] = [];
    private keyWord: string = '';

    constructor(
        private modalController: ModalController,
        private httpClient: HttpClient,
        public alertController: AlertController,
        public toastController: ToastController
    ) {}

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

    async updateCar(car: Car) {
        const modal = await this.modalController.create({
            cssClass: 'modal_auto_size',
            component: CarComponent,
            componentProps: {
                car: car,
            },
        });

        modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.changed) {
            const toast = await this.toastController.create({
                message: 'Voiture modifieé avec success',
                duration: 2000,
                color: 'success',
            });
            toast.present();
            this.fetchData(this.keyWord);
        }
    }

    async addCar() {
        const modal = await this.modalController.create({
            cssClass: 'modal_auto_size',
            component: CarComponent,
            componentProps: {
                car: {
                    id: -1,
                    designation: '',
                    dailyRent: 0,
                },
            },
        });

        modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.changed) {
            const toast = await this.toastController.create({
                message: 'Voiture ajouté avec success',
                duration: 2000,
                color: 'success',
            });
            toast.present();
            this.fetchData(this.keyWord);
        }
    }
}
