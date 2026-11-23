const form = document.querySelector('#deployment');
const collection = document.querySelector('#collection');
const members = document.querySelector('#members');
const deviceOne = document.querySelector('#device-one');
const deviceTwo = document.querySelector('#device-two');
const feedback = document.querySelector('#feedback');

const scenarios = {
  pilot: {
    members: 'LAB-01',
    status: ['Installed', 'Not targeted'],
    feedback: 'Pilot passed. LAB-01 received the app and LAB-02 was outside the assignment. In the real lab, open the app on LAB-01 to confirm it works.'
  },
  broad: {
    members: 'LAB-02',
    status: ['Not targeted', 'Installed'],
    feedback: 'LAB-02 received the app instead of LAB-01. Review the members of the pilot collection and try again.'
  },
  all: {
    members: 'LAB-01 and LAB-02',
    status: ['Installed', 'Installed'],
    feedback: 'Both PCs received the app. For a pilot, choose the collection that contains only LAB-01.'
  }
};

collection.addEventListener('change', () => {
  const scenario = scenarios[collection.value];
  members.textContent = scenario
    ? 'Devices in this collection: ' + scenario.members
    : 'Choose a collection to see which PCs it contains.';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const scenario = scenarios[collection.value];
  if (!scenario) return;

  [deviceOne.textContent, deviceTwo.textContent] = scenario.status;
  feedback.textContent = scenario.feedback;
});

form.addEventListener('reset', () => {
  members.textContent = 'Choose a collection to see which PCs it contains.';
  deviceOne.textContent = 'No deployment';
  deviceTwo.textContent = 'No deployment';
  feedback.textContent = 'Exercise reset. Choose a collection to start again.';
});

const healthTicket = document.querySelector('#health-ticket');
const healthAction = document.querySelector('#health-action');
const healthFeedback = document.querySelector('#health-feedback');

const healthReplies = {
  service: 'Good first step. The client service is stopped on LAB-02. Check its logs and follow your approved process to restore it. Then request machine policy and verify that LAB-02 reports again.',
  server: 'Start with LAB-02. LAB-01 received policy from the same site, and LAB-02 has a stopped client service. Review that local issue before touching the shared server.',
  deploy: 'Check client health first. A new app deployment would leave the stopped client service on LAB-02 unresolved.'
};

healthTicket.addEventListener('submit', (event) => {
  event.preventDefault();
  const reply = healthReplies[healthAction.value];
  if (reply) healthFeedback.textContent = reply;
});

healthTicket.addEventListener('reset', () => {
  healthFeedback.textContent = 'Choose an action after reviewing the evidence.';
});
