#!/usr/bin/env bash
# Lancia l'audit visivo con Playwright CLI a tutte le larghezze.
#   bash tools/qa/run-audit.sh <cartella-output> [larghezze...]
# Esempio: bash tools/qa/run-audit.sh qa/audit-prima 1440 1024 768 390 360
# Richiede il dev server su :4321 e `playwright-cli open` già eseguito.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT_REL="${1:-qa/audit}"; shift || true
WIDTHS=("${@:-1440 1024 768 390 360}")
[ ${#WIDTHS[@]} -eq 1 ] && read -r -a WIDTHS <<< "${WIDTHS[0]}"
PAGES="${PAGES:-['index','metodo','risultati','dna','team','eventi','fatturare','candidatura']}"
OUT="$ROOT/$OUT_REL"
mkdir -p "$OUT"
# il path va in forma Windows per il processo di Playwright
OUT_WIN="$(cygpath -m "$OUT" 2>/dev/null || echo "$OUT")"
TMP="$(mktemp -d)"
for W in "${WIDTHS[@]}"; do
  sed -e "s|__WIDTH__|$W|" -e "s|__OUT__|$OUT_WIN|" -e "s|__PAGES__|$PAGES|" "$ROOT/tools/qa/audit.js" > "$TMP/audit-$W.js"
  echo "→ audit a ${W}px"
  playwright-cli --raw run-code --filename="$(cygpath -m "$TMP/audit-$W.js" 2>/dev/null || echo "$TMP/audit-$W.js")" > "$OUT/report-$W.json"
done
rm -rf "$TMP"
echo "fatto: $OUT"
