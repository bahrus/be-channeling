import {INotify} from 'trans-render/lib/types';
import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    channels: IChannel | IChannel[],
}
export interface AllProps extends EndUserProps {}


export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];


export interface IChannel extends INotify{
    eventFilter: string | Partial<Event>,
    composedPathMatch: string;
}

export interface Actions{
    onChannels(self: this): ProPAP;
    //finale(proxy: Proxy, target:Element, beDecorProps: BeDecoratedProps): void;
}