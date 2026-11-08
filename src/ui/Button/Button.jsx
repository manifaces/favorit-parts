import clsx from 'clsx';
import s from './Button.module.scss';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  disabled,
  type = 'button',
  ...rest
}) => (
  <button
    {...rest}
    type={type}
    disabled={disabled}
    className={clsx(s.Button, s[`Button_${variant}`], size === 'small' && s.Button_small, className)}>
    {children}
  </button>
);
