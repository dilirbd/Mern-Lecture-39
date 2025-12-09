import { createFluidElement } from "./FluidFactory";

// export const FluidButton = createFluidElement('button', {
//     'f-width': {min: '120px', ideal: 'calc(15vw + 20px)', max: '200px'},
//     'f-font-size': {min: '0.85rem', ideal: 'calc(1vw + 0.5rem)', max: '1.5rem', enabled: true},
// });

export const FluidContainer = createFluidElement("div");
export const FluidButton = createFluidElement("button");
