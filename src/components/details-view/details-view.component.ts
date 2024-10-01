import { Component, OnInit } from '@angular/core';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAppointmentService } from '../../services/ViewAppointmentService';
import { Appointment } from '../../models/appointment';
import { UpdateDeleteAppointmentService } from '../../services/update-delete-appointment.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-details-view',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ColorPickerComponent,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(new Date(), [Validators.required]),
    end: new FormControl(new Date(), [Validators.required])
  });

  titleControl = new FormControl<string | null>('');
  allDayControl = new FormControl<boolean | null>(false);
  selectedColor: string = '';
  selectedSecondaryColor: string = '';

  appointment: Appointment = {
    id: '',
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    allDay: false,
    color: '',
    secondaryColor: ''
  };

  isLoading = true;

  constructor(
    private updateDeleteService: UpdateDeleteAppointmentService,
    private viewAppointmentService: ViewAppointmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const appointmentId = this.activatedRoute.snapshot.paramMap.get('id');
    if (appointmentId) {
      this.viewAppointmentService.getAppointmentById(appointmentId).subscribe(appointment => {
        this.appointment = appointment;
        this.isLoading = false;

        this.range.setValue({ start: new Date(appointment.startDate), end: new Date(appointment.endDate) });
        this.titleControl.setValue(appointment.title);
        this.allDayControl.setValue(appointment.allDay);
        this.selectedColor = appointment.color;
        this.selectedSecondaryColor = appointment.secondaryColor;
      });
    } else {
      console.error('Appointment ID not found in route parameters.');
      this.router.navigate(['/home']);
    }
  }

  onColorChange(color: { primary: string, secondary: string }) {
    this.selectedColor = color.primary;
    this.selectedSecondaryColor = color.secondary;
  }

  onSubmit() {
    if (!this.appointment) {
      console.error('Appointment is undefined');
      return;
    }

    if (!this.appointment.id) {
      console.error('Appointment ID is missing');
      return;
    }

    this.appointment.title = this.titleControl.value ?? '';
    this.appointment.startDate = this.range.value.start ?? new Date();
    this.appointment.endDate = this.range.value.end ?? new Date();
    this.appointment.allDay = this.allDayControl.value ?? false;
    this.appointment.color = this.selectedColor;
    this.appointment.secondaryColor = this.selectedSecondaryColor;

    this.updateDeleteService.put(this.appointment).subscribe(() =>
      this.router.navigate(['/home'])
    );
  }

  onDelete() {
    if (!this.appointment || !this.appointment.id) {
      console.error('Appointment ID is missing');
      return;
    }
    this.updateDeleteService.delete(this.appointment).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  onBack() {
    this.router.navigate(['/home']);
  }
}
