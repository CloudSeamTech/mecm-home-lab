# Module 6 — Work a Configuration Manager admin shift

## Morning checks

| Open in the console | Look for | What to do with the result |
| --- | --- | --- |
| **Monitoring → System Status → Site Status** | Site roles reporting warnings, errors, or low space | Record the role, site system, and time. Check whether a deployment depends on it. |
| **Monitoring → System Status → Component Status** | Repeated errors from a site component | Open status messages and capture the message ID and timestamp. |
| **Monitoring → Client Status → Client Activity** | Clients that stopped reporting | Compare with the planned lab uptime. Check whether the PC is online and whether its Configuration Manager client is running. |
| **Monitoring → Distribution Status → Content Status** | App or update content missing from the distribution point | Confirm distribution status before retrying client installation. |
| **Monitoring → Software Update Point Synchronization Status** | Failed or overdue update sync | Check `wsyncmgr.log` on the site server and capture the last successful sync. |
| **Monitoring → Deployments** | Errors, unknown status, and pending restarts | Open **View Status** and record the affected devices and their current states. |

## Walk through a morning shift

### 1. Check whether the site is healthy

1. On **CM01**, open **Configuration Manager Console**.
2. Select **Monitoring** in the lower-left workspace selector. In the navigation tree, expand **System Status**, then select **Site Status**.
3. Find your lab server in the list. Read the state of the management point and the distribution point. If there is a warning or error, write down the role and the time you checked.
4. Under **System Status**, select **Component Status**. Find the affected component. Use **Show Messages** on the ribbon to review recent warnings or errors. Record one message ID and the exact text.

**Before you move on**, decide whether a shared site problem could affect both lab PCs. If there is no warning, record that the site check passed and continue.

### 2. Find a PC that stopped reporting

1. Stay in **Monitoring**. Expand **Client Status**, then open **Client Health Dashboard**. Look for the overall health and client failure views. The dashboard summarizes clients and may take time to reflect changes.
2. Switch to **Assets and Compliance → Devices**. Search for **LAB-01**. Check the **Client** column and the activity information. Repeat for **LAB-02**.
3. If one PC is inactive, start with that PC. Check whether it was powered off during the lab, then run the health probe below if it is online. If both fail, check shared services and DNS before changing either client.

[See Microsoft’s Client Health Dashboard screenshot](https://learn.microsoft.com/en-us/intune/configmgr/core/clients/manage/client-health-dashboard#client-health-dashboard)

### 3. Check the app or patch rollout

1. Return to **Monitoring → Deployments**. Find your test deployment by name, confirm the **Collection** column shows the intended target, then select **View Status**.
2. Open the status category that needs attention. Find the affected PC and write down its message. Keep an **Unknown** device on your follow-up list until you have evidence that it received the deployment.
3. For an app, select **Monitoring → Distribution Status → Content Status**. Find the app’s content and check the result for your distribution point. On the PC, open **Software Center → Applications** and verify the app’s local state.
4. For a patch, open **Software Center → Updates** and check for a required restart. After restart, verify the KB in **Settings → Windows Update → Update history** where available. See the [patch lab](02-windows-updates.md) for the full rollout.

**Before you widen a deployment**, confirm the pilot received the change and that the broad PC is still outside the pilot assignment.

## Run a health probe

On a lab endpoint, open PowerShell and run these read-only checks. Substitute your actual site server and port if your management point uses another port.

```powershell
Get-Service CcmExec
Resolve-DnsName CM01.corp.example.test
Test-NetConnection CM01.corp.example.test -Port 443
```

The checks tell you whether the client service is running, DNS resolves the server, and TCP can reach the selected port. For a management point listening on HTTP in your lab, use its configured HTTP port instead. Then verify policy retrieval and client activity in the console. A successful TCP test alone does not establish that the client received policy.

## Routine tickets to practice

1. **New PC missing from the pilot.** Confirm domain join, OU, discovery, installation, client activity, and limiting collection. Refresh membership and verify which machines are targeted.
2. **App stalls.** Check collection membership, deadline, distribution status, and app detection. Compare the console with **Software Center** and client logs.
3. **Patch is pending.** Confirm recent scan, applicability, content, deadline, maintenance window, and reboot status before counting a machine as patched.
4. **A setting is wrong on one PC.** In **Assets and Compliance → Compliance Settings**, practice creating a read-only configuration item and baseline. Deploy it to the pilot, inspect the result, and document the proposed fix before considering remediation.
5. **A monthly update cycle is due.** Review products, classifications, and the rule’s preview before enabling an Automatic Deployment Rule. Verify the resulting update group and test before expanding.
6. **A device is ready to leave service.** Document its owner and identity, review active deployments, and follow the approved retirement procedure. Removing a console record does not remove the client from the PC.

For each ticket, record the scope, evidence, next action, and how you will verify recovery. Ask a reviewer to approve a lab change before expanding it from LAB-01 to LAB-02.

[Course map](../README.md)
