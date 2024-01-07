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
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

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
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  service = inject(UserApiService);

  currentDate = new Date().toISOString().split('T')[0];

  constructor(private dialogRef: MatDialogRef<UserFormComponent>) {}
  ngOnInit() {
    const userData = this.service.userData.subscribe((user) =>
      console.log(user)
    );
  }


  onSubmit(userForm: NgForm) {
    this.service
      .createUser(userForm.value)
      .subscribe((userData: Response<User[]>) => {
        const data: any = userData.data;

        data.map((item: User) => {
          item.data_nascimento = new Date(
            item.data_nascimento
          ).toLocaleDateString('pt-BR');
        });

        this.service.userData.next(data);
        this.dialogRef.close();
      });
  }
}
