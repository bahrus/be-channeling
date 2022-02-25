import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import { BeChannelingActions, BeChannelingProps, BeChannelingVirtualProps, IChannel } from './types';
import {register} from 'be-hive/register.js';

export class BeChannelingController implements BeChannelingActions{
    #eventHandlers: {[key: string]: ((e: Event) => void)} = {};
    async intro(proxy: Element & BeChannelingVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        let params!: IChannel[];
        const attr = proxy.getAttribute('is-' + beDecorProps.ifWantsToBe!)!;
        try{
            params = JSON.parse(attr);
            const {hookUp} = await import ('./hookUp.js');

            for(const pram of params){
                const handler = await hookUp(target, pram.type, pram);
                this.#eventHandlers[pram.type] = handler;
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
    }
});

register(ifWantsToBe, upgrade, tagName);
