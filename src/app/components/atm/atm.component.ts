import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.css']
})
export class AtmComponent implements OnInit {
	
	// Holds the account after logging in
	account: any = null;
	
	/*
		Program state - should've used an enum
		0 = not logged in
		1 = logged in
		2 = withdrawal
		3 = deposit
	*/
	state = 0;
	
	// Holds the account number before and after login until log out
	accountNumber = '';
	
	// Holds the amount to withdraw or deposit
	deltaAmount = '0';
	
	// Stores any error messages
	errorMessage = '';
	
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  
  // Handles all the ATM button presses
  pressButton(button: any) {
	  
	  this.errorMessage = '';
	  
	  switch(button) {
		
		case 'cancel':
			// Not logged in - blank out account number
			if(this.state === 0)
			{
				this.accountNumber = '';
			}
			// Logged in - log out
			else if(this.state === 1)
			{
				this.state = 0;
				this.account = null;
				this.accountNumber = '';
			}
			// Withdraw OR deposit - go back to logged in screen
			else if(this.state === 2 || this.state === 3)
			{
				this.state = 1;
				this.deltaAmount = '0';
			}
			break;
		case 'back':
			// Not logged in - remove last digit of account number being entered
			if(this.state === 0)
			{
				this.accountNumber = this.accountNumber.substring(0, this.accountNumber.length - 1);
			}
			// Withdraw OR deposit - remove last digit of amount to withdraw / deposit
			else if(this.state === 2 || this.state === 3)
			{
				this.deltaAmount = this.deltaAmount.substring(0, this.deltaAmount.length - 1);
			}
			break;
		case 'accept':
			// Not logged in - attempt to login
			if(this.state === 0)
			{
				this.fetchAccount();
			}
			// Withdraw OR deposit - Do the deposit math, update the account in the DB, prompt user to download receipt
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
		// Numeric keys 0 - 9
		default:
			// Not logged in - append digit to account number
			if(this.state === 0)
			{
				this.accountNumber += button;
			}
			// Logged in
			else if(this.state === 1)
			{
				// 1 is pressed
				if(button == 1)
				{
					// Go to withdraw screen
					this.state = 2;
				}
				// 2 is pressed
				else if(button === 2)
				{
					// Go to deposit screen
					this.state = 3;
				}
			}
			// Withdraw or deposit - append digit to amount to withdraw / deposit
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
  
  // Prompt for download of a withdraw / deposit receipt in JSON format
  downloadReceipt(receipt: any): void {
	  
	  let dataStr = JSON.stringify(receipt);
	  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
	  let filename = 'receipt.json';
	  let linkElement = document.createElement('a');
	  linkElement.setAttribute('href', dataUri);
	  linkElement.setAttribute('download', filename);
	  linkElement.click();
	  
  }
  
  // Attempt to get the account information from the entered accountNumber
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
  
  // Update the account balance
  updateAccount(): void {
	  this.accountService.updateAccount(this.accountNumber, {balance: Number(this.account.balance)})
		.subscribe(response => {
			console.log(response);
		}, error => {
			console.log(error);
		});
  }

}
