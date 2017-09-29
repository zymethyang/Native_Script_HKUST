import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';

import { DrawerPage } from '../shared/drawer/drawer.page';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as Email from 'nativescript-email';
import * as TNSPhone from 'nativescript-phone';


@Component({
    selector: 'app-home',
    moduleId: module.id,
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent extends DrawerPage implements OnInit {



    constructor(private changeDetectorRef: ChangeDetectorRef,
        @Inject('BaseURL') private BaseURL,
        private fonticon: TNSFontIconService) {
        super(changeDetectorRef);
    }

    ngOnInit() {

    }
    sendEmail() {
        Email.available()
            .then((avail: boolean) => {
                if (avail) {
                    Email.compose({
                        to: ['confusion@food.net'],
                        subject: '[ConFusion]: Query',
                        body: 'Dear Sir/Madam:'
                    });
                }
                else {
                    console.log('No Email Configured');
                }

            })
    }
    public callRestaurant() {
        TNSPhone.dial('841234842615', false);
    }
}