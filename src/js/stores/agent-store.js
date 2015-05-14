import {dispatcher} from 'dispatcher/dispatcher';
import {constants} from 'constants/agent-constans';
import EventEmitter from 'events';
import Register from 'utils/register';

const CHANGE_EVENT = 'change';

let _agents = [];

/**
 * Create a Agent item.
 * @param  {string} data of the Agent
 */
function create(agent) {
    _agents.push(agent);
}

/**
 * Sync Agent items.
 * @param  {string} data of the Agent
 */
function sync(agents) {
    // console.log(normalize(agents));
    _agents = agents;
}

/**
 * Update a Agent item.
 * @param  {string} name
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(agent) {
    for (var i = 0; i < _agents.length; i++) {
        if (_agents[i].name = _agent.name) {
            _agents[i] = agents;
            break;
        }
    }
}

function edit(agent) {
    console.log(agent);
}

/**
 * Delete a Agent item.
 * @param  {string} name
 */
function remove(data) {
    _agents.filter((agent) => {
        return agent.name !== data.name;
    });
}

export class AgentStore extends EventEmitter {
    constructor() {
        super();

        this.register = new Register();
        this.registerDispatcher();
    }

    /**
     * Get the entire collection of Agents.
     * @return {object}
     */
    getAll() {
        return _agents;
    }

    getAgentByName(name) {
        return this.filter((agent) => {
            return agent.name === name;
        })[0];
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    /**
     * @param {function} callback
     */
    addChangeListener(callback, context) {
        this.on(CHANGE_EVENT, callback, context);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    registerDispatcher() {
        dispatcher.register((action) => {
            const data = action.data;

            // Register Actions
            this.register.register(constants.AGENT_SYNC, sync);
            this.register.register(constants.AGENT_CREATE, create);
            this.register.register(constants.AGENT_UPDATE, update);
            this.register.register(constants.AGENT_DELETE, remove);

            this.register.getValue(action.type)(data);

            this.emitChange();
        });
    }
}

export const agentStore = new AgentStore();