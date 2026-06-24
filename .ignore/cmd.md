# Open codex cli
OPENAI_API_KEY='sk-347a4cd1be99e672-a612e2-ba016ef1' TELEGRAM_BOT_TOKEN='8733454851:AAGwaEX_xdff7Hy55g_SyQiddyGrDjJCk4k' TELEGRAM_CHAT_ID='8884817724' codex --dangerously-bypass-approvals-and-sandbox

# Test telegram
TELEGRAM_BOT_TOKEN="8733454851:AAGwaEX_xdff7Hy55g_SyQiddyGrDjJCk4k" TELEGRAM_CHAT_ID="8884817724" curl -sS --fail-with-body --connect-timeout 10 --max-time 20 -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" --data-urlencode "text=✅ Telegram test from $(hostname) at $(date --iso-8601=seconds)"
