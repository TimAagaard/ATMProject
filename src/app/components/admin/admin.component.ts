import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	
	accounts: any = [];
	
	getAllAccounts(): void {
		this.accountService.getAllAccounts()
			.subscribe(response => {
				this.accounts = response;
				console.log('success');
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
