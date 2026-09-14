/* ============================================================
PULSO — SCRIPT PRINCIPAL
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

/* ==========================================================
1. NAVBAR — SCROLL
========================================================== */

const navbar = document.querySelector(".navbar");

const actualizarNavbar = () => {
if (!navbar) return;

navbar.classList.toggle(
  "scrolled",
  window.scrollY > 40
);

};

window.addEventListener("scroll", actualizarNavbar);
actualizarNavbar();

/* ==========================================================
2. MENÚ MOBILE
========================================================== */

const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

if (menuToggle && navMenu) {

menuToggle.addEventListener("click", () => {

  const abierto =
    navMenu.classList.toggle("activo");

  menuToggle.classList.toggle(
    "activo",
    abierto
  );

  menuToggle.setAttribute(
    "aria-expanded",
    abierto ? "true" : "false"
  );

});


navMenu.querySelectorAll("a").forEach((enlace) => {

  enlace.addEventListener("click", () => {

    navMenu.classList.remove("activo");
    menuToggle.classList.remove("activo");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});

}

/* ==========================================================
3. ANIMACIONES AL HACER SCROLL
========================================================== */

const elementosAnimados = document.querySelectorAll(
".section-heading, " +
".nosotros-text, " +
".concept-card, " +
".service-card, " +
".project-card, " +
".process-step, " +
".why-card, " +
".cta-container, " +
".contact-item"
);

if ("IntersectionObserver" in window) {

const observer = new IntersectionObserver(
  (entradas, observador) => {

    entradas.forEach((entrada) => {

      if (!entrada.isIntersecting) return;

      entrada.target.classList.add("visible");

      observador.unobserve(entrada.target);

    });

  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);


elementosAnimados.forEach((elemento) => {

  elemento.classList.add("reveal");

  observer.observe(elemento);

});

} else {

elementosAnimados.forEach((elemento) => {
  elemento.classList.add("visible");
});

}

/* ==========================================================
4. ANIMACIÓN ESCALONADA DE TARJETAS
========================================================== */

const grupos = [
".concepts-grid",
".services-grid",
".projects-track",
".why-grid",
".process-grid"
];

grupos.forEach((selector) => {

const grupo = document.querySelector(selector);

if (!grupo) return;

Array.from(grupo.children).forEach(
  (elemento, indice) => {

    elemento.style.setProperty(
      "--animation-delay",
      `${indice * 80}ms`
    );

  }
);

});

/* ==========================================================
5. SMOOTH SCROLL
========================================================== */

const enlacesInternos =
document.querySelectorAll('a[href^="#"]');

enlacesInternos.forEach((enlace) => {

enlace.addEventListener("click", (evento) => {

  const destinoId =
    enlace.getAttribute("href");

  if (!destinoId || destinoId === "#") {
    return;
  }

  const destino =
    document.querySelector(destinoId);

  if (!destino) return;

  evento.preventDefault();

  destino.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

});

});

/* ==========================================================
6. BOTÓN VOLVER ARRIBA
========================================================== */

let botonArriba =
document.querySelector(".btn-volver-arriba");

if (!botonArriba) {

botonArriba =
  document.createElement("button");

botonArriba.className =
  "btn-volver-arriba";

botonArriba.type = "button";

botonArriba.setAttribute(
  "aria-label",
  "Volver arriba"
);

botonArriba.innerHTML = "↑";

document.body.appendChild(botonArriba);

}

const actualizarBotonArriba = () => {

botonArriba.classList.toggle(
  "visible",
  window.scrollY > 600
);

};

window.addEventListener(
"scroll",
actualizarBotonArriba
);

actualizarBotonArriba();

botonArriba.addEventListener("click", () => {

window.scrollTo({
  top: 0,
  behavior: "smooth"
});

});

/* ==========================================================
7. FORMULARIO DE PROYECTO
========================================================== */

const formulario =
document.querySelector("#project-form");

const mensajeFormulario =
document.querySelector("#form-status");

if (formulario) {

formulario.addEventListener(
  "submit",
  (evento) => {

    evento.preventDefault();


    if (!formulario.checkValidity()) {

      formulario.reportValidity();

      return;

    }


    if (mensajeFormulario) {

      mensajeFormulario.textContent =
        "¡Perfecto! Tu proyecto está listo para ser enviado.";

      mensajeFormulario.classList.add(
        "visible"
      );

    }


    console.log(
      "Formulario validado correctamente."
    );

  }
);

}

/* ==========================================================
8. VISTA PREVIA DE IMÁGENES
========================================================== */

const inputImagenes =
document.querySelector("#imagenes-referencia");

const previewImagenes =
document.querySelector("#image-preview-grid");

if (inputImagenes && previewImagenes) {

inputImagenes.addEventListener(
  "change",
  () => {

    previewImagenes.innerHTML = "";

    const archivos =
      Array.from(inputImagenes.files || []);


    archivos.forEach((archivo) => {

      if (!archivo.type.startsWith("image/")) {
        return;
      }


      const contenedor =
        document.createElement("div");

      contenedor.className =
        "image-preview-item";


      const imagen =
        document.createElement("img");

      imagen.src =
        URL.createObjectURL(archivo);

      imagen.alt =
        "Imagen de referencia";


      imagen.addEventListener(
        "load",
        () => {
          URL.revokeObjectURL(imagen.src);
        }
      );


      contenedor.appendChild(imagen);

      previewImagenes.appendChild(
        contenedor
      );

    });

  }
);

}

/* ==========================================================
9. PULSI — INTERFAZ
========================================================== */

const pulsiButton =
document.querySelector("#pulsi-button");

const pulsiChat =
document.querySelector("#pulsi-chat");

const pulsiClose =
document.querySelector("#pulsi-close");

const abrirPulsi = () => {

if (!pulsiChat) return;

pulsiChat.classList.add("active");

pulsiChat.setAttribute(
  "aria-hidden",
  "false"
);

if (pulsiButton) {

  pulsiButton.setAttribute(
    "aria-expanded",
    "true"
  );

}

if (pulsiInput) {
  setTimeout(() => {
    pulsiInput.focus();
  }, 150);
}

};

const cerrarPulsi = () => {

if (!pulsiChat) return;

pulsiChat.classList.remove("active");

pulsiChat.setAttribute(
  "aria-hidden",
  "true"
);

if (pulsiButton) {

  pulsiButton.setAttribute(
    "aria-expanded",
    "false"
  );

}

};

if (pulsiButton) {

pulsiButton.addEventListener(
  "click",
  () => {

    if (
      pulsiChat &&
      pulsiChat.classList.contains("active")
    ) {

      cerrarPulsi();

    } else {

      abrirPulsi();

    }

  }
);

}

if (pulsiClose) {

pulsiClose.addEventListener(
  "click",
  cerrarPulsi
);

}

/* ==========================================================
10. PULSI — PREGUNTAS RÁPIDAS
========================================================== */

const pulsiQuickButtons =
document.querySelectorAll(
".pulsi-quick button"
);

const pulsiInput =
document.querySelector("#pulsi-input");

pulsiQuickButtons.forEach((boton) => {

boton.addEventListener(
  "click",
  () => {

    const pregunta =
      boton.dataset.question ||
      boton.textContent.trim();


    if (pulsiInput) {

      pulsiInput.value =
        pregunta;

      pulsiInput.focus();

    }

  }
);

});

/* ==========================================================
11. PULSI — FORMULARIO
========================================================== */

const pulsiForm =
document.querySelector("#pulsi-form");

if (pulsiForm) {

pulsiForm.addEventListener(
  "submit",
  (evento) => {

    evento.preventDefault();


    const mensaje =
      pulsiInput
        ? pulsiInput.value.trim()
        : "";


    if (!mensaje) return;


    console.log(
      "Mensaje enviado a Pulsi:",
      mensaje
    );


    /*
     * PULSI ESTÁ PREPARADO PARA LA IA REAL.
     *
     * La conexión futura será:
     *
     * PULSI → BACKEND → MODELO DE IA → PULSI
     *
     * La clave secreta NUNCA debe estar
     * dentro de este archivo.
     */

  }
);

}

/* ==========================================================
12. PREFERENCIA DE MOVIMIENTO
========================================================== */

const reducirMovimiento =
window.matchMedia(
"(prefers-reduced-motion: reduce)"
);

if (reducirMovimiento.matches) {

document.documentElement.classList.add(
  "reducir-movimiento"
);

}

/* ==========================================================
13. AÑO AUTOMÁTICO
========================================================== */

const elementosAnio =
document.querySelectorAll("[data-year]");

elementosAnio.forEach((elemento) => {

elemento.textContent =
  new Date().getFullYear();

});

/* ==========================================================
14. CONSOLA
========================================================== */

console.log(
"%cPULSO",
"font-size: 24px; font-weight: 800;"
);

console.log(
"Sitio iniciado correctamente."
);

});
