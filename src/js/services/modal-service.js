export class ModalService {

    constructor() {
        this.data = {
            title: null,
            body: null
        };
    }

    open(data) {
        const $modal = $('bootstrap-modal').find('.modal');
        const $modalBody = $modal.find('.modal-body');
        const $modalTitle = $modal.find('.modal-title');

        this.data = $.extend({}, this.data, data);

        $modalTitle.html(this.data.title);
        $modalBody.html(this.data.body);

        $modal.modal('show');
    }
}
