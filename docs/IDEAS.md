# 💡 LPAgent — Selected Idea

> **Decision**: Lopsy (confirmed 2026-05-07)
> **Source**: Cross-model consensus with mandatory Zap-Out requirement correction

---

## ✅ SELECTED: Lopsy — LP Position Forensics with Emergency Zap-Out

| Field | Value |
|-------|-------|
| **Name** | Lopsy |
| **One-liner** | Closed position forensics dashboard: analyze your LP history, calculate realized IL/P&L, and one-click "Emergency Exit" via Zap-Out API for underwater positions — the only submission that uses the MANDATORY write endpoint |
| **Target Track** | Primary: **LPAgent** ($900 USDC, 6 submissions, 4 prizes) |
| **Docs Distance** | 🟢 Novel — Forensics + Zap-Out combo, not a read-only dashboard |
| **Winner Archetype** | Capability-unlock — "See your LP losses AND exit in one click" |
| **SDK Surface Area** | 5+ — Historical positions, revenue, pool stats, Zap-Out quotes, Zap-Out tx generation |
| **Production Plan** | Vercel deployment, live wallet connection, real Zap-Out transactions |
| **Difficulty** | Easy (3/10) — <4 hours bolt-on |
| **Tech Stack** | Next.js 16, LPAgent API, Solana wallet adapter, Tailwind v4 |

---

## Gate Check

| Gate | Result |
|------|--------|
| ❌ Emotional Hook Test | ✅ PASS — "An LP provider watched her position bleed $2,400 over 3 weeks because she didn't know the Zap-Out button existed" |
| ❌ Docs Distance = 🔴 | ✅ PASS — 🟢 Forensics + exit, not simple position viewer |
| ❌ Winner Archetype = Visualization only | ✅ PASS — Actionable (Zap-Out = write operation) |
| ❌ Scope = Wide+Shallow | ✅ PASS — ONE flow: Connect wallet → View history → Flag underwater → One-click Zap-Out |
| ❌ Rubric Alignment < 70% | ✅ PASS — Zap-Out is MANDATORY (40% requirements criterion) |

---

## ⚠️ Critical: Zap-In/Out is MANDATORY

> All 3 models missed this. The track listing explicitly states: "Must use Zap in or Zap out API inside the app." Read-only dashboards will score 0/40 on the requirements criterion.

## Why This Wins

1. **Zap-Out integration** — the ONLY way to capture 40% of the rubric
2. **6 submissions, 4 prizes** — 67% win rate, free money
3. **Forensics angle is unique** — GLM's "LP Autopsy" was the only model to propose it
4. **<4 hour bolt-on** — all API endpoints are REST, no SDK to learn
5. **Write operation differentiator** — Zap-Out generates real Solana transactions

## Runner-Up Ideas

| Rank | Idea | Score | Why Not |
|------|------|-------|---------|
| #2 | RektAlert Telegram Bot | 8/10 | No Zap-Out = fails 40% criterion |
| #3 | Multi-Pool Comparator | 7/10 | Read-only, same problem |
