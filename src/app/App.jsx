import { PartsSearch } from '@/modules';
import { ContentBox } from '@/ui';
import s from './App.module.scss';

export const App = () => (
  <main className={s.App}>
    <ContentBox className={s.App__content}>
      <header className={s.App__header}>
        <p className={s.App__brand}>Favorit Parts</p>
        <h1 className={s.App__title}>Поиск автозапчастей</h1>
        <p className={s.App__description}>Найдите деталь по артикулу и сравните предложения складов.</p>
      </header>

      <PartsSearch />
    </ContentBox>
  </main>
);
