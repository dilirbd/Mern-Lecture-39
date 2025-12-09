import React from 'react'
import { FluidContainer } from './FluidContainer/FluidBuiltComponents';

const FluidUL = ({ LS, marginRight, gapLs, gap, className, children }: { LS?: boolean, marginRight?: string, gapLs?: string, gap?: string, className?: string, children: React.ReactNode }) => {
    const navUlGap: string | boolean = gap || false;
    const navUlGapLs: string | boolean = gapLs || false;
    const navUlMrLs: string | boolean = marginRight || false;

    return (
        <FluidContainer margin-right={LS ? navUlMrLs : false} f-gap={LS ? navUlGapLs : navUlGap} className={className}>
            {children}
        </FluidContainer>
    );
};

export default FluidUL;