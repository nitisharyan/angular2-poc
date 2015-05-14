import {Component} from 'angular2/angular2';

export class FluxComponent extends Component {
    constructor(options = {}) {
        //Add actions and stores to services
        options.services = options.services
            .concat(options.actions || [])
            .concat(options.stores || []);

        super(options);
    }
}
