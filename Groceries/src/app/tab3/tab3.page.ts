import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GroceryService } from '../grocery.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  items = [];
  errorMessage: string;

// tslint:disable-next-line: max-line-length
constructor(public navCtrl: NavController, public toastCtrl: ToastController,
            public alertCtrl: AlertController, public dataService: GroceryService,
            public inputDialogService: InputDialogService, public socialSharing: SocialSharing) {
        dataService.dataChanged$.subscribe((dataChanged: boolean) => {
          this.loadItems(); });
     }

ionViewDidLoad() {
  this.loadItems();
}

loadItems() {
  this.dataService.getItems().subscribe(
    items => this.items = items as any,
    error => this.errorMessage = error as any);
}

/*Add a Grocery Item*/
async addItem() {
  console.log('Adding Item...');
  this.inputDialogService.presentAlert();
}

/*Edit Grocery Item*/
async editItem(n, i) {
  console.log('Edit Item: ', n, i);
  const toast = this.toastCtrl.create({
    message: 'Updating Item: ' + n.itemName,
    duration: 3000
  });
  (await toast).present();
  this.inputDialogService.presentAlert(n, n._id);
}

/*Remove Grocery Item*/
async removeItem(n, i) {
  console.log('Remove Item: ', n);
  const toast = this.toastCtrl.create({
    message: 'Deleting Item - ' + n.name,
    duration: 3000
});
  (await toast).present();
  this.dataService.removeItem(n._id, i);
}

/*Share Grocery Item*/
async shareItem(n, i) {
  console.log('Share: ', n, i);
  const toast = this.toastCtrl.create({
    message: 'Sharing the following item:' + n.itemName + ' ...',
    duration: 3000
});
  (await toast).present();

  const message = 'Grocery Item - Name:' + n.itemName + '- Quantity:' + n.qty;
  const subject = 'Sharing via Grocery App';
  this.socialSharing.share(message, subject).then(() => {
    console.log('Shared Successfully!');
  }).catch((error) => {
    console.error('Error during sharing', error);
  });
}
}
