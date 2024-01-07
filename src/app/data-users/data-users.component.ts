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

@Component({
  selector: 'app-data-users',
  standalone: true,
  imports: [
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
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
  userData: any = [];
  cdr = inject(ChangeDetectorRef);

  constructor(public matDialog: MatDialog) {}

  openDialog() {
    this.matDialog.open(UserFormEditComponent, {
      width: '450px',
    });
  }

  ngOnInit(): void {
    this.service.userData.subscribe((user) => {
      this.userData = new MatTableDataSource<any>(user);
    });

    this.service.getAllUsers().subscribe((user) => {
      const data: User[] = user.data;
      data.map((item: any) => {
        item.data_nascimento = new Date(
          item.data_nascimento
        ).toLocaleDateString('pt-BR');
      });

      this.service.userData.next(data);
    });
  }

  editUser = (user: User) => this.service.userActive.next(user);

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe(() => {
      const users = this.service.userData.value;

      const index = users.findIndex((user: User) => user.id === id);

      if (index !== -1) {
        users.splice(index, 1);
        this.service.userData.next(users);
      }
    });
  }
}
