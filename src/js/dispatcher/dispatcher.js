import flux from 'flux';
import {constants} from 'constants/payload-constants';

class AppDispatcher extends flux.Dispatcher {
    constructor() {
        super();
    }
    handleServerAction(action) {
        if (!action.type) {
            throw new Error('Empty action.type: you likely mistyped the action.');
        }

        this.dispatch({
            source: constants.SERVER_ACTION,
            action
        });
    }

    handleViewAction(action) {
        if (!action.type) {
            throw new Error('Empty action.type: you likely mistyped the action.');
        }

        this.dispatch({
            source: constants.VIEW_ACTION,
            action
        });
    }
}

export const dispatcher = new AppDispatcher();
