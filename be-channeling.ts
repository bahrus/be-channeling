import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';

export class BeChanneling extends BE<AP, Actions> implements Actions{
    static  override get beConfig(){
        return {
            parse: true,
            primaryProp: 'channels',
            primaryPropReq: true
        } as BEConfig
    }

    #eventHandlers: {[key: string]: ((e: Event) => void)} = {};

    async onChannels(self: this): ProPAP {
        const {channels, enhancedElement} = self;

        const channelsArr = Array.isArray(channels) ? channels : [channels];
        
        const {hookUp} = await import ('./hookUp.js');
        
        for(const channel of channelsArr){
            if(channel.debug) debugger;
            const handler = await hookUp(enhancedElement, channel);
            let {eventFilter} = channel;
            const type = typeof eventFilter === 'string' ? eventFilter : eventFilter.type!;
            this.#eventHandlers[type] = handler;
            if(channel.nudge){
                const {nudge} = await import ('trans-render/lib/nudge.js');
                nudge(enhancedElement);
            }
        }
        return {
            resolved: true
        }

    }

    override detach(detachedElement: Element): void {
        for(const key in this.#eventHandlers){
            const handler = this.#eventHandlers[key];
            detachedElement.removeEventListener(key, handler);
        }
    }
}

export interface BeChanneling extends AllProps{}

const tagName = 'be-channeling';
const ifWantsToBe = 'channelnig';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config: {
        tagName,
        propDefaults:{
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