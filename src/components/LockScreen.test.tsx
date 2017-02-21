import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import LockScreen, { LockScreenProps } from './LockScreen';
import ClockDisplay from './ClockDisplay';
import SlideToUnlock from './SlideToUnlock';
import TopOverlay from './TopOverlay';

describe('LockScreen', () => {
    let props: LockScreenProps;

    // tslint:disable-next-line:no-any
    let mountedLockScreen: ReactWrapper<any, {}> | undefined;

    const getLockScreen = () => {
        if (!mountedLockScreen) {
            mountedLockScreen = mount(
                <LockScreen {...props} />
            );
        }
        return mountedLockScreen;
    };

    beforeEach(() => {
        props = {
            // wallpaperPath: undefined,
            // userInfoMessage: undefined,
            onUnlocked: undefined,
        };
        mountedLockScreen = undefined;
    });

    it('always renders a div', () => {
        const divs = getLockScreen().find('div');
        expect(divs.length).toBeGreaterThan(0);
    });

    describe('the rendered div', () => {
        it('contains everything else that gets rendered', () => {
            const divs = getLockScreen().find('div');
            // When using .find, enzyme arranges the nodes in order such
            // that the outermost node is first in the list. So we can
            // use .first() to get the outermost div.
            const wrappingDiv = divs.first();

            // Enzyme omits the outermost node when using the .children()
            // method on getLockScreen(). This is annoying, but we can use it
            // to verify that wrappingDiv contains everything else this
            // component renders.
            expect(wrappingDiv.children()).toEqual(getLockScreen().children());
        });
    });

    it('always renders a `ClockDisplay`', () => {
        expect(getLockScreen().find(ClockDisplay).length).toBe(1);
    });

    describe('rendered `ClockDisplay`', () => {
        it('does not receive any props', () => {
            const clockDisplay = getLockScreen().find(ClockDisplay);
            expect(Object.keys(clockDisplay.props()).length).toBe(0);
        });
    });

    it('always renders a `SlideToUnlock`', () => {
        expect(getLockScreen().find(SlideToUnlock).length).toBe(1);
    });

    describe('when `onUnlocked` is defined', () => {
        beforeEach(() => {
            props.onUnlocked = jest.fn();
        });

        it('sets the rendered `SlideToUnlock`\'s `onSlide` prop to the same value as `onUnlocked`\'', () => {
            const slideToUnlock = getLockScreen().find(SlideToUnlock);
            expect(slideToUnlock.props().onSlide).toBe(props.onUnlocked);
        });
    });

    describe('when `onUnlocked` is undefined', () => {
        beforeEach(() => {
            props.onUnlocked = undefined;
        });

        it('sets the rendered `SlideToUnlock`\'s `onSlide` prop to undefined\'', () => {
            const slideToUnlock = getLockScreen().find(SlideToUnlock);
            expect(slideToUnlock.props().onSlide).not.toBeDefined();
        });
    });

    describe('when `wallpaperPath` is passed', () => {
        beforeEach(() => {
            props.wallpaperPath = 'some/image.png';
        });

        it('applies that wallpaper as a background-image on the wrapping div', () => {
            const wrappingDiv = getLockScreen().find('div').first();
            expect(wrappingDiv.props().style!.backgroundImage).toBe(`url(${props.wallpaperPath})`);
        });
    });

    describe('when `userInfoMessage` is passed', () => {
        beforeEach(() => {
            props.userInfoMessage = 'This is my favorite phone!';
        });

        it('renders a `TopOverlay`', () => {
            expect(getLockScreen().find(TopOverlay).length).toBe(1);
        });

        it('passes `userInfoMessage` to the rendered `TopOverlay` as `children`', () => {
            const topOverlay = getLockScreen().find(TopOverlay);
            expect((topOverlay.props() as any).children).toBe(props.userInfoMessage);
        });
    });

    describe('when `userInfoMessage` is undefined', () => {
        beforeEach(() => {
            props.userInfoMessage = undefined;
        });

        it('does not render a `TopOverlay`', () => {
            expect(getLockScreen().find(TopOverlay).length).toBe(0);
        });
    });
});