import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceryService } from './grocery.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {
  constructor(public alertCtrl: AlertController,
              public dataService: GroceryService) {
}

  async presentAlert(item?, itemId?) {
    // tslint:disable-next-line: no-unused-expression
    item ? item._id : undefined; {
    const alert = await this.alertCtrl.create({
      header: item ? 'Edit item on the list' : 'Add item to the list',
      message: item ? 'Edit item and/or quantity' : 'Specify item and quantity',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item Name',
          value: item ? item.itemName : null
        },
        {
          name: 'qty',
          placeholder: 'Quantity',
          value: item ? item.qty : null
        },
      ],
      buttons: [
        {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        // tslint:disable-next-line: no-shadowed-variable
        handler: item => {
          console.log('Saved clicked:', item.name, '-',  item.qty);
          if (item === undefined) {
            this.dataService.editItem(item, itemId);
          } else {
            this.dataService.addItem(item);
          }
        }
      }]
    });
    alert.present();
   }
  }
}
