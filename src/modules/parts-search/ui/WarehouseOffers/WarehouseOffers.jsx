import { useState } from 'react';
import { pluralize } from '@/shared';
import { Button, ChevronDownIcon, ChevronUpIcon, Table, TableCell, TableRow } from '@/ui';
import { formatOrderDeadline, formatPrice, formatShipmentDate, formatStock } from '../../lib';
import s from './WarehouseOffers.module.scss';

export const WarehouseOffers = ({ warehouses = [] }) => {
  const [expanded, setExpanded] = useState(false);

  const remaining = warehouses.length - 3;
  const offerWord = pluralize(remaining, 'предложение', 'предложения', 'предложений');

  if (warehouses.length === 0) {
    return <p className={s.WarehouseOffers__empty}>Предложения по складам отсутствуют</p>;
  }

  return (
    <div className={s.WarehouseOffers}>
      <Table className={s.WarehouseOffers__table} aria-label="Складские предложения">
        <thead className={s.WarehouseOffers__head}>
          <TableRow>
            <TableCell header scope="col" className={s.WarehouseOffers__warehouse}>
              Склад
            </TableCell>

            <TableCell header scope="col" align="right" className={s.WarehouseOffers__stock}>
              Остаток
            </TableCell>

            <TableCell header scope="col" className={s.WarehouseOffers__shipment}>
              Отгрузка
            </TableCell>

            <TableCell header scope="col" align="right" className={s.WarehouseOffers__price}>
              Цена
            </TableCell>
          </TableRow>
        </thead>

        <tbody>
          {(expanded ? warehouses : warehouses.slice(0, 3)).map((warehouse, index) => {
            const deadline = formatOrderDeadline(warehouse.shipmentDate);

            return (
              <TableRow key={index} className={s.WarehouseOffers__row}>
                <TableCell className={s.WarehouseOffers__warehouse}>
                  <span className={s.WarehouseOffers__prefix}>Склад </span>
                  {warehouse.code || 'Не указан'}

                  {warehouse.notRefund && <span className={s.WarehouseOffers__return}>Без возврата</span>}
                </TableCell>

                <TableCell align="right" className={s.WarehouseOffers__stock}>
                  <span className={s.WarehouseOffers__prefix}>Остаток: </span>
                  {formatStock(warehouse.stock)}
                </TableCell>

                <TableCell className={s.WarehouseOffers__shipment}>
                  <span className={s.WarehouseOffers__prefix}>Отгрузка: </span>
                  {formatShipmentDate(warehouse.shipmentDate)}

                  {deadline && <span className={s.WarehouseOffers__deadline}>{deadline}</span>}
                </TableCell>

                <TableCell align="right" className={s.WarehouseOffers__price}>
                  {formatPrice(warehouse.price)}
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>

      {remaining > 0 && (
        <Button
          variant="outlined"
          className={s.WarehouseOffers__toggle}
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {expanded ? 'Свернуть предложения' : `Показать ещё ${remaining} ${offerWord}`}
        </Button>
      )}
    </div>
  );
};
