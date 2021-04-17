import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
	
	// Account object handed in from admin-component
	@Input() account?: any;
	
	// Event Emitter to push newly created accounts onto admin-component's accounts array
	@Output() newAccount = new EventEmitter();
	
	// For holding success / error messages
	status = '';
	
	// Creates or updates an account depending on whether or not the id value is present
	updateAccount() : void {
		
		this.status = '';
		
		// Update
		if(this.account.id)
		{
			this.accountService.updateAccount(this.account.id, this.account)
				.subscribe(result => {
					console.log('success');
					this.status = 'Account Updated';
				}, error => {
					console.log('error');
					this.status = 'Error updating account.';
				});
		}
		// Create
		else
		{
			this.accountService.createAccount(this.account)
				.subscribe(result => {
					console.log('success');
					console.log(result);
					this.account = result;
					this.status = 'Account Created';
					this.newAccount.emit(this.account);
				}, error => {
					console.log(error);
					this.status = 'Error Creating Account';
				});
		}
		
	}

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

}
