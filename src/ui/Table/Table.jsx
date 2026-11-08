import clsx from 'clsx';
import s from './Table.module.scss';

export const Table = ({ children, className, ...rest }) => (
  <table {...rest} className={clsx(s.Table, className)}>
    {children}
  </table>
);
