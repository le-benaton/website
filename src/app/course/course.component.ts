import { Component, input, ViewEncapsulation } from '@angular/core';
import { IMenu } from '../types';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CourseComponent {
  readonly title = input.required<string>();
  readonly item = input.required<IMenu>();
}
