import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import {
  FormsModule
} from '@angular/forms';
import { UserApiService } from '../service/user-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/Users';
import { Response } from '../models/Response';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
@Component({
  selector: 'app-user-form-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  templateUrl: './user-form-edit.component.html',
  styleUrl: './user-form-edit.component.scss',
})
export class UserFormEditComponent implements OnInit {
  service = inject(UserApiService);
  currentDate = new Date().toISOString().split('T')[0];
  data: any;

  constructor(private dialogRef: MatDialogRef<UserFormEditComponent>) {}

  ngOnInit() {
    this.data = this.service.userActive.getValue();
    console.log(this.data);
  }

  onSubmit(user: any) {
    user.id = this.data.id;
    this.service.editUser(user).subscribe((userData: Response<User[]>) => {
      const data: any = userData.data;

      this.service.userData.next(data);
      this.dialogRef.close();
    });
  }
}
