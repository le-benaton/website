import { Component, inject, signal, ViewEncapsulation, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { GuidelineComponent } from './guideline/guideline.component';
import { IonIcon } from '@ionic/angular/standalone';
import { launch } from '../data/lunch';
import { dinnerChief, dinnerPrefix } from '../data/dinner';
import { CourseComponent } from './course/course.component';
import { collection, doc, Firestore, setDoc, query, getDocs, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GuidelineComponent, IonIcon, NgOptimizedImage, CourseComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './header.scss', './footer.scss'],
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

  readonly firestore = inject(Firestore);
  readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    if (this.isBrowser) {
      setDoc(doc(collection(this.firestore, 'access'), this.#getUserId()), {
        timestamp: new Date().getTime(),
      }).catch((e) => console.log(e));
    }
  }

  async ngOnInit() {
    const accessQuery = query(
      collection(this.firestore, 'access'),
      where('timestamp', '>', new Date(new Date().getTime() - 1000 * 60 * 15).getTime()),
    );
    const accessSnapshot = await getDocs(accessQuery);

    const conversionQuery = query(
      collection(this.firestore, 'conversion'),
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

  #getUserId = (): string => {
    let analyticsId = localStorage.getItem('analyticsId');
    if (!analyticsId) {
      analyticsId = 'id' + String(new Date().getTime());
      localStorage.setItem('analyticsId', analyticsId);
    }
    return analyticsId;
  };
}
