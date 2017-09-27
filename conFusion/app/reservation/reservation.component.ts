import { Component, OnInit, Inject, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ReservationModalComponent } from "../reservationmodal/reservationmodal.component";
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { CouchbaseService } from '../services/couchbase.service';
@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html'
})
export class ReservationComponent extends DrawerPage implements OnInit {

    reservation: FormGroup;
    formReservation: View;
    formResult: View;
    docId: string = "reservations";
    doc: any;
    db:any;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef,
        private page: Page,
        private couchbaseService: CouchbaseService) {
        super(changeDetectorRef);

        this.reservation = this.formBuilder.group({
            guests: 3,
            smoking: false,
            dateTime: ['', Validators.required]
        });
        this.doc = this.couchbaseService.getDocument(this.docId);
    }
    createModalView(args) {

        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({ guests: result });
                }
                else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result });
                }
            });

    }

    ngOnInit() {
        this.formReservation = <View>this.page.getViewById<View>("form_reservation");
        this.formResult = <View>this.page.getViewById<View>("form_result");

        this.formResult.animate({
            opacity: 0,
            scale: { x: 0.5, y: 0.5 },
            duration: 0
        })
    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text });
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text });
    }

    onSubmit() {
        console.log(JSON.stringify(this.reservation.value));

       
        this.formReservation.animate({
            opacity: 0,
            scale: { x: 0.5, y: 0.5 },
            duration: 500
        }).then(() => this.formResult.animate({
            opacity: 1,
            scale: { x: 1, y: 1 },
            duration: 500
        }));

        if (this.doc == null) {
            console.log("This is the first reservation");
            this.couchbaseService.createDocument({ "guests": this.reservation.value.guests, "smoking": this.reservation.value.smoking, "dateTime": this.reservation.value.dateTime }, this.docId);
        } else {
            console.log(this.doc.value);
            this.couchbaseService.updateDocument(this.docId, { "guests": this.reservation.value.guests, "smoking": this.reservation.value.smoking, "dateTime": this.reservation.value.dateTime });
        }
    }
}