import clsx from 'clsx';
import s from './Badge.module.scss';

export const Badge = ({ children, className }) => (
  <span className={clsx(s.Badge, className)}>{children}</span>
);
