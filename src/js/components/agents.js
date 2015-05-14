import {Component, View, For, NgElement, bootstrap} from 'angular2/angular2';
import {SortableService} from 'services/sortable-service';
import {ModalService} from 'services/modal-service';
import {Agent} from 'components/agent';
import {agentStore} from 'stores/agent-store';
import {agentActions} from 'actions/agent-actions';
import agentsTemplate from 'templates/agents!text';

@Component({
    selector: 'rhino-agents',
    injectables: [SortableService, ModalService]
})
@View({
    template: agentsTemplate,
    directives: [For, Agent]
})
export class Agents {
    constructor(
        sortableService:SortableService,
        modalService:ModalService,
        element:NgElement
    ) {
        this.agentStore = agentStore;
        this.agentActions = agentActions;

        this.sortableService = sortableService;
        this.modalService = modalService;

        this.agents = this.agentStore.getAll();

        this.sortableService.sortable(element);

        this.agentActions.sync();
        this.agentStore.addChangeListener(this.onChange.bind(this));

    }
    onChange() {
        this.agents = this.agentStore.getAll();
    }

    edit(name) {
        this.agentActions.getClientInfo(name);
    }

    listConnectedAgent() {
        console.log(this.agents);
    }
}

// Object.defineProperty(Agents, 'annotations', {get: function() {
//     return [new Component({
//       selector: 'rhino-agents',
//       services: [SortableService, ModalService]
//     }), new Template({
//       inline: agentsTemplate,
//       directives: [AgentDecorator, For]
//     })];
//   }});
// Object.defineProperty(Agents, 'parameters', {get: function() {
//     return [[SortableService], [ModalService], [NgElement]];
// }});
