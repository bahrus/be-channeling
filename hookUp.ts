import {IChannel} from './types';

export async function hookUp(target: Element, channel: IChannel){
    let {doInit, eventFilter} = channel;
    const type = typeof eventFilter === 'string' ? eventFilter : eventFilter.type!;
    if(doInit){
        const {doAction} = await import ('trans-render/lib/doAction.js');
        const {getRecipientElement} = await import ('trans-render/lib/getRecipientElement.js');
        const recipientElement = await getRecipientElement(target, channel);
        if(recipientElement !== null) doAction(target, recipientElement, channel);
    }

    const handler = async (e: Event) => {
        const {composedPathMatch} = channel;
        if(composedPathMatch !== undefined){
            const headPath = e.composedPath()[0] as Element;
            if(headPath !== undefined && headPath.matches && !headPath.matches(composedPathMatch)) return;
        }
        const {doAction} = await import ('trans-render/lib/doAction.js');
        const {getRecipientElement} = await import ('trans-render/lib/getRecipientElement.js');
        const recipientElement = await getRecipientElement(target, channel);
        if(recipientElement !== null) doAction(target, recipientElement, channel, e);
    }

    target.addEventListener(type, handler, channel.eventListenerOptions);

    return handler;
    
}