import * as React from 'react';

export interface TopOverlayProps {
    style: Object;
    // children: PropTypes.node,
}

class TopOverlay extends React.Component<TopOverlayProps, {}> {
    render() {
        const {
            style,
            children,
        } = this.props;

        return (
            <div
                style={{
                    color: 'white',
                    background: 'linear-gradient(rgba(85, 85, 85, 0.5), transparent)',
                    ...style,
                }}
            >
                {children}
            </div>
        );
    }
}

export default TopOverlay;
