// Collect elements by ID
const elements = {};
document.querySelectorAll('[id]').forEach(e => elements[e.id] = e);

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
    const response = await fetch(target.value, {
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
