import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserApiService } from '../service/user-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/Users';
import { Response } from '../models/Response';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  service = inject(UserApiService);
  currentDate = new Date().toISOString().split('T')[0];

  constructor(private dialogRef: MatDialogRef<UserFormComponent>) {}

  isEmailAlreadyExists(email: string): boolean {
    const currentUsers = this.service.usersData.getValue();
    return currentUsers.some((user) => user.email === email);
  }

  onSubmit(userForm: NgForm) {
    this.service
      .createUser(userForm.value)
      .subscribe((userData: Response<User[]>) => {
        const data: User[] = userData.data;

        this.service.usersData.next(data);
        this.dialogRef.close();
      });
  }
}
