import clsx from 'clsx';
import { Badge, ChevronDownIcon, ChevronUpIcon, Table, TableCell, TableRow } from '@/ui';
import { formatOrderDeadline, formatPrice, formatShipmentDate, formatStock } from '../../lib';
import s from './OffersTable.module.scss';

export const OffersTable = ({ rows, sort, onSortChange }) => {
  const direction = sort.direction === 'asc' ? 'ascending' : 'descending';

  return (
    <Table className={s.OffersTable} aria-label="Предложения деталей и аналогов">
      <thead className={s.OffersTable__head}>
        <TableRow>
          <TableCell header scope="col" className={s.OffersTable__detail}>
            Деталь
          </TableCell>

          <TableCell header scope="col" className={s.OffersTable__warehouse}>
            Склад
          </TableCell>

          <TableCell
            header
            scope="col"
            align="right"
            aria-sort={sort.field === 'stock' ? direction : 'none'}
            className={s.OffersTable__stock}>
            <button type="button" className={s.OffersTable__sort} onClick={() => onSortChange('stock')}>
              Остаток
              <span
                className={clsx(
                  s['OffersTable__sort-icons'],
                  sort.field === 'stock' && s[`OffersTable__sort-icons_${sort.direction}`]
                )}>
                <ChevronUpIcon />
                <ChevronDownIcon />
              </span>
            </button>
          </TableCell>

          <TableCell header scope="col" className={s.OffersTable__shipment}>
            Отгрузка
          </TableCell>

          <TableCell
            header
            scope="col"
            align="right"
            aria-sort={sort.field === 'price' ? direction : 'none'}
            className={s.OffersTable__price}>
            <button type="button" className={s.OffersTable__sort} onClick={() => onSortChange('price')}>
              Цена
              <span
                className={clsx(
                  s['OffersTable__sort-icons'],
                  sort.field === 'price' && s[`OffersTable__sort-icons_${sort.direction}`]
                )}>
                <ChevronUpIcon />
                <ChevronDownIcon />
              </span>
            </button>
          </TableCell>
        </TableRow>
      </thead>

      <tbody>
        {rows.map((row) => {
          const { product, kind, warehouse } = row;
          const deadline = formatOrderDeadline(warehouse?.shipmentDate);

          return (
            <TableRow key={row.id} className={s.OffersTable__row}>
              <TableCell className={s.OffersTable__detail}>
                <div className={s.OffersTable__identity}>
                  <span>
                    {product.brand || '—'} · {product.number || '—'}
                  </span>
                  {kind === 'analogue' && <Badge>Аналог</Badge>}
                </div>

                <p className={s.OffersTable__name}>{product.name || 'Название не указано'}</p>

                {product.notRefund && <p className={s.OffersTable__return}>Не подлежит возврату</p>}
              </TableCell>

              <TableCell className={s.OffersTable__warehouse}>
                {warehouse ? (
                  <>
                    <span className={s.OffersTable__prefix}>Склад </span>
                    {warehouse.code || 'Не указан'}

                    {warehouse.notRefund && <span className={s.OffersTable__return}>Без возврата</span>}
                  </>
                ) : (
                  'Предложения отсутствуют'
                )}
              </TableCell>

              <TableCell align="right" className={s.OffersTable__stock}>
                <span className={s.OffersTable__prefix}>Остаток: </span>
                {formatStock(warehouse?.stock)}
              </TableCell>

              <TableCell className={s.OffersTable__shipment}>
                <span className={s.OffersTable__prefix}>Отгрузка: </span>
                {warehouse ? formatShipmentDate(warehouse.shipmentDate) : '—'}

                {deadline && <span className={s.OffersTable__deadline}>{deadline}</span>}
              </TableCell>

              <TableCell align="right" className={s.OffersTable__price}>
                {formatPrice(warehouse?.price)}
              </TableCell>
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
};
