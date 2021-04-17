import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	
	// Array of accounts
	accounts: any = [];
	
	// Search string for finding accounts by id, first_name, OR last_name
	searchString = '';
	
	// The account to send to account-details component
	selectedAccount: any = null;
	
	// Push new account onto the accounts array (called by account-details component's event emitter)
	pushAccount(account: any) {
		this.accounts.push(account);
	}
	
	// Select an existing account for the account-details component
	selectAccount(obj: any): void {
		this.selectedAccount = obj;
	}
	
	// Create a new account to be filled out in the account-details component
	createNewAccount(): void {
		this.selectedAccount = {
			first_name: "",
			last_name: "",
			balance: 0
		};
	}
	
	// Search for and display accounts matching searchString
	searchAccount(): void {
		console.log('searching');
		if(this.searchString)
		{
			this.accountService.searchAccount(this.searchString)
				.subscribe(response => {
					this.accounts = response;
					console.log('success');
				}, error => {
					console.log(error);
				});
		}
		else
		{
			this.getAllAccounts();
		}
	}
	
	// Get all accounts
	getAllAccounts(): void {
		this.accountService.getAllAccounts()
			.subscribe(response => {
				this.accounts = response;
				console.log('success');
			}, error => {
				console.log(error);
			});
	}
	
	// Delete an account
	deleteAccount(id: any, index: number): void {
		
		this.accountService.deleteAccount(id)
			.subscribe(response => {
				console.log('account deleted');
				this.accounts.splice(index, 1);
			}, error => {
				console.log(error);
			});
	}

  constructor(private accountService: AccountService) { 
		this.getAllAccounts();
  }

  ngOnInit(): void {
  }

}
