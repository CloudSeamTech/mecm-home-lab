# Windows Endpoint Management Home Lab

Learn Windows endpoint management with Microsoft Configuration Manager (MECM/SCCM).

**Try the [interactive pilot deployment and client health exercises](simulator/index.html).** On GitHub Pages, open this link from the published course or go directly to `/simulator/` under your project URL. For local practice, open `simulator/index.html` in a browser.

**Start at zero cost with the [browser exercise](configmgr/04-simulation.md).** Read the sample deployment reports and work the tickets directly in GitHub. This exercise uses written scenarios and answer checks.

**For a real console with servers already configured**, see the [prebuilt Microsoft evaluation kit](configmgr/00-setup.md). If eligible and your PC meets the requirements, download the kit, import the virtual machines into Hyper-V, and start them. The kit supplies a domain controller, domain-joined clients, and a configured Configuration Manager site. The standalone 180-day evaluation is software you install into a lab you build.

The hosted build below is a reference for future use because it incurs cloud charges.

| Module | What you’ll do |
| --- | --- |
| [0. Choose and set up a lab](configmgr/00-setup.md) | Check hardware and evaluation terms, open the console, and verify two clients |
| [1. Target devices with collections](configmgr/01-collections-and-apps.md) | Build pilot and broad collections, distribute content, install an app, and remove it in waves |
| [2. Deploy Windows security updates](configmgr/02-windows-updates.md) | Select an applicable update, deploy it to a pilot, and verify the KB and restart status |
| [3. Monitor and troubleshoot](configmgr/03-support.md) | Read deployment status, inspect client logs, write a ticket, and use read-only PowerShell |
| [4. Work a fleet simulation](configmgr/04-simulation.md) | Practice rollout decisions using sample data with no downloads or accounts |
| [5. Build a hosted domain lab](configmgr/05-hosted-domain-lab.md) | Compare cloud hosts, configure AD and DNS, join two endpoints, and set up the site |
| [6. Run daily admin checks](configmgr/06-daily-operations.md) | Probe client health, check updates and content, and work common tickets |
| [7. Verify the backend](configmgr/07-backend-checklist.md) | Follow DNS, domain join, site assignment, and client policy with sample failures |
| [8. PXE boot and Windows imaging](configmgr/08-pxe-task-sequence.md) | Boot a blank VM, run an OS deployment task sequence, and verify client setup |

Configuration Manager uses collections and its own Windows client. Intune uses Microsoft Entra groups and cloud enrollment. Targeting, detection, phased deployment, and troubleshooting transfer between the tools. For cloud-specific practice such as Autopilot and Intune Graph reporting, see the optional [Intune course](intune.md).

The evaluation path is time-limited and depends on eligibility and hardware you already have. The simulation uses sample data and can be done entirely from GitHub.
