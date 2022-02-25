import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeChannelingController {
    #eventHandlers = {};
    async intro(proxy, target, beDecorProps) {
        let channels;
        const attr = proxy.getAttribute('is-' + beDecorProps.ifWantsToBe);
        try {
            channels = JSON.parse(attr);
            if (!Array.isArray(channels)) {
                channels = [channels];
            }
            const { hookUp } = await import('./hookUp.js');
            for (const channel of channels) {
                const handler = await hookUp(target, channel);
                let { eventFilter } = channel;
                const type = typeof eventFilter === 'string' ? eventFilter : eventFilter.type;
                this.#eventHandlers[type] = handler;
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
