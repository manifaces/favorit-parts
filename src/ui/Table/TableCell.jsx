import clsx from 'clsx';
import s from './Table.module.scss';

export const TableCell = ({ children, header = false, align = 'left', className, ...rest }) => {
  const Cell = header ? 'th' : 'td';

  return (
    <Cell
      {...rest}
      className={clsx(s.TableCell, header && s.TableCell_header, s[`TableCell_${align}`], className)}>
      {children}
    </Cell>
  );
};
