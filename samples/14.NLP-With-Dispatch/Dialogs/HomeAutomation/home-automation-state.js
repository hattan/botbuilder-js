const DEVICE_PROPERTY = 'homeAutomation.Device';

class DeviceState {
    /**
     * 
     * @param {*} device 
     * @param {*} room 
     * @param {*} deviceProperty 
     * @param {*} deviceState 
     */
    constructor(device, room, deviceProperty, deviceState) { 
        this.deviceName = device?device:'';
        this.room = room?room:'';
        this.deviceProperty = deviceProperty?deviceProperty:'';
        this.deviceState = deviceState?deviceState:'';
    }
};

class HomeAutomationState {
    /**
     * 
     * @param {object} convoState Conversation state
     * @param {object} userState User state 
     */
    constructor(convoState, userState) {
        if(!convoState || !convoState.createProperty) throw('Invalid conversation state provided.');
        if(!userState || !userState.createProperty) throw('Invalid user state provided.');

        // device property accessor for home automation scenario.
        this.deviceProperty = convoState.createProperty(DEVICE_PROPERTY);
        
    }
    async setDevice(device, room, deviceState, deviceProperty, context) {
        // get devices from state.
        let opetraions = await this.deviceProperty.get(context);
        if(opetraions === undefined) { 
            opetraions = new Array(new DeviceState(device, room, deviceProperty, deviceState));
        } else {
            // add this operation
            opetraions.push(new DeviceState(device, room, deviceProperty, deviceState));
        }
        return this.deviceProperty.set(context,opetraions);
    }
    async getDevices(context) {
        let returnText = 'No operations found';
        // read out of current devices from state
        const opetraions = await this.deviceProperty.get(context);
        if(opetraions === undefined) {
            return returnText;
        }
        returnText = '';
        opetraions.forEach((device, idx) => {
            returnText += '\n[' + idx + ']. ' + 
                          (device.deviceName?device.deviceName:'Unknown device') + 
                          (device.room?' in room = ' + device.room:'') + 
                          (device.deviceState? ' is ' + device.deviceState: '') +
                          (device.deviceProperty? ' device property = ' + device.deviceProperty:'');
        });
        return returnText;
    }
}

module.exports = HomeAutomationState;