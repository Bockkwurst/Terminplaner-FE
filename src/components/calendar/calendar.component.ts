import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarEvent, CalendarModule, CalendarUtils, CalendarA11y} from "angular-calendar";
import {CommonModule} from "@angular/common";
import {CalendarView} from "@angular/material/datepicker/testing";
import {ViewAppointmentService} from "../../services/ViewAppointmentService";
import {Appointment} from "../../models/appointment";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    MatButton,
    MatFormField,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  view: CalendarView = CalendarView.MONTH;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  selectedDay: CalendarEvent | null = null;


  constructor(
    private appointmentService: ViewAppointmentService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return this.viewDate.toLocaleDateString('de-DE', options);
  }

  loadAppointments(): void {
    this.appointmentService.getData().subscribe((appointments: Appointment[]) => {
      this.events = appointments.map(appointment => ({
        id: appointment.id,
        start: new Date(appointment.startDate),
        end: new Date(appointment.endDate),
        title: appointment.title,
        color: { primary: appointment.color, secondary: appointment.secondaryColor },
        allDay: appointment.allDay
      }))
    })
  }

  handleDayClick(event: CalendarEvent): void {
    console.log(this.selectedDay?.id)
    this.selectedDay = event;
  }

  protected readonly CalendarView = CalendarView;
  protected readonly appointment = Appointment;

  handleEventClick(id: string | number | undefined): void {
    if (id) {
      this.router.navigate(['/details', id]);
    } else {
      console.error('Invalid appointment ID');
    }
  }

  goToPreviousMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }

  goToToday(): void {
    this.viewDate = new Date();
  }

  goToNextMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
  }
}
