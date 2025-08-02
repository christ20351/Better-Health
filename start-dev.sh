#!/bin/bash

# Script pour démarrer l'environnement de développement

echo "🚀 Démarrage de l'environnement de développement Best Health..."

# Démarrer le serveur backend
echo "📡 Démarrage du serveur backend..."
cd backend && npm run dev &
BACKEND_PID=$!

# Attendre que le backend démarre
sleep 3

# Démarrer l'app React Native
echo "📱 Démarrage de l'app React Native..."
cd ../health && npx expo start &
EXPO_PID=$!

echo "✅ Environnement démarré!"
echo "🔗 Backend: http://localhost:5000"
echo "📱 App: http://localhost:8081"
echo ""
echo "Pour arrêter les serveurs, appuyez sur Ctrl+C"

# Fonction pour nettoyer les processus à l'arrêt
cleanup() {
    echo "🛑 Arrêt des serveurs..."
    kill $BACKEND_PID 2>/dev/null
    kill $EXPO_PID 2>/dev/null
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre indéfiniment
wait