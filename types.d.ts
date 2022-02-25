import {INotify} from 'trans-render/lib/types';
import {BeDecoratedProps} from 'be-decorated/types';

export interface BeChannelingVirtualProps{
    channels: IChannel[],
}

export interface BeChannelingProps extends BeChannelingVirtualProps{
    proxy: Element & BeChannelingVirtualProps;
}

export interface IChannel extends INotify{
    eventFilter: string | Partial<Event>,
    composedPathMatch: string;
}

export interface BeChannelingActions{
    intro(proxy: Element & BeChannelingVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    finale(proxy: Element & BeChannelingVirtualProps, target:Element, beDecorProps: BeDecoratedProps): void;
}