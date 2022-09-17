import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeChannelingController extends EventTarget {
    #eventHandlers = {};
    async onChannels({ channels, self, proxy }) {
        const channelsArr = Array.isArray(channels) ? channels : [channels];
        const { hookUp } = await import('./hookUp.js');
        for (const channel of channelsArr) {
            if (channel.debug)
                debugger;
            const handler = await hookUp(self, channel);
            let { eventFilter } = channel;
            const type = typeof eventFilter === 'string' ? eventFilter : eventFilter.type;
            this.#eventHandlers[type] = handler;
            if (channel.nudge) {
                const { nudge } = await import('trans-render/lib/nudge.js');
                nudge(self);
            }
        }
        proxy.resolved = true;
    }
    finale(proxy, target, beDecorProps) {
        for (const key in this.#eventHandlers) {
            const handler = this.#eventHandlers[key];
            target.removeEventListener(key, handler);
        }
    }
}
const tagName = 'be-channeling';
const ifWantsToBe = 'channeling';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            finale: 'finale',
            virtualProps: ['channels'],
            primaryProp: 'channels',
            primaryPropReq: true
        },
        actions: {
            onChannels: 'channels'
        }
    },
    complexPropDefaults: {
        controller: BeChannelingController,
    }
});
register(ifWantsToBe, upgrade, tagName);
