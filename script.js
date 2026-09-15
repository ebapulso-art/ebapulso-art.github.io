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
   CANVAS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.querySelector("#pulsoLogoCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;


    /* =====================================================
       CONFIGURACIÓN
       ===================================================== */

    const DESIGN_WIDTH = 1800;
    const DESIGN_HEIGHT = 300;

    const ORANGE = "#ff6a00";
    const SILVER = "#c7c7c7";

    const LOOP_DURATION = 10500;


    /* =====================================================
       TAMAÑO DEL CANVAS
       ===================================================== */

    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    const ajustarCanvas = () => {

        const rect = canvas.getBoundingClientRect();

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        scale = Math.min(
            rect.width / DESIGN_WIDTH,
            rect.height / DESIGN_HEIGHT
        );

        offsetX =
            (rect.width - DESIGN_WIDTH * scale) / 2;

        offsetY =
            (rect.height - DESIGN_HEIGHT * scale) / 2;

        ctx.setTransform(
            dpr * scale,
            0,
            0,
            dpr * scale,
            dpr * offsetX,
            dpr * offsetY
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

    const clamp = (valor, minimo, maximo) => {

        return Math.max(
            minimo,
            Math.min(maximo, valor)
        );

    };


    const easeInOut = (t) => {

        t = clamp(t, 0, 1);

        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;

    };


    const easeOut = (t) => {

        t = clamp(t, 0, 1);

        return 1 - Math.pow(1 - t, 3);

    };


    const lerp = (a, b, t) => {

        return a + (b - a) * t;

    };


    const distancia = (a, b) => {

        return Math.hypot(
            b[0] - a[0],
            b[1] - a[1]
        );

    };


    /* =====================================================
       CONSTRUIR PUNTOS INTERMEDIOS
       ===================================================== */

    const construirPuntos = (segmentos) => {

        const puntos = [];

        segmentos.forEach((segmento) => {

            const inicio = segmento[0];
            const final = segmento[1];

            const largo =
                distancia(inicio, final);

            const pasos =
                Math.max(
                    2,
                    Math.ceil(largo / 8)
                );

            for (let i = 0; i <= pasos; i++) {

                const t = i / pasos;

                puntos.push([
                    lerp(
                        inicio[0],
                        final[0],
                        t
                    ),
                    lerp(
                        inicio[1],
                        final[1],
                        t
                    )
                ]);

            }

        });

        return puntos;

    };


    /* =====================================================
       DIBUJAR UNA LÍNEA PROGRESIVAMENTE
       ===================================================== */

    const dibujarPuntos = (
        puntos,
        progreso,
        opciones = {}
    ) => {

        if (!puntos || puntos.length < 2) {
            return;
        }

        progreso = clamp(progreso, 0, 1);

        const cantidad =
            Math.max(
                2,
                Math.floor(
                    progreso *
                    (puntos.length - 1)
                ) + 1
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
       ECG PRINCIPAL
       ===================================================== */

    const ecg = construirPuntos([

        [[-120, 150], [180, 150]],

        [[180, 150], [360, 150]],

        [[360, 150], [410, 150]],

        [[410, 150], [440, 95]],

        [[440, 95], [475, 205]],

        [[475, 205], [520, 125]],

        [[520, 125], [555, 150]],

        [[555, 150], [720, 150]]

    ]);


    /* =====================================================
       LÍNEA DE SALIDA
       ===================================================== */

    const salida = construirPuntos([

        [[720, 150], [1050, 150]],

        [[1050, 150], [1350, 150]],

        [[1350, 150], [1650, 150]],

        [[1650, 150], [1920, 150]]

    ]);


    /* =====================================================
       E
       ===================================================== */

    const letraE = construirPuntos([

        [[720, 150], [720, 65]],

        [[720, 65], [790, 65]],

        [[720, 150], [785, 150]],

        [[720, 150], [720, 235]],

        [[720, 235], [790, 235]]

    ]);


    /* =====================================================
       B
       ===================================================== */

    const letraB = construirPuntos([

        [[815, 65], [815, 235]],

        [[815, 65], [870, 65]],

        [[870, 65], [900, 80]],

        [[900, 80], [910, 105]],

        [[910, 105], [900, 125]],

        [[900, 125], [815, 150]],

        [[815, 150], [875, 150]],

        [[875, 150], [905, 165]],

        [[905, 165], [915, 190]],

        [[915, 190], [900, 215]],

        [[900, 215], [870, 235]],

        [[870, 235], [815, 235]]

    ]);


    /* =====================================================
       A
       ===================================================== */

    const letraA = construirPuntos([

        [[940, 235], [990, 65]],

        [[990, 65], [1040, 235]],

        [[965, 155], [1018, 155]]

    ]);


    /* =====================================================
       P
       ===================================================== */

    const letraP = construirPuntos([

        [[1080, 235], [1080, 65]],

        [[1080, 65], [1130, 65]],

        [[1130, 65], [1160, 80]],

        [[1160, 80], [1170, 105]],

        [[1170, 105], [1160, 130]],

        [[1160, 130], [1130, 145]],

        [[1130, 145], [1080, 145]]

    ]);


    /* =====================================================
       U
       ===================================================== */

    const letraU = construirPuntos([

        [[1200, 65], [1200, 195]],

        [[1200, 195], [1215, 225]],

        [[1215, 225], [1245, 235]],

        [[1245, 235], [1275, 225]],

        [[1275, 225], [1290, 195]],

        [[1290, 195], [1290, 65]]

    ]);


    /* =====================================================
       L
       ===================================================== */

    const letraL = construirPuntos([

        [[1320, 65], [1320, 235]],

        [[1320, 235], [1380, 235]]

    ]);


    /* =====================================================
       S
       ===================================================== */

    const letraS = construirPuntos([

        [[1460, 80], [1435, 65]],

        [[1435, 65], [1395, 65]],

        [[1395, 65], [1375, 80]],

        [[1375, 80], [1375, 110]],

        [[1375, 110], [1395, 130]],

        [[1395, 130], [1440, 150]],

        [[1440, 150], [1460, 175]],

        [[1460, 175], [1460, 205]],

        [[1460, 205], [1440, 225]],

        [[1440, 225], [1400, 235]],

        [[1400, 235], [1370, 220]]

    ]);


    /* =====================================================
       O
       ===================================================== */

    const letraO = construirPuntos([

        [[1500, 95], [1515, 70]],

        [[1515, 70], [1545, 65]],

        [[1545, 65], [1570, 80]],

        [[1570, 80], [1580, 110]],

        [[1580, 110], [1580, 190]],

        [[1580, 190], [1570, 220]],

        [[1570, 220], [1545, 235]],

        [[1545, 235], [1515, 230]],

        [[1515, 230], [1500, 205]],

        [[1500, 205], [1500, 95]]

    ]);


    /* =====================================================
       TODAS LAS PARTES DEL LOGO
       ===================================================== */

    const logoPartes = [

        letraE,
        letraB,
        letraA,
        letraP,
        letraU,
        letraL,
        letraS,
        letraO

    ];


    /* =====================================================
       DIBUJAR GLOW
       ===================================================== */

    const dibujarGlowCentral = (intensidad) => {

        if (intensidad <= 0) return;

        ctx.save();

        const gradiente =
            ctx.createRadialGradient(
                1050,
                150,
                10,
                1050,
                150,
                500
            );

        gradiente.addColorStop(
            0,
            `rgba(255,106,0,${0.16 * intensidad})`
        );

        gradiente.addColorStop(
            0.45,
            `rgba(255,106,0,${0.07 * intensidad})`
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
            500,
            120,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    };


    /* =====================================================
       DIBUJAR UNA PARTE DEL LOGO
       ===================================================== */

    const dibujarParteLogo = (
        puntos,
        progreso,
        grosor
    ) => {

        dibujarPuntos(
            puntos,
            progreso,
            {
                color: SILVER,
                grosor,
                glow: ORANGE,
                glowBlur: 12
            }
        );

    };


    /* =====================================================
       LOOP
       ===================================================== */

    let inicio = performance.now();


    const animar = (ahora) => {

        const transcurrido =
            ahora - inicio;

        const tiempo =
            transcurrido % LOOP_DURATION;


        ctx.clearRect(
            0,
            0,
            DESIGN_WIDTH,
            DESIGN_HEIGHT
        );


        /* =================================================
           1 — ECG ENTRANDO
           0 → 2600 ms
           ================================================= */

        if (tiempo < 2600) {

            const progreso =
                easeOut(
                    tiempo / 2600
                );

            const grosor =
                lerp(
                    1.5,
                    5.5,
                    progreso
                );

            dibujarPuntos(
                ecg,
                progreso,
                {
                    color: ORANGE,
                    grosor,
                    glow: ORANGE,
                    glowBlur: 16
                }
            );

            requestAnimationFrame(animar);

            return;
        }


        /* =================================================
           ECG COMPLETO
           ================================================= */

        dibujarPuntos(
            ecg,
            1,
            {
                color: ORANGE,
                grosor: 5.5,
                glow: ORANGE,
                glowBlur: 16
            }
        );


        /* =================================================
           2 — LOGO SE CONSTRUYE
           2600 → 5900 ms
           ================================================= */

        if (
            tiempo >= 2600 &&
            tiempo < 5900
        ) {

            const progresoGlobal =
                (tiempo - 2600) / 3300;

            const progreso =
                easeInOut(
                    progresoGlobal
                );

            const cantidad =
                logoPartes.length;

            logoPartes.forEach(
                (parte, indice) => {

                    const inicioParte =
                        indice / cantidad;

                    const finParte =
                        (indice + 1) / cantidad;

                    const progresoParte =
                        clamp(
                            (
                                progreso -
                                inicioParte
                            ) /
                            (
                                finParte -
                                inicioParte
                            ),
                            0,
                            1
                        );

                    dibujarParteLogo(
                        parte,
                        easeOut(
                            progresoParte
                        ),
                        lerp(
                            2,
                            5.5,
                            progreso
                        )
                    );

                }
            );


            dibujarGlowCentral(
                progreso
            );


            requestAnimationFrame(animar);

            return;
        }


        /* =================================================
           3 — LOGO COMPLETO
           5900 → 7000 ms
           ================================================= */

        if (
            tiempo >= 5900 &&
            tiempo < 7000
        ) {

            logoPartes.forEach(
                (parte) => {

                    dibujarParteLogo(
                        parte,
                        1,
                        5.5
                    );

                }
            );


            dibujarGlowCentral(1);


            requestAnimationFrame(animar);

            return;
        }


        /* =================================================
           4 — LOGO SE DESARMA
           7000 → 8300 ms
           ================================================= */

        if (
            tiempo >= 7000 &&
            tiempo < 8300
        ) {

            const progreso =
                easeInOut(
                    (tiempo - 7000) / 1300
                );


            logoPartes.forEach(
                (parte, indice) => {

                    const retraso =
                        indice * 0.055;

                    const progresoParte =
                        clamp(
                            (
                                progreso -
                                retraso
                            ) /
                            (1 - retraso),
                            0,
                            1
                        );


                    dibujarParteLogo(
                        parte,
                        1 - progresoParte,
                        lerp(
                            5.5,
                            3,
                            progreso
                        )
                    );

                }
            );


            dibujarGlowCentral(
                1 - progreso
            );


            /* Línea central volviendo a aparecer */

            dibujarPuntos(
                salida,
                progreso,
                {
                    color: ORANGE,
                    grosor: lerp(
                        3,
                        5,
                        progreso
                    ),
                    glow: ORANGE,
                    glowBlur: 15
                }
            );


            requestAnimationFrame(animar);

            return;
        }


        /* =================================================
           5 — LÍNEA SALE HACIA LA DERECHA
           8300 → 10500 ms
           ================================================= */

        const progresoSalida =
            clamp(
                (tiempo - 8300) / 2200,
                0,
                1
            );

        const progresoSuave =
            easeInOut(
                progresoSalida
            );


        dibujarPuntos(
            salida,
            1,
            {
                color: ORANGE,
                grosor: lerp(
                    4.5,
                    1,
                    progresoSuave
                ),
                glow: ORANGE,
                glowBlur: lerp(
                    14,
                    2,
                    progresoSuave
                )
            }
        );


        /* Fade real de la línea final */

        const fade =
            1 - Math.pow(
                progresoSalida,
                1.7
            );


        ctx.save();

        ctx.globalAlpha =
            clamp(
                fade,
                0,
                1
            );


        dibujarPuntos(
            salida,
            1,
            {
                color: ORANGE,
                grosor: lerp(
                    4,
                    0.7,
                    progresoSuave
                ),
                glow: ORANGE,
                glowBlur: lerp(
                    12,
                    1,
                    progresoSuave
                )
            }
        );

        ctx.restore();


        requestAnimationFrame(animar);

    };


    /* =====================================================
       REDUCIR MOVIMIENTO
       ===================================================== */

    const movimientoReducido =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (movimientoReducido) {

        ctx.clearRect(
            0,
            0,
            DESIGN_WIDTH,
            DESIGN_HEIGHT
        );


        dibujarPuntos(
            ecg,
            1,
            {
                color: ORANGE,
                grosor: 5,
                glow: ORANGE,
                glowBlur: 10
            }
        );


        logoPartes.forEach(
            (parte) => {

                dibujarParteLogo(
                    parte,
                    1,
                    5
                );

            }
        );

        return;

    }


    /* =====================================================
       INICIAR
       ===================================================== */

    requestAnimationFrame(animar);

});
