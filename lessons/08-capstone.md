# Lesson 8 — Help-desk simulation

**Goal** · Run a short shift and show that you can explain the evidence behind each decision.

For each ticket, record the device, timestamp, portal or local check, observed result, next action, and verification. Use simulated evidence when the lab does not reproduce a problem.

## Tickets

1. **Start your shift.** Check Intune service health, the PC’s last check-in, and its compliance status. Write a two-sentence handoff.
2. **A required app is missing.** Your test PC is online. Check the group and app status, then deploy the test app and verify it opens. If it was already installed, use the removal lab before repeating the install.
3. **The app must come off.** Remove the required assignment for the lab group and assign uninstall. Show how you checked the result in Intune and on Windows.
4. **Security settings disagree.** Intune reports a conflict for real-time protection. Describe where you would find the overlapping policy and show how you would check the local Defender status.
5. **The device is noncompliant.** Find the rule that failed. If the device passes, use the simulated result “Require BitLocker — noncompliant” and describe the local check and proposed next step.
6. **A PC is leaving service.** Explain when you would sync, retire, or wipe. Identify the device and approval checks before a destructive action.

## Grade your work

Give each ticket up to three points.

- **One point** for choosing the right portal, local tool, or report.
- **One point** for recording enough evidence for someone else to follow your reasoning.
- **One point** for choosing a scoped next step and saying how to verify it.

Aim for **15 of 18**, including verifying the target group before an assignment and identifying wipe as a destructive action. If you miss either of those checks, repeat the relevant lab and grade it again.

## Close the lab

Restore any changed settings you need to keep, remove test assignments, and verify the PC’s final state. For a personal lab trial, check the subscription status and end date in **Billing → Your products**. Keep sample evidence free of real names and tenant details before publishing.

[Course map](../intune.md) · [Next lesson](09-fleet-deployment.md)
