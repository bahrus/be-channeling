import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeChanneling extends BE {
    static get beConfig() {
        return {
            parse: true,
            primaryProp: 'channels',
            primaryPropReq: true
        };
    }
    #eventHandlers = {};
    async onChannels(self) {
        const { channels, enhancedElement } = self;
        const channelsArr = Array.isArray(channels) ? channels : [channels];
        const { hookUp } = await import('./hookUp.js');
        for (const channel of channelsArr) {
            if (channel.debug)
                debugger;
            const handler = await hookUp(enhancedElement, channel);
            let { eventFilter } = channel;
            const type = typeof eventFilter === 'string' ? eventFilter : eventFilter.type;
            this.#eventHandlers[type] = handler;
            if (channel.nudge) {
                const { nudge } = await import('trans-render/lib/nudge.js');
                nudge(enhancedElement);
            }
        }
        return {
            resolved: true
        };
    }
    detach(detachedElement) {
        for (const key in this.#eventHandlers) {
            const handler = this.#eventHandlers[key];
            detachedElement.removeEventListener(key, handler);
        }
    }
}
const tagName = 'be-channeling';
const ifWantsToBe = 'channelnig';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            onChannels: 'channels'
        }
    },
    superclass: BeChanneling
});
register(ifWantsToBe, upgrade, tagName);
