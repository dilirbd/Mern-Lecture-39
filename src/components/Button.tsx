import React from 'react'
import { FluidButton } from './FluidContainer/FluidBuiltComponents';

const Button = ({ children }: { children: React.ReactNode }) => {
    const navListFont: string = "17.6px calc(0.492vw + 16.123px) 24px";

    return (
        <FluidButton f-font-size={navListFont} className='bg-shade-2 px-14 py-1 rounded-[10px]'>
            {children}
        </FluidButton>
    );
}

export default Button;