# Module 2 — Roll out a Windows security update

## Check the update pipeline

1. In the Configuration Manager console, select **Administration → Site Configuration → Servers and Site System Roles**. Select your lab server and check for the **Software update point** role. If missing, use the kit’s setup instructions or Microsoft's guide to configure the role with WSUS before continuing. [Install a software update point](https://learn.microsoft.com/en-us/intune/configmgr/sum/get-started/install-a-software-update-point)
2. Select **Software Library → Software Updates → All Software Updates**. Choose **Synchronize Software Updates**, then watch **Monitoring → Software Update Point Synchronization Status** for completion. If nothing appears, check which Windows products and classifications the site synchronizes.
3. Identify the Windows version on both test PCs. Search all software updates for an applicable KB or use product and classification criteria. Review applicability, expiry, and supersedence. If both VMs are fully patched, record the available evidence and finish with the [simulation](04-simulation.md).

## Deploy and verify

1. Select the update in **All Software Updates** and choose **Create Software Update Group**. Name it **Lab - Quality Update Pilot**.
2. Open **Software Update Groups**, select your group, then choose **Deploy**. On **General**, select **Lab - Pilot**. On **Deployment Settings**, select **Required**. Review the deadline, restart behavior, and available maintenance window before completing the wizard.
3. In the wizard, choose or create a deployment package and select the lab distribution point if you need to download and distribute content. Review the summary and confirm the update group, collection, and distribution settings.
4. On the pilot PC open **Software Center → Updates** and check the update. Allow the lab PC to restart if required. In Windows, open **Settings → Windows Update → Update history** and verify the KB where shown.
5. In the console, select **Monitoring → Deployments**, open the deployment, and compare client results. Record successful, in-progress, error, and unknown devices. Investigate unknown devices before reporting coverage.
6. When the pilot passes, deploy the update group to **Lab - Broad** with its own deadline and repeat verification. If an app breaks after the pilot, hold the broader deployment and check whether that KB has a supported removal or recovery path. Removing the deployment does not undo an installed update. [Microsoft’s manual update deployment guide](https://learn.microsoft.com/en-us/intune/configmgr/sum/deploy-use/manually-deploy-software-updates)

**Next practice.** For recurring patching, plan an **Automatic Deployment Rule** with product and classification filters, a scheduled evaluation, separate rollout deadlines, and a review of what the rule selected before wider deployment.

[Course map](../README.md) · [Next module](03-support.md)
