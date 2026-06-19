# Firebase Setup

Sign-up fails with `auth/api-key-not-valid` when Firebase credentials are missing, revoked, or from a deleted project.

## Quick fix

1. Open [Firebase Console](https://console.firebase.google.com/) and create or select your project.
2. **Project Settings → General → Your apps → Add app → Web** (</> icon).
3. Copy the `firebaseConfig` object values into a `.env` file (use `.env.example` as a template).
4. **Authentication → Sign-in method → Email/Password → Enable**.
5. **Firestore Database → Create database** (if you use Firestore).
6. Restart Expo: `npx expo start -c`

## Sync config with Firebase CLI (optional)

```bash
npx -y firebase-tools@latest login
npm run firebase:sync-config
```

This writes your active project's web SDK config into `.env`.

## Verify

After restarting the dev server, create an account on the Sign Up screen. You should no longer see `auth/api-key-not-valid`.
