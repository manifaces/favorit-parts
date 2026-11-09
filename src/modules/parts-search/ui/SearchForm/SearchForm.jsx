import { useId } from 'react';
import { Button, Input, SearchIcon } from '@/ui';
import s from './SearchForm.module.scss';

export const SearchForm = ({ value, onChange, onClear, onSubmit, error, disabled = false }) => {
  const id = useId();

  return (
    <form
      className={s.SearchForm}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}>
      <div className={s.SearchForm__field}>
        <label className={s.SearchForm__label} htmlFor={id}>
          Артикул
        </label>

        <Input
          id={id}
          name="article"
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder="Например, 01089"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
        />

        {error && <p className={s.SearchForm__error}>{error}</p>}
      </div>

      <Button type="submit" disabled={disabled} className={s.SearchForm__submit}>
        <SearchIcon />
        Найти деталь
      </Button>
    </form>
  );
};
