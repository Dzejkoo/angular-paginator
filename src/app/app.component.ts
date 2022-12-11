import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from './data.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pagination-angular';
  displayColumns = ['id', 'title'];
  dataSource!: MatTableDataSource<any>;
  paginatorOptions = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    pageSizeOption: [10, 20, 30, 40],
  };
  @ViewChild('paginator') paginator!: MatPaginator;

  paginatorChange(event: PageEvent): void {
    this.paginatorOptions.pageSize = event.pageSize;

    this.getData();
  }

  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    console.log(this.paginatorOptions.pageSize);
    this.getData();
  }
  getData() {
    this.usersService.getLogs().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }
}
