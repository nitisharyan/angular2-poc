export class AgentService {

    getConnectedAgent(callback) {
        $.ajax({
            url: 'mock/response/get_connected_agents.json',
            command: 'get_connected_agents',
            success: callback
        });
    }
}
