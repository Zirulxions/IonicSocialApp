import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor(public afAuth: AngularFireAuth, public toastController: ToastController, private router: Router) { }

  async logIn(){
    const { username, password } = this;
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
      console.log(res);
      const toast = await this.toastController.create({
        message: res,
        duration: 3000
      });
      toast.present();
    } catch (err) {
      console.dir(err);
      const toast = await this.toastController.create({
        message: err.message,
        duration: 3000
      });
      toast.present();
    }
  }

  ngOnInit() {
  }

  registerPanel(){
    this.router.navigate(['/register']);
  }

}
