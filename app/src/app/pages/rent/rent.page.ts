import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { RentComponent } from 'src/app/components/rent/rent.component';
import { Rent } from 'src/app/models/rent';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-rent',
    templateUrl: './rent.page.html',
    styleUrls: ['./rent.page.scss'],
})
export class RentPage implements OnInit {
    public rents: Rent[] = [];
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
            .post(environment.apiUrl + 'getRents', {
                keyWord: keyWord,
            })
            .subscribe((res: any) => {
                console.log('res', res);
                this.rents = res.rent;
                // this.cars = res.cars;
            });
    }

    async onDelete(rent: Rent) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirm!',
            message:
                'Voulez supprime la location de <strong>' + rent.name + '</strong> <br /> Voiture <strong>' + rent.designation + '</strong>  !!!',
            buttons: [
                'Annuler',
                {
                    text: 'Oui',
                    handler: () => {
                        this.httpClient.get(environment.apiUrl + 'deleteRent/' + rent.id).subscribe(async (res: any) => {
                            const toast = await this.toastController.create({
                                message: 'Location supprimé',
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

    async updateRent(rent: Rent) {
        const modal = await this.modalController.create({
            cssClass: 'modal_auto_size',
            component: RentComponent,
            componentProps: {
                rent: rent,
            },
        });

        modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.changed) {
            const toast = await this.toastController.create({
                message: 'Location modifier',
                duration: 2000,
                color: 'success',
            });
            toast.present();
            this.fetchData(this.keyWord);
        }
    }

    async addRent() {
        const modal = await this.modalController.create({
            cssClass: 'modal_auto_size',
            component: RentComponent,
            componentProps: {
                rent: {
                    id: -1,
                    carId: -1,
                    renterId: -1,
                    daysNumber: null,
                    date: null,
                },
            },
        });

        modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.changed) {
            const toast = await this.toastController.create({
                message: 'Location fait avec success',
                duration: 2000,
                color: 'success',
            });
            toast.present();
            this.fetchData(this.keyWord);
        }
    }
}
