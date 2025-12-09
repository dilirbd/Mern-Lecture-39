import type React from "react";
import { propertyDefaults, propertyToClassMap } from "./FluidDefaultsMap";
import type { FluidProperty, FluidPropertyConfig, FluidPropertyValue } from "./FluidTypes";

function parseFluidString(value: string): {
    min?: string;
    ideal: string;
    max?: string;
} {
    const tokens: string[] = [];
    let depth = 0;
    let currentToken = '';

    for (let i = 0; i < value.length; i++) {
        const char = value[i];

        if (char === '(') {
            depth++;
            currentToken += char;
        }
        else if (char === ')') {
            depth--;
            currentToken += char;
        }
        else if (char === ' ' && depth === 0) {
            if (currentToken.trim()) {
                tokens.push(currentToken.trim());
                currentToken = '';
            }
        }
        else {
            currentToken += char;
        }
    }

    if (currentToken.trim()) tokens.push(currentToken.trim());

    if (tokens.length === 1) {
        return { ideal: tokens[0] };
    }
    else if (tokens.length === 3) {
        return { min: tokens[0], ideal: tokens[1], max: tokens[2] };
    }
    else {
        // invalid string, treat whole string as value of ideal
        return { ideal: value.trim() };
    }
}

export function parseFluidProperty(
    value: FluidPropertyValue | undefined,
    propertyName: FluidProperty
): FluidPropertyConfig | null {
    if (value === undefined || value === false) {
        return null;
    }

    if (value === true) {
        return { ...propertyDefaults[propertyName], enabled: true };
    }

    if (typeof value === 'string') {
        const parsedString = parseFluidString(value);
        const defaults = propertyDefaults[propertyName];

        return {
            min: parsedString.min ?? defaults.min!,
            ideal: parsedString.ideal ?? defaults.ideal,
            max: parsedString.max ?? defaults.max,
            enabled: true,
        };
    }

    const defaults = propertyDefaults[propertyName];

    return {
        min: value.min ?? defaults.min,
        ideal: value.ideal ?? defaults.ideal,
        max: value.max ?? defaults.max,
        enabled: value.enabled ?? true,
    };
}

export function parseAllFluidProps(
    props: Partial<Record<FluidProperty, FluidPropertyValue | undefined>>
): {
    cssTriVariables: React.CSSProperties;
    cssClasses: string;
} {
    const cssVar: Record<string, string> = {};
    const classes: string[] = [];

    Object.entries(props).forEach(([propName, propValue]) => {
        const propertyName = propName as FluidProperty;
        const config = parseFluidProperty(propValue, propertyName);

        if (config?.enabled) {
            cssVar[`--fluid-${propertyName}-min`] = config.min!;
            cssVar[`--fluid-${propertyName}-ideal`] = config.ideal;
            cssVar[`--fluid-${propertyName}-max`] = config.max!;

            classes.push(propertyToClassMap[propertyName]);
        }
    });

    return {
        cssTriVariables: cssVar as React.CSSProperties,
        cssClasses: classes.join(' '),
    };
}