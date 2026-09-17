/* ============================================================
   PULSO — SCRIPT PRINCIPAL
   Sistema de interacción + Logo EBA / PULSO animado

   ANIMACIÓN DEL LOGO:
   ECG → pulsaciones variables → convergencia
   → EBA → PULSO → glow → retracción → ECG
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =========================================================
       CONFIGURACIÓN GENERAL
       ========================================================= */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =========================================================
       AÑO DEL FOOTER
       ========================================================= */

    document.querySelectorAll("[data-year]").forEach((elemento) => {
        elemento.textContent = new Date().getFullYear();
    });


    /* =========================================================
       NAVBAR
       ========================================================= */

    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");
    const navbar = document.querySelector(".navbar");


    function cerrarMenu() {

        if (navMenu) {
            navMenu.classList.remove("active");
            navMenu.classList.remove("activo");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        document.body.classList.remove(
            "menu-abierto"
        );

    }


    function abrirMenu() {

        if (navMenu) {
            navMenu.classList.add("active");
        }

        if (menuToggle) {
            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );
        }

        document.body.classList.add(
            "menu-abierto"
        );

    }


    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                if (
                    navMenu &&
                    navMenu.classList.contains("active")
                ) {

                    cerrarMenu();

                } else {

                    abrirMenu();

                }

            }
        );

    }


    /* =========================================================
       NAVEGACIÓN INTERNA
       ========================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const id =
                    link.getAttribute("href");

                if (
                    !id ||
                    id === "#"
                ) {
                    return;
                }

                /*
                 * Pulsi tiene un comportamiento especial.
                 */

                if (
                    id === "#pulsi-container"
                ) {

                    event.preventDefault();

                    cerrarMenu();

                    if (
                        typeof abrirPulsi === "function"
                    ) {
                        abrirPulsi();
                    }

                    return;
                }


                const destino =
                    document.querySelector(id);

                if (!destino) {
                    return;
                }

                event.preventDefault();

                cerrarMenu();


                const alturaNavbar =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const posicion =
                    destino.getBoundingClientRect().top +
                    window.scrollY -
                    alturaNavbar;


                window.scrollTo({

                    top: Math.max(
                        0,
                        posicion
                    ),

                    behavior:
                        reduceMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );

    });


    document.addEventListener(
        "click",
        (event) => {

            if (
                navMenu &&
                navMenu.classList.contains("active") &&
                !navMenu.contains(event.target) &&
                menuToggle &&
                !menuToggle.contains(event.target)
            ) {

                cerrarMenu();

            }

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                cerrarMenu();
            }

        }
    );


    /* =========================================================
       NAVBAR AL HACER SCROLL
       ========================================================= */

    function actualizarNavbar() {

        if (!navbar) {
            return;
        }

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 35
        );

    }


    window.addEventListener(
        "scroll",
        actualizarNavbar,
        {
            passive: true
        }
    );

    actualizarNavbar();


    /* =========================================================
       ANIMACIONES DE ENTRADA
       ========================================================= */

    const elementosAnimados =
        document.querySelectorAll(
            [
                ".section-heading",
                ".service-card",
                ".project-card",
                ".process-step",
                ".why-card",
                ".contact-item",
                ".form-group"
            ].join(",")
        );


    if (
        "IntersectionObserver" in window &&
        !reduceMotion
    ) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "visible"
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );


        elementosAnimados.forEach(
            (elemento) => {
                observer.observe(elemento);
            }
        );

    } else {

        elementosAnimados.forEach(
            (elemento) => {
                elemento.classList.add(
                    "visible"
                );
            }
        );

    }


    /* =========================================================
       =========================================================
       PULSO — LOGO CENTRAL
       =========================================================
       
       CONCEPTO:

       ECG
          ↓
       pulsaciones variables
          ↓
       líneas se acercan al centro
          ↓
       aparece EBA
          ↓
       aparece PULSO debajo
          ↓
       glow
          ↓
       se desarma
          ↓
       vuelve al ECG

       =========================================================
       ========================================================= */

    const canvas =
        document.querySelector(
            "#pulsoLogoCanvas"
        );


    if (canvas) {

        const ctx =
            canvas.getContext("2d");


        if (ctx) {


            /* =================================================
               COLORES
               ================================================= */

            const NARANJA =
                "#ff6a00";

            const NARANJA_SUAVE =
                "#ff8533";

            const BLANCO =
                "#ffffff";

            const BLANCO_SUAVE =
                "#e7eaed";

            const PLATA =
                "#bfc5ca";


            /* =================================================
               TAMAÑO LÓGICO
               ================================================= */

            const W = 1800;
            const H = 420;


            let dpr = 1;
            let scale = 1;
            let offsetX = 0;
            let offsetY = 0;


            function ajustarCanvas() {

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


                scale =
                    Math.min(
                        rect.width / W,
                        rect.height / H
                    );


                if (
                    !Number.isFinite(scale) ||
                    scale <= 0
                ) {
                    scale = 1;
                }


                offsetX =
                    (
                        rect.width -
                        W * scale
                    ) / 2;


                offsetY =
                    (
                        rect.height -
                        H * scale
                    ) / 2;

            }


            window.addEventListener(
                "resize",
                ajustarCanvas,
                {
                    passive: true
                }
            );


            ajustarCanvas();


            /* =================================================
               UTILIDADES
               ================================================= */

            function clamp(valor) {

                return Math.max(
                    0,
                    Math.min(
                        1,
                        valor
                    )
                );

            }


            function easeInOut(valor) {

                valor =
                    clamp(valor);

                return (
                    valor < 0.5
                        ? 2 * valor * valor
                        : 1 -
                          Math.pow(
                              -2 * valor + 2,
                              2
                          ) / 2
                );

            }


            function easeOut(valor) {

                valor =
                    clamp(valor);

                return 1 -
                    Math.pow(
                        1 - valor,
                        3
                    );

            }


            function easeIn(valor) {

                valor =
                    clamp(valor);

                return valor * valor * valor;

            }


            function interpolar(
                a,
                b,
                t
            ) {

                return (
                    a +
                    (b - a) * t
                );

            }


            function punto(
                x,
                y
            ) {

                return {
                    x,
                    y
                };

            }


            /* =================================================
               ECG BASE
               ================================================= */

            const CENTRO_X = 900;
            const CENTRO_Y = 210;


            /*
             * El ECG no es completamente idéntico.
             * Cada ciclo utiliza pulsaciones distintas.
             */

            const tiposPulso = [

                {
                    ancho: 72,
                    alto: 30
                },

                {
                    ancho: 88,
                    alto: 48
                },

                {
                    ancho: 108,
                    alto: 68
                },

                {
                    ancho: 132,
                    alto: 92
                },

                {
                    ancho: 158,
                    alto: 118
                },

                {
                    ancho: 94,
                    alto: 82
                },

                {
                    ancho: 145,
                    alto: 58
                }

            ];


            let ultimoTipo = -1;


            function obtenerPulso() {

                let indice;


                do {

                    indice =
                        Math.floor(
                            Math.random() *
                            tiposPulso.length
                        );

                } while (
                    indice === ultimoTipo
                );


                ultimoTipo =
                    indice;


                return tiposPulso[indice];

            }


            /*
             * Generamos varias pulsaciones
             * distribuidas por todo el recorrido.
             */

            function crearECG() {

                const ruta = [

                    punto(
                        -180,
                        CENTRO_Y
                    ),

                    punto(
                        0,
                        CENTRO_Y
                    ),

                    punto(
                        150,
                        CENTRO_Y
                    ),

                    punto(
                        300,
                        CENTRO_Y
                    ),

                    punto(
                        420,
                        CENTRO_Y
                    )

                ];


                let posicion =
                    470;


                for (
                    let i = 0;
                    i < 8;
                    i++
                ) {

                    const pulso =
                        obtenerPulso();


                    const ancho =
                        pulso.ancho;


                    const alto =
                        pulso.alto;


                    /*
                     * Pequeña variación para
                     * que no parezcan copias.
                     */

                    const variacion =
                        0.88 +
                        Math.random() * 0.24;


                    ruta.push(

                        punto(
                            posicion,
                            CENTRO_Y
                        ),

                        punto(
                            posicion +
                            ancho * 0.23,
                            CENTRO_Y
                        ),

                        punto(
                            posicion +
                            ancho * 0.38,
                            CENTRO_Y -
                            alto * variacion
                        ),

                        punto(
                            posicion +
                            ancho * 0.55,
                            CENTRO_Y +
                            alto *
                            (0.85 +
                            Math.random() * 0.25)
                        ),

                        punto(
                            posicion +
                            ancho * 0.72,
                            CENTRO_Y
                        ),

                        punto(
                            posicion +
                            ancho,
                            CENTRO_Y
                        )

                    );


                    posicion +=
                        ancho +
                        105 +
                        Math.random() * 55;

                }


                ruta.push(

                    punto(
                        1980,
                        CENTRO_Y
                    )

                );


                return ruta;

            }


            let ecgActual =
                crearECG();


            /*
             * Cada ciclo puede tener
             * pulsaciones nuevas.
             */

            function regenerarECG() {

                ultimoTipo = -1;

                ecgActual =
                    crearECG();

            }


            /* =================================================
               LÍNEAS DE CONVERGENCIA
               ================================================= */

            /*
             * Estas líneas son las que llevan
             * el ECG hacia el centro.
             *
             * No forman literalmente las letras.
             * Funcionan como una estructura visual
             * que revela EBA.
             */

            const lineaSuperior = [

                punto(
                    120,
                    CENTRO_Y
                ),

                punto(
                    330,
                    CENTRO_Y
                ),

                punto(
                    500,
                    CENTRO_Y
                ),

                punto(
                    650,
                    188
                ),

                punto(
                    760,
                    158
                ),

                punto(
                    835,
                    125
                ),

                punto(
                    CENTRO_X,
                    105
                )

            ];


            const lineaMedia = [

                punto(
                    120,
                    CENTRO_Y
                ),

                punto(
                    350,
                    CENTRO_Y
                ),

                punto(
                    540,
                    CENTRO_Y
                ),

                punto(
                    700,
                    CENTRO_Y
                ),

                punto(
                    820,
                    CENTRO_Y
                ),

                punto(
                    CENTRO_X,
                    CENTRO_Y
                )

            ];


            const lineaInferior = [

                punto(
                    120,
                    CENTRO_Y
                ),

                punto(
                    330,
                    CENTRO_Y
                ),

                punto(
                    510,
                    CENTRO_Y
                ),

                punto(
                    660,
                    232
                ),

                punto(
                    770,
                    265
                ),

                punto(
                    850,
                    295
                ),

                punto(
                    CENTRO_X,
                    315
                )

            ];


            const lineasConvergencia = [

                lineaSuperior,
                lineaMedia,
                lineaInferior

            ];


            /* =================================================
               MARCO CENTRAL
               ================================================= */

            const marcoSuperior = [

                punto(
                    700,
                    105
                ),

                punto(
                    760,
                    78
                ),

                punto(
                    900,
                    62
                ),

                punto(
                    1040,
                    78
                ),

                punto(
                    1100,
                    105
                )

            ];


            const marcoInferior = [

                punto(
                    700,
                    315
                ),

                punto(
                    760,
                    342
                ),

                punto(
                    900,
                    358
                ),

                punto(
                    1040,
                    342
                ),

                punto(
                    1100,
                    315
                )

            ];


            /* =================================================
               TEXTO CENTRAL
               ================================================= */

            function dibujarTextoEBA(
                intensidad = 1,
                escalaTexto = 1
            ) {

                ctx.save();


                ctx.textAlign =
                    "center";

                ctx.textBaseline =
                    "middle";


                /*
                 * EBA
                 */

                ctx.font =
                    `800 ${112 * escalaTexto}px Manrope, DM Sans, sans-serif`;


                ctx.globalAlpha =
                    intensidad;


                ctx.shadowColor =
                    NARANJA;


                ctx.shadowBlur =
                    20 *
                    intensidad;


                ctx.fillStyle =
                    BLANCO;


                ctx.fillText(
                    "EBA",
                    CENTRO_X,
                    192
                );


                /*
                 * PULSO
                 */

                ctx.shadowBlur =
                    11 *
                    intensidad;


                ctx.font =
                    `600 ${31 * escalaTexto}px Manrope, DM Sans, sans-serif`;


                ctx.letterSpacing = "8px";


                ctx.fillStyle =
                    NARANJA_SUAVE;


                ctx.fillText(
                    "PULSO",
                    CENTRO_X,
                    260
                );


                ctx.restore();

            }


            /* =================================================
               RUTA
               ================================================= */

            function dibujarRuta(
                puntos,
                progreso,
                color,
                grosor,
                glow = 0,
                alpha = 1
            ) {

                if (
                    !puntos ||
                    puntos.length < 2
                ) {
                    return;
                }


                progreso =
                    clamp(progreso);


                if (
                    progreso <= 0
                ) {
                    return;
                }


                ctx.save();


                ctx.globalAlpha =
                    alpha;


                ctx.strokeStyle =
                    color;


                ctx.lineWidth =
                    grosor;


                ctx.lineCap =
                    "round";


                ctx.lineJoin =
                    "round";


                if (glow > 0) {

                    ctx.shadowColor =
                        color;

                    ctx.shadowBlur =
                        glow;

                }


                const segmentos =
                    puntos.length - 1;


                const recorrido =
                    progreso *
                    segmentos;


                const completos =
                    Math.floor(
                        recorrido
                    );


                const parcial =
                    recorrido -
                    completos;


                ctx.beginPath();


                ctx.moveTo(
                    puntos[0].x,
                    puntos[0].y
                );


                for (
                    let i = 1;
                    i <= completos &&
                    i < puntos.length;
                    i++
                ) {

                    ctx.lineTo(
                        puntos[i].x,
                        puntos[i].y
                    );

                }


                if (
                    completos <
                    segmentos
                ) {

                    const a =
                        puntos[completos];


                    const b =
                        puntos[
                            completos + 1
                        ];


                    ctx.lineTo(

                        interpolar(
                            a.x,
                            b.x,
                            parcial
                        ),

                        interpolar(
                            a.y,
                            b.y,
                            parcial
                        )

                    );

                }


                ctx.stroke();

                ctx.restore();

            }


            /* =================================================
               ECG
               ================================================= */

            function dibujarECG(
                progreso,
                grosor = 2.6,
                glow = 8,
                alpha = 1
            ) {

                dibujarRuta(
                    ecgActual,
                    progreso,
                    NARANJA,
                    grosor,
                    glow,
                    alpha
                );

            }


            /* =================================================
               PUNTO DE RECORRIDO
               ================================================= */

            function obtenerPuntoRuta(
                puntos,
                progreso
            ) {

                progreso =
                    clamp(progreso);


                const total =
                    puntos.length - 1;


                const posicion =
                    progreso * total;


                const indice =
                    Math.min(
                        Math.floor(posicion),
                        total - 1
                    );


                const t =
                    posicion -
                    indice;


                const a =
                    puntos[indice];


                const b =
                    puntos[indice + 1];


                return {

                    x:
                        interpolar(
                            a.x,
                            b.x,
                            t
                        ),

                    y:
                        interpolar(
                            a.y,
                            b.y,
                            t
                        )

                };

            }


            function dibujarPuntoPulso(
                x,
                y,
                intensidad = 1
            ) {

                ctx.save();


                ctx.shadowColor =
                    NARANJA_SUAVE;


                ctx.shadowBlur =
                    25 *
                    intensidad;


                ctx.fillStyle =
                    NARANJA_SUAVE;


                ctx.beginPath();


                ctx.arc(
                    x,
                    y,
                    4.2 *
                    intensidad,
                    0,
                    Math.PI * 2
                );


                ctx.fill();


                ctx.restore();

            }


            /* =================================================
               GLOW CENTRAL
               ================================================= */

            function dibujarGlowCentral(
                intensidad
            ) {

                if (
                    intensidad <= 0
                ) {
                    return;
                }


                const gradient =
                    ctx.createRadialGradient(
                        CENTRO_X,
                        CENTRO_Y,
                        20,
                        CENTRO_X,
                        CENTRO_Y,
                        360
                    );


                gradient.addColorStop(
                    0,
                    `rgba(255,106,0,${0.10 * intensidad})`
                );


                gradient.addColorStop(
                    0.45,
                    `rgba(255,106,0,${0.035 * intensidad})`
                );


                gradient.addColorStop(
                    1,
                    "rgba(255,106,0,0)"
                );


                ctx.save();


                ctx.fillStyle =
                    gradient;


                ctx.fillRect(
                    300,
                    20,
                    1200,
                    380
                );


                ctx.restore();

            }


            /* =================================================
               CONVERGENCIA
               ================================================= */

            function dibujarConvergencia(
                progreso
            ) {

                const t =
                    easeInOut(
                        progreso
                    );


                /*
                 * ECG sigue presente
                 * al principio.
                 */

                const alphaECG =
                    1 -
                    easeInOut(
                        Math.min(
                            1,
                            progreso / 0.62
                        )
                    );


                if (
                    alphaECG > 0
                ) {

                    dibujarECG(
                        1,
                        interpolar(
                            2.6,
                            3.8,
                            t
                        ),
                        8 +
                        t * 8,
                        alphaECG
                    );

                }


                /*
                 * Las tres líneas
                 * se construyen.
                 */

                const lineAlpha =
                    easeOut(
                        Math.min(
                            1,
                            progreso / 0.72
                        )
                    );


                lineasConvergencia.forEach(
                    (
                        ruta,
                        indice
                    ) => {

                        dibujarRuta(
                            ruta,
                            lineAlpha,
                            indice === 1
                                ? BLANCO
                                : PLATA,
                            interpolar(
                                2,
                                4.5,
                                t
                            ),
                            6 +
                            t * 10,
                            0.85
                        );

                    }
                );


                /*
                 * Marco superior e inferior.
                 */

                const marcoProgreso =
                    easeInOut(
                        Math.max(
                            0,
                            (progreso - 0.28) /
                            0.72
                        )
                    );


                dibujarRuta(
                    marcoSuperior,
                    marcoProgreso,
                    NARANJA,
                    2.1,
                    7,
                    0.7
                );


                dibujarRuta(
                    marcoInferior,
                    marcoProgreso,
                    NARANJA,
                    2.1,
                    7,
                    0.7
                );


                /*
                 * EBA aparece después
                 * de que las líneas ya
                 * estén convergiendo.
                 */

                const textoProgreso =
                    easeOut(
                        Math.max(
                            0,
                            (progreso - 0.48) /
                            0.52
                        )
                    );


                if (
                    textoProgreso > 0
                ) {

                    dibujarTextoEBA(
                        textoProgreso,
                        0.92 +
                        textoProgreso * 0.08
                    );

                }

            }


            /* =================================================
               LOGO COMPLETO
               ================================================= */

            function dibujarLogoCompleto(
                tiempo
            ) {

                const respiracion =
                    (
                        Math.sin(
                            tiempo * 0.003
                        ) + 1
                    ) / 2;


                const intensidad =
                    0.72 +
                    respiracion * 0.28;


                /*
                 * Líneas del marco.
                 */

                dibujarRuta(
                    marcoSuperior,
                    1,
                    NARANJA,
                    2.1,
                    7,
                    0.62
                );


                dibujarRuta(
                    marcoInferior,
                    1,
                    NARANJA,
                    2.1,
                    7,
                    0.62
                );


                /*
                 * Tres líneas principales.
                 */

                lineasConvergencia.forEach(
                    (
                        ruta,
                        indice
                    ) => {

                        dibujarRuta(
                            ruta,
                            1,
                            indice === 1
                                ? BLANCO
                                : PLATA,
                            4.4,
                            8,
                            0.88
                        );

                    }
                );


                /*
                 * Glow central.
                 */

                dibujarGlowCentral(
                    intensidad
                );


                /*
                 * EBA + PULSO.
                 */

                dibujarTextoEBA(
                    0.9 +
                    respiracion * 0.1,
                    1 +
                    respiracion * 0.012
                );

            }


            /* =================================================
               RETRACCIÓN
               ================================================= */

            function dibujarRetraccion(
                progreso
            ) {

                const t =
                    easeInOut(
                        progreso
                    );


                /*
                 * El texto desaparece
                 * primero.
                 */

                const textoAlpha =
                    1 -
                    easeIn(
                        Math.min(
                            1,
                            progreso / 0.42
                        )
                    );


                if (
                    textoAlpha > 0
                ) {

                    dibujarTextoEBA(
                        textoAlpha,
                        1 -
                        t * 0.05
                    );

                }


                /*
                 * Las líneas centrales
                 * se retraen.
                 */

                const lineProgress =
                    1 -
                    easeInOut(
                        Math.max(
                            0,
                            (progreso - 0.18) /
                            0.82
                        )
                    );


                lineasConvergencia.forEach(
                    (
                        ruta,
                        indice
                    ) => {

                        dibujarRuta(
                            ruta,
                            lineProgress,
                            indice === 1
                                ? BLANCO
                                : PLATA,
                            4.4 -
                            t * 1.5,
                            8,
                            lineProgress
                        );

                    }
                );


                /*
                 * El marco se apaga.
                 */

                const marcoAlpha =
                    1 -
                    easeInOut(
                        Math.min(
                            1,
                            progreso / 0.55
                        )
                    );


                if (
                    marcoAlpha > 0
                ) {

                    dibujarRuta(
                        marcoSuperior,
                        1,
                        NARANJA,
                        2,
                        7,
                        marcoAlpha
                    );


                    dibujarRuta(
                        marcoInferior,
                        1,
                        NARANJA,
                        2,
                        7,
                        marcoAlpha
                    );

                }

            }


            /* =================================================
               ECG DE REGRESO
               ================================================= */

            function dibujarECGRegreso(
                progreso
            ) {

                const ruta = [

                    punto(
                        CENTRO_X,
                        CENTRO_Y
                    ),

                    punto(
                        960,
                        CENTRO_Y
                    ),

                    punto(
                        1030,
                        CENTRO_Y
                    ),

                    punto(
                        1100,
                        CENTRO_Y
                    ),

                    punto(
                        1180,
                        CENTRO_Y
                    ),

                    punto(
                        1230,
                        CENTRO_Y
                    ),

                    punto(
                        1260,
                        CENTRO_Y - 65
                    ),

                    punto(
                        1290,
                        CENTRO_Y + 90
                    ),

                    punto(
                        1320,
                        CENTRO_Y
                    ),

                    punto(
                        1410,
                        CENTRO_Y
                    ),

                    punto(
                        1540,
                        CENTRO_Y
                    ),

                    punto(
                        1680,
                        CENTRO_Y
                    ),

                    punto(
                        1840,
                        CENTRO_Y
                    ),

                    punto(
                        1980,
                        CENTRO_Y
                    )

                ];


                dibujarRuta(
                    ruta,
                    easeOut(progreso),
                    NARANJA,
                    2.6,
                    10
                );


                const puntoActual =
                    obtenerPuntoRuta(
                        ruta,
                        easeOut(progreso)
                    );


                if (
                    puntoActual
                ) {

                    dibujarPuntoPulso(
                        puntoActual.x,
                        puntoActual.y,
                        0.8
                    );

                }

            }


            /* =================================================
               ESCENA COMPLETA
               ================================================= */

            const FASE_ECG =
                4300;


            const FASE_CONVERGENCIA =
                2600;


            const FASE_HOLD =
                1700;


            const FASE_RETRACCION =
                2200;


            const FASE_SALIDA =
                1900;


            const DURACION_TOTAL =
                FASE_ECG +
                FASE_CONVERGENCIA +
                FASE_HOLD +
                FASE_RETRACCION +
                FASE_SALIDA;


            function dibujarEscena(
                tiempo
            ) {

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


                ctx.save();


                ctx.scale(
                    dpr,
                    dpr
                );


                ctx.translate(
                    offsetX,
                    offsetY
                );


                ctx.scale(
                    scale,
                    scale
                );


                /*
                 * Glow general muy suave.
                 */

                dibujarGlowCentral(
                    0.32
                );


                /* =============================================
                   FASE 1 — ECG
                   ============================================= */

                if (
                    tiempo <
                    FASE_ECG
                ) {

                    const progreso =
                        easeInOut(
                            tiempo /
                            FASE_ECG
                        );


                    dibujarECG(
                        progreso,
                        2.6,
                        8
                    );


                    /*
                     * Punto que viaja sobre el ECG.
                     */

                    const puntoActual =
                        obtenerPuntoRuta(
                            ecgActual,
                            progreso
                        );


                    if (
                        puntoActual
                    ) {

                        dibujarPuntoPulso(
                            puntoActual.x,
                            puntoActual.y,
                            0.75
                        );

                    }

                }


                /* =============================================
                   FASE 2 — CONVERGENCIA
                   ============================================= */

                const inicioConvergencia =
                    FASE_ECG;


                const finConvergencia =
                    inicioConvergencia +
                    FASE_CONVERGENCIA;


                if (
                    tiempo >=
                    inicioConvergencia &&
                    tiempo <
                    finConvergencia
                ) {

                    const progreso =
                        (
                            tiempo -
                            inicioConvergencia
                        ) /
                        FASE_CONVERGENCIA;


                    dibujarConvergencia(
                        progreso
                    );


                    /*
                     * El glow crece
                     * hacia el centro.
                     */

                    dibujarGlowCentral(
                        0.35 +
                        easeInOut(
                            progreso
                        ) *
                        0.65
                    );

                }


                /* =============================================
                   FASE 3 — LOGO COMPLETO
                   ============================================= */

                const inicioHold =
                    finConvergencia;


                const finHold =
                    inicioHold +
                    FASE_HOLD;


                if (
                    tiempo >=
                    inicioHold &&
                    tiempo <
                    finHold
                ) {

                    dibujarLogoCompleto(
                        tiempo
                    );

                }


                /* =============================================
                   FASE 4 — RETRACCIÓN
                   ============================================= */

                const inicioRetraccion =
                    finHold;


                const finRetraccion =
                    inicioRetraccion +
                    FASE_RETRACCION;


                if (
                    tiempo >=
                    inicioRetraccion &&
                    tiempo <
                    finRetraccion
                ) {

                    const progreso =
                        (
                            tiempo -
                            inicioRetraccion
                        ) /
                        FASE_RETRACCION;


                    dibujarRetraccion(
                        progreso
                    );


                    dibujarGlowCentral(
                        0.85 -
                        easeInOut(
                            progreso
                        ) *
                        0.65
                    );

                }


                /* =============================================
                   FASE 5 — ECG DE REGRESO
                   ============================================= */

                const inicioSalida =
                    finRetraccion;


                if (
                    tiempo >=
                    inicioSalida
                ) {

                    const progreso =
                        clamp(
                            (
                                tiempo -
                                inicioSalida
                            ) /
                            FASE_SALIDA
                        );


                    dibujarECGRegreso(
                        progreso
                    );

                }


                ctx.restore();

            }


            /* =================================================
               REDUCIR MOVIMIENTO
               ================================================= */

            if (reduceMotion) {

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


                ctx.save();


                ctx.scale(
                    dpr,
                    dpr
                );


                ctx.translate(
                    offsetX,
                    offsetY
                );


                ctx.scale(
                    scale,
                    scale
                );


                dibujarLogoCompleto(
                    0
                );


                ctx.restore();

            } else {


                let inicio =
                    performance.now();


                let animando =
                    true;


                function animar(
                    timestamp
                ) {

                    if (!animando) {
                        return;
                    }


                    const tiempo =
                        (
                            timestamp -
                            inicio
                        ) %
                        DURACION_TOTAL;


                    /*
                     * Cuando comienza un nuevo
                     * ciclo generamos pulsaciones
                     * diferentes.
                     */

                    if (
                        tiempo < 30 &&
                        timestamp > 100
                    ) {

                        regenerarECG();

                    }


                    dibujarEscena(
                        tiempo
                    );


                    requestAnimationFrame(
                        animar
                    );

                }


                requestAnimationFrame(
                    animar
                );


                /* =============================================
                   HERO VISIBILITY
                   ============================================= */

                const hero =
                    document.querySelector(
                        "#inicio"
                    );


                if (
                    hero &&
                    "IntersectionObserver" in window
                ) {

                    let heroVisible =
                        false;


                    const heroObserver =
                        new IntersectionObserver(
                            (entries) => {

                                entries.forEach(
                                    (entry) => {

                                        if (
                                            entry.isIntersecting
                                        ) {

                                            if (
                                                !heroVisible
                                            ) {

                                                inicio =
                                                    performance.now();

                                            }

                                            heroVisible =
                                                true;


                                            animando =
                                                true;

                                        } else {

                                            heroVisible =
                                                false;

                                        }

                                    }
                                );

                            },
                            {
                                threshold: 0.15
                            }
                        );


                    heroObserver.observe(
                        hero
                    );

                }


                /* =============================================
                   VISIBILITY CHANGE
                   ============================================= */

                document.addEventListener(
                    "visibilitychange",
                    () => {

                        if (
                            document.hidden
                        ) {

                            animando =
                                false;

                        } else {

                            inicio =
                                performance.now();

                            animando =
                                true;

                            requestAnimationFrame(
                                animar
                            );

                        }

                    }
                );

            }

        }

    }


    /* =========================================================
       PULSI
       ========================================================= */

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


    const pulsiMessages =
        document.querySelector(
            "#pulsi-messages"
        );


    const pulsiForm =
        document.querySelector(
            "#pulsi-form"
        );


    const pulsiInput =
        document.querySelector(
            "#pulsi-input"
        );


    function abrirPulsi() {

        if (!pulsiChat) {
            return;
        }


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

            setTimeout(
                () => {

                    pulsiInput.focus();

                },
                150
            );

        }

    }


    function cerrarPulsi() {

        if (!pulsiChat) {
            return;
        }


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

    }


    if (pulsiButton) {

        pulsiButton.addEventListener(
            "click",
            abrirPulsi
        );

    }


    if (pulsiClose) {

        pulsiClose.addEventListener(
            "click",
            cerrarPulsi
        );

    }


    /* =========================================================
       MENSAJES DE PULSI
       ========================================================= */

    function mensajePulsi(
        texto,
        tipo
    ) {

        if (!pulsiMessages) {
            return;
        }


        const elemento =
            document.createElement(
                "div"
            );


        elemento.className =
            tipo === "user"
                ? "pulsi-message pulsi-message-user"
                : "pulsi-message pulsi-message-ai";


        const textoElemento =
            document.createElement(
                "p"
            );


        textoElemento.textContent =
            texto;


        elemento.appendChild(
            textoElemento
        );


        pulsiMessages.appendChild(
            elemento
        );


        pulsiMessages.scrollTop =
            pulsiMessages.scrollHeight;

    }


    /* =========================================================
       PULSI — RESPUESTAS
       ========================================================= */

    const respuestasPulsi = [

        {
            claves: [
                "servicio",
                "servicios"
            ],

            respuesta:
                "En PULSO trabajamos identidad visual, diseño gráfico, páginas web y experiencias digitales."
        },


        {
            claves: [
                "web",
                "pagina",
                "página",
                "sitio"
            ],

            respuesta:
                "PULSO puede crear una página web adaptada a la identidad y necesidades de tu proyecto."
        },


        {
            claves: [
                "logo",
                "logotipo",
                "identidad",
                "marca"
            ],

            respuesta:
                "Podemos trabajar desde el logo hasta un sistema visual completo para que tu proyecto tenga una identidad propia."
        },


        {
            claves: [
                "diseño",
                "flyer",
                "cartel",
                "redes",
                "grafico",
                "gráfico"
            ],

            respuesta:
                "También hacemos piezas gráficas, flyers, carteles, tarjetas, contenido para redes y material visual."
        },


        {
            claves: [
                "contacto",
                "hablar",
                "proyecto"
            ],

            respuesta:
                "Podés contarnos tu idea desde el formulario de proyecto y empezar a darle forma junto a PULSO."
        },


        {
            claves: [
                "pulso"
            ],

            respuesta:
                "PULSO es un estudio creativo enfocado en transformar ideas en identidades y experiencias digitales."
        }

    ];


    function normalizarTexto(
        texto
    ) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );

    }


    function responderPulsi(
        pregunta
    ) {

        const texto =
            normalizarTexto(
                pregunta
            );


        for (
            const item of respuestasPulsi
        ) {

            const coincide =
                item.claves.some(
                    (clave) => {

                        const claveNormalizada =
                            normalizarTexto(
                                clave
                            );


                        return texto.includes(
                            claveNormalizada
                        );

                    }
                );


            if (coincide) {

                return item.respuesta;

            }

        }


        return (
            "Todavía no tengo esa información conectada. " +
            "Podés contarme un poco más o usar el formulario para hablar con PULSO."
        );

    }


    /* =========================================================
       FORMULARIO DE PULSI
       ========================================================= */

    if (pulsiForm) {

        pulsiForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                if (!pulsiInput) {
                    return;
                }


                const pregunta =
                    pulsiInput.value.trim();


                if (!pregunta) {
                    return;
                }


                pulsiInput.value = "";


                mensajePulsi(
                    pregunta,
                    "user"
                );


                setTimeout(
                    () => {

                        mensajePulsi(
                            responderPulsi(
                                pregunta
                            ),
                            "ai"
                        );

                    },
                    250
                );

            }
        );

    }


    /* =========================================================
       BOTONES RÁPIDOS DE PULSI
       ========================================================= */

    document.querySelectorAll(
        ".pulsi-quick button"
    ).forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const pregunta =
                        button.dataset.question ||
                        button.textContent.trim();


                    if (!pregunta) {
                        return;
                    }


                    mensajePulsi(
                        pregunta,
                        "user"
                    );


                    setTimeout(
                        () => {

                            mensajePulsi(
                                responderPulsi(
                                    pregunta
                                ),
                                "ai"
                            );

                        },
                        250
                    );

                }
            );

        }
    );


    /* =========================================================
       CERRAR PULSI CON ESCAPE
       ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                cerrarPulsi();

            }

        }
    );


    /* =========================================================
       CERRAR PULSI AL HACER CLICK AFUERA
       ========================================================= */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !pulsiChat ||
                !pulsiChat.classList.contains("active")
            ) {
                return;
            }


            const dentroChat =
                pulsiChat.contains(
                    event.target
                );


            const dentroBoton =
                pulsiButton &&
                pulsiButton.contains(
                    event.target
                );


            if (
                !dentroChat &&
                !dentroBoton
            ) {

                cerrarPulsi();

            }

        }
    );


    /* =========================================================
       CONSOLA
       ========================================================= */

    console.log(
        "%cPULSO",
        "color:#ff6a00;font-size:24px;font-weight:800;letter-spacing:5px"
    );


    console.log(
        "Sistema PULSO iniciado."
    );


});
