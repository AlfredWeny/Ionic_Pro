import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { Contact } from '../model/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contacts:Contact[];
  contact: Contact;


  constructor(private contactService:ContactService,
    public alertController: AlertController,
    public actionCtrl: ActionSheetController,
    public loader: LoadingController
    ) { }

  ngOnInit() {
    this.getAllContact();
  }

  async addContact(){
    let btnText = "";
    
    btnText = "Save";
    const alert = await this.alertController.create({
      header: 'Ajouter un contact',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nom'
        },
        {
          name: 'telephone',
          type: 'tel',
          placeholder: 'Telephone'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: btnText,
          handler: async data => {
            const loading = await this.loader.create({
              message:'Saving.......'
            });
            await loading.present();
            this.contactService.addContact(data).then(()=>{
                loading.dismiss();
            })

          }
        }
      ]
    });
    await alert.present();
  }

  getAllContact(){
    this.contactService.getContacts().subscribe(
      data =>{
        this.contacts = data;
      }
    )
  }

  async onRemove(contact:Contact){
    const loading = await this.loader.create({
      message:'Deleting.......'
    });
    loading.present();
    this.contactService.removeContact(contact.id).then(()=>{
      loading.dismiss();
    })
  }

  async saveContact(){
    const loading = await this.loader.create({
      message:'Saving.......'
    });

  }

}
