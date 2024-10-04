import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarModule, CalendarUtils, CalendarA11y} from "angular-calendar";
import {CommonModule} from "@angular/common";
import {CalendarView} from "@angular/material/datepicker/testing";
import {ViewAppointmentService} from "../../services/ViewAppointmentService";
import {Appointment} from "../../models/appointment";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  view: CalendarView = CalendarView.MONTH;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(
    private appointmentService: ViewAppointmentService,
    private calendarUtils: CalendarUtils,
    private calendarA11ly: CalendarA11y) {}

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
