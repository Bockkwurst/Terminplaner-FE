export class Appointment {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  color: string;
  secondaryColor: string;

  constructor() {
    this.id = '';
    this.title = '';
    this.startDate = new Date;
    this.endDate = new Date;
    this.allDay = false;
    this.color = '';
    this.secondaryColor = '';
  }
}
