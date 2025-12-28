# Leitner Frontend

Application frontend pour le système de répétition espacée Leitner, développée avec React, TypeScript et Vite.

## Architecture

Ce projet suit les principes de **Clean Architecture** et **Hexagonal Architecture** (Ports & Adapters), organisant le code en couches distinctes :

```
frontend/src/
├── domain/              # Couche domaine (entités, interfaces)
│   ├── entities/        # Entités métier (Card, Category)
│   └── repositories/    # Interfaces de repositories
├── application/         # Couche application (services, use cases)
│   └── services/        # Services applicatifs (CardService)
├── infrastructure/      # Couche infrastructure (implémentations techniques)
│   └── http/            # Client HTTP (apiClient)
├── adapters/            # Adapters (implémentations des repositories)
│   └── repositories/    # Repositories API (CardApiRepository)
├── presentation/        # Couche présentation (UI React)
│   ├── components/      # Composants React
│   │   ├── ui/          # Composants UI réutilisables (Button, Input)
│   │   └── features/    # Composants fonctionnels (CardDisplay, QuizCard)
│   ├── pages/           # Pages de l'application
│   ├── hooks/           # Hooks React personnalisés (useCards, useQuiz)
│   ├── contexts/        # Contextes React (CardServiceContext)
│   └── router/          # Configuration du routing
└── shared/              # Code partagé
    └── constants/       # Constantes (strings, messages)
```

## Technologies

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **React Router** - Routing
- **Axios** - Client HTTP
- **CSS Modules** - Styles encapsulés
- **Vitest** - Tests unitaires

## Démarrage

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install
```

### Configuration

Créez un fichier `.env` à la racine du frontend :

```env
VITE_API_URL=http://localhost:3000
```

Par défaut, l'API est configurée sur `http://localhost:3000`.

### Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173` (ou le port affiché dans le terminal).

### Build

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Preview

```bash
npm run preview
```

## Structure du code

### Domain (Domaine métier)

Contient les entités et interfaces du domaine :

- `entities/Card.ts` - Entité Card et CardUserData
- `entities/Category.ts` - Enum Category
- `repositories/ICardRepository.ts` - Interface du repository de cartes

### Application (Logique applicative)

Contient les services applicatifs qui orchestrent la logique métier :

- `services/CardService.ts` - Service pour gérer les cartes

### Infrastructure (Implémentations techniques)

Contient les implémentations techniques :

- `http/apiClient.ts` - Client HTTP Axios configuré

### Adapters (Adaptateurs)

Contient les implémentations concrètes des repositories :

- `repositories/CardApiRepository.ts` - Implémentation du repository utilisant l'API

### Presentation (Interface utilisateur)

Contient toute la couche présentation React :

#### Composants UI

- `components/ui/Button.tsx` - Bouton réutilisable
- `components/ui/Input.tsx` - Input réutilisable (texte et textarea)

#### Composants fonctionnels

- `components/features/CardDisplay.tsx` - Affichage d'une carte
- `components/features/QuizCard.tsx` - Carte de quiz interactive

#### Pages

- `pages/HomePage.tsx` - Page d'accueil
- `pages/MyCardsPage.tsx` - Liste et création de cartes
- `pages/QuizPage.tsx` - Quiz du jour
- `pages/HistoryPage.tsx` - Historique des quiz

#### Hooks

- `hooks/useCards.ts` - Hook pour gérer les cartes
- `hooks/useQuiz.ts` - Hook pour gérer le quiz

#### Contextes

- `contexts/CardServiceContext.tsx` - Injection de dépendances pour CardService

#### Router

- `router/AppRouter.tsx` - Configuration des routes

### Shared

- `constants/strings.ts` - Constantes de chaînes de caractères (UI, erreurs)

## Communication avec le backend

Le frontend communique avec le backend via l'API REST définie dans le contrat OpenAPI :

### Endpoints utilisés

- `GET /cards` - Récupérer toutes les cartes
- `POST /cards` - Créer une nouvelle carte
- `GET /cards/quizz` - Récupérer les cartes du quiz du jour
- `PATCH /cards/:cardId/answer` - Répondre à une carte

### Format des données

**Card** :
```typescript
{
  id: string;
  question: string;
  answer: string;
  tag?: string;
  category: Category;
}
```

**CardUserData** (pour création) :
```typescript
{
  question: string;
  answer: string;
  tag?: string;
}
```

## 🎨 Styles

Les styles sont organisés avec **CSS Modules**, un fichier CSS par composant :

- `Button.css` - Styles du bouton
- `Input.css` - Styles de l'input
- `CardDisplay.css` - Styles de l'affichage de carte
- `QuizCard.css` - Styles de la carte de quiz
- `HomePage.css`, `MyCardsPage.css`, etc. - Styles des pages

## Tests

```bash
# Lancer les tests
npm run test

```

## Principes de développement

### Clean Code

- **Noms explicites** : Variables et fonctions avec des noms clairs
- **Pas de magic strings** : Toutes les chaînes dans `shared/constants/strings.ts`
- **Pas de types `any`** : TypeScript strict partout
- **Pas de commentaires** : Code auto-documenté

### SOLID

- **Single Responsibility** : Chaque classe/composant a une seule responsabilité
- **Dependency Inversion** : Dépendances via interfaces (Context API)

### Architecture Hexagonale

- **Séparation des couches** : Domain, Application, Infrastructure, Presentation
- **Inversion de dépendances** : Le domain ne dépend pas de l'infrastructure
- **Ports & Adapters** : Interfaces (ports) et implémentations (adapters)

## Flux de données

### Création d'une carte

```
MyCardsPage (UI)
    ↓ handleCreateCard()
useCards (Hook)
    ↓ createCard(data)
CardService (Service)
    ↓ createCard(data)
CardApiRepository (Adapter)
    ↓ post('/cards', data)
ApiClient (HTTP)
    ↓ axios.post()
Backend API
```

### Injection de dépendances

Le `CardService` est injecté via React Context (`CardServiceContext`) pour permettre :

- Testabilité
- Réutilisabilité
- Découplage

## Résolution de problèmes

### L'API ne répond pas

Vérifiez que :
- Le backend est démarré sur `http://localhost:3000`
- La variable d'environnement `VITE_API_URL` est correctement configurée

## Licence

Ce projet fait partie du système Leitner.

