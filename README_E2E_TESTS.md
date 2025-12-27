# Tests End-to-End (E2E) - Système Leitner

## Description

Ce fichier contient les tests end-to-end complets pour l'application Leitner. Les tests couvrent l'ensemble du flux utilisateur, de l'inscription à la gestion des cartes et au système de quiz.

## Prérequis

1. **Base de données PostgreSQL** : Assurez-vous que PostgreSQL est en cours d'exécution
   ```bash
   docker-compose up -d
   ```

2. **Dépendances** : Installez supertest pour les tests HTTP
   ```bash
   npm install --save-dev supertest @types/supertest
   ```

3. **Variables d'environnement** : Créez un fichier `.env` avec :
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
   JWT_SECRET="your_secret_key"
   PORT=3000
   ```

## Structure des Tests

### 1. Student Authentication Flow
- ✅ Inscription d'un nouvel étudiant
- ✅ Vérification des doublons d'email
- ✅ Connexion avec identifiants corrects
- ✅ Rejet des identifiants incorrects
- ✅ Récupération du profil avec token valide
- ✅ Rejet sans token d'authentification

### 2. Card Management Flow
- ✅ Création d'une nouvelle carte
- ✅ Vérification de l'authentification requise
- ✅ Liste de toutes les cartes de l'étudiant
- ✅ Filtrage des cartes par tags

### 3. Quiz and Answer Flow
- ✅ Récupération des cartes du quiz
- ✅ Réponse correcte → progression de catégorie (FIRST → SECOND)
- ✅ Réponse incorrecte → retour à FIRST
- ✅ Progression complète à travers toutes les catégories jusqu'à DONE
- ✅ Exclusion des cartes DONE du quiz

### 4. Authorization Tests
- ✅ Interdiction de répondre aux cartes d'un autre étudiant

## Exécution des Tests

### Lancer tous les tests
```bash
npm test
```

### Lancer uniquement les tests E2E
```bash
npm test src/tests/e2e
```

### Lancer en mode watch
```bash
npm test -- --watch
```

### Lancer avec couverture
```bash
npm test -- --coverage
```

## Scénarios Testés

### Scénario Complet du Système Leitner

1. **Inscription et Authentification**
   - Un étudiant s'inscrit avec email/password
   - L'étudiant se connecte et reçoit un JWT token
   - Le token est utilisé pour toutes les requêtes authentifiées

2. **Création de Cartes**
   - L'étudiant crée plusieurs cartes avec questions/réponses
   - Chaque carte commence en catégorie FIRST
   - Les cartes peuvent avoir des tags pour l'organisation

3. **Système de Quiz**
   - L'étudiant récupère les cartes du quiz du jour
   - Les cartes sont filtrées selon leur catégorie et date de dernière réponse
   - Les cartes DONE n'apparaissent pas dans le quiz

4. **Progression des Cartes**
   - Réponse correcte : FIRST → SECOND → THIRD → ... → DONE
   - Réponse incorrecte : retour à FIRST (peu importe la catégorie actuelle)
   - La date de dernière réponse est mise à jour

5. **Sécurité**
   - Les étudiants ne peuvent accéder qu'à leurs propres cartes
   - Les tokens invalides sont rejetés
   - Les requêtes non authentifiées sont bloquées

## Notes Techniques

- **Supertest** : Utilisé pour simuler les requêtes HTTP sans démarrer le serveur
- **Vitest** : Framework de test avec support TypeScript natif
- **Nettoyage** : La base de données est nettoyée avant et après les tests
- **Isolation** : Chaque test est indépendant et peut être exécuté séparément

## Maintenance

Pour ajouter de nouveaux tests :
1. Suivez la structure existante avec `describe` et `it`
2. Utilisez `beforeAll` pour la configuration
3. Utilisez `afterAll` pour le nettoyage
4. Assurez-vous que les tests sont indépendants
5. Vérifiez les codes de statut HTTP appropriés

## Dépannage

### Erreur de connexion à la base de données
- Vérifiez que PostgreSQL est en cours d'exécution
- Vérifiez la variable `DATABASE_URL` dans `.env`

### Tests qui échouent de manière intermittente
- Assurez-vous que la base de données est nettoyée entre les tests
- Vérifiez qu'il n'y a pas de dépendances entre les tests

### Erreurs de timeout
- Augmentez le timeout dans la configuration Vitest
- Vérifiez que la base de données répond rapidement

