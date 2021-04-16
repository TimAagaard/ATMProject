import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	
	accounts: any = [];
	searchString = '';
	selectedAccount: any = null;
	
	pushAccount(account: any) {
		this.accounts.push(account);
	}
	
	selectAccount(obj: any): void {
		this.selectedAccount = obj;
	}
	
	createNewAccount(): void {
		this.selectedAccount = {
			first_name: "",
			last_name: "",
			balance: 0
		};
	}
	
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
	
	getAllAccounts(): void {
		this.accountService.getAllAccounts()
			.subscribe(response => {
				this.accounts = response;
				console.log('success');
			}, error => {
				console.log(error);
			});
	}
	
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
