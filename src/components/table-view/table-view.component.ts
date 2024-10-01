import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { ViewAppointmentService } from "../../services/ViewAppointmentService";
import { Appointment } from "../../models/appointment";
import { Router } from "@angular/router";

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  displayedColumns: string[] = ['Color', 'Title', 'StartDate', 'EndDate', 'AllDay'];
  dataSource: Appointment[] = [];
  searchTerm: string = '';

  constructor(private appointmentService: ViewAppointmentService, private router: Router) {}

  ngOnInit(): void {
    this.getAppointmentData();
  }

  getAppointmentData(): void {
    this.appointmentService.getData().subscribe(data => {
      this.dataSource = data;
    });
  }

  search() {
    this.appointmentService.searchAppointment(this.searchTerm).subscribe(data => {
      this.dataSource = data;
    });
  }

  navigateToDetails(id: string) {
    if (id) {
      this.router.navigate(['/details', id]);
    } else {
      console.error('Invalid appointment ID');
    }
  }
}
