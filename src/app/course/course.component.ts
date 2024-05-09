import { Component, input, ViewEncapsulation } from '@angular/core';
import { IMenu } from '../../data/data.interface';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CourseComponent {
  readonly title = input.required<string>();
  readonly item = input.required<IMenu>();
}
