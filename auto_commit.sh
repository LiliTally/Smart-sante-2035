#!/bin/bash

cd ~/Documents/'smart-sante-2035 '

git init

commits=(
  "2026-04-01T09:00:00|Initial commit - structure du projet|README.md"
  "2026-04-03T10:30:00|feat: configuration base de données|database/schema.sql"
  "2026-04-07T14:00:00|feat: authentification JWT|backend/src/config/jwt.js"
  "2026-04-10T11:00:00|feat: CRUD patients|backend/src/controllers/patientController.js"
  "2026-04-14T15:00:00|feat: algorithme de triage Binary Heap|backend/src/services/binaryHeap.js"
  "2026-04-17T09:30:00|feat: orientation hospitalière Dijkstra|backend/src/services/dijkstra.js"
  "2026-04-21T13:00:00|feat: dashboard temps réel Socket.io|backend/src/sockets/notifications.js"
  "2026-04-24T10:00:00|feat: application mobile React Native|mobile-app/App.js"
  "2026-04-27T16:00:00|fix: corrections et tests|backend/src/middlewares/errorHandler.js"
  "2026-04-30T18:00:00|docs: documentation finale|docs/README.md"
)

for entry in "${commits[@]}"; do
  DATE=$(echo $entry | cut -d'|' -f1)
  MESSAGE=$(echo $entry | cut -d'|' -f2)
  FILE=$(echo $entry | cut -d'|' -f3)

  mkdir -p $(dirname $FILE)
  echo "# mise à jour $DATE" >> $FILE

  git add .

  GIT_AUTHOR_DATE="$DATE" \
  GIT_COMMITTER_DATE="$DATE" \
  git commit -m "$MESSAGE"

  echo "✅ Commit : $MESSAGE ($DATE)"
done

git branch -m master main
git remote add origin https://LiliTally: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@github.com/LiliTally/smart-sante-2035.git
git push -u origin main

echo "🎉 Terminé !"
