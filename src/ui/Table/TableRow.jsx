import clsx from 'clsx';
import s from './Table.module.scss';

export const TableRow = ({ children, className, ...rest }) => (
  <tr {...rest} className={clsx(s.TableRow, className)}>
    {children}
  </tr>
);
