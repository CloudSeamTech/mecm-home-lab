# Lesson 5 — Apply a Defender Antivirus policy

**Goal** · Turn on real-time protection through an Intune policy and verify what Windows reports.

Real-time protection checks files and activity as they happen. Use a lab PC where Microsoft Defender Antivirus is the active antivirus. Other antivirus software or overlapping policies can change the result.

## Lab

1. Open **Endpoint security → Antivirus → Create Policy**. Choose the Windows platform and the **Microsoft Defender Antivirus** profile.
2. Name it `Lab - Defender Real-Time Protection`. Find the real-time protection setting, enable it, and leave unrelated settings unconfigured.
3. Assign the policy to the test device group. After check-in, open the policy and look up the device and setting status.
4. On Windows, open **Windows Security → Virus & threat protection** and find the real-time protection status. You can also run this read-only PowerShell command.

```powershell
Get-MpComputerStatus |
    Select-Object AMRunningMode, AntivirusEnabled, RealTimeProtectionEnabled
```

**Success check.** The setting shows success in Intune and real-time protection is enabled locally. Record both results.

## If you get stuck

- **Pending.** Confirm the device can check in and is in the target group.
- **Conflict.** Check whether a security baseline or another policy configures the same setting.
- **Windows disagrees with Intune.** Compare timestamps and check Defender’s running mode, the active antivirus provider, and other management policies.

[Course map](../intune.md) · [Next lesson](06-compliance.md)
