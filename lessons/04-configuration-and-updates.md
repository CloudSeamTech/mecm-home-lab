# Lesson 4 — Manage Windows settings and updates

**Goal** · Send a Windows setting to one PC, verify the result, and build a small update pilot.

A **configuration profile** tells a PC how to behave. An **update ring** controls the Windows Update experience, including restart behavior and scheduling.

## Lab A · Send a setting

1. In Intune, open **Devices → Configuration → Create → New policy**. Select **Windows 10 and later** and **Settings catalog**.
2. Name the profile `Lab - Time Zone`. Choose **Add settings**, search for **Configure Time Zone**, and select the setting. Record the PC’s original time zone and use a Windows time zone ID. For example, `UTC` is a valid ID.
3. Assign the profile to your test device group. Before saving, confirm the group name and which PC is in it.
4. After check-in, open the profile’s device and setting status reports. On Windows, run `tzutil /g` and compare the reported time zone with the profile.
5. For cleanup, restore the recorded original value and verify it. Some settings can remain on a device after unassignment, so verify the local result before you remove the lab profile.

**If a profile reports a conflict.** Open the setting-level result and identify the other profile or policy source. Record both settings and resolve the overlap in the lab before changing assignments broadly.

## Lab B · Build an update pilot

1. In Intune, open **Devices → Windows → Update rings for Windows 10 and later** and create a ring named `Lab - Windows Update Pilot`.
2. Review quality update deferrals, active hours, deadlines, and restart settings. Quality updates are the regular security and reliability fixes. Pick a time when your practice PC can restart without interrupting you.
3. Check for another update ring already applying to the PC. Assign the lab ring only when you can avoid overlapping update settings. Review update policy status after the device checks in.
4. Open **Settings → Windows Update** on the PC and review update history. If no update is offered, the policy may still have applied. Record policy status and update history separately. [Microsoft’s update ring guide](https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-update-for-business-configure)

**Knowledge check.** A PC reports that an update ring applied. Does that prove a particular update installed? Check update history or an applicable update report for the installation result.

[Course map](../intune.md) · [Next lesson](05-defender.md)
