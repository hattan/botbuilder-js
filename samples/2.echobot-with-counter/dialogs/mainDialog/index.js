// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Turn counter property
const TURN_COUNTER = 'turnCounter';

class MainDialog {

    constructor (conversationState) {
        // creates a new state accessor property.see https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors 
        this.countProperty = conversationState.createProperty(TURN_COUNTER);
    }

    // handle the OnTurn
    // context obj holds TuenContext for a given event 
    async onTurn(context) {
        // see https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
        if (context.activity.type === 'message') {
            // read from state.
            let count = await this.countProperty.get(context);
            count = count === undefined ? 0 : count;
            await context.sendActivity(`${count}: You said "${context.activity.text}"`);
            // increment and set turn counter.
            this.countProperty.set(context, ++count);
        }
        else {
            await context.sendActivity(`[${context.activity.type} event detected]`);
        }
    }
}

module.exports = MainDialog;