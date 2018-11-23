import { Injectable } from '@angular/core';

export class Email {
	to: string;
	subject: string;
	body: string;
}

@Injectable()
export class EmailService {
	public sendEmail(email: Email) {
		let plugins: any = (<any>window).cordova.plugins;
		plugins.email.isAvailable(() => {
			plugins.email.open(email);
		});
	}
}


// referensi
// https://github.com/appseed-io/ionic3-firebase-auth/blob/master/src/services/email.service.ts