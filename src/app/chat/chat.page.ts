import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../users.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  userMessages;

  textFromSrv: any;
  public msg : string;

  constructor(public toastController: ToastController, private afAuth: AngularFireAuth, public user: UserService, private afstore: AngularFirestore, private router: Router) {
    const check = afstore.doc(`user/${user.getUID()}`);

    const messageArray = afstore.doc(`chat/${user.getChatRoom()}`);
    this.userMessages = messageArray.valueChanges();

    this.userMessages.subscribe(function(data){
      console.log(data);
    });
  }

  async messageView(){
    const toast = await this.toastController.create({
      message: "Mensaje Enviado..!",
      duration: 3000
    });
    toast.present();
  }

  ngOnInit() {
  }

  sendMessage(){

    if(this.afAuth.auth.currentUser){
      const usrUp = this.afAuth.auth.currentUser.email;
      const msgUp = this.msg;
      const dateUp = new Date().toString();

      const res = this.afstore.doc(`chat/messages`).update({
        messageArray: firestore.FieldValue.arrayUnion({
          msgUp,
          dateUp,
          usrUp
        })
      });

      this.messageView();

      this.msg = "";
    }
  }

  closeChat(){
    this.router.navigate(['/home']);
  }

}
