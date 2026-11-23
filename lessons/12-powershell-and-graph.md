# Lesson 12 — Read Intune device inventory with PowerShell and Microsoft Graph

**Goal** · Gather local Windows evidence, then use an approved read-only Graph connection to see what Intune reports.

PowerShell runs commands and filters their results. Microsoft Graph is an API that can read data from Microsoft cloud services. In this lab, Graph reads the Intune inventory.

## 1. Practice locally

On your Windows lab PC, open PowerShell. Run the following and note the computer name, Windows version, and last boot time.

```powershell
Get-CimInstance -ClassName Win32_OperatingSystem |
    Select-Object CSName, Caption, Version, LastBootUpTime
```

Run `dsregcmd /status` and find **Device State** or **User State**. Compare the join or registration clues with the PC’s record in Intune. A directory join or registration result alone doesn’t confirm MDM enrollment. Check the managed device record and its last sync.

## 2. Read the Intune inventory

Use the lab’s approved delegated sign-in and **DeviceManagementManagedDevices.Read.All** scope. If sign-in requests consent you don’t have, ask the lab administrator to review it. Use the actual tenant ID and device name from your lab, then confirm the active tenant and account before querying. [Microsoft Graph managed device permissions](https://learn.microsoft.com/en-us/graph/api/intune-devices-manageddevice-list?view=graph-rest-1.0)

```powershell
Install-Module Microsoft.Graph.DeviceManagement -Scope CurrentUser
Connect-MgGraph -TenantId '<lab-tenant-ID>' -Scopes 'DeviceManagementManagedDevices.Read.All'
Get-MgContext | Select-Object TenantId, Account, Scopes

$labDevice = 'YOUR-LAB-PC'
$escapedName = $labDevice.Replace("'", "''")

Get-MgDeviceManagementManagedDevice -Filter "deviceName eq '$escapedName'" -All |
    Select-Object DeviceName, OperatingSystem, ComplianceState, LastSyncDateTime

Disconnect-MgGraph
```

In Intune, select **Devices → All devices** and open the same PC. Compare **Compliance** and **Last check-in** with the Graph output. Compare times in the same time zone. If multiple rows have the same device name, identify the current record by its device ID and check-in before flagging a result.

**If you get stuck.** For a permission error, confirm the tenant, account, and approved scope before escalating. If you get no rows, verify the spelling and confirm the device appears in the portal. If you have no Graph access, practice describing the output you expect and complete the portal comparison with simulated data.

**Pass check.** Explain what each of the four Graph output columns tells you and summarize whether the device needs attention. Use invented values for anything you publish.

[Course map](../intune.md) · [Support practicum](11-intune-support-practicum.md)
