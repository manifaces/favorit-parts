import clsx from 'clsx';
import s from './IconButton.module.scss';

export const IconButton = ({
  children,
  variant = 'neutral',
  size = 44,
  className,
  disabled,
  type = 'button',
  ...rest
}) => (
  <button
    {...rest}
    type={type}
    disabled={disabled}
    className={clsx(s.IconButton, s[`IconButton_${variant}`], size === 36 && s.IconButton_sm, className)}>
    {children}
  </button>
);
