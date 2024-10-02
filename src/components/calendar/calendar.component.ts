import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarModule, DateAdapter} from "angular-calendar";
import {CommonModule} from "@angular/common";
import {CalendarView} from "@angular/material/datepicker/testing";
import {ViewAppointmentService} from "../../services/ViewAppointmentService";
import {Appointment} from "../../models/appointment";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  view: CalendarView = CalendarView.MONTH;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(
    private appointmentService: ViewAppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getData().subscribe((appointments: Appointment[]) => {
      this.events = appointments.map(appointment => ({
        start: new Date(appointment.startDate),
        end: new Date(appointment.endDate),
        title: appointment.title,
        color: { primary: appointment.color, secondary: appointment.secondaryColor },
        allDay: appointment.allDay
      }))
    })
  }
}
