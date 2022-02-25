import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeChannelingController {
    #eventHandlers = {};
    async intro(proxy, target, beDecorProps) {
        let params;
        const attr = proxy.getAttribute('is-' + beDecorProps.ifWantsToBe);
        try {
            params = JSON.parse(attr);
            const { hookUp } = await import('./hookUp.js');
            for (const pram of params) {
                const handler = await hookUp(target, pram.type, pram);
                this.#eventHandlers[pram.type] = handler;
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
    }
});
register(ifWantsToBe, upgrade, tagName);
