import {Appointment} from "./appointment";

export class User {
  userId: string;
  username?: string;
  password?: string;
  appointments?: Appointment[];

  constructor() {
    this.userId = '';
    this.username = '';
    this.password = '';
    this.appointments = [];
  }
}
