# Lesson 9 — Roll out apps and security updates to a fleet

**Goal** · Deploy to one PC, decide whether to expand, then show what happened across the fleet.

Use two enrolled lab Windows PCs or VMs. In Microsoft Entra, open **Groups → All groups → New group**. For each group choose **Security** and **Assigned**. Create **Intune-Lab-Pilot**, add the first PC, then create **Intune-Lab-Broad** and add the second PC. Reopen **Members** on each group and verify that the groups contain different devices. Also verify both check in to Intune. If you have one PC, do the pilot live and write out the broad rollout decision using the examples below.

## Lab A · Install in waves

1. In Intune, select **Apps → Windows**, then select the Win32 app you packaged in [Lesson 3](03-apps.md). Open **Properties**, scroll to **Assignments**, and select **Edit**.
2. Under **Required**, select **Add group**, choose **Intune-Lab-Pilot**, and save. Remove any earlier lab assignment that would independently target both PCs. Keep the broad group out of the first wave.
3. Open the app’s **Device install status**. Find the pilot PC and check that Intune reports **Installed**. On Windows, open the app and exercise one basic feature. Confirm the second PC still lacks the app.
4. If the pilot passes, return to **Properties → Assignments → Edit** and add **Intune-Lab-Broad** under **Required**. Keep the pilot group assigned. Verify the result on each PC and record a count of installed, pending, and failed devices.
5. If the pilot fails, hold the broad assignment. On the pilot PC, compare the installed state against the detection rule. Check the error code, installer command, and latest check-in before changing the package.

## Lab B · Remove in waves

1. In the same app’s **Assignments**, remove the pilot group from **Required** and add it under **Uninstall**. Keep the broad group **Required** while you test the removal. Double-check that no other assignment still requires the app on the pilot PC.
2. Check the pilot PC after check-in. Confirm the app is gone, and verify the broad PC can still open it.
3. Repeat for the broad group after the pilot removal passes. Check the app’s per-device report and confirm the result on both PCs.
4. Explain the rollback. If removal breaks a known lab dependency, remove the affected group from **Uninstall**, restore **Required** for the known-good package, and verify that the app works again.

## Lab C · Stage Windows security updates

1. In Intune, open **Devices → Windows → Update rings for Windows 10 and later**. Select **Create profile** and name it **Lab - Security Update Pilot**.
2. On **Update ring settings**, set **Quality update deferral period (days)** to **0** for the pilot. Review active hours and restart settings before assigning the ring. On **Assignments**, include **Intune-Lab-Pilot**, review the group and settings, and select **Create**.
3. Create a second ring for **Intune-Lab-Broad** with a short quality update deferral, such as **3** days. Before assigning either ring, check for overlap with the ring from Lesson 4 and remove conflicting lab assignments. Finish planning the broad ring before its start so that the deferral is relative to the update release date.
4. After check-in, open the pilot ring’s reporting and record whether the policy applied. On the pilot PC, open **Settings → Windows Update → Update history** and look under **Quality Updates** for the update’s KB number and install result. Check that Windows has finished any required restart. A ring can apply successfully even when there’s no new update to install.
5. Check the broad PC after the deferral window. Record the same KB and restart evidence. If a pilot issue warrants pausing the rollout, identify the affected ring and review its **Pause** controls for **Quality** updates. A pause does not remove an update that already installed. [Microsoft’s update ring guide](https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-update-for-business-configure)

**Engineer check.** Explain how you’d handle an offline PC, a PC that needs a reboot, and a PC reporting an install error. An offline or pending PC still needs follow-up. An install error needs its code and logs. If the update has already installed, a rollback requires checking that specific update’s uninstall support and following the applicable recovery process.

**Next scenario.** To expedite a specific urgent quality update, review the separate **Quality updates** policy workflow and verify its licensing, supported join type, and prerequisites first. This is especially important if you used Company Portal and your lab PC is only Entra registered. [Microsoft’s expedited updates guide](https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-expedite-updates)

[Course map](../intune.md) · [Engineer roadmap](10-engineer-roadmap.md)
