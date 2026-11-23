# Module 3 — Monitor, troubleshoot, and escalate

1. Open **Monitoring → Deployments** and select the deployment. Select **View Status**. Record the target collection and the device’s category and message. Compare it with a successful device in the same collection.
2. Open **Assets and Compliance → Devices**. Confirm the client is installed, check client activity, and confirm the device belongs to the intended collection. For an app, also check **Monitoring → Distribution Status → Content Status**.
3. On the client, open `C:\Windows\CCM\Logs`. Match entries to the attempt time before you conclude which step failed.

| Symptom | First logs to read |
| --- | --- |
| App missing or incorrectly detected | `AppDiscovery.log` for detection and `AppIntentEval.log` for applicability and intent |
| App installer failed | `AppEnforce.log` for execution and exit code |
| Update scan failed | `WUAHandler.log` and `ScanAgent.log` |
| Update downloaded but hasn’t installed | `UpdatesDeployment.log` and `UpdatesHandler.log` |

[Microsoft’s Configuration Manager log reference](https://learn.microsoft.com/en-us/intune/configmgr/core/plan-design/hierarchy/log-files)

## Read-only PowerShell practice

On the console machine select the ribbon’s top-left menu, then **Connect via Windows PowerShell**. In the site drive, check the lab collection before approving a deployment.

```powershell
Get-CMCollectionMember -CollectionName 'Lab - Pilot' |
    Select-Object Name, ResourceID
```

Compare the output with **Show Members** in the console. Run `Get-CimInstance Win32_OperatingSystem | Select-Object CSName, Version, LastBootUpTime` on the managed PC and compare the boot time with the update timeline.

## Write an escalation

Record the device, impact, expected behavior, exact steps, timestamp and time zone, deployment and collection, status or error code, and the relevant log entry. End with the decision you need. For example, ask the reviewer whether to hold the rollout while you verify the installer detection rule. Practice using only lab data and mask real names before publishing.

[Course map](../README.md) · [Next module](04-simulation.md)
