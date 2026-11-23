# Microsoft Intune Device Management

A beginner course for someone who has never managed a device. Use one Windows practice PC and work through each lesson in order. Each lab tells you what to select, what to look for, and what to do when the result is different from what you expected.

Intune and Configuration Manager (formerly SCCM) both install apps and apply settings to Windows PCs. Intune is a cloud service that also manages platforms such as macOS, iOS, and Android. Configuration Manager runs on infrastructure your organization manages. A PC can use both through **co-management**. This course uses Windows and Intune.

```text
Microsoft 365  →  Check the license and Microsoft service health
Microsoft Entra →  Manage accounts and groups
Microsoft Intune →  Assign apps and policies, then read the results
Windows PC     →  Check what actually happened
```

## Course map

| Lesson | What you’ll practice |
| --- | --- |
| [0. Set up your lab](lessons/00-lab-setup.md) | Pick the right tenant and trial, license a learner, and prepare a test PC |
| [1. Enroll and group a PC](lessons/01-enrollment.md) | Use Company Portal, verify enrollment, and scope assignments |
| [2. Run the morning health check](lessons/02-health.md) | Check service health, device check-in, compliance, and pending work |
| [3. Install and remove an app](lessons/03-apps.md) | Deploy a Win32 app, read the reports, and uninstall it |
| [4. Manage Windows settings and updates](lessons/04-configuration-and-updates.md) | Apply a settings catalog profile and plan an update pilot |
| [5. Apply Defender protection](lessons/05-defender.md) | Apply and verify an antivirus policy |
| [6. Check device compliance](lessons/06-compliance.md) | Find the specific rule that passed or failed |
| [7. Troubleshoot and offboard](lessons/07-support-and-offboarding.md) | Use a support workflow and choose the appropriate remote action |
| [8. Complete a help-desk simulation](lessons/08-capstone.md) | Handle common tickets and grade your decisions |
| [9. Roll out apps and security updates](lessons/09-fleet-deployment.md) | Pilot app installs, removals, and Windows updates across multiple devices |
| [10. Intune engineer roadmap](lessons/10-engineer-roadmap.md) | Map job requirements to lab scenarios and evidence |
| [11. Intune support practicum](lessons/11-intune-support-practicum.md) | Work a dashboard alert, validate a pilot, and escalate an Autopilot issue |
| [12. PowerShell and Microsoft Graph](lessons/12-powershell-and-graph.md) | Compare local Windows evidence with read-only Intune inventory |

For the Intune support role described in the job posting, start with the [duty-to-lab map](lessons/11-intune-support-practicum.md).

## What to bring

- A spare Windows 11 Pro PC or a Windows 11 Pro virtual machine you’re authorized to manage. Verify Windows licensing separately.
- Access to an approved Intune lab tenant or an eligible trial, a lab administrator, and a licensed test user.
- A way to record your results. For each change, write down the tenant, test device, group, assignment, time, expected result, and observed result. Use made-up account and device names if you publish your notes.

The first day can be just setup and enrollment. App and policy reporting depend on device check-in and processing, so work through the remaining labs at your own pace.
