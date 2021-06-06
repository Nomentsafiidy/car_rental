import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { RenterComponent } from 'src/app/components/renter/renter.component';
import { Renter } from 'src/app/models/renter';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-renter',
    templateUrl: './renter.page.html',
    styleUrls: ['./renter.page.scss'],
})
export class RenterPage implements OnInit {
    public renters: Renter[] = [];
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
            .post(environment.apiUrl + 'getRenters', {
                keyWord: keyWord,
            })
            .subscribe((res: any) => {
                this.renters = res.renters;
            });
    }

    async onDelete(renter: Renter) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirm!',
            message: 'Voulez supprime <strong>' + renter.name + '</strong>!!!',
            buttons: [
                'Annuler',
                {
                    text: 'Oui',
                    handler: () => {
                        this.httpClient.get(environment.apiUrl + 'deleteRenter/' + renter.id).subscribe(async (res: any) => {
                            const toast = await this.toastController.create({
                                message: 'Locataire supprimé',
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

    async updateRenter(renter: Renter) {
        const modal = await this.modalController.create({
            cssClass: 'modal_auto_size',
            component: RenterComponent,
            componentProps: {
                renter: renter,
            },
        });

        modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.changed) {
            const toast = await this.toastController.create({
                message: 'Locataire modifieé avec success',
                duration: 2000,
                color: 'success',
            });
            toast.present();
            this.fetchData(this.keyWord);
        }
    }

    async addRenter() {
        const modal = await this.modalController.create({
            cssClass: 'modal_auto_size',
            component: RenterComponent,
            componentProps: {
                renter: {
                    id: -1,
                    name: '',
                    address: '',
                },
            },
        });

        modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.changed) {
            const toast = await this.toastController.create({
                message: 'Locataire ajouté avec success',
                duration: 2000,
                color: 'success',
            });
            toast.present();
            this.fetchData(this.keyWord);
        }
    }
}
