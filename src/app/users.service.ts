import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

interface user {
  username: string,
  uid: string
}

@Injectable()
export class UserService {
  private user: user

  constructor(public toastController: ToastController, private afAuth: AngularFireAuth, private router: Router) { }

  setUser(user: user){
    this.user = user;
  }

  getUID() {
    if(!this.user){
      if(this.afAuth.auth.currentUser){
        const user = this.afAuth.auth.currentUser;
        this.setUser({
          username: user.email,
          uid: user.uid
        });
        return user.uid;
      } else {
        this.toastAlert();
        this.router.navigate(['/login']);
      }
    } else {
      return this.user.uid;
    }
    return this.user.uid
  }

  async toastAlert(){
    await this.afAuth.auth.signOut();
    const toast = await this.toastController.create({
      message: "There is no user online.",
      duration: 3000
    });
    toast.present();
  }
}
