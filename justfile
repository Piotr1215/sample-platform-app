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
