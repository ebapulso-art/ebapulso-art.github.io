document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
       ===================================================== */

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
       ===================================================== */

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
       ===================================================== */

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
       ===================================================== */

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
       ===================================================== */

    const enlacesInternos =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    enlacesInternos.forEach((enlace) => {

        enlace.addEventListener(
            "click",
            (evento) => {

                const destinoId =
                    enlace.getAttribute("href");


                if (
                    !destinoId ||
                    destinoId === "#"
                ) {
                    return;
                }


                const destino =
                    document.querySelector(
                        destinoId
                    );


                if (!destino) {
                    return;
                }


                evento.preventDefault();


                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       BOTÓN VOLVER ARRIBA
       ===================================================== */

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
       ===================================================== */

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
       ===================================================== */

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
                        document.createElement(
                            "div"
                        );


                    contenedor.className =
                        "image-preview-item";


                    const imagen =
                        document.createElement(
                            "img"
                        );


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
       ===================================================== */

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


    if (pulsiClose) {

        pulsiClose.addEventListener(
            "click",
            cerrarPulsi
        );

    }


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

            }
        );

    }


    /* =====================================================
       REDUCIR MOVIMIENTO
       ===================================================== */

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
       ===================================================== */

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
       ===================================================== */

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
   CANVAS — VERSIÓN SUAVE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const canvas =
        document.querySelector(
            "#pulsoLogoCanvas"
        );


    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    if (!ctx) return;


    /* =====================================================
       CONFIGURACIÓN
       ===================================================== */

    const W = 1800;
    const H = 300;

    const ORANGE = "#ff6a00";
    const SILVER = "#c8c8c8";

    const LOOP = 11200;


    /* =====================================================
       ESCALA
       ===================================================== */

    let escala = 1;
    let offsetX = 0;
    let offsetY = 0;
    let dpr = 1;


    const ajustarCanvas = () => {

        const rect =
            canvas.getBoundingClientRect();


        dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            Math.max(
                1,
                Math.round(
                    rect.width * dpr
                )
            );


        canvas.height =
            Math.max(
                1,
                Math.round(
                    rect.height * dpr
                )
            );


        escala =
            Math.min(
                rect.width / W,
                rect.height / H
            );


        offsetX =
            (
                rect.width -
                W * escala
            ) / 2;


        offsetY =
            (
                rect.height -
                H * escala
            ) / 2;

    };


    ajustarCanvas();


    window.addEventListener(
        "resize",
        ajustarCanvas
    );


    /* =====================================================
       UTILIDADES
       ===================================================== */

    const clamp = (
        valor,
        minimo = 0,
        maximo = 1
    ) => {

        return Math.max(
            minimo,
            Math.min(
                maximo,
                valor
            )
        );

    };


    const easeInOut = (valor) => {

        valor = clamp(valor);

        return valor < 0.5
            ? 4 * valor * valor * valor
            : 1 -
              Math.pow(
                  -2 * valor + 2,
                  3
              ) / 2;

    };


    const easeOut = (valor) => {

        valor = clamp(valor);

        return 1 -
            Math.pow(
                1 - valor,
                3
            );

    };


    /* =====================================================
       CONSTRUCTOR DE TRAZADOS SUAVES
       ===================================================== */

    const crearRuta = (constructor) => {

        const puntos = [];

        let actual = null;


        const M = (x, y) => {

            actual = { x, y };

            puntos.push({
                x,
                y,
                movimiento: true
            });

        };


        const L = (x, y) => {

            if (!actual) {
                M(x, y);
                return;
            }


            const x0 = actual.x;
            const y0 = actual.y;


            const distancia =
                Math.hypot(
                    x - x0,
                    y - y0
                );


            const pasos =
                Math.max(
                    3,
                    Math.ceil(
                        distancia / 5
                    )
                );


            for (
                let i = 1;
                i <= pasos;
                i++
            ) {

                const t =
                    i / pasos;


                puntos.push({
                    x:
                        x0 +
                        (x - x0) * t,

                    y:
                        y0 +
                        (y - y0) * t,

                    movimiento: false
                });

            }


            actual = {
                x,
                y
            };

        };


        const C = (
            c1x,
            c1y,
            c2x,
            c2y,
            x,
            y
        ) => {

            if (!actual) {
                M(x, y);
                return;
            }


            const x0 = actual.x;
            const y0 = actual.y;


            const pasos = 28;


            for (
                let i = 1;
                i <= pasos;
                i++
            ) {

                const t =
                    i / pasos;


                const u =
                    1 - t;


                puntos.push({
                    x:
                        u * u * u * x0 +
                        3 * u * u * t * c1x +
                        3 * u * t * t * c2x +
                        t * t * t * x,

                    y:
                        u * u * u * y0 +
                        3 * u * u * t * c1y +
                        3 * u * t * t * c2y +
                        t * t * t * y,

                    movimiento: false
                });

            }


            actual = {
                x,
                y
            };

        };


        constructor({
            M,
            L,
            C
        });


        return puntos;

    };


    /* =====================================================
       DIBUJAR RUTA PROGRESIVAMENTE
       ===================================================== */

    const dibujarRuta = (
        puntos,
        progreso,
        opciones = {}
    ) => {

        progreso =
            clamp(progreso);


        if (
            !puntos ||
            puntos.length < 2 ||
            progreso <= 0
        ) {
            return;
        }


        const cantidad =
            Math.max(
                2,
                Math.ceil(
                    puntos.length *
                    progreso
                )
            );


        ctx.save();


        ctx.beginPath();


        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            const punto =
                puntos[i];


            if (punto.movimiento) {

                ctx.moveTo(
                    punto.x,
                    punto.y
                );

            } else {

                ctx.lineTo(
                    punto.x,
                    punto.y
                );

            }

        }


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


        ctx.stroke();


        ctx.restore();

    };


    /* =====================================================
       ECG
       ===================================================== */

    const ECG =
        crearRuta(({ M, L }) => {

            M(-200, 150);

            L(200, 150);

            L(350, 150);

            L(405, 150);

            L(435, 95);

            L(470, 205);

            L(515, 120);

            L(550, 150);

            L(690, 150);

        });


    /* =====================================================
       E
       ===================================================== */

    const E =
        crearRuta(({ M, L }) => {

            M(690, 150);

            L(690, 65);

            L(775, 65);

            M(690, 150);

            L(755, 150);

            M(690, 150);

            L(690, 235);

            L(775, 235);

        });


    /* =====================================================
       B
       ===================================================== */

    const B =
        crearRuta(({ M, L, C }) => {

            M(690, 150);

            L(805, 150);

            L(805, 65);

            L(850, 65);


            C(
                885, 65,
                905, 82,
                905, 105
            );


            C(
                905, 130,
                880, 145,
                805, 150
            );


            M(805, 150);

            L(850, 150);


            C(
                890, 150,
                915, 170,
                915, 195
            );


            C(
                915, 220,
                885, 235,
                850, 235
            );


            L(805, 235);

            L(805, 150);

        });


    /* =====================================================
       A
       ===================================================== */

    const A =
        crearRuta(({ M, L }) => {

            M(690, 150);

            L(965, 150);

            L(1000, 65);

            L(1045, 235);

            M(975, 175);

            L(1025, 175);

        });


    /* =====================================================
       PULSO
       ===================================================== */

    /*
       Esta es la cuarta rama.

       Primero sale del mismo centro que E/B/A
       y después comienza a dibujar la palabra.
    */

    const ramaPulso =
        crearRuta(({ M, L }) => {

            M(690, 150);

            L(1060, 150);

        });


    /* =====================================================
       P
       ===================================================== */

    const P =
        crearRuta(({ M, L, C }) => {

            M(1090, 235);

            L(1090, 65);

            L(1130, 65);


            C(
                1160, 65,
                1175, 82,
                1175, 105
            );


            C(
                1175, 130,
                1158, 145,
                1130, 145
            );


            L(1090, 145);

        });


    /* =====================================================
       U
       ===================================================== */

    const U =
        crearRuta(({ M, L, C }) => {

            M(1200, 65);

            L(1200, 190);


            C(
                1200, 220,
                1218, 235,
                1245, 235
            );


            C(
                1272, 235,
                1290, 220,
                1290, 190
            );


            L(1290, 65);

        });


    /* =====================================================
       L
       ===================================================== */

    const L =
        crearRuta(({ M, L }) => {

            M(1325, 65);

            L(1325, 235);

            L(1385, 235);

        });


    /* =====================================================
       S
       ===================================================== */

    const S =
        crearRuta(({ M, C }) => {

            M(1460, 78);


            C(
                1445, 67,
                1420, 64,
                1398, 70
            );


            C(
                1378, 76,
                1370, 92,
                1378, 108
            );


            C(
                1387, 126,
                1418, 136,
                1440, 147
            );


            C(
                1462, 158,
                1470, 176,
                1462, 196
            );


            C(
                1452, 220,
                1424, 237,
                1392, 230
            );


            C(
                1382, 228,
                1373, 223,
                1365, 216
            );

        });


    /* =====================================================
       O
       ===================================================== */

    const O =
        crearRuta(({ M, L, C }) => {

            M(1510, 100);


            C(
                1510, 76,
                1528, 65,
                1548, 65
            );


            C(
                1568, 65,
                1585, 76,
                1585, 100
            );


            L(1585, 200);


            C(
                1585, 224,
                1568, 235,
                1548, 235
            );


            C(
                1528, 235,
                1510, 224,
                1510, 200
            );


            L(1510, 100);

        });


    const letrasPulso = [
        P,
        U,
        L,
        S,
        O
    ];


    const ramasEBA = [
        E,
        B,
        A
    ];


    /* =====================================================
       GLOW
       ===================================================== */

    const dibujarGlow =
        (intensidad) => {

            intensidad =
                clamp(intensidad);


            if (intensidad <= 0) {
                return;
            }


            ctx.save();


            const gradiente =
                ctx.createRadialGradient(
                    1080,
                    150,
                    10,
                    1080,
                    150,
                    600
                );


            gradiente.addColorStop(
                0,
                `rgba(255,106,0,${0.16 * intensidad})`
            );


            gradiente.addColorStop(
                0.4,
                `rgba(255,106,0,${0.07 * intensidad})`
            );


            gradiente.addColorStop(
                1,
                "rgba(255,106,0,0)"
            );


            ctx.fillStyle =
                gradiente;


            ctx.beginPath();


            ctx.ellipse(
                1080,
                150,
                600,
                115,
                0,
                0,
                Math.PI * 2
            );


            ctx.fill();


            ctx.restore();

        };


    /* =====================================================
       LÍNEA DE SALIDA
       ===================================================== */

    const salida =
        crearRuta(({ M, L }) => {

            M(690, 150);

            L(1050, 150);

            L(1350, 150);

            L(1650, 150);

            L(1980, 150);

        });


    /* =====================================================
       LOGO COMPLETO
       ===================================================== */

    const dibujarLogoCompleto = () => {

        ramasEBA.forEach(
            (rama) => {

                dibujarRuta(
                    rama,
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


        /*
         * La cuarta rama llega primero hasta P
         * y después se dibuja la palabra.
         */

        dibujarRuta(
            ramaPulso,
            1,
            {
                color: SILVER,
                grosor: 5.5,
                glow: ORANGE,
                glowBlur: 12
            }
        );


        letrasPulso.forEach(
            (letra) => {

                dibujarRuta(
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


    const render =
        (tiempo) => {

            /*
             * Limpiar correctamente el Canvas.
             */

            ctx.setTransform(
                1,
                0,
                0,
                1,
                0,
                0
            );


            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            /*
             * Aplicar escala.
             */

            ctx.setTransform(
                dpr * escala,
                0,
                0,
                dpr * escala,
                dpr * offsetX,
                dpr * offsetY
            );


            const t =
                tiempo % LOOP;


            /* =============================================
               ETAPA 1
               ECG
               ============================================= */

            if (t < 2700) {

                const progreso =
                    easeOut(
                        t / 2700
                    );


                dibujarRuta(
                    ECG,
                    progreso,
                    {
                        color: ORANGE,
                        grosor:
                            1.2 +
                            4.3 * progreso,
                        glow: ORANGE,
                        glowBlur:
                            4 +
                            12 * progreso
                    }
                );


                return;

            }


            /* ECG COMPLETO */

            dibujarRuta(
                ECG,
                1,
                {
                    color: ORANGE,
                    grosor: 5.5,
                    glow: ORANGE,
                    glowBlur: 16
                }
            );


            /* =============================================
               ETAPA 2
               DIVISIÓN EN 4
               ============================================= */

            if (
                t >= 2700 &&
                t < 6100
            ) {

                const progreso =
                    easeInOut(
                        (t - 2700) /
                        3400
                    );


                /*
                 * E, B y A nacen simultáneamente
                 * desde el mismo centro.
                 */

                ramasEBA.forEach(
                    (rama) => {

                        dibujarRuta(
                            rama,
                            progreso,
                            {
                                color: SILVER,
                                grosor:
                                    1.8 +
                                    3.7 * progreso,
                                glow: ORANGE,
                                glowBlur:
                                    8 +
                                    7 * progreso
                            }
                        );

                    }
                );


                /*
                 * CUARTA RAMA:
                 * centro → PULSO
                 */

                dibujarRuta(
                    ramaPulso,
                    progreso,
                    {
                        color: SILVER,
                        grosor:
                            1.8 +
                            3.7 * progreso,
                        glow: ORANGE,
                        glowBlur:
                            8 +
                            7 * progreso
                    }
                );


                /*
                 * PULSO se construye letra por letra,
                 * pero cada letra se dibuja desde cero.
                 */

                const progresoPulso =
                    clamp(
                        (
                            progreso -
                            0.12
                        ) / 0.88
                    );


                letrasPulso.forEach(
                    (letra, indice) => {

                        const inicioLetra =
                            indice /
                            letrasPulso.length;


                        const finLetra =
                            (indice + 1) /
                            letrasPulso.length;


                        const progresoLetra =
                            clamp(
                                (
                                    progresoPulso -
                                    inicioLetra
                                ) /
                                (
                                    finLetra -
                                    inicioLetra
                                )
                            );


                        dibujarRuta(
                            letra,
                            easeOut(
                                progresoLetra
                            ),
                            {
                                color: SILVER,
                                grosor:
                                    1.8 +
                                    3.7 * progreso,
                                glow: ORANGE,
                                glowBlur:
                                    8 +
                                    7 * progreso
                            }
                        );

                    }
                );


                dibujarGlow(
                    progreso
                );


                return;

            }


            /* =============================================
               ETAPA 3
               LOGO COMPLETO
               ============================================= */

            if (
                t >= 6100 &&
                t < 7500
            ) {

                dibujarLogoCompleto();

                dibujarGlow(1);

                return;

            }


            /* =============================================
               ETAPA 4
               CONVERGENCIA
               ============================================= */

            if (
                t >= 7500 &&
                t < 9000
            ) {

                const progreso =
                    easeInOut(
                        (t - 7500) /
                        1500
                    );


                /*
                 * Las cuatro ramas se retraen
                 * simultáneamente.
                 */

                ramasEBA.forEach(
                    (rama) => {

                        dibujarRuta(
                            rama,
                            1 - progreso,
                            {
                                color: SILVER,
                                grosor:
                                    5.5 -
                                    2.5 * progreso,
                                glow: ORANGE,
                                glowBlur:
                                    12 -
                                    5 * progreso
                            }
                        );

                    }
                );


                /*
                 * La cuarta rama también vuelve
                 * al centro.
                 */

                dibujarRuta(
                    ramaPulso,
                    1 - progreso,
                    {
                        color: SILVER,
                        grosor:
                            5.5 -
                            2.5 * progreso,
                        glow: ORANGE,
                        glowBlur:
                            12 -
                            5 * progreso
                    }
                );


                /*
                 * PULSO se retrae junto con la
                 * cuarta rama.
                 */

                letrasPulso.forEach(
                    (letra) => {

                        dibujarRuta(
                            letra,
                            1 - progreso,
                            {
                                color: SILVER,
                                grosor:
                                    5.5 -
                                    2.5 * progreso,
                                glow: ORANGE,
                                glowBlur:
                                    12 -
                                    5 * progreso
                            }
                        );

                    }
                );


                /*
                 * ECG sigue presente debajo.
                 */

                dibujarRuta(
                    ECG,
                    1,
                    {
                        color: ORANGE,
                        grosor:
                            5.5 -
                            progreso,
                        glow: ORANGE,
                        glowBlur:
                            16 -
                            5 * progreso
                    }
                );


                dibujarGlow(
                    1 - progreso
                );


                return;

            }


            /* =============================================
               ETAPA 5
               SALIDA
               ============================================= */

            const progresoSalida =
                clamp(
                    (
                        t - 9000
                    ) / 2200
                );


            const salidaSuave =
                easeInOut(
                    progresoSalida
                );


            /*
             * Una sola línea continúa desde
             * el centro hacia el extremo derecho.
             */

            dibujarRuta(
                salida,
                1,
                {
                    color: ORANGE,

                    grosor:
                        5.2 -
                        4.4 *
                        salidaSuave,

                    glow: ORANGE,

                    glowBlur:
                        14 -
                        12 *
                        salidaSuave,

                    alpha:
                        1 -
                        Math.pow(
                            progresoSalida,
                            1.7
                        )
                }
            );

        };


    /* =====================================================
       INICIAR
       ===================================================== */

    const movimientoReducido =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (movimientoReducido) {

        ctx.setTransform(
            dpr * escala,
            0,
            0,
            dpr * escala,
            dpr * offsetX,
            dpr * offsetY
        );


        dibujarRuta(
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


    const animar =
        (ahora) => {

            render(
                ahora - inicio
            );


            requestAnimationFrame(
                animar
            );

        };


    requestAnimationFrame(
        animar
    );

});
