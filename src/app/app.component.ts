import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidelineComponent } from './guideline/guideline.component';
import { IonicModule } from '@ionic/angular';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GuidelineComponent, IonIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'benaton';
}
