import {Appointment} from "../models/appointment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UpdateDeleteAppointmentService {

  private appointmentUrl: string;

  constructor(private http: HttpClient) {
    this.appointmentUrl = 'http://localhost:5056/api/appointment';
  }


  public put(appointment: Appointment): Observable<Appointment> {
    const url = `${this.appointmentUrl}/${appointment.id}`;
    return this.http.put<Appointment>(url, appointment);
  }

  public delete(appointment: Appointment) {
    const url = `${this.appointmentUrl}/${appointment.id}`;
    return this.http.delete<void>(url);
  }
}
