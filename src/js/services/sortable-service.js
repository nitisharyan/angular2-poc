export class SortableService {
    constructor() {
        this.options = {
            group: 'drop',
            containerSelector: 'table',
            itemPath: '> tbody',
            itemSelector: 'tr',
            placeholder: '<tr class="placeholder"><td colspan="4"></td></tr>',
            onDragStart: function ($item, container, _super, event) {
                $item.css({
                    height: $item.outerHeight(true),
                    width: $item.outerWidth(true)
                });
                $item.addClass('dragged');
                $('body').addClass('dragging');
            },
            onDrop: function ($item, container, _super, event) {
                $item.removeClass('dragged').removeAttr('style');
                $('body').removeClass('dragging');
            }
        };
    }
    sortable(element) {
        const target = element.domElement;
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        const observer = new MutationObserver((mutations) => {
            $(target).find('.sortable').sortable(this.options);
        });

        observer.observe(target, {
            childList: true,
            characterData: true,
            characterDataOldValue: true,
            subtree: true
        });

        return this;
    }
}
