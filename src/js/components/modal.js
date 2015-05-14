import {Component, View, For, NgElement} from 'angular2/angular2';
import modalTemplate from 'templates/modal!text';

@Component({
    selector: 'bootstrap-modal',
    injectables: []
})
@View({
    template: modalTemplate,
    directives: [For]
})

export class Modal {
    constructor(element:NgElement) {
        this.modal = {};
        this.element = element;
    }

    save(){
        var form = $(this.element.domElement).find('form:first');
        if( form ) form.submit();
    }
}
