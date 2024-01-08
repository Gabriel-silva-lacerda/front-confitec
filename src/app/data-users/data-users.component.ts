import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { User } from '../models/Users';
import { UserApiService } from '../service/user-api.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserFormEditComponent } from '../user-form-edit/user-form-edit.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-users',
  standalone: true,
  imports: [
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './data-users.component.html',
  styleUrl: './data-users.component.scss',
})
export class DataUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'sobrenome',
    'email',
    'data_nascimento',
    'escolaridade',
    'actions',
  ];

  service = inject(UserApiService);
  usersData!: MatTableDataSource<User>;

  constructor(public matDialog: MatDialog) {}

  openDialog() {
    this.matDialog.open(UserFormEditComponent, {
      width: '450px',
    });
  }

  ngOnInit(): void {
    this.service.usersData.subscribe((users) => {
      this.usersData = new MatTableDataSource(users);
    });

    this.service.getAllUsers().subscribe((user) => {
      const data: User[] = user.data;

      this.service.usersData.next(data);
    });
  }

  editUser = (user: User) => this.service.userEdit.next(user);

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe(() => {
      const users = this.service.usersData.value;
      const index = users.findIndex((user: User) => user.id === id);
      const isIndexValid = index !== -1;

      if (isIndexValid) {
        users.splice(index, 1);
        this.service.usersData.next(users);
      }
    });
  }
}
