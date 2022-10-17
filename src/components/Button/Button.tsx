import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import './styles.scss';

type Size = 'l' | 'm' | 's';

type Type = 'secondary' | 'primary';

type ButtonProps = {
  children: ReactNode,
  // eslint-disable-next-line react/no-unused-prop-types
  icon?: ReactNode,
  disabled?: boolean,
  size?: Size,
  type?: Type,
  classes?: string,
}

const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  size = 'm',
  type = 'primary',
  classes = '',
}: ButtonProps) => {
  const baseClassName = 'button-common';

  const btnClassNames = cx(
    {
      [baseClassName]: true,
      [`${baseClassName}_${type}`]: true,
      [`${baseClassName}_${size}`]: true,
      [`${baseClassName}_disabled`]: disabled,
    },
    classes,
  );

  return (
    <button
      type="button"
      className={btnClassNames}
    >
      { children }
    </button>
  );
};

export default Button;
