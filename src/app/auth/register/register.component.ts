import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ModalService} from "../../_modal";
import {TokenResponse} from "../../_models/TokenResponse";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  errors: string[] = []
  token: TokenResponse | undefined

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

  redirectToHome(){
    this.router.navigate([''])
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    const serializedRegisterForm = JSON.stringify(this.registerForm.getRawValue())

    this.authService.register(serializedRegisterForm).subscribe({
      next: data => {
        localStorage.setItem('token', data.token)
        this.openModal('register-successful')
      },
      error: error => {
        this.errors = []
        let apiErrors = error.error.errors || error.errors || error.error.message || error.statusText;
        if(apiErrors instanceof Array){
          this.errors = apiErrors as []
        }else{
          this.errors.push(apiErrors)
        }
        this.openModal('register-failed')
      }
    })
  }

  ngOnInit(): void {
  }

}
