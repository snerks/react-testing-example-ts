import * as React from 'react';

export interface ClockDisplayProps {
}

export interface ClockState {
    now: Date;
}

class ClockDisplay extends React.Component<ClockDisplayProps, ClockState> {

    updateInterval: any;

    constructor(props: ClockDisplayProps) {
        super(props);
        this.state = {
            now: new Date(),
        };
    }

    updateTime = () => {
        this.setState({ now: new Date() });
    }

    componentDidMount() {
        this.updateInterval = setInterval(this.updateTime, 500);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    render() {
        const { now } = this.state;

        return (
            <div
                style={{
                    color: 'white',
                    backgroundColor: 'rgba(55, 55, 55, 0.5)',
                    fontSize: '48px',
                    height: '2em',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {now.toTimeString().slice(0, 8)}
            </div>
        );
    }
}

export default ClockDisplay;
