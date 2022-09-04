import {INotify} from 'trans-render/lib/types';
import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface BeChannelingEndUserProps{
    channels?: IChannel[],
}
export interface BeChannelingVirtualProps extends BeChannelingEndUserProps, MinimalProxy{
    
}

export type Proxy = Element & BeChannelingVirtualProps;

export interface ProxyProps extends BeChannelingVirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface IChannel extends INotify{
    eventFilter: string | Partial<Event>,
    composedPathMatch: string;
}

export interface BeChannelingActions{
    intro(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
    finale(proxy: Proxy, target:Element, beDecorProps: BeDecoratedProps): void;
}