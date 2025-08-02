# Corrections d'Authentification Google - Best Health

## Problèmes corrigés

### 1. **Redirection après authentification Google**
- ✅ Ajout de redirections personnalisées vers l'app React Native
- ✅ Configuration des deep links avec le scheme `health://`
- ✅ Gestion des callbacks Google pour rediriger vers `/home`

### 2. **Gestion de la vérification d'email**
- ✅ Modification des URLs d'email pour rediriger vers l'app
- ✅ Configuration pour rediriger vers la page d'accueil après vérification
- ✅ Désactivation de la connexion automatique après vérification

### 3. **Flux d'inscription et connexion**
- ✅ Inscription Google → Redirection vers page de login
- ✅ Connexion Google → Redirection vers page d'accueil
- ✅ Connexion email/password → Redirection vers page d'accueil

## Modifications apportées

### Backend (`/backend/src/utils/auth.ts`)
```typescript
// Configuration des redirections personnalisées
emailVerification: {
  autoSignInAfterVerification: false, // Pas de connexion auto
  sendVerificationEmail: async ({ user, url }) => {
    // URL modifiée pour rediriger vers l'app
    const modifiedUrl = url.replace(
      'http://localhost:5000/api/auth/verify-email',
      'http://localhost:5000/api/auth/verify-email?redirect=health://home'
    );
    // ... envoi d'email
  }
}
```

### Serveur (`/backend/server.ts`)
```typescript
// Middleware pour intercepter les redirections
server.all("/api/auth/*", async (req, res, next) => {
  res.redirect = function(url: string) {
    if (req.path === '/api/auth/callback/google') {
      return originalRedirect.call(this, 'health://home?auth=success');
    } else if (req.path === '/api/auth/verify-email') {
      return originalRedirect.call(this, 'health://home?verified=true');
    }
    return originalRedirect.call(this, url);
  };
  return toNodeHandler(auth)(req, res, next);
});
```

### App React Native (`/health/app/_layout.tsx`)
```typescript
// Gestion des deep links
useEffect(() => {
  const handleDeepLink = (url: string) => {
    if (url.includes("auth=success")) {
      router.push("/home");
    } else if (url.includes("verified=true")) {
      router.push("/home");
    }
    // ...
  };
  // ...
}, [router]);
```

### Pages de connexion/inscription
- ✅ Correction des `callbackURL` pour utiliser le scheme `health://`
- ✅ Ajout de redirections appropriées après succès/erreur
- ✅ Amélioration de la gestion des états de chargement

## Configuration requise

### 1. Variables d'environnement
Assurez-vous d'avoir dans `/backend/.env` :
```env
GOOGLE_CLIENT_ID=votre_client_id
GOOGLE_CLIENT_SECRET=votre_client_secret
PORT=5000
```

### 2. Configuration Google OAuth
Dans la console Google Cloud :
- **URI de redirection autorisés** : `http://localhost:5000/api/auth/callback/google`
- **Origines JavaScript autorisées** : `http://localhost:5000`, `http://localhost:8081`

### 3. Deep Links (déjà configuré)
Le scheme `health://` est configuré dans `app.json` :
```json
{
  "expo": {
    "scheme": "health",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [{ "scheme": "health" }],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

## Test des corrections

### 1. Démarrer l'environnement
```bash
# Rendre le script exécutable
chmod +x start-dev.sh

# Démarrer les serveurs
./start-dev.sh
```

### 2. Tester l'inscription Google
1. Ouvrir l'app React Native
2. Aller sur "S'inscrire" → "Créer avec Google"
3. Sélectionner un compte Google
4. **Résultat attendu** : Redirection vers la page de login

### 3. Tester la connexion Google
1. Sur la page de login → "Se connecter avec Google"
2. Sélectionner un compte Google
3. **Résultat attendu** : Redirection vers la page d'accueil

### 4. Tester la vérification d'email
1. S'inscrire avec email/password
2. Vérifier l'email reçu
3. Cliquer sur le lien de vérification
4. **Résultat attendu** : Redirection vers la page d'accueil de l'app

## Flux d'authentification corrigé

```
Inscription Google:
User → Register Page → Google OAuth → Backend → Login Page

Connexion Google:
User → Login Page → Google OAuth → Backend → Home Page

Inscription Email:
User → Register Page → Email Verification → Home Page

Connexion Email:
User → Login Page → Backend → Home Page
```

## Dépannage

### Problème : "ERR_INVALID_URL" ou redirection échoue
- Vérifier que le serveur backend tourne sur le port 5000
- Vérifier que l'app React Native tourne sur le port 8081
- Vérifier la configuration des deep links dans `app.json`

### Problème : Google OAuth ne fonctionne pas
- Vérifier les variables d'environnement `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`
- Vérifier la configuration dans Google Cloud Console
- Vérifier que les URIs de redirection sont corrects

### Problème : Deep links ne fonctionnent pas
- Redémarrer l'app React Native après modification de `app.json`
- Vérifier que le scheme `health://` est bien configuré
- Tester manuellement avec : `npx uri-scheme open health://home --android` ou `--ios`

## Notes importantes

1. **Sécurité** : En production, remplacer `localhost` par vos domaines réels
2. **CORS** : La configuration CORS est définie pour `localhost:8081`
3. **Cookies** : Les cookies sont configurés pour fonctionner avec React Native
4. **Session** : Les sessions expirent après 3 jours par défaut

Les corrections permettent maintenant un flux d'authentification fluide entre votre app React Native et le backend Better Auth, avec des redirections appropriées pour chaque cas d'usage.