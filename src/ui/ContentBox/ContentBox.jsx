import clsx from 'clsx';
import s from './ContentBox.module.scss';

export const ContentBox = ({ children, className }) => {
  return <div className={clsx(s.ContentBox, className)}>{children}</div>;
};
