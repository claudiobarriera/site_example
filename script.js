const pulsanteTema = document.querySelector("#tema");

pulsanteTema.addEventListener("click", () => {
  const temaScuro = document.body.classList.toggle("scuro");

  pulsanteTema.textContent = temaScuro
    ? "Tema chiaro"
    : "Tema scuro";

  pulsanteTema.setAttribute("aria-pressed", String(temaScuro));
});