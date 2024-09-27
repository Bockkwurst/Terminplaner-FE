import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Appointment } from "../models/appointment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ViewAppointmentService {
  private appointmentUrl: string;

  constructor(
    private http: HttpClient) {
    this.appointmentUrl = '/api/appointment';
  }

  getData(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.appointmentUrl}/all`);
  }

  searchAppointment(title: string): Observable<any> {
    return this.http.get(`${this.appointmentUrl}/${title}`)
  }
}
