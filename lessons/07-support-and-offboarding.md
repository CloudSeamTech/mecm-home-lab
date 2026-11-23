# Lesson 7 — Troubleshoot and offboard a PC

**Goal** · Gather enough evidence to choose the right support action.

## Work the ticket

1. Write down the device name, what the user expected, what happened, and when it started.
2. Check Microsoft 365 service health and the device’s last check-in.
3. Confirm the device or user is in the intended assignment group. Check whether an exclusion or another policy affects it.
4. Read the failing app or policy’s device-level result. Record the error code and setting or app name.
5. Compare Intune’s report with the Windows result. For enrollment and MDM policy problems, check Event Viewer under **Applications and Services Logs → Microsoft → Windows → DeviceManagement-Enterprise-Diagnostics-Provider → Admin**. For Win32 apps, start with the Intune Management Extension logs in `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs`.
6. Make one scoped change at a time. Check the result and record the next owner if you need to hand it off.

## Choose a device action

| Action | When to consider it |
| --- | --- |
| **Sync** | Ask the enrolled device to check in |
| **Retire** | Remove management and supported organizational settings or data while preserving personal data where the platform supports it |
| **Wipe** | Reset a device as part of an authorized reset or redeployment. Review exactly what the selected wipe options preserve or erase. |

For this exercise, open the test device record, find the available actions, and write down which one you would choose for a late check-in, a departing user’s personal PC, and a corporate PC ready for factory reset. Practice **Sync**. Leave **Retire** and **Wipe** as walkthroughs so the practice PC stays available for the capstone.

**Answer check.** Start with sync for a late check-in once the PC is online. Consider retire for a departing user’s personal device, subject to the organization’s offboarding process. Consider wipe for an authorized factory reset of a corporate device after verifying its identity and recovery requirements.

[Course map](../intune.md) · [Next lesson](08-capstone.md)
