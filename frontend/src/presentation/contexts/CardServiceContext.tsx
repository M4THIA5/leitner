import React, { createContext, useContext, ReactNode } from 'react';
import { CardService } from '@/application/services/CardService';
import { CardApiRepository } from '@/adapters/repositories/CardApiRepository';
import { ERROR_MESSAGES } from '@/shared/constants/strings';

const cardServiceInstance = new CardService(new CardApiRepository());

const CardServiceContext = createContext<CardService | null>(null);

interface CardServiceProviderProps {
  children: ReactNode;
}

export function CardServiceProvider({ children }: CardServiceProviderProps) {
  return (
    <CardServiceContext.Provider value={cardServiceInstance}>
      {children}
    </CardServiceContext.Provider>
  );
}

export function useCardService(): CardService {
  const context = useContext(CardServiceContext);
  if (!context) {
    throw new Error(ERROR_MESSAGES.CARD_SERVICE_NOT_FOUND);
  }
  return context;
}

