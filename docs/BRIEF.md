# Lopsy — Full Project Brief

## PRD
> **Hook**: An LP provider watched her position bleed $2,400 over 3 weeks because she didn't know the Zap-Out button existed.

**Problem**: LP positions silently bleed value through impermanent loss. No forensics tool exists that also offers an emergency exit.

**Solution**: Closed position forensics dashboard with emergency Zap-Out. Analyze LP history, calculate realized IL/P&L, one-click exit for underwater positions.

**Core Features**:
1. Historical LP position analysis (LPAgent API)
2. Realized IL/P&L calculation
3. Pool comparison table
4. **Zap-Out emergency exit** (MANDATORY — 40% of rubric)
5. Position health indicators (green/amber/red)

**⚠️ Critical**: Zap-In/Out is MANDATORY per track rules. Read-only dashboards score 0/40.

---

## ARCHITECTURE
| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind v4 |
| Data | LPAgent API (positions, revenue, pool stats, Zap-Out) |
| Database | Supabase (cached positions) |

**LPAgent depth**: Historical positions, revenue, pool stats, Zap-Out quotes, Zap-Out tx — 5+ endpoints.

---

## BUILD PLAN (4 hours bolt-on)
- Hour 0-1: LPAgent API integration (positions, revenue)
- Hour 1-2: IL/P&L calculation, position health badges
- Hour 2-3: Zap-Out integration (quote + execute)
- Hour 3-4: Dashboard UI, deploy

---

## SUBMISSION
**Demo**: Connect wallet → see LP history → position #3 is -$2,400 IL → one-click Zap-Out → confirm tx → "Emergency exited." 67% win rate (6 submissions, 4 prizes).

---

## SEED DATA
5 LP positions (2 profitable, 2 underwater, 1 neutral), pool comparison data, Zap-Out quote samples.

---

## UI
Position cards with health indicators (🟢🟡🔴), IL/P&L sparklines, emergency "EXIT" button (red, pulsing for underwater positions), pool comparison table.
