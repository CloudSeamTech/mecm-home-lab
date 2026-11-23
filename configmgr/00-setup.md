# Module 0 — Set up your Configuration Manager lab

**Goal** · Get two test Windows PCs visible in the console, or choose the simulation.

## Choose a route

| Route | What you need |
| --- | --- |
| **Simulation** | A browser. Start with [Module 4](04-simulation.md). |
| **Prebuilt evaluation lab** | A compatible Windows Hyper-V host with admin rights, enough RAM and free storage, and access to Microsoft's download under its evaluation terms. |
| **Standalone evaluation** | Microsoft offers a 180-day Configuration Manager evaluation after registration. Building your own site also requires a supported Windows Server and SQL Server, Windows clients, and appropriate evaluation or licensed media for each. |

Microsoft describes the prebuilt kit as intended for IT professionals evaluating on behalf of an organization. Review the download and license terms for your situation. If you cannot use that route, the simulation works with no signup. The standalone evaluation is another option if you qualify and already have suitable hardware. [Prebuilt deployment lab](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-11-microsoft-365-lab-kit) · [Standalone Configuration Manager evaluation](https://www.microsoft.com/en-us/evalcenter/evaluate-microsoft-endpoint-configuration-manager)

For a remote build that uses the host’s CPU, RAM, and disk, follow [Module 5](05-hosted-domain-lab.md).

## Open the prebuilt lab

1. Read the kit’s published host requirements and download guide before downloading. The associated evaluation lab guide lists 16 GB of available RAM and 150 GB of free disk space as minimums, with 32 GB RAM and 300 GB storage recommended. Check the requirements for your particular download. [Lab requirements](https://www.microsoft.com/en-us/evalcenter/evaluate-mem-evaluation-lab-kit)
2. Follow the included setup guide to import the VMs into Hyper-V and start them in the kit's prescribed order. Keep the lab separate from any work network. Record the kit and Windows evaluation expiration dates. Each component can expire on its own schedule.
3. On the VM identified in the guide as the Configuration Manager site server or console machine, open **Start → Configuration Manager Console**. Browse to **Assets and Compliance → Devices**. The kit supplies domain-joined clients and a configured site, but check whether each client is installed and reporting.
4. Start two Windows client VMs. In the console, search for each PC's name. Check the **Client** column and whether the device is active. On each PC, open **Control Panel → Configuration Manager**. Confirm it has a site code and that the **Actions** tab is populated.
5. If a device shows **Client: No**, discovery may have created a record before the client was installed. Follow the kit guide and confirm the site's client installation method, then recheck the record. [Microsoft’s client deployment guide](https://learn.microsoft.com/en-us/intune/configmgr/core/clients/deploy/deploy-clients-to-windows-computers)

A **management point** exchanges policy and status with clients. A **distribution point** serves content such as installers. A **software update point** integrates with Windows Server Update Services (WSUS) for update scanning. If the kit has no working software update point, use the [update lab’s readiness check](02-windows-updates.md) before assigning a patch.

[Course map](../README.md) · [Next module](01-collections-and-apps.md)
