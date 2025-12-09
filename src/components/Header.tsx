import Container_Centered from "./Container";
import logo_Image from "../assets/কোড দুনিয়া.png";
import "../index.css";
import { FluidContainer } from "./FluidContainer/FluidBuiltComponents";
import Button from "./Button";
import { useEffect, useState } from "react";
import { convertToUnitlessPixels } from "./UtilityFunctions";
import FluidUL from "./FluidUL";

const Header = ({ setRef }: { setRef: (val: HTMLElement | null) => void }) => {
    const logo_cont_x: string = "14px calc(2.61vw + 6.15px) 48px";
    const logo_cont_y: string = "10px calc(0.385vw + 8.85px) 15px";
    const navListFont: string = "17.6px calc(0.492vw + 16.123px) 24px";
    const navUlMrLs: string = "30px 3vw 45px";
    const navUlGapLs: string = "24px 2vw 30px";
    const navUlGap: string = "12px 1vw 15px";

    const lsStartValue = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-ls').trim();

    const [isLs, setIsLs] = useState<boolean>(false);

    useEffect(() => {
        // window.innerWidth includes scrollbars, document.documentElement.clientWidth excludes them
        console.log(document.documentElement.clientWidth, convertToUnitlessPixels(lsStartValue));

        setIsLs((document.documentElement.clientWidth < convertToUnitlessPixels(lsStartValue)) ? false : true);

        const uponResize = () => {
            setIsLs((document.documentElement.clientWidth < convertToUnitlessPixels(lsStartValue)) ? false : true);
        };

        window.addEventListener('resize', uponResize);

        return () => window.removeEventListener('resize', uponResize);
    }, []);

    return (
        <header className="absolute top-0 w-full bg-shade-2 text-text-primary">
            <Container_Centered className="relative w-(--site-width) bg-primary">
                <nav
                    id="navbar"
                    ref={setRef}
                    className="flex w-full flex-wrap items-center z-10 relative"
                >
                    <FluidContainer
                        id="logoCont"
                        padding-left={logo_cont_x}
                        padding-right={logo_cont_x}
                        padding-top={logo_cont_y}
                        padding-bottom={logo_cont_y}
                        className="flex"
                    >
                        <FluidContainer
                            id="logo"
                            as="img"
                            src={logo_Image}
                            f-width="144px calc(3.3846vw + 133.845px) 188px"
                            f-height="40px calc(0.6154vw + 38.154px) 48px"
                        />
                    </FluidContainer>
                    <div id="spaceFiller" className="grow"></div>
                    <FluidContainer
                        as="label"
                        margin-right={logo_cont_x}
                        className="burger"
                    >
                        <input type="checkbox" />
                    </FluidContainer>
                    <FluidContainer f-font-size={navListFont} className="navbar-collapse-tailwind" id="collapsibleNavId">
                        <FluidUL LS={isLs} marginRight={navUlMrLs} gapLs={navUlGapLs} gap={navUlGap} className='navbar-nav-tailwind mb-4 ls:mb-0'>
                            <li className="nav-item-tailwind">
                                <FluidContainer as="a" f-font-size={navListFont} href="" className="nav-link-tailwind">
                                    হোম
                                </FluidContainer>
                            </li>
                            <li className="nav-item-tailwind">
                                <FluidContainer as="a" f-font-size={navListFont} href="" className="nav-link-tailwind">
                                    আমাদের কোর্সসমহ
                                </FluidContainer>
                            </li>
                            <li className="nav-item-tailwind">
                                <FluidContainer as="a" f-font-size={navListFont} href="" className="nav-link-tailwind">
                                    যোগাযোগ
                                </FluidContainer>
                            </li>
                            <li className="nav-item-tailwind">
                                <FluidContainer as="a" f-font-size={navListFont} href="" className="nav-link-tailwind">
                                    ক্যারিয়ার গাইডলাইন
                                </FluidContainer>
                            </li>
                        </FluidUL>
                        <FluidContainer padding-right={logo_cont_x}>
                            <Button>কোর্স দেখুন</Button>
                        </FluidContainer>
                    </FluidContainer>
                </nav>
            </Container_Centered>
        </header>
    );
};

export default Header;
