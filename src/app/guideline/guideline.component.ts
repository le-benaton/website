import { Component, ViewEncapsulation } from '@angular/core';
import { announcement } from '../../data/announcement';
import { news } from '../../data/news';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-guideline',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './guideline.component.html',
  styleUrl: './guideline.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GuidelineComponent {
  readonly announcement = announcement;
  readonly news = news;
}
