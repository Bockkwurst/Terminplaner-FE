import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Appointment} from "../models/appointment";
import {catchError, Observable, throwError} from "rxjs";

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

  searchAppointment(title: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.appointmentUrl}/search/${title}`)
  }

  public getAppointmentById(id: string): Observable<Appointment> {
    const url = `${this.appointmentUrl}/${id}`;
    return this.http.get<Appointment>(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}

