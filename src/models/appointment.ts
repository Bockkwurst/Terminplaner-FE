export class Appointment {
  Id: string;
  Title: string;
  StartDate: Date;
  EndDate: Date;
  AllDay: boolean;
  Color: string;
  SecondaryColor: string;

  constructor() {
    this.Id = '';
    this.Title = '';
    this.StartDate = new Date;
    this.EndDate = new Date;
    this.AllDay = false;
    this.Color = '';
    this.SecondaryColor = '';
  }
}
