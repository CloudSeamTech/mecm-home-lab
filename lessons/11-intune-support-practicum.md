# Lesson 11 — Intune support practicum

This practicum follows the duties in the job posting. Use an approved lab tenant. When a workflow calls for a senior reviewer, have someone review your plan or mark it as a simulated review in your notes.

| Duty in the posting | Practice and evidence |
| --- | --- |
| Assist with approved device enrollment and compliance | Complete [enrollment](01-enrollment.md) and [compliance](06-compliance.md). Record target group, check-in time, and the specific setting result. |
| Support policy and app deployments and assignments | Rehearse the [settings profile](04-configuration-and-updates.md) and [app pilot](09-fleet-deployment.md). Record who received the change and verify it locally. |
| Monitor dashboards and flag unhealthy or noncompliant devices | Use the [morning health check](02-health.md) and the triage exercise below. Record what you observed and who should take the next action. |
| Document incidents, procedures, symptoms, and reproduction steps | Complete the ticket below, then turn a successful walkthrough into a short procedure. |
| Escalate complex issues and test low-risk changes under senior review | Write the escalation and run the reviewed pilot below. |
| Assist with Autopilot support | Inspect the registration and deployment profile in the exercise below. |
| Build PowerShell and Graph proficiency | Compare a local check with a read-only Intune inventory query in [Lesson 12](12-powershell-and-graph.md). |

## 1. Triage a dashboard alert

1. In the Microsoft 365 admin center, select **Health → Service health**. Look for an Intune advisory and record its ID if applicable.
2. In the Intune admin center, select **Devices → All devices**. Open the affected PC and record **Last check-in** and its compliance status. If it is noncompliant, open the device’s compliance details and record the failed setting.
3. Select **Apps → Windows**. Open the affected app and select **Device install status**. Find the PC and record the status and any error code. Compare it with one healthy device where available.
4. Flag the result as a device check-in issue, a compliance failure, an app failure, or a service incident based on the evidence. If you have only a symptom, call it unresolved.

## 2. Assist with a stuck Windows Autopilot deployment

This exercise uses **classic Windows Autopilot**. Use an already registered lab device, or use the simulated case below. Manual Company Portal enrollment does not register a PC for Autopilot.

1. In Intune, select **Devices → Enrollment → Windows**. Under **Windows Autopilot**, select **Devices**.
2. Find the device by serial number. Check whether it is registered, whether its profile status is **Assigned**, and whether the assigned profile is the expected one.
3. Return to the Windows enrollment page, open **Deployment Profiles**, and inspect the intended profile’s assignments. If the PC reached the **Enrollment Status Page**, ask which phase it reached and capture the exact error and time. Record whether the problem was visible before sign-in or during device or account setup.
4. Prepare the escalation with the enrollment stage, registration result, profile assignment, and intended group. Follow the organization’s approved process for any registration, reassignment, or reset. [Microsoft’s Autopilot profile guide](https://learn.microsoft.com/en-us/autopilot/profiles)

**Simulated case.** A new laptop starts Windows setup and shows no organization branding. An Autopilot record exists, but its profile status is **Not assigned**. Record the serial match and profile status, then escalate the missing assignment for review. Treat the symptoms as observations while assignment is being checked.

## 3. Test one low-risk change under review

Use the app from [Lesson 3](03-apps.md) and the pilot group from [Lesson 9](09-fleet-deployment.md). Before making the change, give the reviewer the app name, one-device target, current assignment, expected result, test window, and reversal steps. Record the review outcome. After approval, deploy to the pilot and compare **Device install status** with the PC itself. Stop at the pilot if verification fails. Record whether the result matched the plan.

## 4. Close or escalate the ticket

Copy this template into your notes. For a procedure, reuse the reproduction steps and add prerequisites, expected results, and a verification step.

| Field | What to record |
| --- | --- |
| Summary and impact | What happened, who or what is affected, and when it started, including time zone |
| Expected and observed | What should happen and what happened instead |
| Reproduction | Starting screen, exact selections in order, and the step where the issue appeared |
| Evidence | Test device, latest check-in, assignment or profile, status, and exact error |
| Checks and changes | What you verified, any approved change, and the result |
| Escalation | Why you need help, the receiving team, and the specific action or decision requested |

**Pass check.** A senior engineer should be able to resume the ticket from your notes without asking what you clicked or which result you saw. Sanitize serial numbers, user names, and tenant data before sharing sample tickets publicly.

[Course map](../intune.md) · [Next lesson](12-powershell-and-graph.md)
