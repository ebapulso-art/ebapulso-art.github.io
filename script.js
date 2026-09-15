document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   NAVBAR
====================================================== */

const navbar = document.querySelector(".navbar");

const actualizarNavbar = () => {

    if (!navbar) return;

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );

};

window.addEventListener(
    "scroll",
    actualizarNavbar
);

actualizarNavbar();


/* =====================================================
   MENÚ MOBILE
====================================================== */

const menuToggle =
    document.querySelector("#menu-toggle");

const navMenu =
    document.querySelector("#nav-menu");

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


/* =====================================================
   ANIMACIONES AL HACER SCROLL
====================================================== */

const elementosAnimados =
    document.querySelectorAll(
        ".section-heading, " +
        ".nosotros-text, " +
        ".concept-card, " +
        ".service-card, " +
        ".project-card, " +
        ".process-step, " +
        ".why-card, " +
        ".cta, " +
        ".contact-item"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entradas, observador) => {

                entradas.forEach((entrada) => {

                    if (!entrada.isIntersecting) {
                        return;
                    }

                    entrada.target.classList.add(
                        "visible"
                    );

                    observador.unobserve(
                        entrada.target
                    );

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


/* =====================================================
   ANIMACIONES ESCALONADAS
====================================================== */

const grupos = [
    ".concepts-grid",
    ".services-grid",
    ".projects-track",
    ".why-grid",
    ".process-grid"
];


grupos.forEach((selector) => {

    const grupo =
        document.querySelector(selector);

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


/* =====================================================
   ENLACES INTERNOS
====================================================== */

const enlacesInternos =
    document.querySelectorAll(
        'a[href^="#"]'
    );


enlacesInternos.forEach((enlace) => {

    enlace.addEventListener("click", (evento) => {

        const destinoId =
            enlace.getAttribute("href");


        if (
            !destinoId ||
            destinoId === "#"
        ) {
            return;
        }


        const destino =
            document.querySelector(destinoId);


        if (!destino) {
            return;
        }


        evento.preventDefault();


        destino.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =====================================================
   BOTÓN VOLVER ARRIBA
====================================================== */

let botonArriba =
    document.querySelector(
        ".btn-volver-arriba"
    );


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

    document.body.appendChild(
        botonArriba
    );

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


botonArriba.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =====================================================
   FORMULARIO
====================================================== */

const formulario =
    document.querySelector(
        "#project-form"
    );


const mensajeFormulario =
    document.querySelector(
        "#form-status"
    );


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


/* =====================================================
   PREVISUALIZACIÓN DE IMÁGENES
====================================================== */

const inputImagenes =
    document.querySelector(
        "#imagenes-referencia"
    );


const previewImagenes =
    document.querySelector(
        "#image-preview-grid"
    );


if (
    inputImagenes &&
    previewImagenes
) {

    inputImagenes.addEventListener(
        "change",
        () => {

            previewImagenes.innerHTML = "";


            const archivos =
                Array.from(
                    inputImagenes.files || []
                );


            archivos.forEach((archivo) => {

                if (
                    !archivo.type.startsWith(
                        "image/"
                    )
                ) {
                    return;
                }


                const contenedor =
                    document.createElement("div");

                contenedor.className =
                    "image-preview-item";


                const imagen =
                    document.createElement("img");


                imagen.src =
                    URL.createObjectURL(
                        archivo
                    );

                imagen.alt =
                    "Imagen de referencia";


                imagen.addEventListener(
                    "load",
                    () => {

                        URL.revokeObjectURL(
                            imagen.src
                        );

                    }
                );


                contenedor.appendChild(
                    imagen
                );


                previewImagenes.appendChild(
                    contenedor
                );

            });

        }
    );

}


/* =====================================================
   PULSI
====================================================== */

const pulsiButton =
    document.querySelector(
        "#pulsi-button"
    );


const pulsiChat =
    document.querySelector(
        "#pulsi-chat"
    );


const pulsiClose =
    document.querySelector(
        "#pulsi-close"
    );


const pulsiInput =
    document.querySelector(
        "#pulsi-input"
    );


const pulsiForm =
    document.querySelector(
        "#pulsi-form"
    );


const pulsiQuickButtons =
    document.querySelectorAll(
        ".pulsi-quick button"
    );


/* =====================================================
   ABRIR PULSI
====================================================== */

const abrirPulsi = () => {

    if (!pulsiChat) return;


    pulsiChat.classList.add(
        "active"
    );


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


/* =====================================================
   CERRAR PULSI
====================================================== */

const cerrarPulsi = () => {

    if (!pulsiChat) return;


    pulsiChat.classList.remove(
        "active"
    );


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


/* =====================================================
   BOTÓN PULSI
====================================================== */

if (pulsiButton) {

    pulsiButton.addEventListener(
        "click",
        () => {

            if (
                pulsiChat &&
                pulsiChat.classList.contains(
                    "active"
                )
            ) {

                cerrarPulsi();

            } else {

                abrirPulsi();

            }

        }
    );

}


/* =====================================================
   CERRAR PULSI
====================================================== */

if (pulsiClose) {

    pulsiClose.addEventListener(
        "click",
        cerrarPulsi
    );

}


/* =====================================================
   BOTONES RÁPIDOS DE PULSI
====================================================== */

pulsiQuickButtons.forEach(
    (boton) => {

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

    }
);


/* =====================================================
   FORMULARIO DE PULSI
====================================================== */

if (pulsiForm) {

    pulsiForm.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();


            const mensaje =
                pulsiInput
                    ? pulsiInput.value.trim()
                    : "";


            if (!mensaje) {
                return;
            }


            console.log(
                "Mensaje enviado a Pulsi:",
                mensaje
            );


            /*
             * PULSI ESTÁ PREPARADO PARA
             * CONECTARSE A UNA IA REAL.
             *
             * Arquitectura futura:
             *
             * PULSI
             *    ↓
             * BACKEND SEGURO
             *    ↓
             * MODELO DE IA
             *    ↓
             * RESPUESTA
             *    ↓
             * PULSI
             *
             * La clave de API NUNCA debe
             * estar dentro de este archivo.
             */

        }
    );

}


/* =====================================================
   REDUCIR MOVIMIENTO
====================================================== */

const reducirMovimiento =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducirMovimiento.matches) {

    document.documentElement.classList.add(
        "reducir-movimiento"
    );

}


/* =====================================================
   AÑO AUTOMÁTICO
====================================================== */

const elementosAnio =
    document.querySelectorAll(
        "[data-year]"
    );


elementosAnio.forEach(
    (elemento) => {

        elemento.textContent =
            new Date().getFullYear();

    }
);


/* =====================================================
   MENSAJE DE CONSOLA
====================================================== */

console.log(
    "%cPULSO",
    "font-size: 24px; font-weight: 800;"
);

console.log(
    "Sitio iniciado correctamente."
);

});
/* =========================================================
   PULSO — LOGO ECG ANIMADO
   CANVAS — VERSIÓN FINAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.querySelector("#pulsoLogoCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;


    /* =====================================================
       CONFIGURACIÓN GENERAL
       ===================================================== */

    const W = 1800;
    const H = 300;

    const ORANGE = "#ff6a00";
    const SILVER = "#c9c9c9";

    const DURACION_LOOP = 11000;


    /* =====================================================
       ESCALA RESPONSIVE
       ===================================================== */

    const ajustarCanvas = () => {

        const rect = canvas.getBoundingClientRect();

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = Math.max(
            1,
            Math.round(rect.width * dpr)
        );

        canvas.height = Math.max(
            1,
            Math.round(rect.height * dpr)
        );

        const escala = Math.min(
            rect.width / W,
            rect.height / H
        );

        const desplazamientoX =
            (rect.width - W * escala) / 2;

        const desplazamientoY =
            (rect.height - H * escala) / 2;

        ctx.setTransform(
            dpr * escala,
            0,
            0,
            dpr * escala,
            dpr * desplazamientoX,
            dpr * desplazamientoY
        );

    };


    ajustarCanvas();

    window.addEventListener(
        "resize",
        ajustarCanvas
    );


    /* =====================================================
       UTILIDADES
       ===================================================== */

    const limitar = (valor, minimo = 0, maximo = 1) => {

        return Math.max(
            minimo,
            Math.min(maximo, valor)
        );

    };


    const suavizar = (valor) => {

        valor = limitar(valor);

        return valor < 0.5
            ? 4 * valor * valor * valor
            : 1 - Math.pow(
                -2 * valor + 2,
                3
            ) / 2;

    };


    const suavizarSalida = (valor) => {

        valor = limitar(valor);

        return 1 - Math.pow(
            1 - valor,
            3
        );

    };


    const interpolar = (a, b, t) => {

        return a + (b - a) * t;

    };


    /* =====================================================
       CONSTRUIR TRAZADO
       ===================================================== */

    const crearTrazo = (segmentos) => {

        const puntos = [];

        segmentos.forEach(
            ([inicio, final]) => {

                const distancia = Math.hypot(
                    final[0] - inicio[0],
                    final[1] - inicio[1]
                );

                const pasos = Math.max(
                    2,
                    Math.ceil(distancia / 7)
                );

                for (
                    let i = 0;
                    i <= pasos;
                    i++
                ) {

                    const t = i / pasos;

                    puntos.push([
                        interpolar(
                            inicio[0],
                            final[0],
                            t
                        ),
                        interpolar(
                            inicio[1],
                            final[1],
                            t
                        )
                    ]);

                }

            }
        );

        return puntos;

    };


    /* =====================================================
       DIBUJAR TRAZO
       ===================================================== */

    const dibujarTrazo = (
        puntos,
        progreso,
        opciones = {}
    ) => {

        if (
            !puntos ||
            puntos.length < 2
        ) {
            return;
        }

        progreso = limitar(progreso);

        if (progreso <= 0) return;

        const cantidad = Math.max(
            2,
            Math.ceil(
                progreso *
                (puntos.length - 1)
            )
        );

        ctx.save();

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.lineWidth =
            opciones.grosor || 5;

        ctx.strokeStyle =
            opciones.color || ORANGE;

        ctx.shadowColor =
            opciones.glow || ORANGE;

        ctx.shadowBlur =
            opciones.glowBlur || 10;

        ctx.globalAlpha =
            opciones.alpha ?? 1;

        ctx.beginPath();

        ctx.moveTo(
            puntos[0][0],
            puntos[0][1]
        );

        for (
            let i = 1;
            i < cantidad;
            i++
        ) {

            ctx.lineTo(
                puntos[i][0],
                puntos[i][1]
            );

        }

        ctx.stroke();

        ctx.restore();

    };


    /* =====================================================
       ECG — ENTRADA DESDE EL EXTREMO IZQUIERDO
       ===================================================== */

    const ECG = crearTrazo([

        [[-180, 150], [180, 150]],

        [[180, 150], [350, 150]],

        [[350, 150], [405, 150]],

        [[405, 150], [435, 95]],

        [[435, 95], [470, 205]],

        [[470, 205], [515, 120]],

        [[515, 120], [550, 150]],

        [[550, 150], [690, 150]]

    ]);


    /* =====================================================
       CUATRO RAMAS QUE NACEN DEL CENTRO
       ===================================================== */

    /*
       Las cuatro ramas parten del mismo punto:

       1 → E
       2 → B
       3 → A
       4 → PULSO
    */


    /* =====================================================
       RAMA E
       ===================================================== */

    const ramaE = crearTrazo([

        [[690, 150], [690, 65]],

        [[690, 65], [765, 65]],

        [[690, 150], [755, 150]],

        [[690, 150], [690, 235]],

        [[690, 235], [765, 235]]

    ]);


    /* =====================================================
       RAMA B
       ===================================================== */

    const ramaB = crearTrazo([

        [[690, 150], [805, 150]],

        [[805, 150], [805, 65]],

        [[805, 65], [855, 65]],

        [[855, 65], [885, 78]],

        [[885, 78], [900, 100]],

        [[900, 100], [900, 118]],

        [[900, 118], [885, 135]],

        [[885, 135], [805, 150]],

        [[805, 150], [865, 150]],

        [[865, 150], [895, 165]],

        [[895, 165], [910, 188]],

        [[910, 188], [910, 205]],

        [[910, 205], [895, 222]],

        [[895, 222], [865, 235]],

        [[865, 235], [805, 235]],

        [[805, 235], [805, 150]]

    ]);


    /* =====================================================
       RAMA A
       ===================================================== */

    const ramaA = crearTrazo([

        [[690, 150], [965, 150]],

        [[965, 150], [995, 65]],

        [[995, 65], [1045, 235]],

        [[975, 175], [1025, 175]]

    ]);


    /* =====================================================
       RAMA PULSO
       ===================================================== */

    /*
       Esta rama sale del centro y se convierte
       progresivamente en la palabra PULSO.
    */


    /* P */

    const letraP = crearTrazo([

        [[1085, 235], [1085, 65]],

        [[1085, 65], [1130, 65]],

        [[1130, 65], [1160, 80]],

        [[1160, 80], [1170, 105]],

        [[1170, 105], [1160, 130]],

        [[1160, 130], [1130, 145]],

        [[1130, 145], [1085, 145]]

    ]);


    /* U */

    const letraU = crearTrazo([

        [[1200, 65], [1200, 195]],

        [[1200, 195], [1210, 220]],

        [[1210, 220], [1235, 235]],

        [[1235, 235], [1260, 235]],

        [[1260, 235], [1285, 220]],

        [[1285, 220], [1295, 195]],

        [[1295, 195], [1295, 65]]

    ]);


    /* L */

    const letraL = crearTrazo([

        [[1325, 65], [1325, 235]],

        [[1325, 235], [1385, 235]]

    ]);


    /* S */

    const letraS = crearTrazo([

        [[1460, 80], [1440, 68]],

        [[1440, 68], [1400, 68]],

        [[1400, 68], [1378, 82]],

        [[1378, 82], [1378, 108]],

        [[1378, 108], [1395, 128]],

        [[1395, 128], [1440, 148]],

        [[1440, 148], [1460, 168]],

        [[1460, 168], [1460, 200]],

        [[1460, 200], [1438, 220]],

        [[1438, 220], [1400, 235]],

        [[1400, 235], [1368, 218]]

    ]);


    /* O */

    const letraO = crearTrazo([

        [[1500, 100], [1510, 75]],

        [[1510, 75], [1535, 65]],

        [[1535, 65], [1560, 75]],

        [[1560, 75], [1575, 100]],

        [[1575, 100], [1575, 200]],

        [[1575, 200], [1560, 225]],

        [[1560, 225], [1535, 235]],

        [[1535, 235], [1510, 225]],

        [[1510, 225], [1500, 200]],

        [[1500, 200], [1500, 100]]

    ]);


    const palabraPulso = [

        letraP,
        letraU,
        letraL,
        letraS,
        letraO

    ];


    const ramas = [

        ramaE,
        ramaB,
        ramaA

    ];


    /* =====================================================
       GLOW CENTRAL
       ===================================================== */

    const dibujarGlow = (intensidad) => {

        intensidad = limitar(intensidad);

        if (intensidad <= 0) return;

        ctx.save();

        const gradiente =
            ctx.createRadialGradient(
                1050,
                150,
                5,
                1050,
                150,
                560
            );

        gradiente.addColorStop(
            0,
            `rgba(255,106,0,${0.18 * intensidad})`
        );

        gradiente.addColorStop(
            0.35,
            `rgba(255,106,0,${0.08 * intensidad})`
        );

        gradiente.addColorStop(
            1,
            "rgba(255,106,0,0)"
        );

        ctx.fillStyle = gradiente;

        ctx.beginPath();

        ctx.ellipse(
            1050,
            150,
            560,
            120,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    };


    /* =====================================================
       DIBUJAR LOGO COMPLETO
       ===================================================== */

    const dibujarLogoCompleto = () => {

        dibujarTrazo(
            ramaE,
            1,
            {
                color: SILVER,
                grosor: 5.5,
                glow: ORANGE,
                glowBlur: 12
            }
        );


        dibujarTrazo(
            ramaB,
            1,
            {
                color: SILVER,
                grosor: 5.5,
                glow: ORANGE,
                glowBlur: 12
            }
        );


        dibujarTrazo(
            ramaA,
            1,
            {
                color: SILVER,
                grosor: 5.5,
                glow: ORANGE,
                glowBlur: 12
            }
        );


        palabraPulso.forEach(
            (letra) => {

                dibujarTrazo(
                    letra,
                    1,
                    {
                        color: SILVER,
                        grosor: 5.5,
                        glow: ORANGE,
                        glowBlur: 12
                    }
                );

            }
        );

    };


    /* =====================================================
       ANIMACIÓN
       ===================================================== */

    const inicio =
        performance.now();


    const animar = (ahora) => {

        const tiempo =
            (ahora - inicio) %
            DURACION_LOOP;


        ctx.clearRect(
            -200,
            -50,
            W + 400,
            H + 100
        );


        /* =================================================
           ETAPA 1
           ECG ENTRA DESDE LA IZQUIERDA
           0 → 2800 ms
           ================================================= */

        if (tiempo < 2800) {

            const progreso =
                suavizarSalida(
                    tiempo / 2800
                );

            dibujarTrazo(
                ECG,
                progreso,
                {
                    color: ORANGE,
                    grosor: interpolar(
                        1.2,
                        5.5,
                        progreso
                    ),
                    glow: ORANGE,
                    glowBlur: interpolar(
                        4,
                        17,
                        progreso
                    )
                }
            );


            requestAnimationFrame(
                animar
            );

            return;

        }


        /* ECG queda completo */

        dibujarTrazo(
            ECG,
            1,
            {
                color: ORANGE,
                grosor: 5.5,
                glow: ORANGE,
                glowBlur: 17
            }
        );


        /* =================================================
           ETAPA 2
           LAS 4 RAMAS SE CONSTRUYEN
           2800 → 6000 ms
           ================================================= */

        if (
            tiempo >= 2800 &&
            tiempo < 6000
        ) {

            const progreso =
                suavizar(
                    (tiempo - 2800) / 3200
                );


            /*
               Las tres ramas EBA avanzan
               simultáneamente.
            */

            ramas.forEach(
                (rama) => {

                    dibujarTrazo(
                        rama,
                        progreso,
                        {
                            color: SILVER,
                            grosor: interpolar(
                                2,
                                5.5,
                                progreso
                            ),
                            glow: ORANGE,
                            glowBlur: 13
                        }
                    );

                }
            );


            /*
               PULSO comienza ligeramente después
               para que la lectura visual sea clara.
            */

            const progresoPulso =
                limitar(
                    (
                        progreso - 0.08
                    ) / 0.92
                );


            palabraPulso.forEach(
                (letra, indice) => {

                    const inicioLetra =
                        indice / palabraPulso.length;

                    const finLetra =
                        (indice + 1) /
                        palabraPulso.length;

                    const progresoLetra =
                        limitar(
                            (
                                progresoPulso -
                                inicioLetra
                            ) /
                            (
                                finLetra -
                                inicioLetra
                            )
                        );


                    dibujarTrazo(
                        letra,
                        suavizarSalida(
                            progresoLetra
                        ),
                        {
                            color: SILVER,
                            grosor: interpolar(
                                2,
                                5.5,
                                progreso
                            ),
                            glow: ORANGE,
                            glowBlur: 13
                        }
                    );

                }
            );


            dibujarGlow(
                progreso
            );


            requestAnimationFrame(
                animar
            );

            return;

        }


        /* =================================================
           ETAPA 3
           LOGO COMPLETO
           6000 → 7200 ms
           ================================================= */

        if (
            tiempo >= 6000 &&
            tiempo < 7200
        ) {

            dibujarLogoCompleto();

            dibujarGlow(1);

            requestAnimationFrame(
                animar
            );

            return;

        }


        /* =================================================
           ETAPA 4
           EL LOGO SE DESARMA
           7200 → 8700 ms
           ================================================= */

        if (
            tiempo >= 7200 &&
            tiempo < 8700
        ) {

            const progreso =
                suavizar(
                    (tiempo - 7200) /
                    1500
                );


            /*
               Las letras desaparecen
               progresivamente.
            */

            ramas.forEach(
                (rama, indice) => {

                    const retraso =
                        indice * 0.04;

                    const progresoRama =
                        limitar(
                            (
                                progreso -
                                retraso
                            ) /
                            (1 - retraso)
                        );


                    dibujarTrazo(
                        rama,
                        1 - progresoRama,
                        {
                            color: SILVER,
                            grosor: interpolar(
                                5.5,
                                2,
                                progreso
                            ),
                            glow: ORANGE,
                            glowBlur: 10
                        }
                    );

                }
            );


            palabraPulso.forEach(
                (letra, indice) => {

                    const retraso =
                        0.10 +
                        indice * 0.035;

                    const progresoLetra =
                        limitar(
                            (
                                progreso -
                                retraso
                            ) /
                            (1 - retraso)
                        );


                    dibujarTrazo(
                        letra,
                        1 - progresoLetra,
                        {
                            color: SILVER,
                            grosor: interpolar(
                                5.5,
                                2,
                                progreso
                            ),
                            glow: ORANGE,
                            glowBlur: 10
                        }
                    );

                }
            );


            /*
               La línea naranja vuelve a ocupar
               el espacio del logo.
            */

            dibujarTrazo(
                ECG,
                1,
                {
                    color: ORANGE,
                    grosor: interpolar(
                        5.5,
                        4.5,
                        progreso
                    ),
                    glow: ORANGE,
                    glowBlur: 14
                }
            );


            dibujarGlow(
                1 - progreso
            );


            requestAnimationFrame(
                animar
            );

            return;

        }


        /* =================================================
           ETAPA 5
           LA LÍNEA CONTINÚA HACIA LA DERECHA
           8700 → 11000 ms
           ================================================= */

        const progresoSalida =
            limitar(
                (tiempo - 8700) /
                2300
            );


        const suavizadoSalida =
            suavizarSalida(
                progresoSalida
            );


        const lineaSalida =
            crearTrazo([

                [[690, 150], [1050, 150]],

                [[1050, 150], [1350, 150]],

                [[1350, 150], [1650, 150]],

                [[1650, 150], [1950, 150]]

            ]);


        /*
           Primero aparece gruesa,
           después se afina.
        */

        dibujarTrazo(
            lineaSalida,
            1,
            {
                color: ORANGE,
                grosor: interpolar(
                    4.5,
                    0.8,
                    suavizadoSalida
                ),
                glow: ORANGE,
                glowBlur: interpolar(
                    14,
                    1,
                    suavizadoSalida
                ),
                alpha:
                    1 -
                    Math.pow(
                        progresoSalida,
                        1.6
                    )
            }
        );


        requestAnimationFrame(
            animar
        );

    };


    /* =====================================================
       REDUCIR MOVIMIENTO
       ===================================================== */

    const reducirMovimiento =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducirMovimiento) {

        ctx.clearRect(
            -200,
            -50,
            W + 400,
            H + 100
        );


        dibujarTrazo(
            ECG,
            1,
            {
                color: ORANGE,
                grosor: 5,
                glow: ORANGE,
                glowBlur: 10
            }
        );


        dibujarLogoCompleto();

        return;

    }


    /* =====================================================
       INICIAR ANIMACIÓN
       ===================================================== */

    requestAnimationFrame(
        animar
    );

});
