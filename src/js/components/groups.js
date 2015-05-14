import {Component, View, For, NgElement} from 'angular2/angular2';
import {GroupsService} from 'services/groups-service';
import {SortableService} from 'services/sortable-service';
import groupsTemplate from 'templates/groups!text';

@Component({
    selector: 'rhino-group',
    injectables: [
        GroupsService,
        SortableService
    ]
})
@View({
    template: groupsTemplate,
    directives: [For]
})
export class Groups {
    constructor(
        groupsService:GroupsService,
        sortableService:SortableService,
        element:NgElement
    ) {
        this.groups = [];

        this.groupsService = groupsService;
        this.sortableService = sortableService.sortable(element);

        this.getGroups();
    }

    getGroups(){
        this.groupsService.getGroups((result) => {
            this.groups = result.groups;
            this.command = result.command;
        });
    }

    listGroups(){
        console.log(this.groups);
    }
}