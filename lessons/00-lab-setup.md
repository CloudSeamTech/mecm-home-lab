# Lesson 0 — Set up your lab

**Goal** · Confirm the tenant, the license, the two accounts, and the PC before you make your first change.

A **tenant** is your organization’s Microsoft cloud space. A **subscription** is something that space has access to. A **license** gives a user permission to use the services it covers. An Azure subscription alone does not provide an Intune license.

## 1. Pick the tenant and offer

- **Approved work or school lab.** Use its existing account to sign in on the trial page if you need a trial and the organization authorizes it. If an available license already includes Intune Plan 1, you can use that license. Trial availability depends on the offer Microsoft shows you.
- **Separate practice lab.** Open the Intune signup page and choose **Set up account** if you want a separate tenant. Pick an available `onmicrosoft.com` name you will recognize. This creates a cloud space for your lab. You can create your test user afterward. [Intune Plan 1 trial signup](https://go.microsoft.com/fwlink/?linkid=2019088)

On the offer screen, confirm **Microsoft Intune Plan 1 Trial** and **30 days free**. Microsoft’s signup instructions call for phone verification and a card for verification. Review the displayed terms before completing signup. Record the trial end date so you know when to finish the labs. [Microsoft’s trial setup guide](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/free-trial-sign-up)

## 2. Give the license to your test user

1. Sign in to the Microsoft 365 admin center using the lab admin account. Confirm the organization in your account menu.
2. Open **Users → Active users → Add a user**. Create a test user such as `learner@yourlab.onmicrosoft.com`. Set the user's actual usage location if prompted.
3. In the user's **Licenses and apps**, select the license that contains Intune and save. If the suite lists individual apps and services, confirm the Intune service is enabled.
4. Reopen that user and confirm the license appears. Keep the test user as a standard user in the tenant. Use the admin account for portal changes. [Microsoft 365 admin center](https://admin.microsoft.com)

## 3. Pick an enrollment method

The next lesson uses **Company Portal** for manual enrollment. Confirm Intune is your tenant’s MDM authority and your enrollment restrictions allow the test user and Windows device. Check Windows edition, network access, and whether the PC is already managed. Automatic Windows enrollment is a separate option. It requires Microsoft Entra ID P1 or P2 and an MDM user scope that includes the test user. [Windows enrollment options](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enrollment-methods)

**Ready check.** Write down the tenant domain, admin sign-in, licensed test sign-in, and practice PC name. Open Intune and verify the tenant again before you create any policies.

[Course map](../intune.md) · [Next lesson](01-enrollment.md)
