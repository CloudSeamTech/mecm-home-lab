# Lesson 3 — Install and remove an app

**Goal** · Push a test app, confirm it installed, then remove it using Intune.

| Assignment | Meaning |
| --- | --- |
| Required | Intune attempts to install the app on targeted devices |
| Available for enrolled devices | Eligible users can choose it in Company Portal for supported app types |
| Uninstall | Intune attempts to remove the targeted app when its uninstall conditions are met |

## Prepare the installer

Choose a trusted, redistributable test MSI that supports silent installation and removal. Keep only the installer and its supporting files in your source folder. Run the Microsoft Win32 Content Prep Tool to package it as an `.intunewin` file. Use a separate output folder.

```powershell
.\IntuneWinAppUtil.exe -c C:\IntuneLab\Source -s TestApp.msi -o C:\IntuneLab\Output
```

The sample filename is a placeholder. Use the actual installer and its real MSI product code. [Microsoft’s Win32 packaging guide](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-prepare)

## Install

1. In Intune, open **Apps → Windows → Add** and select **Windows app (Win32)**. In **App information**, select **Select app package file**, browse to the `.intunewin` file, and select **OK**.
2. Set the app name and publisher. Review the install and uninstall commands. An MSI commonly uses `msiexec /i "TestApp.msi" /qn /norestart` and `msiexec /x {PRODUCT-CODE} /qn /norestart`. Use the installer’s supported switches. Select **System** install behavior for a compatible device-wide MSI.
3. Set the OS and architecture requirements to match your test PC. Use an **MSI** detection rule with the app’s product code. Intune uses that rule to tell whether the app is present.
4. On **Assignments**, find **Required** and select **Add group**. Pick `Intune-Lab-Windows`, then select **Next**. On **Review + create**, confirm the package, detection rule, and group before you select **Create**. After processing, reopen the app and select **Device install status**. Find the PC’s row, check its result, and confirm the app opens on Windows.
5. Record the app name, assignment, detection rule, and outcome. [Microsoft’s Win32 app deployment guide](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-add)

## Uninstall

Edit **Assignments**, remove the lab group from **Required**, add it under **Uninstall**, and save. Check the deployment status and confirm the app is removed on the PC.

## Read the failure

- **No device listed.** Verify group membership, assignment, and check-in.
- **Installer failed.** Read the returned code and check installer requirements and the command.
- **Installed locally but Intune reports a detection failure.** Compare the detection rule with the actual MSI product code or detected file.
- **Uninstall did not remove the app.** Check for a competing required assignment and verify the uninstall command uses the correct product code.

[Course map](../intune.md) · [Next lesson](04-configuration-and-updates.md)
