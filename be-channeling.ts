import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import { BeChannelingActions, BeChannelingProps, BeChannelingVirtualProps, IChannel } from './types';
import {register} from 'be-hive/register.js';

export class BeChannelingController implements BeChannelingActions{
    #eventHandlers: {[key: string]: ((e: Event) => void)} = {};
    async intro(proxy: Element & BeChannelingVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        let channels!: IChannel[];
        const attr = proxy.getAttribute('is-' + beDecorProps.ifWantsToBe!)!;
        try{
            channels = JSON.parse(attr);
            if(!Array.isArray(channels)){
                channels = [channels];
            }
            const {hookUp} = await import ('./hookUp.js');
            const {nudge} = await import ('trans-render/lib/nudge.js');
            for(const channel of channels){
                if(channel.debug) debugger;
                const handler = await hookUp(target, channel);
                let {eventFilter} = channel;
                const type = typeof eventFilter === 'string' ? eventFilter : eventFilter.type!;
                this.#eventHandlers[type] = handler;
                if(channel.nudge){
                    nudge(target);
                }
            }
        }catch(e){
            console.error({
                e,
                attr
            });
            return;
        }
    }

    finale(proxy: Element & BeChannelingVirtualProps, target:Element, beDecorProps: BeDecoratedProps){
        for(const key in this.#eventHandlers){
            const handler = this.#eventHandlers[key];
            target.removeEventListener(key, handler);
        }
    }
}

export interface BeChannelingController extends BeChannelingProps{}

const tagName = 'be-channeling';

const ifWantsToBe = 'channeling';

const upgrade = '*';

define<BeChannelingProps & BeDecoratedProps<BeChannelingProps, BeChannelingActions>, BeChannelingActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            noParse: true,
            intro: 'intro',
            finale: 'finale',
        }
    },
    complexPropDefaults:{
        controller: BeChannelingController,
    }
});

register(ifWantsToBe, upgrade, tagName);
