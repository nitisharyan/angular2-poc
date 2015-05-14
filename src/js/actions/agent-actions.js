import {dispatcher} from 'dispatcher/dispatcher';
import {constants} from 'constants/agent-constans';
import {request} from 'utils/request';

export const agentActions = {
    sync() {
        request('get_connected_agents', (data) => {
            dispatcher.dispatch({
                type: constants.AGENT_SYNC,
                data: data.agents
            });
        });
    },
    /**
     * @param {string} data
     */
    create(data) {
        dispatcher.dispatch({
            type: constants.AGENT_CREATE,
            data
        });
    },

    /**
     * @param  {string} data
     */
    update(data) {
        dispatcher.dispatch({
            type: constants.AGENT_UPDATE,
            data
        });
    },

    getClientInfo(agent) {
        request({command: 'client_info', 'agent_name': agent}, (data) => {
            console.log(data);
        });
    },

    /**
     * @param  {string} name
     */
    delete(name) {
        dispatcher.dispatch({
            type: constants.AGENT_DELETE,
            name
        });
    }
};
