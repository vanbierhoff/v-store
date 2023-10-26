export const STEP_FIRST = {
  stepName: 'first',
  stepHeader: 'Пробный этап',
  description: `Чтобы втянуться и полянть смысл, начнем с простой загадки. БЕШЕНОЕ ОНО, КТО ЖЕ ЭТО?`,
  win: {
    description: 'Поздравляю, ты угадала',
    whatNext: 'Нажми кнопочку и узнай, что будет дальше'
  },
  loose: {
    description: 'Мдя, попробуй ещё'
  },
  nextStep: 'two',
  prevStep: null
};


export const STEP_TWO = {
  stepName: 'searchDog',
  stepHeader: 'Теперь будет сложнее, ибо ты уже прошла первый этап',
  description: `ОНО поможет тебе найти ответ, стоит только попросить`,
  win: {
    description: 'Лучший в мире поисковик помог тебе, забери подарок',
    whatNext: 'Нажми кнопочку и узнай, что будет дальше'
  },
  loose: {
    description: 'Мдя, попробуй ещё'
  },
  nextStep: 'two',
  prevStep: null
};
