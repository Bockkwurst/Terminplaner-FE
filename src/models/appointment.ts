export class Appointment {
  id?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  allDay: boolean;
  color: string;
  secondaryColor: string;
  userId: string;

  constructor() {
    this.id = '';
    this.title = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.startTime = '';
    this.endTime = '';
    this.allDay = false;
    this.color = '';
    this.secondaryColor = '';
    this.userId = '';
  }
}
