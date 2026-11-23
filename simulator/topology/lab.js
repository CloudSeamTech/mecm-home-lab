const get = (id) => document.getElementById(id);

const labSteps = [
  {
    tab: 'Active Directory', node: 'ad', title: 'Create the domain',
    purpose: 'DC01 gives the lab its domain name and helps computers find each other through DNS.',
    actions: ['On DC01, open Server Manager → Manage → Add Roles and Features. Add Active Directory Domain Services.',
      'Open the notification flag → Promote this server to a domain controller. Select Add a new forest and enter the domain suffix shown on the map.',
      'Keep DNS selected, finish the prerequisite check, and restart.'],
    check: 'DC01 can resolve the lab domain. Member machines will use DC01 as their DNS server.',
    path: ['Server Manager', 'Add AD DS', 'Promote DC01', 'Verify DNS'],
    screens: ['DC01 is selected as the destination server.', 'Active Directory Domain Services is installed.',
      'New forest selected. DNS is enabled. DC01 restarts after promotion.',
      'The lab domain has a DNS zone and a domain controller service record.']
  },
  {
    tab: 'SQL Server', node: 'sql', edges: ['ad-sql'], title: 'Prepare the site database',
    purpose: 'MECM needs a supported SQL Server database. In this example, SQL01 is a separate domain member.',
    actions: ['Point SQL01 at DC01 for DNS, join it to the lab domain, and restart.',
      'In SQL Server Setup, choose a supported version and select Database Engine Services. Use a default instance for this example.',
      'Select Windows authentication and SQL_Latin1_General_CP1_CI_AS server collation. Configure your SQL administrators and a fixed TCP port, such as 1433. Limit access to the lab network and confirm site setup permissions.'],
    check: 'From CM01, confirm that the SQL01 name resolves and that the configured SQL port responds.',
    path: ['SQL Server Setup', 'Feature Selection', 'Server Configuration', 'Database Engine Configuration', 'Verify TCP'],
    screens: ['Start a new standalone installation on SQL01.', 'Select Database Engine Services and use the default instance.',
      'Set the SQL Server collation to SQL_Latin1_General_CP1_CI_AS for this lab.',
      'Use Windows authentication and add your approved SQL administrators.',
      'TCP/IP enabled on the lab port. Verify the listener from CM01 before installing the site.']
  },
  {
    tab: 'MECM site', node: 'cm', edges: ['ad-cm', 'sql-cm'], title: 'Connect MECM to the domain and SQL',
    purpose: 'CM01 runs the site and talks to SQL01 for the site database.',
    actions: ['Point CM01 at DC01 for DNS and join the domain. Confirm both server names resolve.',
      'On SQL01, configure the permissions Microsoft requires for a remote site database, including the site server computer account. On CM01, run the Configuration Manager prerequisite checker.',
      'In Configuration Manager Setup, select Install a Configuration Manager primary site. Use a standalone site, enter LAB as the site code, and provide the SQL01 fully qualified name and default instance. Configure the management and distribution points.'],
    check: 'In Administration → Site Configuration → Sites, you can see site LAB. Verify requirements for your exact build before a live installation.',
    path: ['Prerequisite Check', 'Install Primary Site', 'Database Information', 'Site System Roles', 'Sites'],
    screens: ['Check the supported SQL version, site permissions, Windows features, and ADK. Resolve failures before setup.',
      'Standalone primary site selected. Site code: LAB.',
      'Enter SQL01’s fully qualified name and the instance information for the site database.',
      'CM01 has a management point for policy and a distribution point for content.',
      'Site LAB · Primary site · Server CM01 · Database SQL01']
  },
  {
    tab: 'Clients', node: 'pilot', edges: ['cm-pilot', 'cm-broad'], title: 'Connect two practice PCs',
    purpose: 'The active links show the site talking to the two managed clients.',
    actions: ['On LAB-01 and LAB-02, check DNS, join the domain, and move both computer accounts into the lab OU.',
      'On CM01, add the lab IP range to a boundary group for site LAB. Run Active Directory System Discovery against the lab OU.',
      'Install the Configuration Manager client on each PC. In Control Panel → Configuration Manager → Actions, run Machine Policy Retrieval & Evaluation Cycle.'],
    check: 'Both PCs show Client: Yes and the assigned site is LAB.',
    path: ['Join Domain', 'Boundary Groups', 'Run Discovery', 'Install Client', 'Retrieve Policy'],
    screens: ['Both computer accounts appear in the lab OU.', 'The lab IP range is associated with site LAB and the lab site system.',
      'LAB-01 and LAB-02 appear under Devices. Client: No means installation is not confirmed.',
      'The Configuration Manager control panel is now available on both PCs.',
      'LAB-01 · Client: Yes | LAB-02 · Client: Yes. Both have requested machine policy.']
  },
  {
    tab: 'Collections', node: 'cm', title: 'Put each PC in its own collection',
    purpose: 'A collection is the list of computers that will receive your deployment.',
    actions: ['Open Assets and Compliance → Device Collections → Create Device Collection.',
      'Name the first collection Lab - Pilot. Choose a limiting collection that contains LAB-01. Under Membership Rules, select Add Rule → Direct Rule and select LAB-01.',
      'Create Lab - Broad the same way with LAB-02. Open Show Members for each collection.'],
    check: 'Pilot has LAB-01 only. Broad has LAB-02 only.',
    path: ['Assets and Compliance', 'Device Collections', 'Create Device Collection', 'Membership Rules', 'Show Members'],
    screens: ['This workspace lists discovered and managed devices.', 'Collections are the target lists used by deployments.',
      'Create Lab - Pilot and Lab - Broad using a limiting collection that includes the lab PCs.',
      'Use a direct rule to add one PC to each collection.',
      'Lab - Pilot → LAB-01 | Lab - Broad → LAB-02']
  },
  {
    tab: 'Apps', node: 'cm', title: 'Send an app to the pilot',
    purpose: 'Prepare the installer, distribute its files, then tell MECM which PC should install it.',
    actions: ['Under Software Library → Applications, select Create Application and import the practice MSI.',
      'Select Distribute Content. Verify the installer reached the distribution point.',
      'Select Deploy. Use Install, set the purpose to Required, and review the target.'],
    check: 'LAB-01 should receive the app. LAB-02 should remain outside the assignment.',
    path: ['Software Library', 'Applications', 'Create Application', 'Distribute Content', 'Deploy'],
    screens: ['Open the application library.', 'Select the application node to work with installers and deployments.',
      'Import the practice MSI from a UNC share. Review the install and uninstall commands and product-code detection.',
      'Send the MSI to the lab distribution point. Content Status shows Success.',
      'Practice App · Install · Required. Select the pilot collection and review its members.'],
    operation: 'install',
    challenge: 'Deploy app'
  },
  {
    tab: 'Updates', node: 'cm', title: 'Prepare and send a security update',
    purpose: 'The software update point syncs update information. The software update group holds the updates you want to deploy.',
    actions: ['Confirm WSUS and the Software Update Point role are configured. In Software Library → All Software Updates, select Synchronize Software Updates.',
      'Find an applicable security update. Select it and choose Create Software Update Group. Open that group and select Deploy.',
      'For this exercise, place the update files in a deployment package, distribute the package, and choose the pilot collection. Review the deadline and restart settings.'],
    check: 'Check deployment status, the KB on LAB-01, and whether it still needs to restart.',
    path: ['Software Library', 'Software Updates', 'Synchronize Updates', 'Select KB', 'Create Update Group', 'Distribute Package', 'Deploy'],
    screens: ['Open the software library on CM01.', 'Confirm that a software update point is configured with WSUS.',
      'Update metadata synchronized. Client scans determine whether a KB applies.',
      'Select the simulated Windows security KB that applies to the two lab PCs.',
      'Lab - Quality Update Pilot now contains the selected KB. The group is the list of updates.',
      'The deployment package holds the update files. Content Status shows Success on the lab distribution point.',
      'Choose a pilot collection, then review the deadline and restart behavior.'],
    operation: 'update',
    challenge: 'Deploy update'
  },
  {
    tab: 'PXE imaging', node: 'cm', title: 'Run a Windows task sequence',
    purpose: 'Network boot starts Windows PE. A task sequence then prepares the disk and installs Windows. Use a new blank VM called PXE-01.',
    actions: ['Enable PXE on the lab distribution point. Distribute the PXE-enabled x64 boot image and Windows image.',
      'Import PXE-01 by MAC address and put it alone in Lab - PXE Only. In Task Sequences, select Create Task Sequence → Install an existing image package.',
      'Deploy it as Available and Only media and PXE to Lab - PXE Only. Boot the VM from its network adapter and choose the sequence. Confirm Windows starts from disk afterward.'],
    check: 'The dedicated VM runs Windows and reports to the site. Routine security updates use the software update group in the previous step.',
    path: ['Enable PXE', 'Distribute Boot and OS Images', 'Import VM', 'Create Task Sequence', 'Review Steps', 'Deploy'],
    screens: ['Enable the PXE responder on the lab distribution point. Keep unknown computer support off for this exercise.',
      'The x64 Windows PE image, Windows image, and client package are on the distribution point.',
      'Import the blank PXE-01 VM by MAC address. It is the only member of Lab - PXE Only.',
      'Choose Install an existing image package. Select the boot image and Windows image.',
      'Review disk preparation, Apply Operating System Image, and Setup Windows and ConfigMgr in order.',
      'Lab - Install Windows · Available · Only media and PXE. Choose the collection with the blank VM.'],
    operation: 'pxe',
    pxe: true,
    challenge: 'Simulate PXE boot'
  },
  {
    tab: 'App removal', node: 'cm', title: 'Remove an app from the pilot',
    purpose: 'In this ticket, the app starts installed on both PCs. Remove it from LAB-01 and verify that LAB-02 keeps it.',
    actions: ['In Monitoring → Deployments, find the pilot Install deployment and confirm the target.',
      'Remove that deployment and check for other Required installs that still target LAB-01.',
      'In Software Library → Applications, select Deploy. Choose Uninstall and review the collection.'],
    check: 'Verify Software Center and confirm the app is gone on the pilot and works on the broad PC.',
    path: ['Monitoring', 'Deployments', 'Check Install Assignments', 'Create Uninstall Deployment'],
    screens: ['Open the deployment workspace.', 'Find the Practice App install assignment for Lab - Pilot.',
      'The old pilot install is removed. No other required install targets LAB-01.',
      'Practice App · Uninstall · Verify the target before sending.'],
    operation: 'uninstall',
    challenge: 'Deploy uninstall'
  },
  {
    tab: 'Client health', node: 'broad', title: 'Find out why LAB-02 stopped reporting',
    purpose: 'LAB-01 is current. LAB-02 missed its check-in. Use the evidence to decide what to investigate first.',
    actions: ['Open Monitoring → System Status → Site Status and review the management point.',
      'Open Monitoring → Client Status → Client Health Dashboard, then find LAB-02 in Assets and Compliance → Devices.',
      'On LAB-02, check DNS and run Get-Service CcmExec. Choose the next action based on what you find.'],
    check: 'After resolving the local issue, request machine policy and verify that client activity resumes.',
    path: ['Site Status', 'Client Health Dashboard', 'Check LAB-02'],
    screens: ['The management point is healthy. LAB-01 received policy this morning.',
      'LAB-02 is inactive. Its last reported activity was yesterday.',
      'LAB-02 is online and resolves CM01. PowerShell result: CcmExec is Stopped.'],
    operation: 'health',
    challenge: 'Check my action'
  },
  {
    tab: 'Shift handoff', node: 'cm', title: 'Verify outcomes and hand off the shift',
    purpose: 'Review the evidence as you would before a team handoff. Keep pending and unknown devices on your follow-up list.',
    actions: ['Under Monitoring → Deployments, record the device, collection, result, and time. Confirm the app in Software Center or the KB in Windows Update history.',
      'Check Site Status, Client Status, distribution point content, and software update point synchronization. Investigate shared problems before changing a single client.',
      'For a device issue, record the symptom and reproduction steps. Use AppEnforce.log for installer errors, WUAHandler.log for scan problems, or smsts.log for imaging. Escalate with the next decision you need.'],
    check: 'A teammate should be able to pick up your ticket and repeat your checks.',
    path: ['View Status', 'Compare Client Evidence', 'Prepare Handoff'],
    screens: ['Example: LAB-01 shows Installed. LAB-02 was outside the pilot.',
      'Software Center matches the deployment report. Check the actual app, KB, or task sequence result as appropriate.',
      'Include target, status, timestamp, local verification, pending devices, and the next action.']
  }
];

const hosts = { ad: 'DC01', sql: 'SQL01', cm: 'CM01', pilot: 'LAB-01', broad: 'LAB-02', pxe: 'PXE-01' };
const imagingStep = labSteps.findIndex((step) => step.pxe);
const revealAt = { ad: 0, sql: 1, cm: 2, pilot: 3, broad: 3, pxe: imagingStep };
const edgesAt = { 'ad-sql': 1, 'ad-cm': 2, 'sql-cm': 2, 'cm-pilot': 3, 'cm-broad': 3, 'cm-pxe': imagingStep };
const defaults = {
  domain: 'corp.example.test', subnet: '10.20.10.0/24', ad: '10.20.10.10', sql: '10.20.10.20',
  cm: '10.20.10.30', pilot: '10.20.10.101', broad: '10.20.10.102', pxe: '10.20.10.103'
};
const storageKey = 'mecm-topology-notes';
let notes = { ...defaults };
try { notes = { ...defaults, ...JSON.parse(localStorage.getItem(storageKey)) }; } catch {}
let index = 0;
let noteKey = 'domain';
const nodes = [...document.querySelectorAll('[data-node]')];
const tabs = labSteps.map((step, position) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = step.tab;
  button.addEventListener('click', () => showStep(position, true));
  get('steps').append(button);
  return button;
});

function drawMap(activeEdges = [], status = '') {
  get('cm-pilot').setAttribute('d', index >= imagingStep ? 'M50 50 V67 H17 V83' : 'M50 50 V67 H25 V83');
  get('cm-broad').setAttribute('d', index >= imagingStep ? 'M50 50 V67 H83 V83' : 'M50 50 V67 H75 V83');
  get('domain-summary').textContent = notes.domain + ' · ' + notes.subnet;
  get('map-status').textContent = status;
  nodes.forEach((node) => {
    const key = node.dataset.node;
    const fqdn = hosts[key] + '.' + notes.domain;
    node.hidden = index < revealAt[key];
    node.classList.toggle('current', labSteps[index].node === key);
    node.classList.toggle('linked', activeEdges.some((edge) => edge.split('-').includes(key)));
    node.querySelector('small').textContent = fqdn + ' · ' + notes[key];
    node.setAttribute('aria-label', 'Edit IP address for ' + fqdn);
  });
  Object.entries(edgesAt).forEach(([id, position]) => {
    get(id).classList.toggle('visible', index >= position);
    get(id).classList.toggle('active', activeEdges.includes(id));
  });
}

function editNote(key) {
  noteKey = key;
  get('note-label').textContent = hosts[key] ? hosts[key] + ' IP address' : key === 'domain' ? 'Domain suffix' : 'Subnet (CIDR)';
  get('note-value').value = notes[key];
}

function drawConsole(step) {
  get('console').hidden = !step.path;
  get('console-path').replaceChildren();
  if (!step.path) return;

  get('console-view').textContent = 'Select the first button to open the workspace.';
  const buttons = step.path.map((label, position) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.disabled = position > 0;
    button.addEventListener('click', () => {
      buttons.forEach((entry, offset) => {
        entry.disabled = offset > position + 1;
        if (offset === position) entry.setAttribute('aria-current', 'step');
        else entry.removeAttribute('aria-current');
      });
      get('console-view').textContent = step.screens[position] +
        (buttons[position + 1] ? ' Next: ' + step.path[position + 1] + '.' : '');
      get('challenge').hidden = Boolean(buttons[position + 1] || !step.challenge);
      get('report').hidden = true;
      get('verify-update').hidden = true;
      get('result').textContent = '';
      drawMap(step.edges, 'Current step · ' + step.tab);
    });
    get('console-path').append(button);
    return button;
  });
}

function showStep(position, focus = false) {
  index = position;
  const step = labSteps[index];
  get('step-count').textContent = 'Step ' + (index + 1) + ' of ' + labSteps.length;
  tabs.forEach((tab, offset) => {
    if (offset === index) tab.setAttribute('aria-current', 'step');
    else tab.removeAttribute('aria-current');
  });
  get('machine').textContent = 'Use ' + hosts[step.node];
  get('step-title').textContent = step.title;
  get('purpose').textContent = step.purpose;
  get('actions').replaceChildren(...step.actions.map((action) => {
    const item = document.createElement('li');
    item.textContent = action;
    return item;
  }));
  get('checkpoint').textContent = 'Check your work. ' + step.check;
  get('challenge').hidden = true;
  const isHealth = step.operation === 'health';
  get('challenge-label').textContent = isHealth ? 'First troubleshooting action' : 'Target collection';
  const options = isHealth ? [
    ['', 'Choose an action'], ['service', 'Investigate the stopped client service'],
    ['server', 'Restart the site server'], ['redeploy', 'Deploy the app again']
  ] : [
    ['', 'Choose a collection'], ['pilot', 'Lab - Pilot · LAB-01'], ['broad', 'Lab - Broad · LAB-02'],
    ['all', 'All Lab Devices · LAB-01 and LAB-02'], ...(step.pxe ? [['pxe', 'Lab - PXE Only · PXE-01']] : [])
  ];
  get('collection').replaceChildren(...options.map(([value, label]) => new Option(label, value)));
  get('report').hidden = true;
  get('verify-update').hidden = true;
  get('result').textContent = '';
  get('run-action').textContent = step.challenge || '';
  get('back').disabled = index === 0;
  get('next').disabled = index === labSteps.length - 1;
  get('next').textContent = get('next').disabled ? 'Final step' : 'Next: ' + labSteps[index + 1].tab;
  get('note-status').textContent = 'Select a visible machine to edit its IP address.';
  editNote(index === 0 ? 'domain' : step.node);
  drawConsole(step);
  drawMap(step.edges, 'Current step · ' + step.tab);
  if (focus) get('step-title').focus();
}

nodes.forEach((node) => node.addEventListener('click', () => {
  editNote(node.dataset.node);
  get('note-value').focus();
}));
get('domain-note').addEventListener('click', () => { editNote('domain'); get('note-value').focus(); });
get('subnet-note').addEventListener('click', () => { editNote('subnet'); get('note-value').focus(); });
get('notes').addEventListener('submit', (event) => {
  event.preventDefault();
  const value = get('note-value').value.trim();
  if (!value) return;
  notes[noteKey] = value;
  let message = 'Saved in this browser.';
  try { localStorage.setItem(storageKey, JSON.stringify(notes)); }
  catch { message = 'Updated for this session. Browser storage is unavailable.'; }
  get('note-status').textContent = message;
  const active = [...document.querySelectorAll('.diagram path.active')].map((path) => path.id);
  drawMap(active, get('map-status').textContent);
});

function showReport(rows) {
  get('report-body').replaceChildren(...rows.map(([name, state]) => {
    const row = document.createElement('tr');
    const device = document.createElement('th');
    device.scope = 'row';
    device.textContent = name;
    const status = document.createElement('td');
    status.textContent = state;
    row.append(device, status);
    return row;
  }));
  get('report').hidden = false;
}

get('challenge').addEventListener('submit', (event) => {
  event.preventDefault();
  const target = get('collection').value;
  const step = labSteps[index];
  get('verify-update').hidden = true;
  if (!target || !step.challenge) return;

  if (step.operation === 'health') {
    const replies = {
      service: 'Correct. Investigate why CcmExec stopped. After approved recovery, run Machine Policy Retrieval & Evaluation Cycle and confirm fresh client activity.',
      server: 'Start on LAB-02. LAB-01 received policy and the management point is healthy.',
      redeploy: 'Fix client health first. Sending another app does not restore the stopped service.'
    };
    get('result').textContent = replies[target];
    drawMap(target === 'service' ? ['cm-broad'] : [], target === 'service' ? 'LAB-02 recovery check' : 'Review the evidence');
    showReport([['LAB-01', 'Active'], ['LAB-02', target === 'service' ? 'Policy received after simulated recovery' : 'Inactive · Client service stopped']]);
    return;
  }

  if (step.pxe) {
    const allowed = target === 'pxe';
    drawMap(allowed ? ['cm-pxe'] : [], allowed ? 'Boot image sent to PXE-01' : 'Imaging held');
    get('result').textContent = allowed
      ? 'PXE-01 loaded Windows PE, ran the task sequence, and started Windows from disk.'
      : 'This sequence can format a disk. Select Lab - PXE Only for the blank VM.';
    showReport([['PXE-01', allowed ? 'Windows started · Client reports to LAB' : 'No boot image sent']]);
    return;
  }

  const routes = { pilot: ['cm-pilot'], broad: ['cm-broad'], all: ['cm-pilot', 'cm-broad'] };
  const outcomes = {
    install: ['Installed', 'Not targeted'],
    update: ['Installed · Restart pending', 'Not targeted'],
    uninstall: ['Removed', 'Still installed']
  };
  const [applied, skipped] = outcomes[step.operation];
  drawMap(routes[target], 'Deployment sent');
  showReport([
    ['LAB-01', target === 'broad' ? skipped : applied],
    ['LAB-02', target === 'pilot' ? skipped : applied]
  ]);
  get('verify-update').hidden = step.operation !== 'update' || target !== 'pilot';
  get('result').textContent = {
    pilot: step.operation === 'update'
      ? 'The pilot received the update. Restart LAB-01 and verify the KB before widening the rollout.'
      : step.operation === 'uninstall'
        ? 'LAB-01 no longer has the app. Verify locally and confirm it still opens on LAB-02.'
        : 'Pilot targeting passed. Verify the app opens on LAB-01 before widening the rollout.',
    broad: 'The deployment went to LAB-02. Choose the pilot collection to try again.',
    all: 'Both PCs received the deployment. Choose the pilot collection to limit the rollout.'
  }[target];
});

get('verify-update').addEventListener('click', () => {
  showReport([['LAB-01', 'Installed · Restart complete · Update history verified'], ['LAB-02', 'Not targeted']]);
  get('result').textContent = 'Pilot verified. In a live rollout, compare the KB on the device with the KB in the deployment and review the result before expanding.';
  get('verify-update').hidden = true;
  drawMap(['cm-pilot'], 'Pilot update verified');
});

get('back').addEventListener('click', () => showStep(index - 1, true));
get('next').addEventListener('click', () => showStep(index + 1, true));
showStep(0);
