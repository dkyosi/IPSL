import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { phoneValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  supportForm: FormGroup;

  submitted: boolean = false;
  isProcessing: boolean = false;
  successMessage: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private router: Router) {
      this.supportForm = this.formBuilder.group({
        fullName: ['', Validators.required],
        emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
        phoneNumber: ['', Validators.compose([Validators.required, phoneValidator])],
        message: ['', Validators.required]
      })
     }

  ngOnInit(): void {
  }

  get f() { return this.supportForm.controls }

  sendMessage() {
    this.submitted = true;
    this.errorMessage = "";
    this.successMessage = "";

    if (this.supportForm.invalid) {
      return;
    }

    this.isProcessing = true;

    let postData = {
      full_name: this.f.fullName.value,
      email_address: this.f.emailAddress.value,
      phone_number: this.f.phoneNumber.value,
      message: this.f.message.value
    }

    return this.authService.authServerCalls(postData, '/support/create-message/').subscribe(results => {
      let data: any = results
      this.supportForm.reset();

      this.isProcessing = false;
      this.successMessage = "Your message has been received. Our support team will address your issue as soon as possible."

      setTimeout(() => {
        this.successMessage = "";
        this.router.navigate(['/'])
      }, 7000);

    }, err => {
      this.isProcessing = false;
      this.errorMessage = "Failed to send your message. Please try again."
    })

  }

}
