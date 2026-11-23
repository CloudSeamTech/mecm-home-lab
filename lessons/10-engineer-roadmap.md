# Intune engineer roadmap

Use job descriptions to choose which scenarios to tackle next. For each skill, practice the change, verify what happened on the device, troubleshoot a failure, and explain how you’d recover. A second Windows PC or VM lets you prove that targeting works before expanding a rollout.

| Scenario to practice | What you should be able to demonstrate |
| --- | --- |
| A new employee receives a corporate laptop | Explain manual enrollment, Entra join, and Windows Autopilot. Plan a deployment and diagnose a setup that stalls. |
| An app needs a new version on 500 devices | Pilot install, check detection and prerequisites, plan supersedence and rollback, then expand in waves. |
| A critical Windows patch is released | Distinguish update rings from expedited quality updates. Confirm the KB, restart status, and coverage across eligible devices. |
| A device fails a security requirement | Find the failed compliance setting, compare it with the local state, and explain how Conditional Access uses compliance. |
| Two teams configure the same Windows setting | Find the conflicting profiles, compare assignments, and show which setting needs to change. |
| A device has an antivirus problem | Check Defender policy and local protection state. Explain how Defender Antivirus policy differs from Defender for Endpoint onboarding. |
| An admin should manage one department only | Explain role permissions, scope groups, and scope tags. Test what that admin can view and change. |
| A personal phone needs work email | Compare app protection without enrollment and enrolled BYOD. Explain which actions affect work data and why. |
| A team receives Macs or corporate mobile devices | Identify enrollment prerequisites, including Apple or Android provisioning dependencies, and verify a policy on the correct platform. |
| A Windows PC is still managed by Configuration Manager | Explain co-management workloads and how to pilot moving one workload to Intune. |
| A report is needed every week | Export device and app results, explain the reporting delay, and practice read-only reporting with Microsoft Graph where approved. |
| An employee leaves or a corporate PC is lost | Verify device ownership, choose the appropriate offboarding action, and document recovery and follow-up. |

## Match a job posting to your practice

| Requirement from the posting | Course lesson or next lab | Evidence you can show or describe |
| --- | --- | --- |
| Deploy and maintain applications | Lessons 3 and 9 | Pilot report, detection rule, and uninstall verification |
| Patch Windows endpoints | Lessons 4 and 9 | Ring settings, KB and reboot evidence, and rollout decision |
| Troubleshoot endpoint compliance | Lessons 6–8 | Failed setting, local check, and proposed remediation |

Add a row for each responsibility in the posting. Mark each one **Practiced**, **Planned**, or **Needs lab access**. Use sanitized notes in your portfolio and distinguish a lab exercise from production experience.

[Course map](../intune.md) · [Next lesson](11-intune-support-practicum.md)
