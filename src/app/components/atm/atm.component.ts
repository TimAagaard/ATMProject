import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.css']
})
export class AtmComponent implements OnInit {
	
	account: any = null;
	
	
	state = 0;
	
	accountNumber = '';
	deltaAmount = '0';
	
	

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  
  pressButton(button: any) {
	  
	  switch(button) {
		
		case 'cancel':
			if(this.state === 0)
			{
				this.accountNumber = '';
			}
			else if(this.state === 1)
			{
				this.state = 0;
				this.account = null;
				this.accountNumber = '';
			}
			else if(this.state === 2 || this.state === 3)
			{
				this.state = 1;
				this.deltaAmount = '0';
			}
			break;
		case 'back':
			this.accountNumber = this.accountNumber.substring(0, this.accountNumber.length - 1);
			break;
		case 'accept':
			if(this.state === 0)
			{
				this.fetchAccount();
			}
			if(this.state === 2 || this.state === 3)
			{
				let newBalance = Number(this.deltaAmount);
				if(this.state === 2)
				{
					newBalance *= -1;
				}
				newBalance = Number(this.account.balance) + Number(newBalance);
				this.updateAccount();
				this.state = 1;
				this.account.balance = newBalance;
			}
			break;
		default:
			if(this.state === 0)
			{
				this.accountNumber += button;
			}
			else if(this.state === 1)
			{
				if(button == 1)
				{
					this.state = 2;
				}
				else if(button === 2)
				{
					this.state = 3;
				}
			}
			else if(this.state === 2 || this.state === 3)
			{
				if(this.deltaAmount === '0')
				{
					this.deltaAmount = String(button);
				}
				else
				{
					this.deltaAmount += String(button);
				}
			}
			break;
		
	  }
	  
  }
  
  fetchAccount(): void {
	  
	  
	  this.accountService.getAccount(this.accountNumber)
		.subscribe(response => {
			this.account = response;
			this.state = 1;
			console.log(response);
		}, error => {
			console.log(error);
		});
		
	  
  }
  
  updateAccount(): void {
	  this.accountService.updateAccount(this.accountNumber, {balance: Number(this.account.balance)})
		.subscribe(response => {
			console.log(response);
		}, error => {
			console.log(error);
		});
  }

}
