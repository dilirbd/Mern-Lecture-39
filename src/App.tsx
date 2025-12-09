import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import { convertToUnitlessPixels } from './components/UtilityFunctions';
import MainContainer from './components/MainContainer';


const App = () => {

    let navbarHeightWithUnit = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height').trim();

    const [navbarHeight, setNavbarHeight] = useState<number>(convertToUnitlessPixels(navbarHeightWithUnit));
    const navbarRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (navbarRef.current) {
            const uponResizeNavHeight = () => {
                setNavbarHeight(convertToUnitlessPixels(`${navbarRef.current?.offsetHeight}${navbarRef.current ? 'px' : ''}`));

                console.log(`HEIGHT: ${navbarRef.current?.offsetHeight}`);
            };

            setNavbarHeight(convertToUnitlessPixels(`${navbarRef.current?.offsetHeight}${navbarRef.current ? 'px' : ''}`));
            console.log(`HEIGHT: ${navbarRef.current?.offsetHeight}`);

            window.addEventListener('resize', uponResizeNavHeight);

            return () => window.removeEventListener('resize', uponResizeNavHeight);
        }
    }, [navbarRef.current]);

    return (
        <main className='font-site-lang'>
            <Header setRef={(refVal: HTMLElement | null) => navbarRef.current = refVal} />
            <MainContainer topMargin={`${navbarHeight}px`} />
        </main>
    )
}

export default App;
