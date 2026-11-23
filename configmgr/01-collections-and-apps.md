# Module 1 — Collections, app installation, and app removal

A **device collection** is a group of computers you can target. A **limiting collection** sets which devices are eligible for membership. A **direct rule** adds specific devices. A **query rule** finds devices that match criteria. Start with direct rules so you can predict who receives the change.

## Build your targets

1. In the console, select **Assets and Compliance → Device Collections**, then **Create Device Collection** on the ribbon.
2. On **General**, enter **Lab - Pilot**. Choose a limiting collection that contains your client. In an isolated lab, **All Systems** can serve as the limit.
3. On **Membership Rules**, choose **Add Rule → Direct Rule**. In the wizard, search by the pilot PC’s exact name, select the matching device, and finish the wizard.
4. In the console, select the collection and choose **Update Membership** if needed. Open **Show Members** and confirm only the pilot device appears. Repeat for **Lab - Broad** using the second PC.
5. Write down both members before deployment. Check that the collections do not overlap. [Microsoft’s collections guide](https://learn.microsoft.com/en-us/intune/configmgr/core/clients/manage/collections/create-collections)

## Deploy to one PC, then expand

1. Put a trusted, redistributable MSI in a lab source share accessible to the site server. In **Software Library → Application Management → Applications**, select **Create Application**.
2. Choose **Automatically detect information about this application from installation files**. Choose **Windows Installer (*.msi file)** and browse to the UNC path. Review the resulting deployment type's installation program, uninstall program, and MSI product-code detection rule.
3. Select the app and choose **Distribute Content**. Add the lab distribution point in the wizard. In **Monitoring → Distribution Status → Content Status**, confirm distribution succeeded before deploying.
4. Return to the app and select **Deploy**. Choose **Lab - Pilot**. On **Deployment Settings**, choose **Install** and **Required**. Pick a deadline that works for the lab and review the target on **Summary** before finishing.
5. On the pilot PC use **Control Panel → Configuration Manager → Actions → Machine Policy Retrieval & Evaluation Cycle → Run Now** if you need to request policy. Open **Software Center → Applications** and verify installation. Also open the app itself. In the console, select **Monitoring → Deployments** and open the deployment status.
6. Confirm the broad PC did not receive the app. If the pilot passed, repeat the deploy wizard for **Lab - Broad** and verify the second PC. If it failed, keep the second PC out of scope and use [Module 3](03-support.md). [Microsoft’s application deployment guide](https://learn.microsoft.com/en-us/intune/configmgr/apps/deploy-use/deploy-applications)

## Remove in waves

1. In **Monitoring → Deployments**, identify the original pilot install deployment. Remove that install deployment after verifying the app and collection. Check whether any other install deployment still applies to the pilot device.
2. In **Software Library → Application Management → Applications**, select the app and **Deploy** to **Lab - Pilot**. Choose **Uninstall** on **Deployment Settings**. Review the schedule and target, then finish.
3. Verify the app is gone from the pilot PC and still works on the broad PC. Repeat for **Lab - Broad** after the pilot removal succeeds.
4. Write down how you would restore service if removal caused a problem. Remove the uninstall deployment for that target, redeploy the known-good installer, and verify the device and app.

[Course map](../README.md) · [Next module](02-windows-updates.md)
