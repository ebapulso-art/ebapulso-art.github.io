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

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", actualizarNavbar);
  actualizarNavbar();


  /* ==========================================================
     2. MENÚ MOBILE
     ========================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      const abierto = navMenu.classList.toggle("activo");

      menuToggle.classList.toggle("activo", abierto);

      menuToggle.setAttribute(
        "aria-expanded",
        abierto ? "true" : "false"
      );

    });


    /* Cerrar menú al tocar un enlace */

    const enlacesMenu = navMenu.querySelectorAll("a");

    enlacesMenu.forEach((enlace) => {

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
    ".proceso-step, " +
    ".why-card, " +
    ".cta-content, " +
    ".contact-card"
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
    ".projects-grid",
    ".why-grid"
  ];

  grupos.forEach((selector) => {

    const grupo = document.querySelector(selector);

    if (!grupo) return;

    const elementos = grupo.children;

    Array.from(elementos).forEach((elemento, indice) => {

      elemento.style.setProperty(
        "--animation-delay",
        `${indice * 80}ms`
      );

    });

  });


  /* ==========================================================
     5. SMOOTH SCROLL
     ========================================================== */

  const enlacesInternos = document.querySelectorAll(
    'a[href^="#"]'
  );

  enlacesInternos.forEach((enlace) => {

    enlace.addEventListener("click", (evento) => {

      const destinoId = enlace.getAttribute("href");

      if (!destinoId || destinoId === "#") return;

      const destino = document.querySelector(destinoId);

      if (!destino) return;

      evento.preventDefault();

      destino.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* ==========================================================
     6. BOTÓN "VOLVER ARRIBA"
     ========================================================== */

  let botonArriba = document.querySelector(".btn-volver-arriba");

  if (!botonArriba) {

    botonArriba = document.createElement("button");

    botonArriba.className = "btn-volver-arriba";

    botonArriba.type = "button";

    botonArriba.setAttribute(
      "aria-label",
      "Volver arriba"
    );

    botonArriba.innerHTML = "↑";

    document.body.appendChild(botonArriba);

  }


  const actualizarBotonArriba = () => {

    if (window.scrollY > 600) {
      botonArriba.classList.add("visible");
    } else {
      botonArriba.classList.remove("visible");
    }

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
     7. BOTONES DE CONTACTO
     ========================================================== */

  const botonesContacto = document.querySelectorAll(
    'a[href="#contacto"], ' +
    'a[href="#formulario"], ' +
    '.btn-contacto'
  );

  botonesContacto.forEach((boton) => {

    boton.addEventListener("click", () => {

      const destinoId =
        boton.getAttribute("href");

      if (!destinoId || !destinoId.startsWith("#")) {
        return;
      }

      const destino =
        document.querySelector(destinoId);

      if (!destino) return;

      setTimeout(() => {

        destino.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 50);

    });

  });


  /* ==========================================================
     8. FORMULARIO — VALIDACIÓN BÁSICA
     ========================================================== */

  const formulario =
    document.querySelector("#formulario-proyecto");

  const mensajeFormulario =
    document.querySelector("#mensaje-formulario");


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

          mensajeFormulario.classList.add("visible");

        }


        /*
         * IMPORTANTE:
         *
         * Por ahora NO enviamos los datos a ningún servidor.
         *
         * Más adelante este formulario se conectará
         * con Firebase / Firestore.
         */


        console.log(
          "Formulario validado correctamente."
        );

      }
    );

  }


  /* ==========================================================
     9. VISTA PREVIA DE IMÁGENES DEL FORMULARIO
     ========================================================== */

  const inputImagenes =
    document.querySelector("#imagenes-referencia");

  const previewImagenes =
    document.querySelector("#preview-imagenes");


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


          previewImagenes.appendChild(imagen);

        });

      }
    );

  }


  /* ==========================================================
     10. PULSI — INTERFAZ VISUAL
     ========================================================== */

  const pulsiToggle =
    document.querySelector("#pulsi-toggle");

  const pulsiPanel =
    document.querySelector("#pulsi-panel");

  const pulsiCerrar =
    document.querySelector("#pulsi-cerrar");


  const abrirPulsi = () => {

    if (!pulsiPanel) return;

    pulsiPanel.classList.add("activo");

    if (pulsiToggle) {
      pulsiToggle.setAttribute(
        "aria-expanded",
        "true"
      );
    }

  };


  const cerrarPulsi = () => {

    if (!pulsiPanel) return;

    pulsiPanel.classList.remove("activo");

    if (pulsiToggle) {
      pulsiToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }

  };


  if (pulsiToggle) {

    pulsiToggle.addEventListener(
      "click",
      () => {

        if (
          pulsiPanel &&
          pulsiPanel.classList.contains("activo")
        ) {
          cerrarPulsi();
        } else {
          abrirPulsi();
        }

      }
    );

  }


  if (pulsiCerrar) {

    pulsiCerrar.addEventListener(
      "click",
      cerrarPulsi
    );

  }


  /* ==========================================================
     11. PULSI — PREGUNTAS RÁPIDAS
     ========================================================== */

  const pulsiQuickButtons =
    document.querySelectorAll(".pulsi-quick");


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
     12. PULSI — PREPARACIÓN PARA IA REAL
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


        /*
         * PULSI TODAVÍA NO RESPONDE CON PALABRAS CLAVE.
         *
         * Esta función queda preparada para conectarse
         * posteriormente con nuestro backend de IA real.
         *
         * NO vamos a convertir a Pulsi en un chatbot
         * falso de preguntas y respuestas.
         */


        console.log(
          "Mensaje enviado a Pulsi:",
          mensaje
        );


        /*
         * FUTURO:
         *
         * fetch("/api/pulsi", {
         *   method: "POST",
         *   headers: {
         *     "Content-Type": "application/json"
         *   },
         *   body: JSON.stringify({
         *     mensaje
         *   })
         * });
         *
         * La API real estará en el backend.
         * La clave secreta de la IA NUNCA estará
         * dentro de este archivo.
         */

      }
    );

  }


  /* ==========================================================
     13. DETECCIÓN DE PREFERENCIA DE MOVIMIENTO
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
     14. AÑO AUTOMÁTICO DEL FOOTER
     ========================================================== */

  const elementosAnio =
    document.querySelectorAll("[data-year]");


  elementosAnio.forEach((elemento) => {

    elemento.textContent =
      new Date().getFullYear();

  });


  /* ==========================================================
     15. CONSOLA DE DESARROLLO
     ========================================================== */

  console.log(
    "%cPULSO",
    "font-size: 24px; font-weight: 800;"
  );

  console.log(
    "Sitio iniciado correctamente."
  );

});
