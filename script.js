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
   SISTEMA DE VISTAS — PULSO
   ========================================================= */

const vistas = document.querySelectorAll(
    ".view[data-view]"
);

const vistasPorNombre = {};


/*
 * Guardamos todas las vistas agrupadas
 * por su data-view.
 *
 * Ejemplo:
 *
 * data-view="inicio"
 * → Hero
 * → Brand statement
 * → Brand closing
 *
 * data-view="nosotros"
 * → Nosotros
 * → Por qué PULSO
 */

vistas.forEach((vista) => {

    const nombre =
        vista.dataset.view;

    if (!vistasPorNombre[nombre]) {
        vistasPorNombre[nombre] = [];
    }

    vistasPorNombre[nombre].push(vista);

});


let vistaActual =
    null;


/* =========================================================
   CAMBIAR DE VISTA
   ========================================================= */

function cambiarVista(
    nombreVista,
    actualizarURL = true
) {

    const grupo =
        vistasPorNombre[nombreVista];

    if (
        !grupo ||
        grupo.length === 0
    ) {
        return;
    }


    /*
     * Si ya estamos en esta vista,
     * no hacemos la animación nuevamente.
     */

    if (
        vistaActual === nombreVista
    ) {

        window.scrollTo({
            top: 0,
            behavior:
                reduceMotion
                    ? "auto"
                    : "smooth"
        });

        return;
    }


    /*
     * Quitamos la vista activa anterior.
     */

    vistas.forEach((vista) => {

        vista.classList.remove(
            "view-active",
            "view-entering"
        );

    });


    /*
     * Activamos todas las secciones
     * que pertenecen a la nueva vista.
     */

    grupo.forEach((vista) => {

        vista.classList.add(
            "view-active"
        );

    });


    /*
     * Forzamos un pequeño cambio
     * para permitir la animación CSS.
     */

    requestAnimationFrame(() => {

        grupo.forEach((vista) => {

            vista.classList.add(
                "view-entering"
            );

        });

    });


    vistaActual =
        nombreVista;


    /*
     * Volvemos arriba de la nueva vista.
     */

    window.scrollTo({
        top: 0,
        behavior:
            reduceMotion
                ? "auto"
                : "smooth"
    });


    /*
     * Actualizamos el hash.
     */

    if (actualizarURL) {

        const nuevoHash =
            `#${nombreVista}`;

        if (
            window.location.hash !==
            nuevoHash
        ) {

            history.pushState(
                {
                    vista: nombreVista
                },
                "",
                nuevoHash
            );

        }

    }

}


/* =========================================================
   LEER VISTA DESDE LA URL
   ========================================================= */

function obtenerVistaDesdeURL() {

    const hash =
        window.location.hash
            .replace(
                "#",
                ""
            )
            .trim()
            .toLowerCase();


    /*
     * Si no hay hash,
     * mostramos Inicio.
     */

    if (!hash) {
        return "inicio";
    }


    /*
     * Pulsi no es una vista.
     * Es un asistente flotante.
     */

    if (
        hash ===
        "pulsi-container"
    ) {

        return "inicio";

    }


    /*
     * Si el hash existe como vista,
     * lo utilizamos.
     */

    if (
        vistasPorNombre[hash]
    ) {

        return hash;

    }


    return "inicio";

}


/* =========================================================
   INICIALIZAR VISTA
   ========================================================= */

const vistaInicial =
    obtenerVistaDesdeURL();


cambiarVista(
    vistaInicial,
    false
);


/* =========================================================
   BOTÓN ATRÁS / ADELANTE DEL NAVEGADOR
   ========================================================= */

window.addEventListener(
    "popstate",
    () => {

        const vista =
            obtenerVistaDesdeURL();

        cambiarVista(
            vista,
            false
        );

    }
);


/* =========================================================
   CAMBIAR VISTA CUANDO CAMBIA EL HASH
   ========================================================= */

window.addEventListener(
    "hashchange",
    () => {

        const vista =
            obtenerVistaDesdeURL();

        if (
            vista !== vistaActual
        ) {

            cambiarVista(
                vista,
                false
            );

        }

    }
);
  /* =========================================================
   NAVEGACIÓN INTERNA — SISTEMA DE VISTAS
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


            /* =================================================
               PULSI
               ================================================= */

            if (
                id === "#pulsi-container"
            ) {

                event.preventDefault();

                cerrarMenu();

                abrirPulsi();

                return;
            }


            /*
             * Quitamos el #
             *
             * #inicio
             * → inicio
             *
             * #nosotros
             * → nosotros
             */

            const nombreVista =
                id
                    .replace("#", "")
                    .trim()
                    .toLowerCase();


            /*
             * Comprobamos si realmente
             * existe una vista con ese nombre.
             */

            if (
                !vistasPorNombre[nombreVista]
            ) {
                return;
            }


            /*
             * Evitamos que el navegador
             * haga el scroll tradicional.
             */

            event.preventDefault();


            /*
             * Cerramos el menú.
             */

            cerrarMenu();


            /*
             * Cambiamos de vista.
             */

            cambiarVista(
                nombreVista,
                true
            );

        }
    );

});


/* =========================================================
   CERRAR MENÚ AL HACER CLICK AFUERA
   ========================================================= */

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


/* =========================================================
   ESCAPE — CERRAR MENÚ
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

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

   V2 — MORPH GEOMÉTRICO REAL

   ECG EN MOVIMIENTO
        ↓
   LOS MISMOS PUNTOS SE DEFORMAN
        ↓
   EL TRAZO SE ABRE EN 3 RECORRIDOS
        ↓
      EBA
     PULSO
        ↓
   RESPIRACIÓN / GLOW
        ↓
   LOS 3 RECORRIDOS SE REÚNEN
        ↓
   ECG
        ↓
   CONTINÚA EL MOVIMIENTO

   IMPORTANTE:
   No se apagan escenas para encender otras.
   Los puntos cambian físicamente de posición.
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


        /* =================================================
           AJUSTE DEL CANVAS
           ================================================= */

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


        function easeInOutCubic(t) {

            t = clamp(t);

            return (
                t < 0.5
                    ? 4 * t * t * t
                    : 1 -
                      Math.pow(
                          -2 * t + 2,
                          3
                      ) / 2
            );
        }


        function smoothstep(t) {

            t = clamp(t);

            return (
                t *
                t *
                (
                    3 -
                    2 * t
                )
            );
        }


        function punto(x, y) {

            return {
                x,
                y
            };
        }


        /* =================================================
           ECG — PATRÓN CONTINUO
           ================================================= */

        /*
         * No utilizamos Math.random()
         * durante cada frame.
         *
         * El ECG se crea una sola vez y
         * después se desplaza.
         *
         * De esta forma las pulsaciones
         * mantienen su identidad mientras
         * recorren la pantalla.
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

            let x = -900;

            let semilla =
                0;


            ruta.push(
                punto(
                    x,
                    CY
                )
            );


            while (
                x <
                W + 1200
            ) {

                const tipo =
                    tiposPulso[
                        semilla %
                        tiposPulso.length
                    ];


                semilla++;


                const variacionAltura =
                    0.90 +
                    (
                        (
                            semilla *
                            17
                        ) %
                        20
                    ) /
                    100;


                const descanso =
                    115 +
                    (
                        (
                            semilla *
                            31
                        ) %
                        55
                    );


                x += descanso;


                const ancho =
                    tipo.ancho;

                const alto =
                    tipo.alto *
                    variacionAltura;


                ruta.push(
                    punto(
                        x,
                        CY
                    )
                );


                /*
                 * Pequeña preparación.
                 */

                ruta.push(
                    punto(
                        x +
                        ancho * 0.18,
                        CY
                    )
                );


                /*
                 * Pico.
                 */

                ruta.push(
                    punto(
                        x +
                        ancho * 0.36,
                        CY -
                        alto
                    )
                );


                /*
                 * Bajada.
                 */

                ruta.push(
                    punto(
                        x +
                        ancho * 0.53,
                        CY +
                        alto *
                        (
                            0.82 +
                            (
                                semilla %
                                5
                            ) *
                            0.025
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
                    W + 1200,
                    CY
                )
            );


            return ruta;
        }


        const ecg =
            crearECG();


        /* =================================================
           OBTENER PUNTO DE UNA RUTA
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
           INTERPOLACIÓN DE RUTAS
           ================================================= */

        /*
         * Todas las rutas se convierten al
         * mismo número de puntos.
         *
         * Esto es lo que permite que:
         *
         * punto 1 ECG → punto 1 LOGO
         * punto 2 ECG → punto 2 LOGO
         * punto 3 ECG → punto 3 LOGO
         *
         * etc.
         */

        function muestrearRuta(
            ruta,
            cantidad
        ) {

            const resultado = [];

            for (
                let i = 0;
                i < cantidad;
                i++
            ) {

                const progreso =
                    cantidad === 1
                        ? 0
                        : i /
                          (
                              cantidad - 1
                          );


                resultado.push(
                    obtenerPunto(
                        ruta,
                        progreso
                    )
                );

            }

            return resultado;
        }


        function interpolarPuntos(
            origen,
            destino,
            t
        ) {

            const resultado = [];

            const cantidad =
                Math.min(
                    origen.length,
                    destino.length
                );


            for (
                let i = 0;
                i < cantidad;
                i++
            ) {

                resultado.push(
                    punto(

                        lerp(
                            origen[i].x,
                            destino[i].x,
                            t
                        ),

                        lerp(
                            origen[i].y,
                            destino[i].y,
                            t
                        )

                    )
                );

            }

            return resultado;
        }


        /* =================================================
           LOGO — TRES RECORRIDOS
           ================================================= */

        /*
         * ESTA ES LA FORMA EBA / PULSO
         * QUE YA HABÍAMOS CONSEGUIDO.
         *
         * Se conserva la estructura.
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


        /*
         * Los tres recorridos ahora vuelven
         * suavemente hacia la línea central.
         *
         * Así el logo puede volver a convertirse
         * en un único ECG.
         */

        const logoSuperiorCompleto = [

            ...logoSuperior,

            punto(955, 112),
            punto(1015, 132),
            punto(1075, 165),
            punto(1135, 195),
            punto(1190, 210)

        ];


        const logoMedioCompleto = [

            ...logoMedio,

            punto(970, 210),
            punto(1050, 210),
            punto(1120, 210),
            punto(1190, 210)

        ];


        const logoInferiorCompleto = [

            ...logoInferior,

            punto(955, 308),
            punto(1015, 288),
            punto(1075, 255),
            punto(1135, 225),
            punto(1190, 210)

        ];


        const CANTIDAD_PUNTOS =
            70;


        const logoSuperiorPuntos =
            muestrearRuta(
                logoSuperiorCompleto,
                CANTIDAD_PUNTOS
            );


        const logoMedioPuntos =
            muestrearRuta(
                logoMedioCompleto,
                CANTIDAD_PUNTOS
            );


        const logoInferiorPuntos =
            muestrearRuta(
                logoInferiorCompleto,
                CANTIDAD_PUNTOS
            );


        /* =================================================
           FUENTES DEL MORPH
           ================================================= */

        /*
         * Las tres fuentes nacen del MISMO
         * tramo ECG.
         *
         * En morph = 0:
         *
         * ECG A
         * ECG B
         * ECG C
         *
         * están prácticamente superpuestos.
         *
         * Por eso el ojo percibe UNA SOLA LÍNEA.
         *
         * Al aumentar morph se separan
         * hacia los tres recorridos del logo.
         */

        const FUENTE_INICIO =
            0.355;


        const FUENTE_FIN =
            0.645;


        const fuenteECG =
            muestrearRuta(
                ecg,
                CANTIDAD_PUNTOS
            );


        const fuenteSuperior =
            fuenteECG.map(
                (p) =>
                    punto(
                        p.x,
                        p.y - 0.8
                    )
            );


        const fuenteMedio =
            fuenteECG.map(
                (p) =>
                    punto(
                        p.x,
                        p.y
                    )
            );


        const fuenteInferior =
            fuenteECG.map(
                (p) =>
                    punto(
                        p.x,
                        p.y + 0.8
                    )
            );


        /* =================================================
           TEXTO EBA + PULSO
           ================================================= */

        function dibujarTexto(
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
                `800 ${
                    112 *
                    escalaTexto
                }px Manrope, DM Sans, sans-serif`;


            ctx.fillStyle =
                BLANCO;


            ctx.globalAlpha =
                intensidad;


            ctx.shadowColor =
                NARANJA;


            ctx.shadowBlur =
                18 *
                intensidad;


            ctx.fillText(
                "EBA",
                CX,
                192
            );


            /*
             * PULSO
             */

            ctx.font =
                `600 ${
                    31 *
                    escalaTexto
                }px Manrope, DM Sans, sans-serif`;


            ctx.fillStyle =
                NARANJA_SUAVE;


            ctx.shadowBlur =
                10 *
                intensidad;


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
                    10,
                    CX,
                    CY,
                    360
                );


            gradiente.addColorStop(
                0,
                `rgba(
                    255,
                    106,
                    0,
                    ${0.13 * intensidad}
                )`
            );


            gradiente.addColorStop(
                0.45,
                `rgba(
                    255,
                    106,
                    0,
                    ${0.045 * intensidad}
                )`
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
           DIBUJAR RUTA DE PUNTOS
           ================================================= */

        function dibujarRuta(
            ruta,
            color,
            grosor,
            alpha,
            glow
        ) {

            if (
                !ruta ||
                ruta.length < 2
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


            if (
                glow > 0
            ) {

                ctx.shadowColor =
                    color;

                ctx.shadowBlur =
                    glow;
            }


            ctx.beginPath();


            ctx.moveTo(
                ruta[0].x,
                ruta[0].y
            );


            for (
                let i = 1;
                i < ruta.length;
                i++
            ) {

                ctx.lineTo(
                    ruta[i].x,
                    ruta[i].y
                );

            }


            ctx.stroke();


            ctx.restore();
        }


        /* =================================================
           ECG EN MOVIMIENTO
           ================================================= */

        /*
         * El ECG se desplaza permanentemente.
         *
         * No desaparece cuando aparece el logo.
         */

        const VELOCIDAD_ECG =
            0.000055;


        function dibujarECG(
            tiempo,
            alpha = 1
        ) {

            const progreso =
                (
                    tiempo *
                    VELOCIDAD_ECG
                ) % 1;


            /*
             * Movimiento lógico.
             */

            const desplazamiento =
                progreso *
                900;


            ctx.save();


            ctx.translate(
                -desplazamiento,
                0
            );


            ctx.beginPath();


            ctx.moveTo(
                ecg[0].x,
                ecg[0].y
            );


            for (
                let i = 1;
                i < ecg.length;
                i++
            ) {

                ctx.lineTo(
                    ecg[i].x,
                    ecg[i].y
                );

            }


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


            /*
             * Segunda copia para mantener
             * continuidad visual.
             */

            ctx.save();


            ctx.translate(
                900 -
                desplazamiento,
                0
            );


            ctx.beginPath();


            ctx.moveTo(
                ecg[0].x,
                ecg[0].y
            );


            for (
                let i = 1;
                i < ecg.length;
                i++
            ) {

                ctx.lineTo(
                    ecg[i].x,
                    ecg[i].y
                );

            }


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


        /* =================================================
           PULSO QUE RECORRE EL ECG
           ================================================= */

        function dibujarPulsoMovil(
            tiempo,
            intensidad
        ) {

            const progreso =
                (
                    tiempo *
                    VELOCIDAD_ECG
                ) % 1;


            const p =
                obtenerPunto(
                    ecg,
                    progreso
                );


            const desplazamiento =
                progreso *
                900;


            const x =
                p.x -
                desplazamiento;


            /*
             * Variación pequeña de intensidad.
             */

            const respiracion =
                (
                    Math.sin(
                        tiempo *
                        0.007
                    ) + 1
                ) / 2;


            ctx.save();


            ctx.fillStyle =
                NARANJA_SUAVE;


            ctx.shadowColor =
                NARANJA_SUAVE;


            ctx.shadowBlur =
                18 +
                respiracion *
                10;


            ctx.globalAlpha =
                intensidad *
                (
                    0.65 +
                    respiracion *
                    0.35
                );


            ctx.beginPath();


            ctx.arc(
                x,
                p.y,
                3.5 +
                respiracion * 1.5,
                0,
                Math.PI * 2
            );


            ctx.fill();


            ctx.restore();
        }


        /* =================================================
           MORPH REAL
           ================================================= */

        function dibujarMorph(
            tiempo
        ) {

            /*
             * Duración completa del loop.
             */

            const PERIODO =
               12000;

            const progresoLoop =
                (
                    tiempo %
                    PERIODO
                ) /
                PERIODO;


            /*
             * Onda 0 → 1 → 0.
             *
             * No son escenas.
             *
             * Es una única variable que
             * mueve físicamente los puntos.
             */

            const onda =
                (
                    Math.sin(
                        progresoLoop *
                        Math.PI *
                        2 -
                        Math.PI / 2
                    ) + 1
                ) / 2;


            /*
             * Curva del morph.
             */

            const morphBase =
                easeInOutCubic(
                    onda
                );

            const morph =
                morphBase > 0.82
                    ? 0.98
                    : morphBase;


            /*
             * Intensidad visual del logo.
             */

            const logoIntensidad =
                Math.pow(
                    morph,
                    0.72
                );


            /*
             * El ECG sigue existiendo
             * durante todo el proceso.
             */

            const alphaECG =
                lerp(
                    1,
                    0.18,
                    logoIntensidad
                );


            dibujarECG(
                tiempo,
                alphaECG
            );


            /* =================================================
               DESPLAZAMIENTO DEL TRAMO CENTRAL
               ================================================= */

            /*
             * El centro del morph permanece
             * ligado al recorrido del ECG.
             *
             * La posición se mueve muy
             * suavemente antes de quedar
             * atrapada en el centro.
             */

            const movimientoCentro =
                Math.sin(
                    tiempo *
                    0.00055
                ) *
                18 *
                (
                    1 -
                    logoIntensidad
                );


            function moverFuente(
                fuente
            ) {

                return fuente.map(
                    (p) =>
                        punto(
                            p.x +
                            movimientoCentro,
                            p.y
                        )
                );
            }


            const fuenteA =
                moverFuente(
                    fuenteSuperior
                );


            const fuenteB =
                moverFuente(
                    fuenteMedio
                );


            const fuenteC =
                moverFuente(
                    fuenteInferior
                );


            /*
             * Morph punto por punto.
             */

            const recorridoSuperior =
                interpolarPuntos(
                    fuenteA,
                    logoSuperiorPuntos,
                    morph
                );


            const recorridoMedio =
                interpolarPuntos(
                    fuenteB,
                    logoMedioPuntos,
                    morph
                );


            const recorridoInferior =
                interpolarPuntos(
                    fuenteC,
                    logoInferiorPuntos,
                    morph
                );


            /* =================================================
               TRAZO SUPERIOR
               ================================================= */

            dibujarRuta(
                recorridoSuperior,
                PLATA,
                lerp(
                    2.7,
                    4.5,
                    morph
                ),
                lerp(
                    0.02,
                    0.88,
                    logoIntensidad
                ),
                lerp(
                    3,
                    10,
                    logoIntensidad
                )
            );


            /* =================================================
               TRAZO CENTRAL
               ================================================= */

            dibujarRuta(
                recorridoMedio,
                BLANCO,
                lerp(
                    2.7,
                    4.8,
                    morph
                ),
                lerp(
                    0.03,
                    0.98,
                    logoIntensidad
                ),
                lerp(
                    3,
                    12,
                    logoIntensidad
                )
            );


            /* =================================================
               TRAZO INFERIOR
               ================================================= */

            dibujarRuta(
                recorridoInferior,
                PLATA,
                lerp(
                    2.7,
                    4.5,
                    morph
                ),
                lerp(
                    0.02,
                    0.88,
                    logoIntensidad
                ),
                lerp(
                    3,
                    10,
                    logoIntensidad
                )
            );


            /* =================================================
               GLOW CENTRAL
               ================================================= */

            const glow =
                Math.pow(
                    logoIntensidad,
                    1.25
                );


            dibujarGlow(
                glow *
                (
                    0.72 +
                    Math.sin(
                        tiempo *
                        0.003
                    ) *
                    0.10
                )
            );


            /* =================================================
               TEXTO
               ================================================= */

            /*
             * El texto aparece mientras los
             * trazos ya están formando la marca.
             *
             * No se coloca como una escena aparte.
             */

            const textoEntrada =
                smoothstep(
                    (
                        morph -
                        0.38
                    ) /
                    0.34
                );


            const textoSalida =
                1 -
                smoothstep(
                    (
                        morph -
                        0.92
                    ) /
                    0.08
                );


            const intensidadTexto =
                textoEntrada *
                Math.max(
                    0,
                    textoSalida
                );


            const respiracion =
                (
                    Math.sin(
                        tiempo *
                        0.0032
                    ) + 1
                ) / 2;


            if (
                intensidadTexto >
                0.001
            ) {

                dibujarTexto(
                    intensidadTexto *
                    (
                        0.92 +
                        respiracion *
                        0.08
                    ),
                    0.92 +
                    intensidadTexto *
                    0.08
                );

            }


            /* =================================================
               PULSO CENTRAL
               ================================================= */

            if (
                logoIntensidad >
                0.05
            ) {

                const pulso =
                    (
                        Math.sin(
                            tiempo *
                            0.0085
                        ) + 1
                    ) / 2;


                ctx.save();


                ctx.fillStyle =
                    NARANJA_SUAVE;


                ctx.shadowColor =
                    NARANJA;


                ctx.shadowBlur =
                    18 +
                    pulso *
                    18;


                ctx.globalAlpha =
                    logoIntensidad *
                    0.72;


                ctx.beginPath();


                ctx.arc(
                    CX,
                    CY,
                    2.5 +
                    pulso * 2.5,
                    0,
                    Math.PI * 2
                );


                ctx.fill();


                ctx.restore();
            }
        }


        /* =================================================
           REDUCIR MOVIMIENTO
           ================================================= */

        if (
            reduceMotion
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
             * Logo estático.
             *
             * Usamos directamente los
             * recorridos finales.
             */

            dibujarGlow(
                0.55
            );


            dibujarRuta(
                logoSuperiorPuntos,
                PLATA,
                4.5,
                0.90,
                8
            );


            dibujarRuta(
                logoMedioPuntos,
                BLANCO,
                4.8,
                0.95,
                10
            );


            dibujarRuta(
                logoInferiorPuntos,
                PLATA,
                4.5,
                0.90,
                8
            );


            dibujarTexto(
                1,
                1
            );


            ctx.restore();


        } else {

            /* =================================================
               ANIMACIÓN
               ================================================= */

            let inicio =
                performance.now();


            let animando =
                true;


            function animar(
                timestamp
            ) {

                if (
                    !animando
                ) {
                    return;
                }


                const tiempo =
                    timestamp -
                    inicio;


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
                 * TODO nace del mismo flujo.
                 */

                dibujarMorph(
                    tiempo
                );


                /*
                 * El pulso sigue recorriendo
                 * el ECG.
                 *
                 * Incluso durante el morph,
                 * su intensidad simplemente
                 * se vuelve más sutil.
                 */

                const ciclo =
                    (tiempo % 16000) / 16000;

                const onda =
                    (
                        Math.sin(
                            ciclo *
                            Math.PI *
                            2 -
                            Math.PI / 2
                        ) + 1
                    ) / 2;


                const intensidadPulso =
                    lerp(
                        0.78,
                        0.22,
                        Math.pow(
                            onda,
                            0.75
                        )
                    );


                dibujarPulsoMovil(
                    tiempo,
                    intensidadPulso
                );


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

                        animando =
                            true;


                        /*
                         * Continuamos el ciclo
                         * sin volver a mostrar
                         * una escena inicial.
                         */

                        inicio =
                            performance.now();


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
