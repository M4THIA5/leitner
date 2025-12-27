export const UI_STRINGS = {
  NO_TAG: 'Sans tag',
  HIDDEN_ANSWER_PLACEHOLDER: '••••••••',
  QUESTION_LABEL: 'Question:',
  ANSWER_LABEL: 'Réponse:',
  SHOW_ANSWER: '👁️ Afficher',
  HIDE_ANSWER: '👁️ Masquer',
  DELETE_BUTTON: 'Supprimer',
  SUBMIT_BUTTON: 'Valider',
  NEXT_BUTTON: 'Suivant',
  FORCE_VALIDATE_BUTTON: 'Forcer la validation',
  CORRECT_ANSWER: 'Correct !',
  INCORRECT_ANSWER: 'Incorrect',
  EXPECTED_ANSWER_LABEL: 'Réponse attendue:',
} as const;

export const ERROR_MESSAGES = {
  LOAD_CARDS: 'Erreur lors du chargement des cartes',
  CREATE_CARD: 'Erreur lors de la création de la carte',
  LOAD_QUIZ: 'Erreur lors du chargement du quiz',
  ANSWER_CARD: 'Erreur lors de l\'envoi de la réponse',
  CARD_SERVICE_NOT_FOUND: 'useCardService must be used within CardServiceProvider',
} as const;

