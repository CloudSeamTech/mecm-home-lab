# Module 7 — Connect the servers and assign clients to a site

You can work through the sample evidence in GitHub at zero cost. For hands-on practice, use an eligible evaluation on compatible hardware you already own. The prebuilt kit lets you inspect a working setup. The standalone evaluation lets you build it from scratch, subject to the evaluation terms for each component. See [lab setup](00-setup.md).

In this lab, **LAB** is the Configuration Manager site code. A site code identifies a Configuration Manager site. The Active Directory domain handles identity and DNS. Joining the domain and being assigned to a Configuration Manager site are separate steps.

```text
DC01 (domain and DNS)
  ├── CM01 (site LAB, SQL database, management point, distribution point)
  ├── LAB-01 (pilot client)
  └── LAB-02 (broad client)
```

## 1. Start with DNS

**Use LAB-01.** If you are building from scratch, first follow the [domain controller walkthrough](05-hosted-domain-lab.md#2-configure-the-domain-controller) on DC01. If you imported the prebuilt kit, use its existing machine names, domain, and site code throughout this module. Keep a note with your real lab values so you can replace the examples.

1. Select **Start**, type **PowerShell**, and open **Windows PowerShell**.
2. Type `ipconfig /all` and press **Enter**. Find your active network adapter, then look for **DNS Servers**. Compare the address with DC01’s private IP.
3. Type `Resolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.corp.example.test` and press **Enter**. Replace `corp.example.test` with the domain from your lab notes.

**You should see** a record pointing to your domain controller. DNS is how LAB-01 finds the domain controller by name. If DNS points somewhere else or the lookup fails, check DC01 is running and correct the lab DNS settings before joining. Repeat this check on CM01 and LAB-02.

## 2. Join the domain

**Use CM01, then LAB-01 and LAB-02.** Skip the join on any machine already joined to the correct lab domain.

1. Press **Windows + R**, type `sysdm.cpl`, and press **Enter**.
2. Select the **Computer Name** tab. Read the **Full computer name** so you know which VM you are changing.
3. Select **Change**. Under **Member of**, choose **Domain**. Type your lab domain, then select **OK**.
4. When Windows asks for a username and password, use your approved lab domain-join account. Look for a welcome message naming the domain. Select **OK** and restart when prompted.
5. After restart, open `sysdm.cpl` again. On **Computer Name**, confirm the **Domain** line. On DC01, open **Server Manager → Tools → Active Directory Users and Computers**. Put the two endpoint computer accounts in the lab OU you plan to discover.

**You should see** all three member machines joined to the same domain. If the welcome message never appears, write down the error and go back to the DNS check.

## 3. Find the Configuration Manager site

**Use CM01 or the machine that runs the console.** If the site is new, complete [site setup](05-hosted-domain-lab.md#4-prepare-the-configuration-manager-site) first.

1. Select **Start**, search for **Configuration Manager Console**, and open it.
2. In the workspace selector, choose **Administration**. In the left pane, expand **Site Configuration** and select **Sites**.
3. Find the site row. Write down the **Site Code**. This course uses **LAB** as an example.
4. In the same left pane, select **Servers and Site System Roles**. Select your site server. In the roles list, look for **Management point** and **Distribution point**.

**You should see** a site code and the two roles. The management point helps clients get instructions. The distribution point holds the files they install. If a role is missing, check the lab setup before moving on.

## 4. Tell the site where the clients live

**Use the Configuration Manager console.** A boundary describes a place on your network. A boundary group can tell clients in that place which site to use.

1. On each endpoint, run `ipconfig` and write down the IPv4 address of the active lab adapter.
2. In the console, select **Administration → Hierarchy Configuration → Boundaries**. Select **Create Boundary** on the ribbon.
3. Enter a description such as **Lab subnet**. Under **Type**, select **IP address range**. Enter the start and end addresses for your lab range and select **OK**. Check that both endpoint addresses fall inside the range.
4. Select **Boundary Groups → Create Boundary Group**. Enter **Lab endpoints**. On **General**, select **Add**, choose the boundary you just made, and confirm.
5. Open **References**. Select **Use this boundary group for site assignment** and pick your site. Under **Site system servers**, choose **Add** and select your lab site system. Select **OK** to save. [Microsoft’s boundary group guide](https://learn.microsoft.com/en-us/intune/configmgr/core/servers/deploy/configure/boundary-groups)

**You should see** your boundary in the group and your site code on **References**. If the site is already configured in a prebuilt lab, inspect the existing settings and reuse the matching group.

## 5. Check discovery, client installation, and policy

1. In the console, open **Administration → Hierarchy Configuration → Discovery Methods**. Open **Active Directory System Discovery → Properties**. If this is a new site, enable discovery and add only the lab OU to the discovery scope. Select **OK**. Run discovery using **Run Full Discovery Now** if needed.
2. Open **Assets and Compliance → Devices**. Search for each PC by name. Look at the **Client** column. If it says **No**, the console knows the computer exists, but it has yet to confirm a managed client. Use the [approved lab installation method](https://learn.microsoft.com/en-us/intune/configmgr/core/clients/deploy/deploy-clients-to-windows-computers) before continuing.
3. On each endpoint, open **Control Panel**, search for **Configuration Manager**, and open it. On **Site**, check the assigned site code. It should match the one you wrote down.
4. Select **Actions → Machine Policy Retrieval & Evaluation Cycle → Run Now**. Back in the console, refresh the device list after the client has had time to report and check for **Client: Yes** and client activity.
5. For an end-to-end check, [put LAB-01 in Pilot and deploy a test app](01-collections-and-apps.md). Open **Software Center → Applications** on LAB-01 and confirm it receives the deployment. Check that LAB-02 is outside the pilot. Then repeat the idea with the [patch pilot](02-windows-updates.md).

**If you get stuck:** On the affected PC, look under `C:\Windows\CCM\Logs`. Use `LocationServices.log` and `ClientLocation.log` to check site and management point information. Use `PolicyAgent.log` to check policy requests. Write down the error and time before changing settings.

[See Microsoft’s device status visuals, including the client-not-installed icon](https://learn.microsoft.com/en-us/intune/configmgr/core/clients/manage/monitor-clients)

## Diagnose from sample evidence

| What you observe | First check |
| --- | --- |
| LAB-01 cannot find the domain during join | Verify its DNS server and resolve the domain's LDAP SRV record |
| LAB-02 is discovered but shows **Client: No** | Check whether the client installer ran and inspect its setup log |
| LAB-02 has the client, but its subnet is outside the boundary range | Compare its IP with configured boundaries and confirm the group's site assignment |
| Both PCs show site LAB, but the pilot app is missing | Check policy, collection membership, and distribution status |
| App delivery works, but update scan fails | Check the software update point, sync status, and `WUAHandler.log` |

**Done when** you can explain which step failed, identify the first place you would check it, and show what evidence would prove it is fixed.

[Course map](../README.md) · [Daily operations](06-daily-operations.md)
