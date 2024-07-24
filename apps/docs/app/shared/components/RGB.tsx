import type { FC } from 'react';
const { classNames } = require('@telegram-apps/sdk-react')

export type RGBProps = JSX.IntrinsicElements['div'] & {
    color: any;
};

export const RGB: FC<RGBProps> = ({ color, className, ...rest }) => (
    <span {...rest} className={classNames('rgb', className)}>
        <i className='rgb__icon' style={{ backgroundColor: color }} />
        {color}
    </span>
);
