# favorit-parts-search

Клиентское приложение для поиска автозапчастей по артикулу, выбора производителя и просмотра оригинальных деталей, аналогов и предложений складов.

## Разработка

### Стек

- React
- JavaScript/JSX
- Redux Toolkit
- React Redux
- Vite
- SCSS Modules
- ESLint, Stylelint, Prettier
- Husky, lint-staged

### Особенности реализации

`src/main.jsx` — точка входа и подключение Redux Provider.

`src/app/app.jsx` — корневой компонент приложения.

`src/app/store.js` — настройка единого Redux-store.

`src/ui/` — общие компоненты интерфейса.

`src/styles/` — reset, токены оформления, глобальные стили и локальные шрифты Golos.

`vite.config.js` — конфигурация Vite, алиасы и поддержка SVG через `?react`.

`index.html` — HTML-точка входа приложения.

`public/` — статические ресурсы.

Границы ответственности: `modules` — функциональные модули и преобразование данных товаров и складов; `services` — HTTP-запросы, проверка ответов и ошибки API.

Стили компонентов изолируются через CSS Modules. Husky и lint-staged запускают проверки изменённых файлов перед коммитом.

### Переменные окружения

Создайте `.env.local` на основе `.env.example`:

```ini
VITE_FAVORIT_API_URL=https://api.favorit-parts.ru/hs/hsprice/
VITE_FAVORIT_API_KEY=00000000-0000-0000-0000-000000000001
```

В примере указан ключ из опубликованной документации API. Файл `.env.local` исключён из Git.

### Команды

Все команды выполняются из корня репозитория.

Требуются Node.js 20.19+ или 22.12+ и Yarn 4.5.0. Версия Yarn закреплена в `packageManager`.

#### `yarn install`

Устанавливает зависимости в `node_modules` и настраивает Husky.

#### `yarn dev`

Запускает приложение в dev-режиме на [http://localhost:5173](http://localhost:5173) или ближайшем свободном порту. Изменения в коде применяются автоматически.

#### `yarn build`

Собирает приложение в production-режиме. Результат помещается в каталог `dist`: `index.html` и ресурсы в `assets/`.

#### `yarn preview`

Запускает локальный сервер для предварительного просмотра собранной версии из каталога `dist`.

#### `yarn eslint`

Проверяет JavaScript и JSX.

#### `yarn stylelint`

Проверяет CSS и SCSS.

#### `yarn prettier`

Запускает CLI Prettier. Команда `yarn prettier --check .` проверяет форматирование, `yarn prettier --write .` исправляет его.
