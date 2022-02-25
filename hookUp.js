export async function hookUp(target, key, channel) {
    if (channel.doInit) {
        const { doAction } = await import('trans-render/lib/doAction.js');
        const { getRecipientElement } = await import('trans-render/lib/getRecipientElement.js');
        const recipientElement = await getRecipientElement(target, channel);
        if (recipientElement !== null)
            doAction(target, recipientElement, channel);
    }
    const handler = async (e) => {
        const { ifPathHeadMatches } = channel;
        if (ifPathHeadMatches !== undefined) {
            const headPath = e.composedPath()[0];
            if (headPath !== undefined && headPath.matches && !headPath.matches(ifPathHeadMatches))
                return;
        }
        const { doAction } = await import('trans-render/lib/doAction.js');
        const { getRecipientElement } = await import('trans-render/lib/getRecipientElement.js');
        const recipientElement = await getRecipientElement(target, channel);
        if (recipientElement !== null)
            doAction(target, recipientElement, channel, e);
    };
    target.addEventListener(key, handler, channel.eventListenerOptions);
    return handler;
}
