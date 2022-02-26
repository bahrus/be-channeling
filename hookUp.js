export async function hookUp(target, channel) {
    let { doInit, eventFilter } = channel;
    const type = typeof eventFilter === 'string' ? eventFilter : eventFilter.type;
    const handler = async (e) => {
        const { composedPathMatch } = channel;
        const path = e.composedPath();
        if (e.path === undefined) {
            /**
             * hack alert: composedPath() disappears when doing asynchronous processing.
            * path only supported by blink.  it doesn't disappear
            * so add it to other browsers.
            */
            e.path = path;
        }
        if (composedPathMatch !== undefined) {
            const headPath = path[0];
            if (headPath !== undefined && headPath.matches && !headPath.matches(composedPathMatch))
                return;
        }
        const { doAction } = await import('trans-render/lib/doAction.js');
        const { getRecipientElement } = await import('trans-render/lib/getRecipientElement.js');
        const recipientElement = await getRecipientElement(target, channel);
        if (recipientElement !== null)
            doAction(target, recipientElement, channel, e);
    };
    target.addEventListener(type, handler, channel.eventListenerOptions);
    return handler;
}
