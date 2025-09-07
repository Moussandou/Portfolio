#!/usr/bin/env bash
set -euo pipefail
PORT="${1:-8080}"
echo "Serving on http://localhost:${PORT}"
if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server "$PORT" -d .
elif command -v python >/dev/null 2>&1; then
  python -m SimpleHTTPServer "$PORT"
else
  echo "Installez Python pour servir localement, ou utilisez npx serve ."
  exit 1
fi
