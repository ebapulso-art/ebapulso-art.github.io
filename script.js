/* ============================================================
   PULSO — SCRIPT PRINCIPAL
   Logo animado: ECG → EBA + PULSO → retracción → ECG
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =========================================================
       CONFIGURACIÓN
       ========================================================= */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =========================================================
       AÑO DEL FOOTER
       ========================================================= */

    document.querySelectorAll("[data-year]").forEach((el) => {
        el.textContent = new Date().getFullYear();
    });


    /* =========================================================
       NAVBAR
       ========================================================= */

    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");

    function cerrarMenu() {

        if (navMenu) {
            navMenu.classList.remove("active");
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
       LINKS
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

                const navbar =
                    document.querySelector(".navbar");

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
       NAVBAR SCROLL
       ========================================================= */

    const navbar =
        document.querySelector(".navbar");


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
       APARICIÓN DE SECCIONES
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


        if (!ctx) {
            return;
        }


        /* =====================================================
           COLORES
           ===================================================== */

        const NARANJA =
            "#ff6a00";

        const NARANJA_CLARO =
            "#ff8533";

        const PLATA =
            "#c8cdd2";

        const PLATA_CLARA =
            "#f0f2f4";


        /* =====================================================
           TAMAÑO LÓGICO
           ===================================================== */

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


        /* =====================================================
           UTILIDADES
           ===================================================== */

        function clamp(
            value
        ) {

            return Math.max(
                0,
                Math.min(
                    1,
                    value
                )
            );

        }


        function easeInOut(
            value
        ) {

            value =
                clamp(value);

            return (
                value < 0.5
                    ? 2 * value * value
                    : 1 -
                      Math.pow(
                          -2 * value + 2,
                          2
                      ) / 2
            );

        }


        function easeOut(
            value
        ) {

            value =
                clamp(value);

            return 1 -
                Math.pow(
                    1 - value,
                    3
                );

        }


        function easeIn(
            value
        ) {

            value =
                clamp(value);

            return value * value * value;

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


        /* =====================================================
           ECG DE ENTRADA
           ===================================================== */

        const entrada = [

            punto(-120, 180),

            punto(20, 180),

            punto(130, 180),

            punto(220, 180),

            punto(290, 180),

            punto(350, 179),

            /*
             * pequeño cambio de pulso
             */

            punto(380, 171),

            punto(402, 188),

            punto(425, 180),

            punto(465, 180),

            /*
             * pulso principal
             */

            punto(500, 180),

            punto(525, 112),

            punto(548, 244),

            punto(575, 180)

        ];


        /* =====================================================
           PUNTO CENTRAL
           ===================================================== */

        const CENTRO_X = 575;


        /* =====================================================
           =====================================================
           LAS 3 LÍNEAS DEL SÍMBOLO EBA
           =====================================================
           =====================================================

           IMPORTANTE:

           No son:
           línea 1 = E
           línea 2 = B
           línea 3 = A

           Las tres forman juntas el símbolo.
        */


        /* =====================================================
           LÍNEA EBA — SUPERIOR
           ===================================================== */

        const eba1 = [

            punto(CENTRO_X, 166),

            punto(625, 145),

            punto(680, 125),

            punto(750, 125),

            punto(820, 125),

            punto(860, 125),

            punto(885, 138),

            punto(898, 154),

            punto(898, 170)

        ];


        /* =====================================================
           LÍNEA EBA — CENTRAL
           ===================================================== */

        const eba2 = [

            punto(CENTRO_X, 180),

            punto(625, 180),

            punto(690, 180),

            punto(755, 180),

            punto(820, 180),

            punto(865, 180),

            punto(895, 168),

            punto(895, 150),

            punto(880, 136)

        ];


        /* =====================================================
           LÍNEA EBA — INFERIOR / DIAGONAL
           ===================================================== */

        const eba3 = [

            punto(CENTRO_X, 194),

            punto(620, 215),

            punto(670, 238),

            punto(720, 255),

            punto(760, 190),

            punto(805, 258),

            punto(850, 238),

            punto(895, 205),

            punto(940, 180)

        ];


        /* =====================================================
           CUARTA LÍNEA — PULSO
           =====================================================

           Esta línea queda debajo del símbolo.
        */

        const pulso = [

            /*
             * Entrada desde el centro
             */

            punto(CENTRO_X, 208),

            punto(610, 250),

            punto(610, 302),

            punto(630, 302),

            punto(630, 265),

            punto(660, 265),

            punto(680, 278),

            punto(680, 302),

            punto(720, 302),

            punto(720, 255),

            pointSafe(720, 255),

            /*
             * U
             */

            punto(750, 255),

            punto(750, 290),

            punto(765, 302),

            punto(785, 302),

            punto(800, 290),

            punto(800, 255),

            /*
             * L
             */

            punto(835, 255),

            punto(835, 302),

            punto(870, 302),

            /*
             * S
             */

            punto(915, 255),

            punto(880, 255),

            punto(868, 265),

            punto(880, 276),

            punto(910, 282),

            punto(920, 292),

            punto(908, 302),

            punto(875, 302),

            /*
             * O
             */

            punto(960, 255),

            punto(995, 255),

            punto(1008, 268),

            punto(1008, 289),

            punto(995, 302),

            punto(960, 302),

            punto(947, 289),

            punto(947, 268),

            punto(960, 255),

            /*
             * salida
             */

            punto(1045, 280)

        ];


        /*
         * Evita cualquier error si un navegador
         * encuentra un punto repetido.
         */

        function pointSafe(
            x,
            y
        ) {

            return punto(
                x,
                y
            );

        }


        /* =====================================================
           EXTENSIONES DESPUÉS DEL LOGO
           ===================================================== */

        const salida1 = [

            punto(898, 170),

            punto(1020, 170),

            punto(1120, 168),

            punto(1220, 172),

            punto(1320, 168),

            punto(1430, 180)

        ];


        const salida2 = [

            punto(880, 136),

            punto(1000, 140),

            punto(1110, 142),

            punto(1220, 138),

            punto(1330, 145),

            punto(1430, 180)

        ];


        const salida3 = [

            punto(940, 180),

            punto(1030, 190),

            punto(1130, 188),

            punto(1230, 192),

            punto(1330, 188),

            punto(1430, 180)

        ];


        const salida4 = [

            punto(1045, 280),

            punto(1110, 275),

            punto(1210, 272),

            punto(1310, 270),

            punto(1430, 180)

        ];


        const salidas = [
            salida1,
            salida2,
            salida3,
            salida4
        ];


        /* =====================================================
           ECG FINAL
           ===================================================== */

        const finalECG = [

            punto(1430, 180),

            punto(1510, 180),

            punto(1580, 180),

            punto(1640, 179),

            punto(1710, 181),

            punto(1780, 180),

            punto(1880, 180)

        ];


        /* =====================================================
           DIBUJAR RUTA
           ===================================================== */

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


            if (progreso <= 0) {
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


        /* =====================================================
           PUNTO LUMINOSO DEL ECG
           ===================================================== */

        function dibujarPunto(
            x,
            y,
            intensidad = 1
        ) {

            ctx.save();


            ctx.shadowColor =
                NARANJA;

            ctx.shadowBlur =
                25 * intensidad;


            ctx.fillStyle =
                NARANJA_CLARO;


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                4 * intensidad,
                0,
                Math.PI * 2
            );

            ctx.fill();


            ctx.restore();

        }


        /* =====================================================
           GLOW DEL CENTRO
           ===================================================== */

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
                    760,
                    185,
                    10,
                    760,
                    185,
                    300
                );


            gradient.addColorStop(
                0,
                `rgba(255,106,0,${0.13 * intensidad})`
            );


            gradient.addColorStop(
                0.45,
                `rgba(255,106,0,${0.055 * intensidad})`
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
                20,
                900,
                320
            );

            ctx.restore();

        }


        /* =====================================================
           DIBUJAR ECG DE ENTRADA
           ===================================================== */

        function dibujarEntrada(
            progreso
        ) {

            dibujarRuta(
                entrada,
                progreso,
                NARANJA,
                2.8,
                13
            );


            if (
                progreso > 0
            ) {

                const indice =
                    Math.min(
                        entrada.length - 1,
                        Math.floor(
                            progreso *
                            (entrada.length - 1)
                        )
                    );


                const actual =
                    entrada[indice];


                dibujarPunto(
                    actual.x,
                    actual.y,
                    0.7
                );

            }

        }


        /* =====================================================
           DIBUJAR EBA + PULSO
           ===================================================== */

        function dibujarLogo(
            progreso
        ) {

            /*
             * Las tres líneas superiores
             * se construyen juntas.
             */

            dibujarRuta(
                eba1,
                progreso,
                PLATA,
                5,
                12
            );


            dibujarRuta(
                eba2,
                progreso,
                PLATA_CLARA,
                5,
                14
            );


            dibujarRuta(
                eba3,
                progreso,
                PLATA,
                5,
                13
            );


            /*
             * Cuarta línea:
             * PULSO abajo.
             */

            dibujarRuta(
                pulso,
                progreso,
                PLATA_CLARA,
                4.5,
                11
            );

        }


        /* =====================================================
           DIBUJAR LAS 4 LÍNEAS DE SALIDA
           ===================================================== */

        function dibujarSalidas(
            progreso
        ) {

            salidas.forEach(
                (ruta) => {

                    dibujarRuta(
                        ruta,
                        progreso,
                        NARANJA,
                        2.8,
                        13
                    );

                }
            );

        }


        /* =====================================================
           RETRACCIÓN
           =====================================================

           Acá está la diferencia importante:

           NO desaparece el logo.

           Las cuatro líneas se recorren
           de atrás hacia adelante.
        */

        function dibujarRetraccion(
            progreso
        ) {

            progreso =
                clamp(progreso);


            const inverso =
                1 - easeInOut(
                    progreso
                );


            /*
             * EBA
             */

            dibujarRuta(
                eba1,
                inverso,
                PLATA,
                5,
                12
            );


            dibujarRuta(
                eba2,
                inverso,
                PLATA_CLARA,
                5,
                14
            );


            dibujarRuta(
                eba3,
                inverso,
                PLATA,
                5,
                13
            );


            /*
             * PULSO
             */

            dibujarRuta(
                pulso,
                inverso,
                PLATA_CLARA,
                4.5,
                11
            );

        }


        /* =====================================================
           BORRADO SUAVE DEL LOGO
           ===================================================== */

        function dibujarRetraccionConSalida(
            progreso
        ) {

            const t =
                clamp(progreso);


            /*
             * Primero se retraen las líneas.
             */

            dibujarRetraccion(
                t
            );


            /*
             * Mientras se retraen,
             * la señal naranja va recuperando
             * el eje central.
             */

            const regreso =
                easeInOut(t);


            /*
             * Línea naranja que vuelve
             * al punto central.
             */

            const p1 =
                interpolar(
                    1430,
                    575,
                    regreso
                );


            dibujarRuta(
                [
                    punto(
                        p1,
                        180
                    ),
                    punto(
                        1500,
                        180
                    )
                ],
                0.01,
                NARANJA,
                2.8,
                12
            );

        }


        /* =====================================================
           ECG FINAL
           ===================================================== */

        function dibujarFinal(
            progreso
        ) {

            dibujarRuta(
                finalECG,
                progreso,
                NARANJA,
                2.5,
                10
            );

        }


        /* =====================================================
           FASES
           ===================================================== */

        const FASE_ENTRADA =
            1700;

        const FASE_FORMACION =
            2600;

        const FASE_HOLD =
            550;

        const FASE_RETRACCION =
            2300;

        const FASE_SALIDA =
            1700;


        const DURACION_TOTAL =
            FASE_ENTRADA +
            FASE_FORMACION +
            FASE_HOLD +
            FASE_RETRACCION +
            FASE_SALIDA;


        /* =====================================================
           ESCENA
           ===================================================== */

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
             * Glow central muy suave.
             */

            dibujarGlowCentral(
                0.7
            );


            /* =================================================
               FASE 1 — ENTRA ECG
               ================================================= */

            if (
                tiempo <
                FASE_ENTRADA
            ) {

                const p =
                    easeInOut(
                        tiempo /
                        FASE_ENTRADA
                    );


                dibujarEntrada(
                    p
                );

            }


            /* =================================================
               FASE 2 — FORMACIÓN
               ================================================= */

            const inicioFormacion =
                FASE_ENTRADA;

            const finFormacion =
                inicioFormacion +
                FASE_FORMACION;


            if (
                tiempo >= inicioFormacion &&
                tiempo < finFormacion
            ) {

                dibujarEntrada(
                    1
                );


                const p =
                    easeInOut(
                        (
                            tiempo -
                            inicioFormacion
                        ) /
                        FASE_FORMACION
                    );


                dibujarLogo(
                    p
                );

            }


            /* =================================================
               FASE 3 — LOGO COMPLETO
               ================================================= */

            const inicioHold =
                finFormacion;

            const finHold =
                inicioHold +
                FASE_HOLD;


            if (
                tiempo >= inicioHold &&
                tiempo < finHold
            ) {

                dibujarEntrada(
                    1
                );


                dibujarLogo(
                    1
                );


                /*
                 * El brillo respira muy suavemente.
                 */

                const respiracion =
                    (
                        Math.sin(
                            tiempo * 0.012
                        ) + 1
                    ) / 2;


                dibujarGlowCentral(
                    0.75 +
                    respiracion * 0.25
                );

            }


            /* =================================================
               FASE 4 — RETRACCIÓN
               ================================================= */

            const inicioRetraccion =
                finHold;

            const finRetraccion =
                inicioRetraccion +
                FASE_RETRACCION;


            if (
                tiempo >= inicioRetraccion &&
                tiempo < finRetraccion
            ) {

                dibujarEntrada(
                    1
                );


                const p =
                    (
                        tiempo -
                        inicioRetraccion
                    ) /
                    FASE_RETRACCION;


                dibujarRetraccion(
                    p
                );


                /*
                 * La señal naranja va recuperando
                 * el eje central.
                 */

                const recuperacion =
                    easeInOut(p);


                /*
                 * Punto central naranja.
                 */

                dibujarPunto(
                    interpolar(
                        1430,
                        575,
                        recuperacion
                    ),
                    180,
                    0.65
                );

            }


            /* =================================================
               FASE 5 — ECG VUELVE A SALIR
               ================================================= */

            const inicioSalida =
                finRetraccion;


            if (
                tiempo >= inicioSalida
            ) {

                const p =
                    clamp(
                        (
                            tiempo -
                            inicioSalida
                        ) /
                        FASE_SALIDA
                    );


                /*
                 * ECG comienza desde el centro.
                 */

                const nuevaLinea = [

                    punto(
                        575,
                        180
                    ),

                    punto(
                        680,
                        180
                    ),

                    punto(
                        780,
                        180
                    ),

                    punto(
                        860,
                        180
                    ),

                    punto(
                        920,
                        180
                    ),

                    punto(
                        960,
                        170
                    ),

                    punto(
                        985,
                        190
                    ),

                    punto(
                        1010,
                        180
                    ),

                    punto(
                        1120,
                        180
                    ),

                    punto(
                        1230,
                        180
                    ),

                    punto(
                        1350,
                        180
                    ),

                    punto(
                        1470,
                        180
                    ),

                    punto(
                        1590,
                        180
                    ),

                    punto(
                        1720,
                        180
                    ),

                    punto(
                        1880,
                        180
                    )

                ];


                dibujarRuta(
                    nuevaLinea,
                    easeOut(p),
                    NARANJA,
                    2.5,
                    10
                );

            }


            ctx.restore();

        }


        /* =====================================================
           ANIMACIÓN
           ===================================================== */

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


        if (reduceMotion) {

            /*
             * Si el usuario tiene activado
             * reducir movimiento, mostramos
             * el logo completo.
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
                1
            );

            dibujarLogo(
                1
            );

            ctx.restore();

        } else {

            requestAnimationFrame(
                animar
            );

        }


        /* =====================================================
           REINICIO AL VOLVER AL HERO
           ===================================================== */

        const hero =
            document.querySelector(
                "#inicio"
            );


        if (
            hero &&
            "IntersectionObserver" in window
        ) {

            const heroObserver =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    inicio =
                                        performance.now();

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
       FIN
       ========================================================= */

    console.log(
        "%cPULSO",
        "color:#ff6a00;font-size:24px;font-weight:800;letter-spacing:5px"
    );

    console.log(
        "Sistema PULSO iniciado."
    );

});
