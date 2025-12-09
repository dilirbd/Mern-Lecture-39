
import { loremIpsum } from 'lorem-ipsum';
import Container_centered from './Container';

const MainContainer = ({ topMargin }: { topMargin?: string }) => {
    const loremText = loremIpsum({
        count: 10,
        units: 'paragraphs',
        paragraphLowerBound: 3,
        paragraphUpperBound: 8,
        sentenceLowerBound: 5,
        sentenceUpperBound: 15,
    });

    return (
        <Container_centered className="relative w-(--site-width)">
            <div className='h-screen relative w-full bg-amber-500 pt-8 mt-[60px]' style={{ marginTop: topMargin, }}>
                {loremText}
            </div>
        </Container_centered>
    );
}

export default MainContainer;