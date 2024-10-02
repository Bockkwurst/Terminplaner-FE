import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { ViewAppointmentService } from "../../services/ViewAppointmentService";
import { Appointment } from "../../models/appointment";
import { Router } from "@angular/router";
import {MatSort, MatSortModule} from "@angular/material/sort";

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    MatSortModule,
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
  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource();
  searchTerm: string = '';

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private appointmentService: ViewAppointmentService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAppointmentData();
  }

  getAppointmentData(): void {
    this.appointmentService.getData().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  search() {
    this.appointmentService.searchAppointment(this.searchTerm).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
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
