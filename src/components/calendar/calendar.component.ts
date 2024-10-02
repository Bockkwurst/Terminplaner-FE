import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/moment";
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
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.MONTH;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(
    private appointmentService: ViewAppointmentService) {}

  ngOnInit(): void {

  }


}
