import type { ComponentPropsWithRef, ElementType } from "react";

type FluidProperty = 'f-width' | 'f-height'
    | 'f-font-size' | 'line-height' | 'padding-top' | 'padding-right'
    | 'padding-bottom' | 'padding-left' | 'f-padding' | 'margin-top'
    | 'margin-right' | 'margin-bottom' | 'margin-left' | 'f-margin'
    | 'row-gap' | 'column-gap' | 'f-gap' | 'border-radius' | 'border-width'
    | 'f-top' | 'f-right' | 'f-bottom' | 'f-left' | 'f-inset';



interface FluidPropertyConfig {
    min?: string;
    ideal: string;
    max?: string;
    enabled?: boolean;
};

type FluidPropertyValue = boolean | string | FluidPropertyConfig;

type FluidConfig = Partial<Record<FluidProperty, FluidPropertyValue>>;

type FluidComponentProps<T extends ElementType> = ComponentPropsWithRef<T> &
    FluidConfig & {
        as?: T;
        className?: string;
    };

export type { FluidProperty, FluidPropertyConfig, FluidPropertyValue, FluidConfig, FluidComponentProps };
