
function remToPixels(value: number): number {
    return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function vwToPixels(value: number): number {
    return (value * window.innerWidth) / 100;
}

function vhToPixels(value: number): number {
    return (value * window.innerHeight) / 100;
}

// Converts a string of the form `numericValue${rem|vw|vh|px}` to the unitless value in px
function convertToUnitlessPixels(value: string): number {
    const numericValue = parseFloat(value);
    const unit = value.replace(numericValue.toString(10), '').trim();

    switch (unit) {
        case 'px':
            return numericValue;

        case 'rem':
            return remToPixels(numericValue);

        case 'vw':
            return vwToPixels(numericValue);

        case 'vh':
            return vhToPixels(numericValue);

        default:
            return numericValue || 0;
    }
}

export { convertToUnitlessPixels };