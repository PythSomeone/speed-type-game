import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ModalService} from "../../_modal";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  errors: [] = []
  token: string = 'null'

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const serializedLoginForm = JSON.stringify(this.loginForm.getRawValue())

    this.authService.login(serializedLoginForm).subscribe({
      next: data => {
        localStorage.setItem('token', data.token)
        this.router.navigate([''])
        this.openModal('login-successful')
      },
      error: error => {
        console.log(error.error.errors)
        this.errors = error.error.errors || error.errors;
        this.openModal('register-failed')
      }
    })
  }

  ngOnInit(): void {

  }
}
