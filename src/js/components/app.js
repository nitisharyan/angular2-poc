import {Component, View, For} from 'angular2/angular2';
import {Agents} from 'components/agents';
import {Groups} from 'components/groups';
import {Modal} from 'components/modal';
import appTemplate from 'templates/app!text';

@Component({
    selector: 'rhino-app',
})
@View({
    template: appTemplate,
    directives: [Agents, Groups, Modal]
})
export class App {
    constructor() {
        console.log('App started... :)');
    }
}