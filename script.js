/* ============================================================
   PULSO — SCRIPT PRINCIPAL
   ============================================================

   Logo:
   - ECG naranja desde el borde izquierdo
   - 4 líneas
   - 3 líneas forman juntas el símbolo EBA
   - 1 línea forma PULSO debajo
   - Las 4 líneas continúan hacia la derecha
   - Las 4 líneas se unen
   - Una sola línea continúa hasta el borde derecho
   - Loop continuo

   No utiliza el PNG del logo para la animación.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ============================================================
       CONFIGURACIÓN GENERAL
       ============================================================ */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
        document.documentElement.classList.add(
            "reducir-movimiento"
        );
    }


    /* ============================================================
       AÑO AUTOMÁTICO
       ============================================================ */

    document.querySelectorAll("[data-year]").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });


    /* ============================================================
       NAVBAR
       ============================================================ */

    const menuToggle =
        document.querySelector("#menu-toggle");

    const navMenu =
        document.querySelector("#nav-menu");


    function abrirMenu() {

        if (!navMenu) return;

        navMenu.classList.add("active");

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


    function cerrarMenu() {

        if (!navMenu) return;

        navMenu.classList.remove("active");

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


    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.addEventListener(
            "click",
            () => {

                if (
                    navMenu &&
                    navMenu.classList.contains(
                        "active"
                    )
                ) {
                    cerrarMenu();
                } else {
                    abrirMenu();
                }

            }
        );
    }


    /* ============================================================
       NAVEGACIÓN INTERNA
       ============================================================ */

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        href
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                cerrarMenu();

                const navbar =
                    document.querySelector(
                        ".navbar"
                    );

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const top =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: Math.max(
                        0,
                        top
                    ),
                    behavior:
                        reduceMotion
                            ? "auto"
                            : "smooth"
                });

            }
        );

    });


    /* ============================================================
       CERRAR MENÚ AL HACER CLICK AFUERA
       ============================================================ */

    document.addEventListener(
        "click",
        (event) => {

            if (!navMenu || !menuToggle) {
                return;
            }

            if (
                !navMenu.classList.contains(
                    "active"
                )
            ) {
                return;
            }

            if (
                navMenu.contains(
                    event.target
                ) ||
                menuToggle.contains(
                    event.target
                )
            ) {
                return;
            }

            cerrarMenu();

        }
    );


    /* ============================================================
       ESCAPE
       ============================================================ */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                cerrarMenu();
            }

        }
    );


    /* ============================================================
       NAVBAR AL HACER SCROLL
       ============================================================ */

    const navbar =
        document.querySelector(
            ".navbar"
        );


    function actualizarNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add(
                "scrolled"
            );
        } else {
            navbar.classList.remove(
                "scrolled"
            );
        }

    }


    window.addEventListener(
        "scroll",
        actualizarNavbar,
        {
            passive: true
        }
    );

    actualizarNavbar();


    /* ============================================================
       ANIMACIONES DE SECCIONES
       ============================================================ */

    const elementos =
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
        !reduceMotion &&
        "IntersectionObserver" in window
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
                        "0px 0px -40px 0px"
                }
            );


        elementos.forEach(
            (elemento) => {
                observer.observe(
                    elemento
                );
            }
        );

    } else {

        elementos.forEach(
            (elemento) => {
                elemento.classList.add(
                    "visible"
                );
            }
        );

    }


    /* ============================================================
       FORMULARIO
       ============================================================ */

    const formulario =
        document.querySelector(
            "#project-form"
        );

    const formStatus =
        document.querySelector(
            "#form-status"
        );


    if (formulario) {

        formulario.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                if (formStatus) {

                    formStatus.textContent =
                        "Tu proyecto está listo para ser enviado.";

                    formStatus.classList.add(
                        "active"
                    );

                }

                console.log(
                    "Formulario de PULSO enviado."
                );

            }
        );

    }


    /* ============================================================
       PULSI
       ============================================================ */

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

    const pulsiForm =
        document.querySelector(
            "#pulsi-form"
        );

    const pulsiInput =
        document.querySelector(
            "#pulsi-input"
        );

    const pulsiMessages =
        document.querySelector(
            "#pulsi-messages"
        );

    const pulsiQuick =
        document.querySelectorAll(
            ".pulsi-quick button"
        );


    function abrirPulsi() {

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

            setTimeout(
                () => {
                    pulsiInput.focus();
                },
                150
            );

        }

    }


    function cerrarPulsi() {

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

    }


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


    function agregarMensaje(
        texto,
        tipo
    ) {

        if (!pulsiMessages) return;

        const mensaje =
            document.createElement(
                "div"
            );

        mensaje.className =
            tipo === "user"
                ? "pulsi-message pulsi-message-user"
                : "pulsi-message pulsi-message-ai";


        const parrafo =
            document.createElement(
                "p"
            );

        parrafo.textContent =
            texto;

        mensaje.appendChild(
            parrafo
        );

        pulsiMessages.appendChild(
            mensaje
        );

        pulsiMessages.scrollTop =
            pulsiMessages.scrollHeight;

    }


    const respuestas = [

        {
            palabras: [
                "servicio",
                "servicios"
            ],

            respuesta:
                "En PULSO trabajamos identidad visual, diseño gráfico, páginas web y experiencias digitales."
        },

        {
            palabras: [
                "pulso",
                "qué es pulso",
                "que es pulso"
            ],

            respuesta:
                "PULSO es un estudio creativo enfocado en transformar ideas en identidades y experiencias digitales."
        },

        {
            palabras: [
                "web",
                "página",
                "pagina",
                "sitio"
            ],

            respuesta:
                "Sí. Podemos crear una página web pensada específicamente para la identidad y las necesidades de tu proyecto."
        },

        {
            palabras: [
                "contacto",
                "proyecto",
                "idea"
            ],

            respuesta:
                "Podés contarnos tu idea desde el formulario de proyecto y empezar a darle forma junto a PULSO."
        }

    ];


    function obtenerRespuesta(
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
            const item of respuestas
        ) {

            const coincide =
                item.palabras.some(
                    (palabra) => {

                        const normalizada =
                            palabra
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(
                                    /[\u0300-\u036f]/g,
                                    ""
                                );

                        return texto.includes(
                            normalizada
                        );

                    }
                );


            if (coincide) {
                return item.respuesta;
            }

        }


        return (
            "Todavía no tengo esa información conectada. " +
            "Podés contarme un poco más o utilizar el formulario para hablar con PULSO."
        );

    }


    async function responderPulsi(
        pregunta
    ) {

        /*
         * FUTURO:
         *
         * Acá se conectará la IA REAL de Pulsi
         * mediante un backend seguro.
         *
         * La API key NUNCA irá acá.
         */

        return obtenerRespuesta(
            pregunta
        );

    }


    pulsiQuick.forEach(
        (button) => {

            button.addEventListener(
                "click",
                async () => {

                    const pregunta =
                        button.dataset.question ||
                        button.textContent.trim();

                    if (!pregunta) {
                        return;
                    }

                    agregarMensaje(
                        pregunta,
                        "user"
                    );

                    const respuesta =
                        await responderPulsi(
                            pregunta
                        );

                    setTimeout(
                        () => {

                            agregarMensaje(
                                respuesta,
                                "ai"
                            );

                        },
                        220
                    );

                }
            );

        }
    );


    if (pulsiForm) {

        pulsiForm.addEventListener(
            "submit",
            async (event) => {

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

                agregarMensaje(
                    pregunta,
                    "user"
                );

                const respuesta =
                    await responderPulsi(
                        pregunta
                    );

                setTimeout(
                    () => {

                        agregarMensaje(
                            respuesta,
                            "ai"
                        );

                    },
                    220
                );

            }
        );

    }


    /* ============================================================
       ============================================================
       PULSO — LOGO ECG
       ============================================================
       ============================================================ */

    const canvas =
        document.querySelector(
            "#pulsoLogoCanvas"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext(
            "2d"
        );


    if (!ctx) {
        return;
    }


    /* ============================================================
       COLORES
       ============================================================ */

    const ORANGE =
        "#ff6a00";

    const ORANGE_SOFT =
        "#ff8533";

    const SILVER =
        "#c8c8c8";

    const SILVER_LIGHT =
        "#eeeeee";


    /* ============================================================
       ESPACIO DE DISEÑO
       ============================================================ */

    const DESIGN_WIDTH =
        1800;

    const DESIGN_HEIGHT =
        360;


    const CENTER_Y =
        180;


    /*
     * ECG entra desde mucho antes del logo.
     */
    const START_X =
        -100;


    /*
     * Punto donde la señal comienza
     * a transformarse.
     */
    const SPLIT_X =
        520;


    /*
     * Punto donde las 4 líneas
     * vuelven a una.
     */
    const MERGE_X =
        1510;


    /*
     * Borde derecho.
     */
    const END_X =
        1900;


    /* ============================================================
       TIEMPOS
       ============================================================ */

    const DURACION_ENTRADA =
        1900;

    const DURACION_LOGO =
        3000;

    const DURACION_SALIDA =
        2600;

    const DURACION_UNION =
        1600;

    const DURACION_FINAL =
        1700;


    const DURACION_TOTAL =
        DURACION_ENTRADA +
        DURACION_LOGO +
        DURACION_SALIDA +
        DURACION_UNION +
        DURACION_FINAL;


    /* ============================================================
       ESCALA CANVAS
       ============================================================ */

    let dpr = 1;

    let scale = 1;

    let offsetX = 0;

    let offsetY = 0;


    function resizeCanvas() {

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
                rect.width /
                    DESIGN_WIDTH,

                rect.height /
                    DESIGN_HEIGHT
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
                DESIGN_WIDTH * scale
            ) / 2;


        offsetY =
            (
                rect.height -
                DESIGN_HEIGHT * scale
            ) / 2;

    }


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    resizeCanvas();


    /* ============================================================
       UTILIDADES
       ============================================================ */

    function clamp(
        value,
        min = 0,
        max = 1
    ) {

        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );

    }


    function easeInOut(
        value
    ) {

        value =
            clamp(value);

        return value < 0.5

            ? 2 * value * value

            : 1 -
              Math.pow(
                  -2 * value + 2,
                  2
              ) / 2;

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


    function lerp(
        a,
        b,
        t
    ) {

        return a +
            (b - a) * t;

    }


    function P(
        x,
        y
    ) {

        return {
            x,
            y
        };

    }


    /* ============================================================
       ECG DE ENTRADA
       ============================================================ */

    const ecgEntrada = [

        P(
            START_X,
            CENTER_Y
        ),

        P(
            60,
            CENTER_Y
        ),

        P(
            150,
            CENTER_Y
        ),

        P(
            220,
            CENTER_Y - 1
        ),

        P(
            280,
            CENTER_Y + 1
        ),

        P(
            335,
            CENTER_Y
        ),

        /*
         * pequeño pulso
         */
        P(
            375,
            CENTER_Y - 8
        ),

        P(
            405,
            CENTER_Y + 8
        ),

        P(
            438,
            CENTER_Y
        ),

        /*
         * pulso principal
         */
        P(
            465,
            CENTER_Y
        ),

        P(
            492,
            CENTER_Y - 62
        ),

        P(
            518,
            CENTER_Y + 48
        ),

        P(
            SPLIT_X,
            CENTER_Y
        )

    ];


    /* ============================================================
       LAS 4 LÍNEAS DEL LOGO
       ============================================================

       Las primeras 3 NO representan cada una una letra.

       Las tres trabajan juntas para construir el símbolo EBA.

       La cuarta construye PULSO abajo.
       ============================================================ */


    /* ============================================================
       LÍNEA 1 — PARTE SUPERIOR EBA
       ============================================================ */

    const linea1 = [

        P(
            SPLIT_X,
            162
        ),

        P(
            575,
            145
        ),

        P(
            625,
            125
        ),

        P(
            680,
            125
        ),

        P(
            735,
            125
        ),

        P(
            790,
            125
        ),

        P(
            830,
            125
        ),

        P(
            850,
            137
        ),

        P(
            865,
            153
        ),

        P(
            865,
            166
        )

    ];


    /* ============================================================
       LÍNEA 2 — CENTRO EBA
       ============================================================ */

    const linea2 = [

        P(
            SPLIT_X,
            CENTER_Y
        ),

        P(
            580,
            CENTER_Y
        ),

        P(
            635,
            CENTER_Y
        ),

        P(
            690,
            CENTER_Y
        ),

        P(
            745,
            CENTER_Y
        ),

        P(
            800,
            CENTER_Y
        ),

        P(
            845,
            CENTER_Y
        ),

        P(
            870,
            170
        ),

        P(
            870,
            150
        ),

        P(
            858,
            135
        )

    ];


    /* ============================================================
       LÍNEA 3 — DIAGONAL / A
       ============================================================ */

    const linea3 = [

        P(
            SPLIT_X,
            198
        ),

        P(
            570,
            220
        ),

        P(
            615,
            242
        ),

        P(
            665,
            260
        ),

        P(
            715,
            270
        ),

        /*
         * pico central
         */
        P(
            760,
            202
        ),

        P(
            805,
            270
        ),

        P(
            850,
            250
        ),

        P(
            890,
            220
        ),

        P(
            930,
            198
        )

    ];


    /* ============================================================
       LÍNEA 4 — PULSO
       ============================================================

       PULSO queda debajo del símbolo.

       Todo es un único recorrido.
       ============================================================ */

    const linea4 = [

        /*
         * entrada
         */
        P(
            SPLIT_X,
            214
        ),

        /*
         * P
         */
        P(
            545,
            300
        ),

        P(
            545,
            248
        ),

        P(
            570,
            248
        ),

        P(
            592,
            258
        ),

        P(
            592,
            275
        ),

        P(
            570,
            285
        ),

        P(
            545,
            285
        ),

        /*
         * pequeño enlace
         */
        P(
            620,
            285
        ),

        /*
         * U
         */
        P(
            620,
            250
        ),

        P(
            620,
            282
        ),

        P(
            632,
            300
        ),

        P(
            650,
            300
        ),

        P(
            662,
            282
        ),

        P(
            662,
            250
        ),

        /*
         * enlace
         */
        P(
            690,
            250
        ),

        /*
         * L
         */
        P(
            690,
            300
        ),

        P(
            725,
            300
        ),

        /*
         * enlace
         */
        P(
            750,
            300
        ),

        /*
         * S
         */
        P(
            785,
            250
        ),

        P(
            755,
            250
        ),

        P(
            742,
            260
        ),

        P(
            750,
            274
        ),

        P(
            780,
            280
        ),

        P(
            790,
            290
        ),

        P(
            780,
            300
        ),

        P(
            750,
            300
        ),

        /*
         * enlace
         */
        P(
            820,
            300
        ),

        /*
         * O
         */
        P(
            845,
            250
        ),

        P(
            875,
            250
        ),

        P(
            888,
            265
        ),

        P(
            888,
            285
        ),

        P(
            875,
            300
        ),

        P(
            845,
            300
        ),

        P(
            832,
            285
        ),

        P(
            832,
            265
        ),

        P(
            845,
            250
        ),

        /*
         * salida
         */
        P(
            940,
            275
        )

    ];


    /* ============================================================
       EXTENSIONES DE LAS 4 LÍNEAS
       ============================================================ */

    const extension1 = [

        P(
            865,
            166
        ),

        P(
            980,
            168
        ),

        P(
            1080,
            160
        ),

        P(
            1180,
            165
        ),

        P(
            1280,
            158
        ),

        P(
            MERGE_X,
            CENTER_Y
        )

    ];


    const extension2 = [

        P(
            858,
            135
        ),

        P(
            970,
            138
        ),

        P(
            1080,
            145
        ),

        P(
            1180,
            140
        ),

        P(
            1290,
            145
        ),

        P(
            MERGE_X,
            CENTER_Y
        )

    ];


    const extension3 = [

        P(
            930,
            198
        ),

        P(
            1000,
            202
        ),

        P(
            1100,
            195
        ),

        P(
            1200,
            202
        ),

        P(
            1300,
            195
        ),

        P(
            MERGE_X,
            CENTER_Y
        )

    ];


    const extension4 = [

        P(
            940,
            275
        ),

        P(
            1010,
            270
        ),

        P(
            1110,
            268
        ),

        P(
            1210,
            270
        ),

        P(
            1310,
            265
        ),

        P(
            MERGE_X,
            CENTER_Y
        )

    ];


    const extensiones = [

        extension1,
        extension2,
        extension3,
        extension4

    ];


    /* ============================================================
       LÍNEA FINAL
       ============================================================ */

    const lineaFinal = [

        P(
            MERGE_X,
            CENTER_Y
        ),

        P(
            1570,
            CENTER_Y
        ),

        P(
            1630,
            CENTER_Y - 2
        ),

        P(
            1690,
            CENTER_Y + 1
        ),

        P(
            1750,
            CENTER_Y
        ),

        P(
            1810,
            CENTER_Y - 1
        ),

        P(
            END_X,
            CENTER_Y
        )

    ];


    /* ============================================================
       FUNCIÓN — DIBUJAR PARTE DE UNA RUTA
       ============================================================ */

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


        const exact =
            progreso *
            segmentos;


        const completos =
            Math.floor(
                exact
            );


        const parcial =
            exact -
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
                puntos[
                    completos
                ];

            const b =
                puntos[
                    completos + 1
                ];


            ctx.lineTo(

                lerp(
                    a.x,
                    b.x,
                    parcial
                ),

                lerp(
                    a.y,
                    b.y,
                    parcial
                )

            );

        }


        ctx.stroke();

        ctx.restore();

    }


    /* ============================================================
       DIBUJAR ECG DE ENTRADA
       ============================================================ */

    function dibujarEntrada(
        progreso
    ) {

        dibujarRuta(
            ecgEntrada,
            progreso,
            ORANGE,
            3,
            15
        );

    }


    /* ============================================================
       DIBUJAR LAS 4 LÍNEAS DEL LOGO
       ============================================================ */

    function dibujarCuatroLineas(
        progreso
    ) {

        /*
         * Las primeras tres forman EBA.
         */

        dibujarRuta(
            linea1,
            progreso,
            SILVER,
            5,
            15
        );


        dibujarRuta(
            linea2,
            progreso,
            SILVER_LIGHT,
            5,
            16
        );


        dibujarRuta(
            linea3,
            progreso,
            SILVER,
            5,
            15
        );


        /*
         * Cuarta línea:
         * PULSO abajo.
         */

        dibujarRuta(
            linea4,
            progreso,
            SILVER_LIGHT,
            4.8,
            13
        );

    }


    /* ============================================================
       DIBUJAR EXTENSIONES
       ============================================================ */

    function dibujarExtensiones(
        progreso
    ) {

        extensiones.forEach(
            (
                ruta,
                index
            ) => {

                dibujarRuta(
                    ruta,
                    progreso,
                    ORANGE,
                    3,
                    14
                );

            }
        );

    }


    /* ============================================================
       UNIÓN DE LAS 4 LÍNEAS
       ============================================================ */

    function dibujarUnion(
        progreso
    ) {

        progreso =
            easeInOut(
                progreso
            );


        /*
         * Las líneas comienzan separadas
         * y progresivamente se llevan
         * hacia CENTER_Y.
         */

        extensiones.forEach(
            (
                ruta
            ) => {

                const transformada =
                    ruta.map(
                        (punto) => {

                            return P(
                                punto.x,

                                lerp(
                                    punto.y,
                                    CENTER_Y,
                                    progreso
                                )

                            );

                        }
                    );


                dibujarRuta(
                    transformada,
                    1,
                    ORANGE,
                    lerp(
                        3,
                        2.5,
                        progreso
                    ),
                    lerp(
                        14,
                        10,
                        progreso
                    )
                );

            }
        );

    }


    /* ============================================================
       LÍNEA FINAL
       ============================================================ */

    function dibujarLineaFinal(
        progreso
    ) {

        progreso =
            easeOut(
                progreso
            );


        dibujarRuta(
            lineaFinal,
            progreso,
            ORANGE,
            lerp(
                2.5,
                1.1,
                progreso
            ),
            lerp(
                12,
                4,
                progreso
            )
        );

    }


    /* ============================================================
       GLOW GENERAL
       ============================================================ */

    function dibujarGlow() {

        const gradient =
            ctx.createRadialGradient(
                DESIGN_WIDTH * 0.48,
                CENTER_Y,
                20,

                DESIGN_WIDTH * 0.48,
                CENTER_Y,
                430
            );


        gradient.addColorStop(
            0,
            "rgba(255,106,0,0.12)"
        );


        gradient.addColorStop(
            0.45,
            "rgba(255,106,0,0.045)"
        );


        gradient.addColorStop(
            1,
            "rgba(255,106,0,0)"
        );


        ctx.save();


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            DESIGN_WIDTH,
            DESIGN_HEIGHT
        );


        ctx.restore();

    }


    /* ============================================================
       PULSO FINAL VARIABLE
       ============================================================ */

    function crearPulsoFinal(
        tiempo
    ) {

        const puntos = [];

        const cantidad = 40;


        for (
            let i = 0;
            i <= cantidad;
            i++
        ) {

            const t =
                i / cantidad;


            const x =
                lerp(
                    MERGE_X,
                    END_X,
                    t
                );


            /*
             * Movimiento extremadamente leve.
             *
             * No queremos un zigzag exagerado.
             */

            const onda =
                Math.sin(
                    t * 8 +
                    tiempo * 0.0012
                ) * 1.5;


            puntos.push(
                P(
                    x,
                    CENTER_Y + onda
                )
            );

        }


        return puntos;

    }


    /* ============================================================
       ESCENA COMPLETA
       ============================================================ */

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


        dibujarGlow();


        /* ========================================================
           FASE 1
           ECG ENTRANDO
           ======================================================== */

        if (
            tiempo <
            DURACION_ENTRADA
        ) {

            const progreso =
                easeInOut(
                    tiempo /
                    DURACION_ENTRADA
                );


            dibujarEntrada(
                progreso
            );

        }


        /* ========================================================
           FASE 2
           CONSTRUCCIÓN DEL LOGO
           ======================================================== */

        const inicioLogo =
            DURACION_ENTRADA;


        const finLogo =
            inicioLogo +
            DURACION_LOGO;


        if (
            tiempo >= inicioLogo &&
            tiempo < finLogo
        ) {

            /*
             * ECG ya llegó al centro.
             */

            dibujarEntrada(
                1
            );


            const progreso =
                easeInOut(
                    (
                        tiempo -
                        inicioLogo
                    ) /
                    DURACION_LOGO
                );


            dibujarCuatroLineas(
                progreso
            );

        }


        /* ========================================================
           FASE 3
           LOGO COMPLETO + LAS 4 LÍNEAS SALEN
           ======================================================== */

        const inicioSalida =
            finLogo;


        const finSalida =
            inicioSalida +
            DURACION_SALIDA;


        if (
            tiempo >= inicioSalida &&
            tiempo < finSalida
        ) {

            /*
             * Logo completo.
             */

            dibujarEntrada(
                1
            );


            dibujarCuatroLineas(
                1
            );


            /*
             * Las 4 líneas empiezan a continuar.
             */

            const progreso =
                easeInOut(
                    (
                        tiempo -
                        inicioSalida
                    ) /
                    DURACION_SALIDA
                );


            dibujarExtensiones(
                progreso
            );

        }


        /* ========================================================
           FASE 4
           LAS 4 LÍNEAS SE UNEN
           ======================================================== */

        const inicioUnion =
            finSalida;


        const finUnion =
            inicioUnion +
            DURACION_UNION;


        if (
            tiempo >= inicioUnion &&
            tiempo < finUnion
        ) {

            /*
             * Logo todavía visible.
             */

            dibujarEntrada(
                1
            );


            dibujarCuatroLineas(
                1
            );


            /*
             * Extensiones completas.
             */

            dibujarExtensiones(
                1
            );


            const progreso =
                (
                    tiempo -
                    inicioUnion
                ) /
                DURACION_UNION;


            dibujarUnion(
                progreso
            );

        }


        /* ========================================================
           FASE 5
           UNA SOLA LÍNEA
           ======================================================== */

        const inicioFinal =
            finUnion;


        if (
            tiempo >= inicioFinal
        ) {

            const progreso =
                clamp(
                    (
                        tiempo -
                        inicioFinal
                    ) /
                    DURACION_FINAL
                );


            /*
             * Una sola línea nace exactamente
             * desde el centro.
             */

            dibujarLineaFinal(
                progreso
            );


            /*
             * Pequeña variación orgánica
             * mientras avanza.
             */

            if (
                progreso > 0.55
            ) {

                const pulso =
                    crearPulsoFinal(
                        tiempo
                    );


                const progresoPulso =
                    clamp(
                        (
                            progreso -
                            0.55
                        ) / 0.45
                    );


                dibujarRuta(
                    pulso,
                    progresoPulso,
                    ORANGE,
                    lerp(
                        2.1,
                        1.1,
                        progreso
                    ),
                    lerp(
                        9,
                        3,
                        progreso
                    )
                );

            }

        }


        ctx.restore();

    }


    /* ============================================================
       ANIMACIÓN
       ============================================================ */

    let animationStart =
        performance.now();


    function animar(
        timestamp
    ) {

        if (
            !document.body.contains(
                canvas
            )
        ) {
            return;
        }


        const tiempo =
            (
                timestamp -
                animationStart
            ) %
            DURACION_TOTAL;


        dibujarEscena(
            tiempo
        );


        requestAnimationFrame(
            animar
        );

    }


    /* ============================================================
       REDUCED MOTION
       ============================================================ */

    if (reduceMotion) {

        /*
         * Estado estático final.
         */

        dibujarEscena(
            DURACION_TOTAL - 10
        );

    } else {

        requestAnimationFrame(
            animar
        );

    }


    /* ============================================================
       REINICIO CUANDO SE VUELVE AL HERO
       ============================================================ */

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

                                /*
                                 * Reinicia la señal
                                 * desde la izquierda.
                                 */

                                animationStart =
                                    performance.now();

                            }

                        }
                    );

                },
                {
                    threshold: 0.1
                }
            );


        heroObserver.observe(
            hero
        );

    }


    /* ============================================================
       FINAL
       ============================================================ */

    console.log(
        "%cPULSO",
        [
            "font-size:24px",
            "font-weight:800",
            "letter-spacing:5px",
            "color:#ff6a00"
        ].join(";")
    );

    console.log(
        "Sistema PULSO iniciado correctamente."
    );

});
