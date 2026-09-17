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
   PULSO — LOGO CENTRAL
   =========================================================

   ANIMACIÓN ÚNICA Y CONTINUA

   ECG EN MOVIMIENTO
        ↓
   pulsos variables
        ↓
   deformación progresiva
        ↓
   EBA + PULSO
        ↓
   respiración
        ↓
   deformación inversa
        ↓
   ECG
        ↓
   continúa el recorrido

   IMPORTANTE:
   No existen escenas independientes.
   El movimiento del ECG continúa durante
   toda la animación.
   ========================================================= */

const canvas =
    document.querySelector("#pulsoLogoCanvas");

if (canvas) {

    const ctx =
        canvas.getContext("2d");

    if (ctx) {

        /* =================================================
           COLORES
           ================================================= */

        const NARANJA = "#ff6a00";
        const NARANJA_SUAVE = "#ff8533";
        const BLANCO = "#ffffff";
        const PLATA = "#c6cbd0";


        /* =================================================
           ESPACIO LÓGICO
           ================================================= */

        const W = 1800;
        const H = 420;

        const CX = 900;
        const CY = 210;


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


        ajustarCanvas();


        window.addEventListener(
            "resize",
            ajustarCanvas,
            {
                passive: true
            }
        );


        /* =================================================
           UTILIDADES
           ================================================= */

        function clamp(v) {

            return Math.max(
                0,
                Math.min(
                    1,
                    v
                )
            );
        }


        function lerp(a, b, t) {

            return (
                a +
                (b - a) * t
            );
        }


        function easeInOut(t) {

            t = clamp(t);

            return (
                t < 0.5
                    ? 2 * t * t
                    : 1 -
                      Math.pow(
                          -2 * t + 2,
                          2
                      ) / 2
            );
        }


        function easeIn(t) {

            t = clamp(t);

            return t * t * t;
        }


        function easeOut(t) {

            t = clamp(t);

            return 1 -
                Math.pow(
                    1 - t,
                    3
                );
        }


        function punto(x, y) {

            return {
                x,
                y
            };
        }


        /* =================================================
           ECG CONTINUO
           ================================================= */

        /*
         * Cada pulso posee:
         *
         * - separación
         * - altura
         * - ancho
         * - pequeña variación
         *
         * El resultado nunca es exactamente igual
         * de un ciclo al siguiente.
         */

        const tiposPulso = [

            {
                ancho: 82,
                alto: 32
            },

            {
                ancho: 96,
                alto: 46
            },

            {
                ancho: 112,
                alto: 65
            },

            {
                ancho: 128,
                alto: 88
            },

            {
                ancho: 145,
                alto: 112
            },

            {
                ancho: 104,
                alto: 76
            },

            {
                ancho: 138,
                alto: 58
            }

        ];


        function crearECG() {

            const ruta = [];

            let x = -500;

            ruta.push(
                punto(
                    x,
                    CY
                )
            );


            while (x < W + 600) {

                /*
                 * Distancia tranquila antes
                 * de cada pulso.
                 */

                const descanso =
                    115 +
                    Math.random() * 55;

                x += descanso;


                const tipo =
                    tiposPulso[
                        Math.floor(
                            Math.random() *
                            tiposPulso.length
                        )
                    ];


                const ancho =
                    tipo.ancho;

                const alto =
                    tipo.alto;


                const variacion =
                    0.90 +
                    Math.random() * 0.20;


                /*
                 * Inicio del pulso.
                 */

                ruta.push(
                    punto(
                        x,
                        CY
                    )
                );


                /*
                 * Pequeña subida.
                 */

                ruta.push(
                    punto(
                        x +
                        ancho * 0.18,
                        CY
                    )
                );


                /*
                 * Pico principal.
                 */

                ruta.push(
                    punto(
                        x +
                        ancho * 0.36,
                        CY -
                        alto *
                        variacion
                    )
                );


                /*
                 * Bajada profunda.
                 */

                ruta.push(
                    punto(
                        x +
                        ancho * 0.53,
                        CY +
                        alto *
                        (
                            0.82 +
                            Math.random() * 0.22
                        )
                    )
                );


                /*
                 * Regreso.
                 */

                ruta.push(
                    punto(
                        x +
                        ancho * 0.70,
                        CY
                    )
                );


                ruta.push(
                    punto(
                        x +
                        ancho,
                        CY
                    )
                );


                x += ancho;
            }


            ruta.push(
                punto(
                    W + 600,
                    CY
                )
            );


            return ruta;
        }


        let ecg =
            crearECG();


        /* =================================================
           RECORRIDO DEL ECG
           ================================================= */

        function obtenerPunto(
            ruta,
            progreso
        ) {

            if (
                !ruta ||
                ruta.length < 2
            ) {
                return punto(
                    CX,
                    CY
                );
            }


            const total =
                ruta.length - 1;


            const posicion =
                clamp(progreso) *
                total;


            const indice =
                Math.min(
                    Math.floor(posicion),
                    total - 1
                );


            const t =
                posicion -
                indice;


            const a =
                ruta[indice];

            const b =
                ruta[indice + 1];


            return punto(

                lerp(
                    a.x,
                    b.x,
                    t
                ),

                lerp(
                    a.y,
                    b.y,
                    t
                )

            );
        }


        /* =================================================
           TRAZOS CENTRALES DEL LOGO
           ================================================= */

        /*
         * Estos son los tres recorridos que
         * forman la estructura visual que ya
         * te había gustado.
         */

        const logoSuperior = [

            punto(610, 210),
            punto(680, 195),
            punto(735, 168),
            punto(790, 135),
            punto(845, 112),
            punto(900, 104)

        ];


        const logoMedio = [

            punto(610, 210),
            punto(680, 210),
            punto(750, 210),
            punto(820, 210),
            punto(900, 210)

        ];


        const logoInferior = [

            punto(610, 210),
            punto(680, 225),
            punto(735, 252),
            punto(790, 285),
            punto(845, 308),
            punto(900, 316)

        ];


        const logoTrazos = [

            logoSuperior,
            logoMedio,
            logoInferior

        ];


        /* =================================================
           MARCO
           ================================================= */

        const marcoSuperior = [

            punto(690, 105),
            punto(755, 78),
            punto(900, 62),
            punto(1045, 78),
            punto(1110, 105)

        ];


        const marcoInferior = [

            punto(690, 315),
            punto(755, 342),
            punto(900, 358),
            punto(1045, 342),
            punto(1110, 315)

        ];


        /* =================================================
           TEXTO EBA + PULSO
           ================================================= */

        function dibujarTexto(
            intensidad = 1,
            escala = 1
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
                `800 ${112 * escala}px Manrope, DM Sans, sans-serif`;

            ctx.fillStyle =
                BLANCO;

            ctx.globalAlpha =
                intensidad;

            ctx.shadowColor =
                NARANJA;

            ctx.shadowBlur =
                18 * intensidad;


            ctx.fillText(
                "EBA",
                CX,
                192
            );


            /*
             * PULSO
             */

            ctx.font =
                `600 ${31 * escala}px Manrope, DM Sans, sans-serif`;

            ctx.fillStyle =
                NARANJA_SUAVE;

            ctx.shadowBlur =
                10 * intensidad;


            ctx.fillText(
                "PULSO",
                CX,
                260
            );


            ctx.restore();
        }


        /* =================================================
           GLOW
           ================================================= */

        function dibujarGlow(
            intensidad
        ) {

            if (
                intensidad <= 0
            ) {
                return;
            }


            const gradiente =
                ctx.createRadialGradient(
                    CX,
                    CY,
                    15,
                    CX,
                    CY,
                    360
                );


            gradiente.addColorStop(
                0,
                `rgba(255,106,0,${0.12 * intensidad})`
            );


            gradiente.addColorStop(
                0.45,
                `rgba(255,106,0,${0.04 * intensidad})`
            );


            gradiente.addColorStop(
                1,
                "rgba(255,106,0,0)"
            );


            ctx.save();

            ctx.fillStyle =
                gradiente;

            ctx.fillRect(
                250,
                0,
                1300,
                H
            );

            ctx.restore();
        }


        /* =================================================
           DIBUJAR SEGMENTO
           ================================================= */

        function dibujarSegmento(
            ruta,
            inicio,
            fin,
            color,
            grosor,
            glow,
            alpha
        ) {

            if (
                !ruta ||
                ruta.length < 2
            ) {
                return;
            }


            inicio =
                clamp(inicio);

            fin =
                clamp(fin);


            if (
                fin <= inicio
            ) {
                return;
            }


            const total =
                ruta.length - 1;


            const desde =
                inicio * total;

            const hasta =
                fin * total;


            const indiceInicio =
                Math.floor(desde);

            const indiceFin =
                Math.floor(hasta);


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


            ctx.beginPath();


            const primerPunto =
                obtenerPunto(
                    ruta,
                    inicio
                );


            ctx.moveTo(
                primerPunto.x,
                primerPunto.y
            );


            for (
                let i =
                    indiceInicio + 1;

                i <= indiceFin;

                i++
            ) {

                const p =
                    ruta[i];

                ctx.lineTo(
                    p.x,
                    p.y
                );
            }


            const ultimoPunto =
                obtenerPunto(
                    ruta,
                    fin
                );


            ctx.lineTo(
                ultimoPunto.x,
                ultimoPunto.y
            );


            ctx.stroke();

            ctx.restore();
        }


        /* =================================================
           ECG EN MOVIMIENTO
           ================================================= */

        /*
         * El ECG no se dibuja como una escena
         * que empieza y termina.
         *
         * Se desplaza constantemente.
         */

        let desplazamiento =
            0;


        let velocidad =
            0.000055;


        function dibujarECGContinuo(
            tiempo,
            alpha = 1
        ) {

            /*
             * Movimiento permanente.
             */

            desplazamiento =
                (
                    tiempo *
                    velocidad
                ) % 1;


            /*
             * Dibujamos varias copias
             * desplazadas para que nunca
             * aparezca un corte visual.
             */

            const desplazamientos = [

                -1.0,
                0,
                1.0

            ];


            desplazamientos.forEach(
                (offset) => {

                    const mover =
                        desplazamiento +
                        offset;


                    ctx.save();

                    ctx.translate(
                        -mover * 900,
                        0
                    );


                    /*
                     * ECG principal.
                     */

                    ctx.beginPath();

                    ctx.moveTo(
                        ecg[0].x,
                        ecg[0].y
                    );


                    ecg.forEach(
                        (p) => {

                            ctx.lineTo(
                                p.x,
                                p.y
                            );

                        }
                    );


                    ctx.strokeStyle =
                        NARANJA;

                    ctx.lineWidth =
                        2.7;

                    ctx.lineCap =
                        "round";

                    ctx.lineJoin =
                        "round";

                    ctx.globalAlpha =
                        alpha;

                    ctx.shadowColor =
                        NARANJA;

                    ctx.shadowBlur =
                        7;


                    ctx.stroke();

                    ctx.restore();
                }
            );
        }


        /* =================================================
           PULSO MÓVIL
           ================================================= */

        function dibujarPulsoMovil(
            tiempo,
            intensidad = 1
        ) {

            const progreso =
                (
                    tiempo *
                    0.000055
                ) % 1;


            /*
             * El punto recorre el ECG.
             */

            const p =
                obtenerPunto(
                    ecg,
                    progreso
                );


            ctx.save();


            ctx.shadowColor =
                NARANJA_SUAVE;

            ctx.shadowBlur =
                25;


            ctx.fillStyle =
                NARANJA_SUAVE;

            ctx.globalAlpha =
                intensidad;


            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                4.5,
                0,
                Math.PI * 2
            );


            ctx.fill();


            ctx.restore();
        }


        /* =================================================
           TRANSFORMACIÓN CENTRAL
           ================================================= */

        /*
         * ESTA ES LA PARTE NUEVA.
         *
         * No hacemos:
         *
         * ECG OFF
         * LOGO ON
         *
         * En cambio:
         *
         * ECG
         *   ↓
         * los puntos centrales se deforman
         *   ↓
         * tres recorridos
         *   ↓
         * logo
         *
         * Todo ocurre simultáneamente.
         */

        function dibujarMorph(
            tiempo
        ) {

            /*
             * Ciclo largo.
             *
             * El morph va y vuelve,
             * pero nunca existe una escena
             * independiente.
             */

            const periodo =
                11500;


            const ciclo =
                (
                    tiempo %
                    periodo
                ) /
                periodo;


            /*
             * Una ventana central que
             * comienza a transformarse.
             */

            const distancia =
                Math.abs(
                    ciclo - 0.5
                );


            /*
             * Intensidad:
             *
             * 0 = ECG
             * 1 = logo
             */

            let morph =
                1 -
                distancia * 2;


            morph =
                clamp(
                    morph
                );


            /*
             * Curva suave.
             */

            morph =
                easeInOut(
                    morph
                );


            /*
             * El logo solamente domina
             * cuando el ECG ya llegó
             * físicamente al centro.
             */

            const concentracion =
                Math.pow(
                    morph,
                    0.82
                );


            /*
             * ECG alrededor del centro.
             */

            const anchoZona =
                lerp(
                    520,
                    150,
                    concentracion
                );


            /*
             * Dibujamos el ECG general.
             */

            dibujarECGContinuo(
                tiempo,
                1 -
                concentracion * 0.72
            );


            /*
             * Ahora construimos los tres
             * recorridos progresivamente.
             */

            logoTrazos.forEach(
                (
                    ruta,
                    indice
                ) => {

                    const alpha =
                        concentracion *
                        (
                            indice === 1
                                ? 0.96
                                : 0.82
                        );


                    const grosor =
                        lerp(
                            2.7,
                            4.5,
                            concentracion
                        );


                    dibujarSegmento(
                        ruta,
                        0,
                        concentracion,
                        indice === 1
                            ? BLANCO
                            : PLATA,
                        grosor,
                        7 +
                        concentracion * 7,
                        alpha
                    );

                }
            );


            /*
             * Marco naranja.
             */

            const marcoAlpha =
                Math.pow(
                    concentracion,
                    1.5
                );


            dibujarSegmento(
                marcoSuperior,
                0,
                marcoAlpha,
                NARANJA,
                2.1,
                8,
                marcoAlpha * 0.7
            );


            dibujarSegmento(
                marcoInferior,
                0,
                marcoAlpha,
                NARANJA,
                2.1,
                8,
                marcoAlpha * 0.7
            );


            /*
             * Texto.
             */

            const texto =
                easeOut(
                    Math.max(
                        0,
                        (
                            concentracion -
                            0.38
                        ) /
                        0.62
                    )
                );


            if (
                texto > 0
            ) {

                const respiracion =
                    (
                        Math.sin(
                            tiempo * 0.003
                        ) + 1
                    ) / 2;


                dibujarTexto(
                    texto *
                    (
                        0.92 +
                        respiracion * 0.08
                    ),
                    0.92 +
                    texto * 0.08
                );
            }


            /*
             * Glow.
             */

            dibujarGlow(
                concentracion *
                (
                    0.65 +
                    Math.sin(
                        tiempo * 0.003
                    ) * 0.12
                )
            );


            /*
             * Pulso central.
             *
             * Se intensifica a medida que
             * el ECG se convierte en logo.
             */

            if (
                concentracion > 0.05
            ) {

                const pulso =
                    (
                        Math.sin(
                            tiempo * 0.009
                        ) + 1
                    ) / 2;


                ctx.save();


                ctx.fillStyle =
                    NARANJA_SUAVE;

                ctx.shadowColor =
                    NARANJA;

                ctx.shadowBlur =
                    20 +
                    pulso * 15;


                ctx.globalAlpha =
                    concentracion *
                    0.85;


                ctx.beginPath();

                ctx.arc(
                    CX,
                    CY,
                    3 +
                    pulso * 3,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

                ctx.restore();
            }


            /*
             * Evitamos que la variable
             * anchoZona quede sin propósito
             * y la usamos para suavizar
             * visualmente el centro.
             */

            if (
                anchoZona > 0 &&
                concentracion > 0.01
            ) {

                ctx.save();

                ctx.globalAlpha =
                    concentracion * 0.08;

                ctx.strokeStyle =
                    NARANJA;

                ctx.lineWidth =
                    1;

                ctx.beginPath();

                ctx.moveTo(
                    CX - anchoZona,
                    CY
                );

                ctx.lineTo(
                    CX + anchoZona,
                    CY
                );

                ctx.stroke();

                ctx.restore();
            }
        }


        /* =================================================
           ANIMACIÓN PRINCIPAL
           ================================================= */

        if (reduceMotion) {

            /*
             * Para usuarios que prefieren
             * reducir movimiento.
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


            /*
             * Logo estático.
             */

            dibujarGlow(
                0.55
            );


            dibujarSegmento(
                marcoSuperior,
                0,
                1,
                NARANJA,
                2.1,
                7,
                0.62
            );


            dibujarSegmento(
                marcoInferior,
                0,
                1,
                NARANJA,
                2.1,
                7,
                0.62
            );


            logoTrazos.forEach(
                (
                    ruta,
                    indice
                ) => {

                    dibujarSegmento(
                        ruta,
                        0,
                        1,
                        indice === 1
                            ? BLANCO
                            : PLATA,
                        4.5,
                        8,
                        0.9
                    );

                }
            );


            dibujarTexto(
                1,
                1
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
                    timestamp -
                    inicio;


                /*
                 * Limpiar frame.
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


                /*
                 * Todo el logo nace del
                 * mismo flujo temporal.
                 */

                dibujarMorph(
                    tiempo
                );


                /*
                 * Punto de pulso en movimiento.
                 */

                if (
                    !(
                        (
                            tiempo %
                            11500
                        ) /
                        11500
                    )
                ) {

                    dibujarPulsoMovil(
                        tiempo,
                        0.8
                    );

                } else {

                    dibujarPulsoMovil(
                        tiempo,
                        0.75
                    );
                }


                ctx.restore();


                requestAnimationFrame(
                    animar
                );
            }


            requestAnimationFrame(
                animar
            );


            /* =================================================
               VISIBILIDAD DEL HERO
               ================================================= */

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

                                        animando =
                                            true;

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


            /* =================================================
               VISIBILIDAD DE LA PÁGINA
               ================================================= */

            document.addEventListener(
                "visibilitychange",
                () => {

                    if (
                        document.hidden
                    ) {

                        animando =
                            false;

                    } else {

                        /*
                         * No reiniciamos el logo.
                         * Continuamos desde el momento
                         * actual de la animación.
                         */

                        animando =
                            true;

                        inicio =
                            performance.now() -
                            (
                                performance.now() %
                                11500
                            );


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
