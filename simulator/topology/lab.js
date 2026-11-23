const get = (id) => document.getElementById(id);

const labSteps = [
  {
    tab: 'Active Directory', node: 'ad', title: 'Create the domain',
    purpose: 'DC01 gives the lab its domain name and helps computers find each other through DNS.',
    actions: ['On DC01, open Server Manager → Manage → Add Roles and Features. Add Active Directory Domain Services.',
      'Open the notification flag → Promote this server to a domain controller. Select Add a new forest and enter the domain suffix shown on the map.',
      'Keep DNS selected, finish the prerequisite check, and restart.'],
    check: 'DC01 can resolve the lab domain. Member machines will use DC01 as their DNS server.'
  },
  {
    tab: 'SQL Server', node: 'sql', edges: ['ad-sql'], title: 'Prepare the site database',
    purpose: 'MECM needs a supported SQL Server database. In this example, SQL01 is a separate domain member.',
    actions: ['Point SQL01 at DC01 for DNS, join it to the lab domain, and restart.',
      'In SQL Server Setup, choose a supported version and select Database Engine Services. Use a default instance for this example.',
      'Select Windows authentication and SQL_Latin1_General_CP1_CI_AS server collation. Configure your SQL administrators and a fixed TCP port, such as 1433. Limit access to the lab network and confirm site setup permissions.'],
    check: 'From CM01, confirm that the SQL01 name resolves and that the configured SQL port responds.',
    path: ['SQL Server Setup', 'Feature Selection', 'Database Engine Configuration'],
    view: 'Database Engine Services · Windows authentication · SQL_Latin1_General_CP1_CI_AS'
  },
  {
    tab: 'MECM site', node: 'cm', edges: ['ad-cm', 'sql-cm'], title: 'Connect MECM to the domain and SQL',
    purpose: 'CM01 runs the site and talks to SQL01 for the site database.',
    actions: ['Point CM01 at DC01 for DNS and join the domain. Confirm both server names resolve.',
      'On SQL01, configure the permissions Microsoft requires for a remote site database, including the site server computer account. On CM01, run the Configuration Manager prerequisite checker.',
      'In Configuration Manager Setup, select Install a Configuration Manager primary site. Use a standalone site, enter LAB as the site code, and provide the SQL01 fully qualified name and default instance. Configure the management and distribution points.'],
    check: 'In Administration → Site Configuration → Sites, you can see site LAB. Verify requirements for your exact build before a live installation.',
    path: ['Administration', 'Site Configuration', 'Sites'],
    view: 'Site LAB · Primary site · Server CM01 · Database SQL01'
  },
  {
    tab: 'Clients', node: 'pilot', edges: ['cm-pilot', 'cm-broad'], title: 'Connect two practice PCs',
    purpose: 'The active links show the site talking to the two managed clients.',
    actions: ['On LAB-01 and LAB-02, check DNS, join the domain, and move both computer accounts into the lab OU.',
      'On CM01, add the lab IP range to a boundary group for site LAB. Run Active Directory System Discovery against the lab OU.',
      'Install the Configuration Manager client on each PC. In Control Panel → Configuration Manager → Actions, run Machine Policy Retrieval & Evaluation Cycle.'],
    check: 'Both PCs show Client: Yes and the assigned site is LAB.',
    path: ['Assets and Compliance', 'Devices'],
    view: 'LAB-01 · Client: Yes | LAB-02 · Client: Yes'
  },
  {
    tab: 'Collections', node: 'cm', title: 'Put each PC in its own collection',
    purpose: 'A collection is the list of computers that will receive your deployment.',
    actions: ['Open Assets and Compliance → Device Collections → Create Device Collection.',
      'Name the first collection Lab - Pilot. Choose a limiting collection that contains LAB-01. Under Membership Rules, select Add Rule → Direct Rule and select LAB-01.',
      'Create Lab - Broad the same way with LAB-02. Open Show Members for each collection.'],
    check: 'Pilot has LAB-01 only. Broad has LAB-02 only.',
    path: ['Assets and Compliance', 'Device Collections', 'Create Device Collection'],
    view: 'Lab - Pilot → LAB-01 | Lab - Broad → LAB-02'
  },
  {
    tab: 'Apps', node: 'cm', title: 'Send an app to the pilot',
    purpose: 'Prepare the installer, distribute its files, then tell MECM which PC should install it.',
    actions: ['Under Software Library → Applications, select Create Application and import the practice MSI.',
      'Select Distribute Content. Verify the installer reached the distribution point.',
      'Select Deploy. Use Install, set the purpose to Required, and review the target.'],
    check: 'LAB-01 should receive the app. LAB-02 should remain outside the assignment.',
    path: ['Software Library', 'Applications', 'Deploy'],
    view: 'Practice App · Content distributed · Install · Required',
    challenge: 'Deploy app'
  },
  {
    tab: 'Updates', node: 'cm', title: 'Prepare and send a security update',
    purpose: 'The software update point syncs update information. The software update group holds the updates you want to deploy.',
    actions: ['Confirm WSUS and the Software Update Point role are configured. In Software Library → All Software Updates, select Synchronize Software Updates.',
      'Find an applicable security update. Select it and choose Create Software Update Group. Open that group and select Deploy.',
      'For this exercise, place the update files in a deployment package, distribute the package, and choose the pilot collection. Review the deadline and restart settings.'],
    check: 'Check deployment status, the KB on LAB-01, and whether it still needs to restart.',
    path: ['Software Library', 'Software Updates', 'Software Update Groups', 'Deploy'],
    view: 'Lab - Quality Update Pilot · Content distributed · Restart settings reviewed',
    challenge: 'Deploy update'
  },
  {
    tab: 'PXE imaging', node: 'cm', title: 'Run a Windows task sequence',
    purpose: 'Network boot starts Windows PE. A task sequence then prepares the disk and installs Windows. Use a new blank VM called PXE-01.',
    actions: ['Enable PXE on the lab distribution point. Distribute the PXE-enabled x64 boot image and Windows image.',
      'Import PXE-01 by MAC address and put it alone in Lab - PXE Only. In Task Sequences, select Create Task Sequence → Install an existing image package.',
      'Deploy it as Available and Only media and PXE to Lab - PXE Only. Boot the VM from its network adapter and choose the sequence. Confirm Windows starts from disk afterward.'],
    check: 'The dedicated VM runs Windows and reports to the site. Routine security updates use the software update group in the previous step.',
    path: ['Software Library', 'Operating Systems', 'Task Sequences', 'Create Task Sequence'],
    view: 'Lab - Install Windows · Lab - PXE Only · Available · Only media and PXE',
    pxe: true,
    challenge: 'Simulate PXE boot'
  }
];

const hosts = { ad: 'DC01', sql: 'SQL01', cm: 'CM01', pilot: 'LAB-01', broad: 'LAB-02', pxe: 'PXE-01' };
const revealAt = { ad: 0, sql: 1, cm: 2, pilot: 3, broad: 3, pxe: 7 };
const edgesAt = { 'ad-sql': 1, 'ad-cm': 2, 'sql-cm': 2, 'cm-pilot': 3, 'cm-broad': 3, 'cm-pxe': 7 };
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
  get('cm-pilot').setAttribute('d', index === 7 ? 'M50 50 V67 H17 V83' : 'M50 50 V67 H25 V83');
  get('cm-broad').setAttribute('d', index === 7 ? 'M50 50 V67 H83 V83' : 'M50 50 V67 H75 V83');
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
      get('console-view').textContent = buttons[position + 1]
        ? 'Opened ' + label + '. Select ' + step.path[position + 1] + ' next.'
        : step.view;
      if (!buttons[position + 1] && step.challenge) get('challenge').hidden = false;
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
  get('collection').replaceChildren(...[
    ['', 'Choose a collection'], ['pilot', 'Lab - Pilot · LAB-01'], ['broad', 'Lab - Broad · LAB-02'],
    ['all', 'All Lab Devices · LAB-01 and LAB-02'], ...(step.pxe ? [['pxe', 'Lab - PXE Only · PXE-01']] : [])
  ].map(([value, label]) => new Option(label, value)));
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

get('challenge').addEventListener('submit', (event) => {
  event.preventDefault();
  const target = get('collection').value;
  const step = labSteps[index];
  if (!target || !step.challenge) return;
  if (step.pxe && target !== 'pxe') {
    drawMap([], 'Imaging held');
    get('result').textContent = 'This sequence can format a disk. Select Lab - PXE Only for the blank VM.';
    return;
  }
  const routes = { pilot: ['cm-pilot'], broad: ['cm-broad'], all: ['cm-pilot', 'cm-broad'], pxe: ['cm-pxe'] };
  drawMap(routes[target], step.pxe ? 'Boot image sent to PXE-01' : 'Deployment sent');
  get('result').textContent = {
    pilot: 'LAB-01 received the deployment. LAB-02 was outside the assignment.',
    broad: 'LAB-02 received the deployment instead of LAB-01. Select the pilot collection to try again.',
    all: 'Both PCs received the deployment. Choose the pilot collection to limit the rollout.',
    pxe: 'PXE-01 received Windows PE, selected the task sequence, and started Windows from disk. The simulated client reports to site LAB.'
  }[target];
});

get('back').addEventListener('click', () => showStep(index - 1, true));
get('next').addEventListener('click', () => showStep(index + 1, true));
showStep(0);
