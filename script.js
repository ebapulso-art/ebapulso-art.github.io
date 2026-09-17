/* ============================================================
   PULSO — SCRIPT PRINCIPAL
   Sistema de interacción + Logo ECG animado

   ANIMACIÓN DEL LOGO:
   ECG → pulsaciones variables → convergencia
   → símbolo PULSO → glow → retracción → ECG
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

        document.body.classList.remove("menu-abierto");
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

        document.body.classList.add("menu-abierto");
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
                elemento.classList.add("visible");
            }
        );

    }


    /* =========================================================
       =========================================================
       PULSO — LOGO ECG
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

            const NARANJA_CLARO =
                "#ff8533";

            const BLANCO =
                "#ffffff";

            const PLATA =
                "#c8cdd2";

            const PLATA_CLARA =
                "#f0f2f4";


            /* =================================================
               TAMAÑO LÓGICO
               ================================================= */

            const W = 1800;
            const H = 360;

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
                ajustarCanvas
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


            function punto(x, y) {

                return {
                    x,
                    y
                };

            }


            function interpolar(a, b, t) {

                return (
                    a +
                    (b - a) * t
                );

            }


            function mezclarPuntos(
                a,
                b,
                progreso
            ) {

                return punto(
                    interpolar(
                        a.x,
                        b.x,
                        progreso
                    ),
                    interpolar(
                        a.y,
                        b.y,
                        progreso
                    )
                );

            }


            /* =================================================
               ECG BASE
               ================================================= */

            const ecgBase = [

                punto(-120, 180),
                punto(20, 180),
                punto(130, 180),
                punto(220, 180),
                punto(300, 180),
                punto(360, 180),

                punto(390, 172),
                punto(410, 188),
                punto(430, 180),

                punto(475, 180),
                punto(520, 180),

                /*
                 * PULSO PRINCIPAL
                 */

                punto(545, 110),
                punto(570, 245),
                punto(600, 180),

                punto(700, 180),
                punto(820, 180),
                punto(950, 180),
                punto(1080, 180),
                punto(1210, 180),
                punto(1340, 180),
                punto(1470, 180),
                punto(1600, 180),
                punto(1730, 180),
                punto(1900, 180)

            ];


            /* =================================================
               PUNTO DE TRANSFORMACIÓN
               ================================================= */

            const CENTRO_X = 600;
            const CENTRO_Y = 180;


            /* =================================================
               PULSACIONES VARIABLES
               =================================================
               
               Cada pulso tiene:
               - ancho
               - altura
               - inclinación
               - intensidad
               
               Se generan aleatoriamente evitando
               repetir inmediatamente el mismo tipo.
               ================================================= */

            const tiposPulso = [

                {
                    ancho: 70,
                    alto: 32,
                    nombre: "micro"
                },

                {
                    ancho: 90,
                    alto: 48,
                    nombre: "pequeno"
                },

                {
                    ancho: 115,
                    alto: 72,
                    nombre: "medio"
                },

                {
                    ancho: 145,
                    alto: 105,
                    nombre: "alto"
                },

                {
                    ancho: 175,
                    alto: 125,
                    nombre: "fuerte"
                },

                {
                    ancho: 95,
                    alto: 90,
                    nombre: "estrecho"
                },

                {
                    ancho: 155,
                    alto: 65,
                    nombre: "ancho"
                }

            ];


            let ultimoTipo =
                -1;


            function obtenerPulsoAleatorio() {

                let indice;

                do {

                    indice =
                        Math.floor(
                            Math.random() *
                            tiposPulso.length
                        );

                } while (
                    indice === ultimoTipo &&
                    tiposPulso.length > 1
                );

                ultimoTipo =
                    indice;

                return tiposPulso[indice];

            }


            /*
             * Generamos la secuencia completa
             * una sola vez por ciclo.
             */

            const pulsaciones = [];

            const NUMERO_PULSACIONES = 7;

            let posicionPulso = 760;


            for (
                let i = 0;
                i < NUMERO_PULSACIONES;
                i++
            ) {

                const tipo =
                    obtenerPulsoAleatorio();

                const ancho =
                    tipo.ancho;

                const alto =
                    tipo.alto;

                pulsaciones.push({

                    inicio:
                        posicionPulso,

                    puntos: [

                        punto(
                            posicionPulso,
                            CENTRO_Y
                        ),

                        punto(
                            posicionPulso +
                            ancho * 0.25,
                            CENTRO_Y
                        ),

                        punto(
                            posicionPulso +
                            ancho * 0.42,
                            CENTRO_Y -
                            alto
                        ),

                        punto(
                            posicionPulso +
                            ancho * 0.58,
                            CENTRO_Y +
                            alto
                        ),

                        punto(
                            posicionPulso +
                            ancho * 0.74,
                            CENTRO_Y
                        ),

                        punto(
                            posicionPulso +
                            ancho,
                            CENTRO_Y
                        )

                    ]

                });


                /*
                 * Separación aproximada
                 * entre pulsaciones.
                 */

                posicionPulso +=
                    ancho +
                    105 +
                    Math.random() * 35;

            }


            /* =================================================
               CREACIÓN DE ECG DINÁMICO
               ================================================= */

            function crearECGConPulsaciones() {

                const ruta = [
                    punto(-120, 180),
                    punto(20, 180),
                    punto(130, 180),
                    punto(220, 180),
                    punto(300, 180),
                    punto(360, 180)
                ];


                pulsaciones.forEach(
                    (pulso) => {

                        pulso.puntos.forEach(
                            (puntoPulso, indice) => {

                                if (
                                    indice === 0 &&
                                    ruta.length > 0
                                ) {
                                    return;
                                }

                                ruta.push(
                                    puntoPulso
                                );

                            }
                        );

                    }
                );


                ruta.push(
                    punto(
                        1900,
                        180
                    )
                );


                return ruta;

            }


            const ecgDinamico =
                crearECGConPulsaciones();


            /* =================================================
               SÍMBOLO PULSO
               =================================================

               Las tres líneas se convierten
               progresivamente desde el centro.
               ================================================= */

            const simboloSuperior = [

                punto(CENTRO_X, 166),

                punto(650, 145),
                punto(710, 125),
                punto(790, 125),
                punto(850, 125),

                punto(890, 135),
                punto(915, 155),
                punto(915, 170)

            ];


            const simboloCentral = [

                punto(CENTRO_X, 180),

                punto(655, 180),
                punto(720, 180),
                punto(790, 180),
                punto(850, 180),

                punto(895, 175),
                punto(915, 155),
                punto(900, 140)

            ];


            const simboloInferior = [

                punto(CENTRO_X, 194),

                punto(650, 215),
                punto(700, 235),
                punto(755, 255),

                punto(800, 190),
                punto(845, 255),

                punto(885, 235),
                punto(920, 205),
                punto(960, 180)

            ];


            /* =================================================
               TEXTO / TRAZO PULSO
               ================================================= */

            const palabraPulso = [

                punto(CENTRO_X, 208),

                punto(620, 250),
                punto(620, 302),

                punto(650, 302),
                punto(650, 265),

                punto(690, 265),
                punto(690, 302),

                punto(725, 302),
                punto(725, 255),

                punto(750, 255),
                punto(750, 290),

                punto(765, 302),
                punto(790, 302),
                punto(805, 290),
                punto(805, 255),

                punto(835, 255),
                punto(835, 302),
                punto(870, 302),

                punto(915, 255),
                punto(880, 255),
                punto(870, 265),
                punto(880, 276),
                punto(910, 282),
                punto(920, 292),
                punto(910, 302),
                punto(875, 302),

                punto(960, 255),
                punto(995, 255),
                punto(1008, 268),
                punto(1008, 289),
                punto(995, 302),
                punto(960, 302),
                punto(947, 289),
                punto(947, 268),
                punto(960, 255),

                punto(1040, 280)

            ];


            const rutasLogo = [

                simboloSuperior,
                simboloCentral,
                simboloInferior,
                palabraPulso

            ];


            /* =================================================
               EXTENSIONES DEL LOGO
               ================================================= */

            const extensiones = [

                [
                    punto(915, 170),
                    punto(1030, 170),
                    punto(1150, 168),
                    punto(1280, 172),
                    punto(1410, 180)
                ],

                [
                    punto(900, 140),
                    punto(1030, 142),
                    punto(1150, 140),
                    punto(1280, 145),
                    punto(1410, 180)
                ],

                [
                    punto(960, 180),
                    punto(1070, 190),
                    punto(1190, 188),
                    punto(1310, 190),
                    punto(1410, 180)
                ],

                [
                    punto(1040, 280),
                    punto(1140, 275),
                    punto(1250, 270),
                    punto(1350, 260),
                    punto(1410, 180)
                ]

            ];


            /* =================================================
               ECG FINAL
               ================================================= */

            const ecgFinal = [

                punto(1410, 180),
                punto(1480, 180),
                punto(1550, 180),
                punto(1620, 180),
                punto(1690, 180),
                punto(1760, 180),
                punto(1900, 180)

            ];


            /* =================================================
               DIBUJAR RUTA
               ================================================= */

            function dibujarRuta(
                puntos,
                progreso,
                color,
                grosor,
                glow
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
               DIBUJAR ECG
               ================================================= */

            function dibujarECG(
                progreso,
                grosor = 2.7,
                glow = 12
            ) {

                dibujarRuta(
                    ecgDinamico,
                    progreso,
                    NARANJA,
                    grosor,
                    glow
                );


                if (
                    progreso > 0 &&
                    progreso < 1
                ) {

                    const indice =
                        Math.min(
                            ecgDinamico.length - 1,
                            Math.floor(
                                progreso *
                                (
                                    ecgDinamico.length - 1
                                )
                            )
                        );


                    const actual =
                        ecgDinamico[indice];


                    dibujarPunto(
                        actual.x,
                        actual.y,
                        0.65
                    );

                }

            }


            /* =================================================
               PUNTO LUMINOSO
               ================================================= */

            function dibujarPunto(
                x,
                y,
                intensidad = 1
            ) {

                ctx.save();

                ctx.shadowColor =
                    NARANJA;

                ctx.shadowBlur =
                    25 *
                    intensidad;

                ctx.fillStyle =
                    NARANJA_CLARO;


                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    4 *
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
                        800,
                        180,
                        15,
                        800,
                        180,
                        330
                    );


                gradient.addColorStop(
                    0,
                    `rgba(255,106,0,${0.12 * intensidad})`
                );

                gradient.addColorStop(
                    0.45,
                    `rgba(255,106,0,${0.045 * intensidad})`
                );

                gradient.addColorStop(
                    1,
                    "rgba(255,106,0,0)"
                );


                ctx.save();

                ctx.fillStyle =
                    gradient;

                ctx.fillRect(
                    350,
                    10,
                    1000,
                    340
                );

                ctx.restore();

            }


            /* =================================================
               LOGO
               ================================================= */

            function dibujarLogo(
                progreso,
                grosor = 5
            ) {

                progreso =
                    clamp(progreso);


                dibujarRuta(
                    simboloSuperior,
                    progreso,
                    PLATA,
                    grosor,
                    10
                );


                dibujarRuta(
                    simboloCentral,
                    progreso,
                    PLATA_CLARA,
                    grosor,
                    12
                );


                dibujarRuta(
                    simboloInferior,
                    progreso,
                    PLATA,
                    grosor,
                    11
                );


                dibujarRuta(
                    palabraPulso,
                    progreso,
                    BLANCO,
                    grosor * 0.9,
                    9
                );

            }


            /* =================================================
               EXTENSIONES
               ================================================= */

            function dibujarExtensiones(
                progreso
            ) {

                extensiones.forEach(
                    (ruta) => {

                        dibujarRuta(
                            ruta,
                            progreso,
                            NARANJA,
                            2.5,
                            10
                        );

                    }
                );

            }


            /* =================================================
               RETRACCIÓN DEL LOGO
               ================================================= */

            function dibujarRetraccion(
                progreso
            ) {

                const inverso =
                    1 -
                    easeInOut(
                        progreso
                    );


                rutasLogo.forEach(
                    (
                        ruta,
                        indice
                    ) => {

                        dibujarRuta(
                            ruta,
                            inverso,
                            indice === 3
                                ? BLANCO
                                : indice === 1
                                    ? PLATA_CLARA
                                    : PLATA,
                            indice === 3
                                ? 4.5
                                : 5,
                            10
                        );

                    }
                );

            }


            /* =================================================
               TRANSICIÓN ECG ↔ LOGO
               ================================================= */

            function dibujarTransformacion(
                progreso
            ) {

                const t =
                    easeInOut(
                        progreso
                    );


                /*
                 * Primero dejamos que el ECG
                 * llegue completamente al centro.
                 */

                dibujarECG(
                    1,
                    interpolar(
                        2.7,
                        4.8,
                        t
                    ),
                    interpolar(
                        10,
                        18,
                        t
                    )
                );


                /*
                 * Las nuevas líneas aparecen
                 * desde el centro.
                 */

                dibujarLogo(
                    t,
                    interpolar(
                        2.5,
                        5,
                        t
                    )
                );


                /*
                 * Reducimos visualmente la fuerza
                 * del ECG durante la transformación.
                 */

                if (t > 0.15) {

                    const alpha =
                        1 -
                        easeInOut(
                            (
                                t -
                                0.15
                            ) /
                            0.85
                        );


                    if (alpha > 0) {

                        ctx.save();

                        ctx.globalAlpha =
                            alpha * 0.65;

                        dibujarECG(
                            1,
                            2.7,
                            8
                        );

                        ctx.restore();

                    }

                }

            }


            /* =================================================
               RESPIRACIÓN DEL LOGO
               ================================================= */

            function dibujarRespiracion(
                tiempo
            ) {

                const respiracion =
                    (
                        Math.sin(
                            tiempo *
                            0.0045
                        ) + 1
                    ) / 2;


                const intensidad =
                    0.65 +
                    respiracion *
                    0.35;


                dibujarGlowCentral(
                    intensidad
                );


                /*
                 * Pequeña variación de brillo.
                 */

                ctx.save();

                ctx.globalAlpha =
                    0.12 +
                    respiracion * 0.12;

                dibujarLogo(
                    1,
                    5.1 +
                    respiracion * 0.35
                );

                ctx.restore();

            }


            /* =================================================
               FASES
               =================================================

               ECG inicial
               ↓
               Pulsaciones cada ~1.5 s
               ↓
               formación
               ↓
               hold
               ↓
               retracción
               ↓
               ECG
               ================================================= */

            const FASE_ECG =
                3600;

            const FASE_FORMACION =
                2500;

            const FASE_HOLD =
                1300;

            const FASE_RETRACCION =
                2400;

            const FASE_SALIDA =
                1900;


            const DURACION_TOTAL =
                FASE_ECG +
                FASE_FORMACION +
                FASE_HOLD +
                FASE_RETRACCION +
                FASE_SALIDA;


            /* =================================================
               ESCENA
               ================================================= */

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


                /* =============================================
                   GLOW GENERAL
                   ============================================= */

                dibujarGlowCentral(
                    0.55
                );


                /* =============================================
                   FASE 1
                   ECG + PULSACIONES
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
                        progreso
                    );

                }


                /* =============================================
                   FASE 2
                   FORMACIÓN
                   ============================================= */

                const inicioFormacion =
                    FASE_ECG;

                const finFormacion =
                    inicioFormacion +
                    FASE_FORMACION;


                if (
                    tiempo >= inicioFormacion &&
                    tiempo < finFormacion
                ) {

                    const progreso =
                        (
                            tiempo -
                            inicioFormacion
                        ) /
                        FASE_FORMACION;


                    dibujarTransformacion(
                        progreso
                    );


                    /*
                     * Glow aumenta durante
                     * la construcción.
                     */

                    const glow =
                        easeInOut(
                            progreso
                        );


                    dibujarGlowCentral(
                        0.65 +
                        glow *
                        0.45
                    );

                }


                /* =============================================
                   FASE 3
                   LOGO COMPLETO
                   ============================================= */

                const inicioHold =
                    finFormacion;

                const finHold =
                    inicioHold +
                    FASE_HOLD;


                if (
                    tiempo >= inicioHold &&
                    tiempo < finHold
                ) {

                    dibujarLogo(
                        1,
                        5
                    );


                    dibujarExtensiones(
                        1
                    );


                    dibujarRespiracion(
                        tiempo
                    );

                }


                /* =============================================
                   FASE 4
                   RETRACCIÓN
                   ============================================= */

                const inicioRetraccion =
                    finHold;

                const finRetraccion =
                    inicioRetraccion +
                    FASE_RETRACCION;


                if (
                    tiempo >= inicioRetraccion &&
                    tiempo < finRetraccion
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


                    /*
                     * ECG reaparece lentamente.
                     */

                    const recuperacion =
                        easeInOut(
                            progreso
                        );


                    if (
                        recuperacion > 0.25
                    ) {

                        ctx.save();

                        ctx.globalAlpha =
                            (
                                recuperacion -
                                0.25
                            ) /
                            0.75;

                        dibujarECG(
                            0.38,
                            2.5,
                            9
                        );

                        ctx.restore();

                    }


                    dibujarGlowCentral(
                        1 -
                        recuperacion *
                        0.55
                    );

                }


                /* =============================================
                   FASE 5
                   ECG VUELVE A SALIR
                   ============================================= */

                const inicioSalida =
                    finRetraccion;


                if (
                    tiempo >= inicioSalida
                ) {

                    const progreso =
                        clamp(
                            (
                                tiempo -
                                inicioSalida
                            ) /
                            FASE_SALIDA
                        );


                    /*
                     * El ECG sale desde el centro.
                     */

                    const salida =
                        [

                            punto(
                                575,
                                180
                            ),

                            punto(
                                650,
                                180
                            ),

                            punto(
                                760,
                                180
                            ),

                            punto(
                                850,
                                180
                            ),

                            punto(
                                930,
                                180
                            ),

                            punto(
                                980,
                                168
                            ),

                            punto(
                                1000,
                                192
                            ),

                            punto(
                                1025,
                                180
                            ),

                            punto(
                                1120,
                                180
                            ),

                            punto(
                                1240,
                                180
                            ),

                            punto(
                                1370,
                                180
                            ),

                            punto(
                                1500,
                                180
                            ),

                            punto(
                                1630,
                                180
                            ),

                            punto(
                                1760,
                                180
                            ),

                            punto(
                                1900,
                                180
                            )

                        ];


                    dibujarRuta(
                        salida,
                        easeOut(
                            progreso
                        ),
                        NARANJA,
                        2.6,
                        11
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


                dibujarGlowCentral(
                    0.7
                );


                dibujarLogo(
                    1,
                    5
                );


                ctx.restore();

            } else {

                let inicio =
                    performance.now();


                function animar(
                    timestamp
                ) {

                    const tiempo =
                        (
                            timestamp -
                            inicio
                        ) %
                        DURACION_TOTAL;


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
                   REINICIO AL VOLVER AL HERO
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
       PULSI — RESPUESTAS ACTUALES
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


    function responderPulsi(
        pregunta
    ) {

        const texto =
            pregunta
                .toLowerCase()
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                );


        for (
            const item of respuestasPulsi
        ) {

            const coincide =
                item.claves.some(
                    (clave) =>

                        texto.includes(
                            clave
                                .normalize("NFD")
                                .replace(
                                    /[\u0300-\u036f]/g,
                                    ""
                                )
                        )
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
