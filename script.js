const dialogo = document.querySelector("#sorpresa");
const caricamento = document.querySelector("#caricamento");
const risultato = document.querySelector("#risultato");
const stato = document.querySelector("#stato");
const progresso = document.querySelector("#progresso");
const barra = document.querySelector("#barra-progresso");
const titoloRisultato = document.querySelector("#titolo-risultato");
const festa = document.querySelector("#festa");

const movimentoRidotto = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const messaggi = [
  "Rilevamento del livello di topinità…",
  "Controllo delle scuse più utilizzate…",
  "Misurazione del talento nel fare il furbo…",
  "Consultazione del consiglio supremo dei roditori…",
  "Ci siamo. Il verdetto è pronto."
];

let intervallo = null;
let pulsanteDiPartenza = null;

function aggiornaProgresso(valore) {
  barra.style.width = `${valore}%`;
  progresso.setAttribute("aria-valuenow", String(valore));
}

function apriSorpresa(evento) {
  if (dialogo.open) return;

  pulsanteDiPartenza = evento.currentTarget;

  clearInterval(intervallo);
  festa.replaceChildren();

  caricamento.hidden = false;
  risultato.hidden = true;

  dialogo.setAttribute("aria-labelledby", "titolo-dialogo");
  aggiornaProgresso(0);
  stato.textContent = "Preparazione della valutazione…";

  // Il dialogo usa il livello superiore del browser.
  // Spostiamo qui l'effetto perché resti visibile sopra la finestra.
  dialogo.append(festa);

  dialogo.showModal();
  document.body.classList.add("modale-aperto");

  let passaggio = 0;

  intervallo = setInterval(() => {
    stato.textContent = messaggi[passaggio];
    aggiornaProgresso((passaggio + 1) * 20);
    passaggio += 1;

    if (passaggio === messaggi.length) {
      clearInterval(intervallo);

      intervallo = setTimeout(mostraRisultato, 700);
    }
  }, 1000);
}

function mostraRisultato() {
  caricamento.hidden = true;
  risultato.hidden = false;

  dialogo.setAttribute("aria-labelledby", "titolo-risultato");
  titoloRisultato.focus();

  lanciaCoriandoli();
}

function lanciaCoriandoli() {
  // Rispetta chi ha richiesto meno animazioni sul dispositivo.
  if (movimentoRidotto.matches) return;

  festa.replaceChildren();

  const colori = ["#a78bfa", "#5eead4", "#fbbf24", "#fb7185", "#ffffff"];

  for (let i = 0; i < 65; i += 1) {
    const coriandolo = document.createElement("span");
    const durata = 2.5 + Math.random() * 2;

    coriandolo.className = "coriandolo";
    coriandolo.style.left = `${Math.random() * 100}%`;
    coriandolo.style.backgroundColor =
      colori[Math.floor(Math.random() * colori.length)];

    coriandolo.style.setProperty("--durata", `${durata}s`);
    coriandolo.style.setProperty(
      "--spostamento",
      `${Math.random() * 180 - 90}px`
    );

    coriandolo.addEventListener("animationend", () => {
      coriandolo.remove();
    }, { once: true });

    festa.append(coriandolo);
  }
}

document.querySelector("#avvia").addEventListener("click", apriSorpresa);

document.querySelector("#avvia-secondario").addEventListener(
  "click",
  apriSorpresa
);

document.querySelector("#chiudi").addEventListener("click", () => {
  dialogo.close();
});

document.querySelector("#coriandoli").addEventListener(
  "click",
  lanciaCoriandoli
);

dialogo.addEventListener("close", () => {
  clearInterval(intervallo);
  clearTimeout(intervallo);

  festa.replaceChildren();
  document.body.classList.remove("modale-aperto");

  if (pulsanteDiPartenza) {
    pulsanteDiPartenza.focus();
  }
});
