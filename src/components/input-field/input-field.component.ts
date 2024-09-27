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
    Id: '',
    Title: '',
    StartDate: new Date(),
    EndDate: new Date(),
    AllDay: false,
    Color: '',
    SecondaryColor: ''
  };

  constructor(
    private createAppointmentService: CreateAppointmentService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  onColorChange(color: { primary: string, secondary: string }){
    this.selectedColor = color.primary;
    this.selectedSecondaryColor = color.secondary;
  }

  onSubmit() {
    this.appointment.Title = (document.getElementById('title') as HTMLInputElement).value;
    this.appointment.StartDate = this.range.value.start;
    this.appointment.EndDate = this.range.value.end;
    this.appointment.AllDay = (document.querySelector('.checkbox input') as HTMLInputElement).checked;
    this.appointment.Color = this.selectedColor;
    this.appointment.SecondaryColor = this.selectedSecondaryColor;

    this.createAppointmentService.save(this.appointment).subscribe(result =>
      this.router.navigate(['/home'])
    );
  }
}
