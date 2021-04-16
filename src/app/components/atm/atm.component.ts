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
	errorMessage = '';
	
	

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  
  pressButton(button: any) {
	  
	  this.errorMessage = '';
	  
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
			if(this.state === 0)
			{
				this.accountNumber = this.accountNumber.substring(0, this.accountNumber.length - 1);
			}
			else if(this.state === 2 || this.state === 3)
			{
				this.deltaAmount = this.deltaAmount.substring(0, this.deltaAmount.length - 1);
			}
			break;
		case 'accept':
			if(this.state === 0)
			{
				this.fetchAccount();
			}
			if(this.state === 2 || this.state === 3)
			{
				let newBalance = Number(this.deltaAmount);
				let receipt: any = {};
				if(this.state === 2)
				{
					newBalance *= -1;
					receipt.transaction_type = 'withdrawal';
				}
				else
				{
					receipt.transaction_type = 'deposit';
				}
				
				receipt.transaction_amount = this.deltaAmount;
				
				newBalance = Number(this.account.balance) + Number(newBalance); 
				
				receipt.new_balance = newBalance;
				receipt.initial_balance = this.account.balance;
				
				this.account.balance = newBalance;
				this.updateAccount();
				this.downloadReceipt(receipt);
				this.state = 1;
				this.deltaAmount = '0';
				
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
  
  downloadReceipt(receipt: any): void {
	  
	  let dataStr = JSON.stringify(receipt);
	  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
	  let filename = 'receipt.json';
	  let linkElement = document.createElement('a');
	  linkElement.setAttribute('href', dataUri);
	  linkElement.setAttribute('download', filename);
	  linkElement.click();
	  
  }
  
  fetchAccount(): void {
	  
	  
	  this.accountService.getAccount(this.accountNumber)
		.subscribe(response => {
			this.account = response;
			this.state = 1;
			console.log(response);
		}, error => {
			console.log(error);
			this.errorMessage = 'Error: Account cannot be found';
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
