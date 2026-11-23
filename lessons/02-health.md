# Lesson 2 — Run the morning health check

**Goal** · Decide whether to look at Microsoft’s service, a particular device, or a specific assignment.

```text
Is Microsoft reporting an issue?
  ↓
Has the device checked in?
  ↓
What did the policy or app report?
  ↓
Does the PC show the same result?
```

## Daily checklist

| Where | Look for | What to record |
| --- | --- | --- |
| Microsoft 365 admin center → **Health → Service health** | Intune incidents or advisories | Incident ID, affected feature, time, and impact |
| Intune → **Devices → All devices** | Unexpectedly stale check-ins | PC name, latest check-in, and whether it’s online |
| Intune → **Devices → Compliance** | Devices failing a rule or with a pending result | Policy name and the specific setting result |
| Intune → **Apps** → affected app | Pending, failed, or installed status | Device status and any error code |
| Intune → **Endpoint security → Antivirus** | Deployment failures or conflicts | Policy name and device or setting status |

## Lab

1. Check Microsoft 365 service health and record what it shows for Intune. If your role cannot see the page, record the access gap.
2. Open your test PC in Intune and record its check-in time. If your PC is online, request a sync and check the timestamp again after it processes.
3. Read its compliance status, even if you have yet to assign a policy. Record the exact status you see.
4. Write a two-sentence handoff summarizing the service status and the device result. Use timestamps and report what you observed.

**Scenario.** One PC missed an app deployment and seven other PCs received it. Start with the affected PC's check-in, group membership, and app status. If many devices begin failing around the same time, check shared assignments, recent changes, and service health.

[Course map](../intune.md) · [Next lesson](03-apps.md)
