import { Component, inject, OnInit, PLATFORM_ID, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { GuidelineComponent } from './guideline/guideline.component';
import { IonIcon } from '@ionic/angular/standalone';
import { launch } from '../data/lunch';
import { dinnerChief, dinnerPrefix } from '../data/dinner';
import { CourseComponent } from './course/course.component';
import { collection, doc, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { IRequestRdlaboMail } from './types';
import { defaultContactModel } from './constant';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GuidelineComponent, IonIcon, NgOptimizedImage, CourseComponent, FormsModule],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  readonly title = '西宮・夙川のフレンチレストラン「ル ベナトン」';
  readonly launch = launch;
  readonly dinnerPrefix = dinnerPrefix;
  readonly dinnerChef = dinnerChief;

  dayAccess = signal<number>(0);
  dayConversion = signal<number>(0);
  presentToastAccess = signal<boolean>(false);
  presentToastConversion = signal<boolean>(false);
  isSend = signal<boolean>(false);
  contactModel = defaultContactModel();

  #firestore = inject(Firestore);
  #platformId = inject(PLATFORM_ID);
  #isBrowser = isPlatformBrowser(this.#platformId);
  #http = inject(HttpClient);

  constructor() {
    if (!this.#isBrowser) {
      return;
    }
    setDoc(doc(collection(this.#firestore, 'access'), this.#getUserId()), {
      timestamp: new Date().getTime(),
    }).catch((e) => console.log(e));
  }

  async ngOnInit() {
    if (!this.#isBrowser) {
      return;
    }
    const accessQuery = query(
      collection(this.#firestore, 'access'),
      where('timestamp', '>', new Date(new Date().getTime() - 1000 * 60 * 15).getTime()),
    );
    const accessSnapshot = await getDocs(accessQuery);

    const conversionQuery = query(
      collection(this.#firestore, 'conversion'),
      where('timestamp', '>', new Date(new Date().getTime() - 1000 * 60 * 60 * 24).getTime()),
    );
    const conversionSnapshot = await getDocs(conversionQuery);

    this.dayAccess.set(accessSnapshot.docs.length);
    this.dayConversion.set(conversionSnapshot.docs.length);

    setTimeout(() => this.presentToastAccess.set(true), 2000);
    setTimeout(() => this.presentToastAccess.set(false), 2000 + 10000);

    setTimeout(() => this.presentToastConversion.set(true), 2000 * 2);
    setTimeout(() => this.presentToastConversion.set(false), 2000 * 2 + 10000);
  }

  recordConversion() {
    if (!this.#isBrowser) {
      return;
    }
    setDoc(doc(collection(this.#firestore, 'conversion'), this.#getUserId()), {
      timestamp: new Date().getTime(),
    }).catch((e) => console.log(e));
  }

  async send() {
    this.isSend.set(true);
    const preMessage = this.contactModel.tel ? `電話番号： ${this.contactModel.tel}\r\n\r\n` : '';
    const result = await firstValueFrom(
      this.#http.post('https://api.v5.tipsys.me/thirdparty/benaton/mail', {
        from: this.contactModel.email,
        name: this.contactModel.name,
        message: preMessage + this.contactModel.message,
      } as IRequestRdlaboMail),
    )
      .then(() => true)
      .catch(() => false);

    if (result) {
      this.contactModel = defaultContactModel();
    } else {
      this.isSend.set(false);
      alert('メッセージの送信に失敗しました。時間を置いてから再度お試しください。');
    }
  }

  #getUserId = (): string => {
    let analyticsId = localStorage.getItem('analyticsId');
    if (!analyticsId) {
      analyticsId = 'id' + String(new Date().getTime());
      localStorage.setItem('analyticsId', analyticsId);
    }
    return analyticsId;
  };
}
