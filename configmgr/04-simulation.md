# Module 4 — Practice a rollout without a lab

Use the sample records below. A browser and a place to type notes are enough. The records show what you might find in a console during a rollout review.

| PC | Collection | Client | App | Security update |
| --- | --- | --- | --- | --- |
| LAB-01 | Pilot | Active | Installed, opens locally | KB reported installed, restart complete |
| LAB-02 | Pilot | Active | Installer exited successfully, detection failed | Restart pending |
| LAB-03 | Broad | Active | No deployment yet | No deployment yet |
| LAB-04 | Broad | Inactive | No deployment yet | No deployment yet |

1. **App rollout.** Decide whether to add the broad collection. Name the console report and client logs you would use for LAB-02.
2. **Patch rollout.** Explain which device has completed the patch cycle and which still needs verification. Say what you’ll do about LAB-04 before estimating coverage.
3. **Remove an app.** Write the pilot uninstall steps. Include how you would find remaining install assignments and whether the broad group receives the uninstall.
4. **Escalate.** Write a ticket for LAB-02 with the symptom, evidence, missing information, next action, and requested decision.
5. **Translate to Intune.** Explain how you would target the same pilot with an Entra group and verify app status in the Intune admin center once you have access.

## Answer check

- Hold the app rollout while you compare the detection rule with the actual installation on LAB-02. Check deployment status, `AppDiscovery.log`, and `AppEnforce.log`.
- LAB-01 completed the patch. LAB-02 needs the restart and a fresh status check. LAB-04 needs a client activity check before its patch status can be assessed.
- Remove the pilot install deployment after verifying its target, check for overlapping installs, and deploy **Uninstall** to Pilot. Verify removal there before you extend it to Broad.
- Specify what you need the next engineer to approve or diagnose. Keep the broad deployment on hold until the pilot meets the acceptance checks.
- Intune uses an Entra group for the pilot. Verify the app’s device install report and the local result before widening the assignment.

[Course map](../README.md)
