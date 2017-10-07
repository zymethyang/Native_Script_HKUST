import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TextField } from 'ui/text-field';
import { Slider } from 'ui/slider';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePicker } from 'ui/date-picker';
import { TimePicker } from 'ui/time-picker';
import { Page } from 'ui/page';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
    isDateTime: boolean = false;
    commentForm: FormGroup;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder, private page: Page,
        private params: ModalDialogParams,) {

        this.commentForm = this.formBuilder.group({
            name: ['', Validators.required],
            rating: 5,
            comment: ['', Validators.required],
        });

    }

    ngOnInit() {
    }
    onRatingChecked(args) {
        let rating = <Slider>args.object;
        this.commentForm.patchValue({ rating: rating });
    }
    onNameChecked(args) {
        let textField = <TextField>args.object;

        this.commentForm.patchValue({ author: textField.text });
    }

    onCommentChecked(args) {
        let textField = <TextField>args.object;

        this.commentForm.patchValue({ comment: textField.text });

    }

    onSubmit() {
        let currentdate: Date = new Date();
        this.commentForm.value.date= currentdate;
        this.params.closeCallback(this.commentForm.value);
        console.log(JSON.stringify(this.commentForm.value));
    }
}