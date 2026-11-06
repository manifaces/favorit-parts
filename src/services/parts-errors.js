export const DEFAULT_ERROR_MESSAGE = 'Не удалось загрузить данные. Попробуйте ещё раз';

const apiMessages = {
  'Empty number goods!': 'Укажите артикул детали',
  'Missing brand': 'Выберите производителя',
  'Request quota exceeded!': 'Превышен лимит запросов. Попробуйте позже'
};

export const getPartsErrorMessage = (error) => apiMessages[error?.message] ?? DEFAULT_ERROR_MESSAGE;
