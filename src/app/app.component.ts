import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GuidelineComponent } from './guideline/guideline.component';
import { IonicModule } from '@ionic/angular';
import { IonIcon } from '@ionic/angular/standalone';
import { launch } from '../data/lunch';
import { dinnerChief, dinnerPrefix } from '../data/dinner';
import { CourseComponent } from './course/course.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GuidelineComponent, IonIcon, NgOptimizedImage, CourseComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './header.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  readonly title = '西宮・夙川のフレンチレストラン「ル ベナトン」';
  readonly launch = launch;
  readonly dinnerPrefix = dinnerPrefix;
  readonly dinnerChef = dinnerChief;
}
