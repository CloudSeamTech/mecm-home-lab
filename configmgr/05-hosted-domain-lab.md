# Module 5 — Build a hosted Windows domain lab

The cloud host runs the VMs. Your PC only needs a browser or remote access client. Choose a provider and confirm the Windows images and their terms before creating resources.

| Provider | What to look for |
| --- | --- |
| AWS EC2 | Windows Server AMIs and a private VPC. Confirm Windows desktop rights separately. Stopping an EBS-backed instance stops its instance-usage charges, while retained disks and some networking resources can still cost money. [AWS Windows FAQ](https://aws.amazon.com/windows/faq/) · [EC2 billing by state](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html) |
| Vultr | A Windows Server image on an eligible Compute plan, a private VPC, and the additional Windows licensing charge. Check the provider's billing rules before assuming a powered-off instance stops billing. [Vultr Windows Server licensing](https://docs.vultr.com/support/products/compute/can-i-use-windows-on-a-vultr-compute-instance) |

Price four VMs, storage, remote access, and outbound traffic before you deploy. Set a billing alert. For the Windows 11 labs, confirm that the host offers a supported deployment method and that you have the required Windows desktop rights. A Windows Server image license does not cover Windows 11. Two supported Windows Server member VMs can serve as managed endpoints for basic collection, compatible app, and server update labs. Those machines use server update products and do not reproduce Windows 11 desktop servicing. For a hosted Windows 11 lab, plan around a provider and license that explicitly support it.

## 1. Create the private network

```text
Your PC → Private remote access → Lab network
                                    ├── DC01    AD DS and DNS
                                    ├── CM01    ConfigMgr, SQL, and site roles
                                    ├── LAB-01  Pilot endpoint
                                    └── LAB-02  Broad endpoint
```

Create a VPC and a private subnet in the same location as the VMs. Use a provider-supported private access method, such as a VPN or a managed session tunnel. Keep domain service ports and RDP off the public internet. Reserve stable private addressing for DNS and the site server through the provider. Plan outbound access for Windows activation, updates, and the Microsoft endpoints the site needs.

## 2. Configure the domain controller

1. On **DC01**, open **Server Manager → Manage → Add Roles and Features**. Choose the local server and select **Active Directory Domain Services**. Accept the required features and complete installation.
2. In Server Manager, select the notification flag, then **Promote this server to a domain controller**. Choose **Add a new forest** and enter a lab-only name such as `corp.example.test`.
3. Keep **DNS server** selected. Set a Directory Services Restore Mode password, complete the prerequisite check, and select **Install**. Wait for the restart.
4. Sign in with the lab domain administrator. In **Server Manager → Tools → DNS**, confirm the lab zone exists. Configure DNS forwarding as needed for external lookups. In **Tools → Active Directory Users and Computers**, create a lab OU for the managed endpoints.

## 3. Join the site server and both endpoints

1. Configure each member VM to use **DC01’s private IP for DNS**, either through the provider's network settings or a supported guest configuration. From each VM run `Resolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.corp.example.test` and verify it returns DC01.
2. On each member VM, run `sysdm.cpl`. Select **Computer Name → Change → Domain**, enter the lab domain, and use a lab account permitted to join computers. Restart when prompted.
3. Reopen **Computer Name** and verify the domain. In **Active Directory Users and Computers**, place **LAB-01** and **LAB-02** in the lab OU. Confirm the VMs can resolve **CM01** by name.

## 4. Prepare the Configuration Manager site

1. On **CM01**, use the prerequisite list for the exact evaluation build. Install a supported SQL Server version and configure the supported collation and database prerequisites. Prepare the required Windows roles and features, ADK components, and source/prerequisite files. Use the setup prerequisite checker to identify missing components before installing. [Site prerequisites](https://learn.microsoft.com/en-us/intune/configmgr/core/plan-design/configs/site-and-site-system-prerequisites)
2. Run Configuration Manager Setup and choose **Install a Configuration Manager primary site**. Use a standalone primary site with the SQL database on CM01 for this lab. Choose the evaluation option if applicable, enter a unique site code such as `LAB`, and configure a management point and distribution point. Check setup results before proceeding. [Microsoft’s site installation guide](https://learn.microsoft.com/en-us/intune/configmgr/core/servers/deploy/install/installing-sites)
3. In the console, go to **Administration → Hierarchy Configuration → Boundaries** and create an IP range boundary for the lab subnet. Under **Boundary Groups**, add that boundary, enable site assignment for the lab site, and associate CM01 as the site system.
4. In **Administration → Hierarchy Configuration → Discovery Methods**, enable **Active Directory System Discovery** and scope its search to the lab OU. In **Assets and Compliance → Devices**, confirm both client records appear. Install the client using the provider lab’s approved method and Microsoft’s client deployment guide. Verify the assigned site, policy retrieval, and **Client: Yes**. [Windows client deployment](https://learn.microsoft.com/en-us/intune/configmgr/core/clients/deploy/deploy-clients-to-windows-computers)
5. For the security update lab, configure WSUS and a **Software update point**, then check synchronization. Follow [Module 2](02-windows-updates.md) to verify a KB and reboot status on the pilot.

**Ready check.** Both PCs belong to the domain, resolve CM01 through DC01, receive client policy, and can be targeted separately. Then build your pilot and broad collections in [Module 1](01-collections-and-apps.md).

[Course map](../README.md) · [Daily operations](06-daily-operations.md)
