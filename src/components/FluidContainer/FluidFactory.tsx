import React, { useMemo } from "react";
import type { FluidConfig, FluidProperty, FluidPropertyValue } from "./FluidTypes";
import { parseAllFluidProps } from "./FluidParser";

const allFluidPropertieS: FluidProperty[] = [
    'f-width', 'f-height',
    'f-font-size', 'line-height', 'padding-top', 'padding-right',
    'padding-bottom', 'padding-left', 'f-padding', 'margin-top',
    'margin-right', 'margin-bottom', 'margin-left', 'f-margin',
    'row-gap', 'column-gap', 'f-gap', 'border-radius', 'border-width',
    'f-top', 'f-right', 'f-bottom', 'f-left', 'f-inset'
];

export function createFluidElement<
    T extends keyof React.JSX.IntrinsicElements = 'div'
>(
    elementType: T,
    defaultConfig?: FluidConfig
) {
    function FluidComponent<
        As extends React.ElementType = T
    >({
        as,
        className = '',
        style,
        ref,
        children,
        ...props
    }: {
        as?: As;
        className?: string;
        style?: React.CSSProperties;
        ref?: React.ComponentPropsWithRef<As>['ref'];
        children?: React.ReactNode;
    } & Omit<React.ComponentPropsWithRef<As>, 'ref' | 'style' | 'className'> & {
            [K in FluidProperty]?: FluidPropertyValue;
        }) {
        const Component = as || elementType;

        const fluidProps = useMemo(() => {
            const result: Partial<Record<FluidProperty, FluidPropertyValue | undefined>> = {};
            allFluidPropertieS.forEach(propName => {
                if (propName in props) {
                    result[propName] = props[propName];
                }
                else if (defaultConfig && propName in defaultConfig) {
                    result[propName] = defaultConfig[propName];
                }
            });
            // console.log(result);
            return result;
        }, [props, defaultConfig]);

        const { cssTriVariables, cssClasses } = useMemo(() => {
            // console.log(parseAllFluidProps(fluidProps));
            return parseAllFluidProps(fluidProps);
        }, [fluidProps]);

        const elementProps = useMemo(() => {
            const result = { ...props };
            allFluidPropertieS.forEach(propName => {
                delete result[propName];
            });
            return result;
        }, [props]);

        const mergedStyles = useMemo(() => {
            return ({ ...cssTriVariables, ...style });
        }, [cssTriVariables, style]);

        const mergedClasses = `${cssClasses} ${className}`.trim();

        return React.createElement(
            Component as React.ElementType,
            {
                ...elementProps,
                ref: ref as any,
                style: mergedStyles,
                className: mergedClasses || undefined,
            } as Omit<React.ComponentPropsWithRef<typeof Component>, 'style' | 'className'> & {
                style?: React.CSSProperties;
                className?: string;
            },
            children
        );
    }

    // for react devtools apparently
    const displayName = typeof elementType === 'string' ?
        `Fluid${elementType.charAt(0).toUpperCase() + elementType.slice(1)}` :
        'FluidComponent';

    FluidComponent.displayName = displayName;

    return FluidComponent;
}