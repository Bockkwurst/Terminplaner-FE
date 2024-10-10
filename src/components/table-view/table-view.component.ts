import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {ViewAppointmentService} from "../../services/ViewAppointmentService";
import {Router} from "@angular/router";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Appointment} from "../../models/appointment";

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    MatSortModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator
  ],
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Color', 'Title', 'StartDate', 'EndDate', 'AllDay'];
  dataSource = new MatTableDataSource<Appointment>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private appointmentService: ViewAppointmentService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAppointmentData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAppointmentData(): void {
    this.appointmentService.getData().subscribe(data => {
      this.dataSource.data = data;
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
