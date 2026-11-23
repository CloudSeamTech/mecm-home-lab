# Module 8 — Boot a VM over the network and install Windows

**Goal** · Use PXE to start a blank VM, run a Configuration Manager task sequence, and verify that Windows and the client come up.

**PXE** lets a computer start from the network. **Windows PE** is the small Windows environment it loads first. A **task sequence** is the ordered list of jobs that prepares the disk, applies Windows, and installs the Configuration Manager client.

```text
Blank VM → DHCP address → PXE responder → Windows PE
         → Choose task sequence → Install Windows → Verify the client
```

## 1. Prepare one disposable target

1. Use your existing isolated lab site and a **new, blank Generation 2 Hyper-V VM** named **PXE-01**. Use a dedicated empty virtual disk. Check that the VM meets the requirements for your Windows image, including virtual TPM for Windows 11.
2. Attach the VM to the isolated virtual switch where your lab DHCP and distribution point are reachable. For this lesson, keep the VM, DHCP, and PXE responder on the same lab subnet, with DHCP and the responder on separate machines. Before network boot, confirm the lab DHCP scope is active and a lab machine on that switch can get an address.
3. Give PXE-01 a static virtual MAC in **Hyper-V Manager → PXE-01 → Settings → Network Adapter → Advanced Features**. Use a unique MAC for this lab and write it down.
4. In Configuration Manager, open **Assets and Compliance → Devices**. On the ribbon, choose **Import Computer Information → Import single computer**. Enter **PXE-01** and its MAC. Add it to a dedicated device collection named **Lab - PXE Only**. Open the collection’s **Show Members** and verify PXE-01 is the only member. The task sequence can format the target disk, so check that name and MAC again before deploying. Leave unknown-computer support disabled for this exercise.

## 2. Turn on network boot

1. On the site server, verify that the supported **Windows ADK** and **Windows PE add-on** for your Configuration Manager version are installed. In the console, open **Software Library → Operating Systems → Boot Images** and find the x64 boot image.
2. Go to **Administration → Distribution Points**. Open the lab distribution point’s **Properties → PXE**. Select **Enable PXE support for clients**, then **Allow this distribution point to respond to incoming PXE requests**. Select **Enable a PXE responder without Windows Deployment Service** for this exercise, then save.
3. Return to **Boot Images**. Open the x64 image’s **Properties → Data Source** and select **Deploy this boot image from the PXE-enabled distribution point**. Use **Distribute Content** to send the image to the lab distribution point. If already distributed when you changed the image, use **Update Distribution Points**.
4. Under **Monitoring → Distribution Status → Content Status**, confirm the boot image is successfully distributed. Check the endpoint subnet’s boundary group includes the lab distribution point. [Microsoft’s PXE guide](https://learn.microsoft.com/en-us/intune/configmgr/osd/deploy-use/use-pxe-to-deploy-windows-over-the-network)

## 3. Create and deploy the task sequence

1. Copy the supported Windows `install.wim` from your evaluation or licensed media into a lab source share that the site server can read. Open **Software Library → Operating Systems → Operating System Images → Add Operating System Image**. Enter the UNC path and select the intended image index if the WIM has multiple editions. Distribute the image to the lab distribution point.
2. Open **Software Library → Operating Systems → Task Sequences → Create Task Sequence**. Select **Install an existing image package**. Name it **Lab - Install Windows**, then select the x64 boot image and the OS image you distributed.
3. On **Configure Network**, select **Join a workgroup** for the first run. On **Install Configuration Manager**, verify the client package. Complete the wizard and confirm the boot image, OS image, and client package are available on the distribution point.
4. Right-click the new sequence and select **Edit**. Find the disk partitioning, **Apply Operating System Image**, and **Setup Windows and ConfigMgr** steps. Read them in order so you know when the disk is changed.
5. Select **Deploy** and choose **Lab - PXE Only**. Under **Deployment Settings**, set **Purpose** to **Available** and **Make available to the following** to **Only media and PXE**. Review the collection and finish. [Microsoft’s task sequence guide](https://learn.microsoft.com/en-us/intune/configmgr/osd/deploy-use/create-a-task-sequence-to-install-an-operating-system)

## 4. Boot and verify

1. In Hyper-V, put the network adapter first under the VM’s **Settings → Firmware**, or use the network boot option at startup. Start **PXE-01** and accept the network boot prompt if it appears.
2. Wait for Windows PE and the task sequence picker. Select **Lab - Install Windows** and confirm you are on the blank PXE-01 VM before starting.
3. After Windows applies, let the VM start from its virtual disk. In Windows, confirm the expected edition with `winver`. Open **Control Panel → Configuration Manager** and confirm the assigned site. In the console, check **Monitoring → Deployments** and verify that the new client reports.
4. For the next run, use a fresh blank lab VM with its own imported record. Configure the sequence’s network settings to join the lab domain with an authorized domain-join account scoped to the lab OU. Check the computer account in Active Directory and verify the domain from Windows after restart.

| If you see this | Start here |
| --- | --- |
| No IP address | Check the VM switch and DHCP scope |
| IP address but no boot offer | Check the MAC match, available deployment, and `SMSPXE.log` on the distribution point |
| Windows PE starts with no task sequence | Verify the collection membership, deployment availability, and site communications |
| Task sequence starts, then fails | Check the failing step and `smsts.log`. Its location changes during setup. [Log reference](https://learn.microsoft.com/en-us/intune/configmgr/core/plan-design/hierarchy/log-files) |

[Course map](../README.md)
