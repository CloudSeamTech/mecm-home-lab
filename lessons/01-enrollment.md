# Lesson 1 — Enroll and group a Windows PC

**Goal** · Get one PC to check in and put it in a group you can use for later labs.

Enrollment connects the PC to Intune. A **check-in** is when the PC talks to Intune. A **group** is a list of users or devices you can assign something to.

## Lab

### On the Windows PC

1. Open **Start → Settings**. In the left pane, choose **System**. Scroll to **About** and copy **Device name** into your lab notes.
2. Open **Microsoft Store**, search for **Company Portal**, then select **Get** or **Install**. When it finishes, select **Open**.
3. Select **Sign in** and enter the licensed test user from Lesson 0. On the **Set up your device** screen, select **Next** and follow the prompts. If Windows opens **Access work or school**, select **Connect** and follow the enrollment instructions for your account. Return to Company Portal to check that setup completed.

### In the Intune admin center

1. Sign in as the lab admin. In the left navigation, select **Devices**, then **All devices**.
2. In the device list, search for the Windows name you copied. Select the device name to open its record.
3. On **Overview**, confirm the Windows operating system and look for **Last check-in**. If the list is empty, check that you’re signed into the lab tenant and that Company Portal completed setup.
4. On the device toolbar, select **Sync**. If a confirmation appears, read the device name and confirm. Return to the device record after it has had time to respond and compare the timestamp. [Microsoft’s Intune admin center walkthrough](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/tutorial-walkthrough-endpoint-manager)

### In the Microsoft Entra admin center

1. Open **Groups → All groups**, then select **New group**.
2. Set **Group type** to **Security** and **Membership type** to **Assigned**. Enter `Intune-Lab-Windows` under **Group name**.
3. Under **Members**, open the member picker, search for the PC, and select its device record. If two records share a name, match the Microsoft Entra device ID before choosing.
4. Select **Select** to accept the member and **Create** to save the group. Reopen the group and choose **Members**. You should see exactly one device.

## If you get stuck

| What you see | What to check |
| --- | --- |
| Company Portal says enrollment is blocked | Test user license, allowed Windows enrollment, device ownership restrictions, and device limits |
| PC appears in Entra only | Whether Company Portal finished management enrollment and whether you’re viewing the right Intune tenant |
| PC is listed twice | Device IDs, enrollment dates, and last check-in before targeting an assignment |
| Sync appears to do nothing | Network access and the latest check-in after the device has had time to respond |

**Knowledge check.** A PC is listed in Entra. What confirms Intune can actually manage it? Open its managed device record in Intune and check that it reports a recent check-in.

[Course map](../intune.md) · [Next lesson](02-health.md)
