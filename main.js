import { Session } from '@inrupt/solid-client-authn-browser'

const session = new Session();

// Collect elements by ID
const elements = {};
document.querySelectorAll('[id]').forEach(e => elements[e.id] = e);

// Indicate the user's login status
(async () => {
  await session.handleIncomingRedirect(window.location.href);
  elements.webId.textContent = session.info.webId || '(none)';
})();

// Log in on click
elements.login.addEventListener('click', async () => {
  await session.login({
    oidcIssuer: 'https://broker.demo-ess.inrupt.com',
    redirectUrl: window.location.href,
  });
});

// Send the PATCH request on click
elements.applyPatch.addEventListener('click', async () => {
  const {
    applyPatch, responsePane,
    target, contentType, body,
    status, responseBody,
  } = elements;

  // Clear the UI
  applyPatch.disabled = true;
  responsePane.style.display = 'none';

  try {
    // Send the PATCH request
    const response = await session.fetch(target.value, {
      method: 'PATCH',
      headers: {
        'Content-Type': contentType.value,
      },
      body: body.value,
    });
    // Display the response
    status.textContent = `${response.status} ${response.statusText}`;
    responseBody.textContent = await response.text();
  }
  catch (error) {
    // Display the error
    status.textContent = 'error';
    responseBody.textContent = error;
  }

  // Reset the UI
  responsePane.style.display = 'block';
  applyPatch.disabled = false;
});
