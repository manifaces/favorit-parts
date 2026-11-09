import { ArrowLeftIcon, ArrowRightIcon, IconButton } from '@/ui';
import s from './ResultsPagination.module.scss';

export const ResultsPagination = ({ page, pageSize, total, onPageChange }) => {
  if (total === 0) return null;

  const pageCount = Math.ceil(total / pageSize);
  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);

  return (
    <nav className={s.ResultsPagination} aria-label="Страницы результатов">
      <p className={s.ResultsPagination__range}>
        Показано {first}–{last} из {total}
      </p>

      <div className={s.ResultsPagination__controls}>
        <IconButton
          aria-label="Предыдущая страница"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}>
          <ArrowLeftIcon />
        </IconButton>

        <span className={s.ResultsPagination__current}>
          {page} / {pageCount}
        </span>

        <IconButton
          aria-label="Следующая страница"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}>
          <ArrowRightIcon />
        </IconButton>
      </div>
    </nav>
  );
};
