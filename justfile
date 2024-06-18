# Run mirrord on deployment, this resolves to a single pod
mirrord:
  @mirrord exec --target-namespace devops-team --target deployment/foo-app-deployment nodemon server.js

# Run mirrord on a pod, this resolves to the first pod
mirrord_pod:
  #!/usr/bin/env bash
  set -e pipefail
  pod=$(kubectl get pods -n devops-team -l app=foo -o name | head -n 1)
  echo "$pod"
  mirrord exec --target-namespace devops-team --target "$pod" nodemon server.js

browser:
  browser-sync start --proxy "localhost:3000" --files "server.js" "public/**/*"

start_server:
  nodemon server.js

combined:
  #!/usr/bin/env bash
  set -e
  # Start local server
  nodemon server.js &
  SERVER_PID=$!
  sleep 3  # Give the server time to start
  # Open browser
  open http://localhost:3000
  # Wait for user to see connection error
  read -p "Press Enter after seeing the connection error..."
  # Stop local server
  kill $SERVER_PID
  # Start mirrord
  mirrord exec --target-namespace devops-team --target deployment/foo-app-deployment nodemon server.js &
  MIRRORD_PID=$!
  # Automatically refresh the browser
  sleep 2  # Give mirrord time to start
  open http://localhost:3000
  # Wait for user to finish
  read -p "Press Enter to stop mirrord..."
  # Stop mirrord
  kill $MIRRORD_PID
