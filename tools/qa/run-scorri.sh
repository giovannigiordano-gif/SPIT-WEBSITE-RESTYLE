#!/usr/bin/env bash
# Passeggiata a scroll con Playwright CLI.
#   bash tools/qa/run-scorri.sh <cartella-output> <pagina> <larghezza> [passo=0.85] [attesa_ms=1300]
# Poi: node tools/qa/tiles.mjs non serve, i fotogrammi sono già a viewport.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$ROOT/${1:-qa/scorri}"; PAG="${2:-index}"; W="${3:-1440}"; STEP="${4:-0.85}"; WAIT="${5:-1300}"
mkdir -p "$OUT"
OUT_WIN="$(cygpath -m "$OUT" 2>/dev/null || echo "$OUT")"
TMP="$(mktemp -d)"
sed -e "s|__WIDTH__|$W|" -e "s|__OUT__|$OUT_WIN|" -e "s|__PAGE__|$PAG|" -e "s|__STEP__|$STEP|" -e "s|__WAIT__|$WAIT|" \
  "$ROOT/tools/qa/scorri.js" > "$TMP/s.js"
playwright-cli --raw run-code --filename="$(cygpath -m "$TMP/s.js" 2>/dev/null || echo "$TMP/s.js")"
rm -rf "$TMP"
