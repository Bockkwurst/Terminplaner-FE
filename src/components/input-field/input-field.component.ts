import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ColorPickerComponent} from "../color-picker/color-picker.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {CreateAppointmentService} from "../../services/create-appointment.service";
import {Appointment} from "../../models/appointment";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/Auth.service";

@Component({
  selector: 'app-input-field',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ColorPickerComponent,
    MatButtonModule,
    MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'input-field.component.html',
  styleUrl: 'input-field.component.scss'
})
export class InputFieldComponent {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  selectedColor: string = '';
  selectedSecondaryColor: string = '';

  appointment: Appointment = {
    id: '',
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    startTime: '',
    endTime: '',
    allDay: false,
    color: '',
    secondaryColor: '',
    userId: ''
  };

  constructor(
    private createAppointmentService: CreateAppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  onColorChange(color: { primary: string, secondary: string }){
    this.selectedColor = color.primary;
    this.selectedSecondaryColor = color.secondary;
  }

  onSubmit() {
    this.appointment.title = (document.getElementById('title') as HTMLInputElement).value;
    this.appointment.startDate = this.range.value.start;
    this.appointment.endDate = this.range.value.end;

    this.appointment.startTime = (document.getElementById('startTime') as HTMLInputElement).value;
    this.appointment.endTime = (document.getElementById('endTime') as HTMLInputElement).value;

    const checkboxElement = document.querySelector('.checkbox') as HTMLInputElement;
    if (checkboxElement) {
      this.appointment.allDay = checkboxElement.checked;
    } else {
      console.error('Checkbox element not found');
    }

    this.appointment.color = this.selectedColor;
    this.appointment.secondaryColor = this.selectedSecondaryColor;

    const userGuid = this.authService.getUserId();
    if (userGuid) {
      this.appointment.userId = userGuid;
    } else {
      console.error('userGuid not found');
    }

    delete this.appointment.id;

    this.createAppointmentService.save(this.appointment).subscribe(result =>
      this.router.navigate(['/home'])
    );
  }
}
