import {Component, Decorator, View, If, For, EventEmitter} from 'angular2/angular2';
import {FormBuilder, Validators, FormDirectives, ControlGroup} from 'angular2/angular2';
import {AgentService} from 'services/agent-service';
import agentTemplate from 'templates/agent!text';

@Component({
    selector: 'rhino-agent',
    properties: {
        agent: 'agent'
    },
    injectables: [
        FormBuilder, AgentService
    ]
})
@View({
    template: agentTemplate,
    directives: [FormDirectives, For, If]
})
export class Agent {
    form:ControlGroup;
    builder:FormBuilder;

    constructor(b:FormBuilder, agentService:AgentService) {
        this.builder = b;
        this.form = b.group({
            title: ["Client name", Validators.required],
            description: "",
            isDraft: [false, Validators.required]
        });
    }
}