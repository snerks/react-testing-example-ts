import * as React from 'react';

import ClockDisplay from './ClockDisplay';
import SlideToUnlock from './SlideToUnlock';
import TopOverlay from './TopOverlay';

export interface LockScreenProps {
    onUnlocked?: Function;
    wallpaperPath?: string;
    userInfoMessage?: string;
}

class LockScreen extends React.Component<LockScreenProps, {}> {
    render() {
        const { wallpaperPath, userInfoMessage } = this.props;

        return (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    backgroundImage: wallpaperPath ? `url(${wallpaperPath})` : '',
                    backgroundColor: 'black',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <ClockDisplay />

                {userInfoMessage && <TopOverlay
                    style={{
                        padding: '2em',
                        marginBottom: 'auto',
                    }}
                >{userInfoMessage}
                </TopOverlay>}

                <SlideToUnlock onSlide={this.props.onUnlocked} />
            </div>
        );
    }
}

export default LockScreen;
