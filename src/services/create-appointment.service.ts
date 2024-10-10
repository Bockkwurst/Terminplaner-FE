import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../models/appointment";

@Injectable({
  providedIn: 'root'
})
export class CreateAppointmentService {

  private appointmentUrl: string;

  constructor(private http: HttpClient) {
    this.appointmentUrl = 'http://localhost:5056/api/appointment/create';
  }

  public save(appointment: Appointment) {
    return this.http.post<Appointment>(this.appointmentUrl, appointment);
  }
}
