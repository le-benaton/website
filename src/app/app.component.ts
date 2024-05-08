import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GuidelineComponent } from './guideline/guideline.component';
import { IonicModule } from '@ionic/angular';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GuidelineComponent, IonIcon, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './header.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  readonly title = '西宮・夙川のフレンチレストラン「ル ベナトン」';
}
