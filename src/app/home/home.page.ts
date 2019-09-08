import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userPosts;

  constructor(private afstore: AngularFirestore, private user: UserService, public afAuth: AngularFireAuth, public toastController: ToastController, private router: Router) {
    //console.log(user.getUID());
    const posts = afstore.doc(`user/${user.getUID()}`);
    this.userPosts = posts.valueChanges();
    console.log(this.userPosts);
    this.userPosts.subscribe(function(data){
      console.log(data);
    });
  }

  async logOut(){
    await this.afAuth.auth.signOut();
    const toast = await this.toastController.create({
      message: "Good Bye..!",
      duration: 3000
    });
    toast.present();
    this.router.navigate(['/login']);
  }

  goToUserPage(){
    this.router.navigate(['/profile']);
  }

  goToUploader(){
    this.router.navigate(['/uploader']);
  }

  goToChatPage(){
    this.router.navigate(['/chat']);
  }

}
