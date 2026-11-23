# Lesson 6 — Find the rule that failed

**Goal** · Read a compliance result and explain the next step in plain language.

A **compliance policy** asks whether a PC meets a rule. A **configuration profile** applies a setting. This lab checks BitLocker without changing encryption or requiring Conditional Access.

## Lab

1. On the practice PC, check whether BitLocker protects the OS drive. You can use **Manage BitLocker** in Windows or run `manage-bde -status C:` in an elevated terminal.
2. In Intune, open **Devices → Compliance → Policies → Create policy**. Select **Windows 10 and later**. Name it `Lab - Require BitLocker`.
3. Find and enable **Require BitLocker**. Review the actions for noncompliance. Use a lab without an access-blocking Conditional Access policy targeting your test user. Assign the compliance policy to your test device group.
4. After check-in and evaluation, open the policy’s reports or the device’s **Device compliance** details. Find the result for the BitLocker setting.
5. Compare that result with what you saw on the device. If it is still pending or shows an error, record the exact result and latest check-in before deciding what it means.

| Result | A good next step |
| --- | --- |
| Compliant | Record the passing setting and when it was evaluated |
| Noncompliant | Identify the specific failed setting and document the proposed fix |
| Pending or no applicable result | Check assignment, applicability, and whether the device evaluated the policy |
| Error | Record the code and check policy details and device evidence |

**Practice handoff.** Write a sentence like “The lab PC checked in at 10:20, and the BitLocker rule reported noncompliant. I confirmed the OS drive was unprotected.”

[Course map](../intune.md) · [Next lesson](07-support-and-offboarding.md)
