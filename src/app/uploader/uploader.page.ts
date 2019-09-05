import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../users.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: string;
  desc: string;

  constructor(public user: UserService, public http: Http, public afstore: AngularFirestore) { }

  ngOnInit() {
  }

  createThePost(){
    const image = this.imageURL;
    const desc = this.desc;

    this.afstore.doc(`user/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion({
        image,
        desc
      })
    });
  }

  fileChanged(event){
    const files = event.target.files;
    //console.log(files);

    const data = new FormData();
    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', '77cc346f2445da354279');

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      console.log(event);
      this.imageURL = event.json().file;
    })
  }

}