function init() {
  const button = document.querySelector("#test");

  button.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: fillFormFields,
      });
    });
  });
}

function fillFormFields() {
  const data = {
    "Nombre(s)*": "Juan",
    "Apellido(s)*": "Gonzalez",
    "dd/mm/aaaa": "01/01/1997",
    "Mail*": "leandro@test.com",
    "Teléfono*": "3795123123",
    "Número de afiliado*": "1231321321",
    "Cobertura*": "Osde 210",
  };

  for (const [placeholder, value] of Object.entries(data)) {
    const inputField = document.querySelector(
      `input[placeholder="${placeholder}"]`
    );

    if (inputField) {
      inputField.value += value;
      const event = new Event("input", { bubbles: true });
      inputField.dispatchEvent(event);
    }
  }
}

init();
