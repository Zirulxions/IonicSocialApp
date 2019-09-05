import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  cpassword: string = "";

  constructor(public user: UserService, public afstore: AngularFirestore, public afAuth: AngularFireAuth, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  async registerNow(){
    const { username, password, cpassword } = this;
    if( password !== cpassword ){
      const toast = await this.toastController.create({
        message: "Passwords don't match",
        duration: 3000
      });
      toast.present();
    } else {
      try{
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);

        this.afstore.doc(`user/${res.user.uid}`).set({
          username
        });

        this.user.setUser({
          username,
          uid: res.user.uid
        });

        const toast = await this.toastController.create({
          message: "Successfull: User Created",
          duration: 3000
        });
        toast.present();

        this.router.navigate(['/home']);
      } catch (err) {
        const toast = await this.toastController.create({
          message: err.message,
          duration: 3000
        });
        toast.present();
      }
    }
  }

  loginPanel(){
    this.router.navigate(['/login']);
  }

}
