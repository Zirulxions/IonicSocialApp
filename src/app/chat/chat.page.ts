import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public messageList = [];
  public msg : string;

  constructor(private afAuth: AngularFireAuth, public user: UserService, private afstore: AngularFirestore, private router: Router) {
    const check = afstore.doc(`user/${user.getUID()}`);
  }

  ngOnInit() {
  }

  sendMessage(){

    if(this.afAuth.auth.currentUser){
      const usrUp = this.afAuth.auth.currentUser.email;
      const msgUp = this.msg;
      const dateUp = new Date();
      //console.log(msgUp + " " + dateUp + " " + usrUp.email);

      const res = this.afstore.doc(`chat/messages`).update({
        messageArray: firestore.FieldValue.arrayUnion({
          msgUp,
          dateUp,
          usrUp
        })
      });

      this.msg = "";
    }
  }

  closeChat(){
    this.router.navigate(['/home']);
  }

  //chatboxes

}
