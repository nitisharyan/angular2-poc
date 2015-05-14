import {Decorator, NgElement} from 'angular2/angular2';
import {bind} from 'angular2/di';

@Decorator({
    selector: '[tooltip]',
    bind: {
        'text': 'tooltip'
    }
})
export class AgentDecorator {
    id:string;
    constructor() {
    }
    set text(text) {
        console.log(text);
    }
}