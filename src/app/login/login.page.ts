import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor(public afAuth: AngularFireAuth, public toastController: ToastController, private router: Router, public user: UserService) { }

  async logIn(){
    const { username, password } = this;
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
      //console.log(res);
      if(res.user){
        this.user.setUser({
          username,
          uid: res.user.uid
        });
        const toast = await this.toastController.create({
          message: "Successfull: User Logged",
          duration: 3000
        });
        toast.present();
        this.router.navigate(['/home']);
      } else {
        const toast = await this.toastController.create({
          message: "Error.",
          duration: 3000
        });
        toast.present();
      }
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
