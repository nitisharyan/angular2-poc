export class GroupsService {
    constructor() {
        this.list = [];
    }

    getGroups(callback) {
        $.ajax({
            url: 'mock/response/get_groups.json',
            command: 'get_groups',
            success: callback
        });
    }
}
