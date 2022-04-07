import { define } from 'be-decorated/be-decorated.js';
import { getVal } from 'be-decorated/upgrade.js';
import { register } from 'be-hive/register.js';
export class BeChannelingController {
    #eventHandlers = {};
    async intro(proxy, target, beDecorProps) {
        let channels;
        const val = getVal(target, beDecorProps.ifWantsToBe);
        const attr = val[0];
        try {
            channels = JSON.parse(attr);
            if (!Array.isArray(channels)) {
                channels = [channels];
            }
            const { hookUp } = await import('./hookUp.js');
            const { nudge } = await import('trans-render/lib/nudge.js');
            for (const channel of channels) {
                if (channel.debug)
                    debugger;
                const handler = await hookUp(target, channel);
                let { eventFilter } = channel;
                const type = typeof eventFilter === 'string' ? eventFilter : eventFilter.type;
                this.#eventHandlers[type] = handler;
                if (channel.nudge) {
                    nudge(target);
                }
            }
        }
        catch (e) {
            console.error({
                e,
                attr
            });
            return;
        }
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
            noParse: true,
            intro: 'intro',
            finale: 'finale',
        }
    },
    complexPropDefaults: {
        controller: BeChannelingController,
    }
});
register(ifWantsToBe, upgrade, tagName);
