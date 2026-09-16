/* ============================================================
   PULSO — SCRIPT PRINCIPAL
   ============================================================

   Incluye:
   1. Navegación
   2. Menú responsive
   3. Scroll suave
   4. Animaciones de aparición
   5. Formulario
   6. Pulsi
   7. Año automático
   8. Logo ECG animado en Canvas

   IMPORTANTE:
   El logo ECG es UNA SOLA ANIMACIÓN CONTINUA.
   No utiliza PNG ni SVG para construir el logo.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       VARIABLES GENERALES
       ======================================================== */

    const html = document.documentElement;
    const body = document.body;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        html.classList.add("reducir-movimiento");
    }


    /* ========================================================
       AÑO AUTOMÁTICO
       ======================================================== */

    document.querySelectorAll("[data-year]").forEach((elemento) => {
        elemento.textContent = new Date().getFullYear();
    });


    /* ========================================================
       MENÚ PRINCIPAL
       ======================================================== */

    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");

    function abrirMenu() {
        if (!navMenu) return;

        navMenu.classList.add("active");

        if (menuToggle) {
            menuToggle.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");
        }

        body.classList.add("menu-abierto");
    }

    function cerrarMenu() {
        if (!navMenu) return;

        navMenu.classList.remove("active");

        if (menuToggle) {
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

        body.classList.remove("menu-abierto");
    }

    function alternarMenu() {
        if (!navMenu) return;

        if (navMenu.classList.contains("active")) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    }

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", alternarMenu);
    }


    /* ========================================================
       LINKS DEL MENÚ
       ======================================================== */

    const linksNavegacion = document.querySelectorAll(
        ".nav-menu a, .nav-cta, .hero-buttons a, .contact-item"
    );

    linksNavegacion.forEach((link) => {

        link.addEventListener("click", (evento) => {

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            const destino = document.querySelector(href);

            if (!destino) {
                return;
            }

            evento.preventDefault();

            cerrarMenu();

            const navbar = document.querySelector(".navbar");

            const alturaNavbar = navbar
                ? navbar.offsetHeight
                : 0;

            const posicion =
                destino.getBoundingClientRect().top +
                window.scrollY -
                alturaNavbar;

            window.scrollTo({
                top: Math.max(0, posicion),
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth"
            });

            history.replaceState(
                null,
                "",
                href
            );
        });

    });


    /* ========================================================
       CERRAR MENÚ AL HACER CLICK FUERA
       ======================================================== */

    document.addEventListener("click", (evento) => {

        if (!navMenu || !menuToggle) return;

        const menuEstaAbierto =
            navMenu.classList.contains("active");

        if (!menuEstaAbierto) return;

        const clickDentroMenu =
            navMenu.contains(evento.target);

        const clickBoton =
            menuToggle.contains(evento.target);

        if (!clickDentroMenu && !clickBoton) {
            cerrarMenu();
        }

    });


    /* ========================================================
       ESCAPE PARA CERRAR MENÚ
       ======================================================== */

    document.addEventListener("keydown", (evento) => {

        if (evento.key === "Escape") {
            cerrarMenu();
        }

    });


    /* ========================================================
       HEADER AL HACER SCROLL
       ======================================================== */

    const navbar = document.querySelector(".navbar");

    function actualizarNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        actualizarNavbar,
        { passive: true }
    );

    actualizarNavbar();


    /* ========================================================
       ANIMACIONES DE ENTRADA
       ======================================================== */

    const elementosAnimados = document.querySelectorAll(
        ".section-heading, " +
        ".service-card, " +
        ".project-card, " +
        ".process-step, " +
        ".why-card, " +
        ".contact-item, " +
        ".form-group"
    );

    if (
        !prefersReducedMotion &&
        "IntersectionObserver" in window
    ) {

        const observer = new IntersectionObserver(
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
                rootMargin: "0px 0px -50px 0px"
            }
        );

        elementosAnimados.forEach((elemento) => {
            observer.observe(elemento);
        });

    } else {

        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("visible");
        });

    }


    /* ========================================================
       FORMULARIO DE PROYECTO
       ======================================================== */

    const formulario =
        document.querySelector("#project-form");

    const formStatus =
        document.querySelector("#form-status");

    if (formulario) {

        formulario.addEventListener(
            "submit",
            (evento) => {

                evento.preventDefault();

                if (formStatus) {

                    formStatus.textContent =
                        "Tu proyecto está listo para ser enviado.";

                    formStatus.classList.add(
                        "active"
                    );

                }

                /*
                 * ------------------------------------------------
                 * IMPORTANTE
                 * ------------------------------------------------
                 *
                 * Acá queda preparado el punto de conexión
                 * para el backend de PULSO.
                 *
                 * No ponemos claves API acá.
                 *
                 * Cuando conectemos el backend:
                 *
                 * formulario
                 *      ↓
                 * backend seguro
                 *      ↓
                 * Firebase / correo / IA
                 *
                 * ------------------------------------------------
                 */

                console.log(
                    "Formulario PULSO enviado."
                );

            }
        );

    }


    /* ========================================================
       CAMPOS DE FORMULARIO — PREVISUALIZACIÓN DE IMÁGENES
       ======================================================== */

    const inputImagenes =
        document.querySelector(
            'input[type="file"]'
        );

    const previewImagenes =
        document.querySelector(
            "#preview-imagenes"
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

                    const lector =
                        new FileReader();

                    lector.onload = (evento) => {

                        const contenedor =
                            document.createElement(
                                "div"
                            );

                        contenedor.className =
                            "preview-imagen";

                        const imagen =
                            document.createElement(
                                "img"
                            );

                        imagen.src =
                            evento.target.result;

                        imagen.alt =
                            archivo.name;

                        contenedor.appendChild(
                            imagen
                        );

                        previewImagenes.appendChild(
                            contenedor
                        );

                    };

                    lector.readAsDataURL(
                        archivo
                    );

                });

            }
        );

    }


    /* ========================================================
       PULSI
       ======================================================== */

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

    const pulsiMessages =
        document.querySelector(
            "#pulsi-messages"
        );

    const pulsiQuickButtons =
        document.querySelectorAll(
            ".pulsi-quick button"
        );


    /* ========================================================
       ABRIR PULSI
       ======================================================== */

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

            setTimeout(() => {
                pulsiInput.focus();
            }, 180);

        }

    }


    /* ========================================================
       CERRAR PULSI
       ======================================================== */

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


    /* ========================================================
       BOTÓN PULSI
       ======================================================== */

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


    /* ========================================================
       CERRAR PULSI
       ======================================================== */

    if (pulsiClose) {

        pulsiClose.addEventListener(
            "click",
            cerrarPulsi
        );

    }


    /* ========================================================
       RESPUESTAS LOCALES DE PULSI
       
       Esto NO pretende reemplazar la IA real.
       Sirve como funcionamiento provisional hasta
       conectar el backend.
       ======================================================== */

    const respuestasPulsi = [

        {
            claves: [
                "qué hacen",
                "que hacen",
                "qué es pulso",
                "que es pulso",
                "pulso"
            ],

            respuesta:
                "En PULSO creamos identidades, piezas visuales y experiencias digitales pensadas para que cada proyecto tenga una presencia propia."
        },

        {
            claves: [
                "servicios",
                "qué servicios",
                "que servicios"
            ],

            respuesta:
                "Trabajamos identidad visual, diseño gráfico, páginas web y experiencias digitales."
        },

        {
            claves: [
                "página",
                "pagina",
                "web",
                "sitio"
            ],

            respuesta:
                "Sí. Podemos crear una página pensada específicamente para tu proyecto, desde la estructura visual hasta la experiencia digital."
        },

        {
            claves: [
                "contacto",
                "hablar",
                "idea",
                "proyecto"
            ],

            respuesta:
                "Podés contarnos tu idea desde el formulario de proyecto y analizar qué necesita PULSO para llevarla a la realidad."
        }

    ];


    /* ========================================================
       AGREGAR MENSAJE DE PULSI
       ======================================================== */

    function agregarMensajePulsi(
        texto,
        tipo = "ai"
    ) {

        if (!pulsiMessages) return;

        const mensaje =
            document.createElement("div");

        mensaje.className =
            tipo === "user"
                ? "pulsi-message pulsi-message-user"
                : "pulsi-message pulsi-message-ai";

        const parrafo =
            document.createElement("p");

        parrafo.textContent = texto;

        mensaje.appendChild(parrafo);

        pulsiMessages.appendChild(
            mensaje
        );

        pulsiMessages.scrollTop =
            pulsiMessages.scrollHeight;

    }


    /* ========================================================
       RESPUESTA LOCAL
       ======================================================== */

    function buscarRespuestaLocal(
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
            const respuesta of respuestasPulsi
        ) {

            const coincide =
                respuesta.claves.some(
                    (clave) => {

                        const claveNormalizada =
                            clave
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(
                                    /[\u0300-\u036f]/g,
                                    ""
                                );

                        return texto.includes(
                            claveNormalizada
                        );

                    }
                );

            if (coincide) {
                return respuesta.respuesta;
            }

        }

        return null;

    }


    /* ========================================================
       RESPUESTA DE PULSI
       ======================================================== */

    async function responderPulsi(
        pregunta
    ) {

        /*
         * ----------------------------------------------------
         * FUTURO BACKEND
         * ----------------------------------------------------
         *
         * Acá se conectará la IA REAL.
         *
         * Ejemplo futuro:
         *
         * const respuesta = await fetch(
         *     "/api/pulsi",
         *     {
         *         method: "POST",
         *         headers: {
         *             "Content-Type":
         *                 "application/json"
         *         },
         *         body: JSON.stringify({
         *             message: pregunta
         *         })
         *     }
         * );
         *
         * ----------------------------------------------------
         */

        const respuestaLocal =
            buscarRespuestaLocal(
                pregunta
            );

        if (respuestaLocal) {

            return respuestaLocal;

        }

        return (
            "No tengo todavía esa información conectada a mi conocimiento. " +
            "Podés contarme un poco más sobre lo que necesitás o ir al formulario para hablar directamente con PULSO."
        );

    }


    /* ========================================================
       BOTONES RÁPIDOS
       ======================================================== */

    pulsiQuickButtons.forEach(
        (boton) => {

            boton.addEventListener(
                "click",
                async () => {

                    const pregunta =
                        boton.dataset.question ||
                        boton.textContent.trim();

                    if (!pregunta) return;

                    agregarMensajePulsi(
                        pregunta,
                        "user"
                    );

                    const respuesta =
                        await responderPulsi(
                            pregunta
                        );

                    setTimeout(() => {

                        agregarMensajePulsi(
                            respuesta,
                            "ai"
                        );

                    }, 250);

                }
            );

        }
    );


    /* ========================================================
       FORMULARIO PULSI
       ======================================================== */

    if (pulsiForm) {

        pulsiForm.addEventListener(
            "submit",
            async (evento) => {

                evento.preventDefault();

                if (!pulsiInput) return;

                const mensaje =
                    pulsiInput.value.trim();

                if (!mensaje) return;

                pulsiInput.value = "";

                agregarMensajePulsi(
                    mensaje,
                    "user"
                );

                const respuesta =
                    await responderPulsi(
                        mensaje
                    );

                setTimeout(() => {

                    agregarMensajePulsi(
                        respuesta,
                        "ai"
                    );

                }, 250);

            }
        );

    }


    /* ========================================================
       CERRAR PULSI CON ESCAPE
       ======================================================== */

    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Escape" &&
                pulsiChat &&
                pulsiChat.classList.contains(
                    "active"
                )
            ) {

                cerrarPulsi();

            }

        }
    );


    /* ========================================================
       ========================================================
       PULSO — LOGO ECG
       CANVAS
       ========================================================
       ======================================================== */

    const canvas =
        document.querySelector(
            "#pulsoLogoCanvas"
        );

    if (canvas) {

        const ctx =
            canvas.getContext("2d");

        if (ctx) {

            /* =================================================
               CONFIGURACIÓN
               ================================================= */

            const COLORS = {

                orange: "#ff6a00",

                orangeLight: "#ff8533",

                silver: "#c8c8c8",

                silverLight: "#eeeeee",

                background:
                    "rgba(255, 106, 0, 0.08)"

            };


            /*
             * Coordenadas internas.
             *
             * Todo se dibuja en un espacio de 1800 × 300.
             * Después Canvas lo adapta al tamaño real.
             */

            const DESIGN_WIDTH = 1800;
            const DESIGN_HEIGHT = 300;

            const CENTER_Y = 150;

            /*
             * La señal comienza MUY a la izquierda.
             */
            const START_X = -80;

            /*
             * Punto donde una línea se convierte
             * en cuatro recorridos.
             */
            const SPLIT_X = 590;

            /*
             * Punto donde las cuatro líneas
             * vuelven a encontrarse.
             */
            const MERGE_X = 1510;

            /*
             * La línea continúa hasta el borde derecho.
             */
            const END_X = 1880;


            /* =================================================
               TIEMPOS DE LA ANIMACIÓN
               ================================================= */

            const TIME = {

                entrada: 1900,

                construccion: 2700,

                recorrido: 2300,

                union: 1700,

                salida: 1700

            };

            const TOTAL_TIME =
                TIME.entrada +
                TIME.construccion +
                TIME.recorrido +
                TIME.union +
                TIME.salida;


            /* =================================================
               VARIABLES CANVAS
               ================================================= */

            let dpr = 1;

            let scale = 1;

            let offsetX = 0;

            let offsetY = 0;

            let animationStart = 0;

            let animationFrame = null;


            /* =================================================
               RESIZE
               ================================================= */

            function resizeCanvas() {

                const rect =
                    canvas.getBoundingClientRect();

                dpr = Math.min(
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

                /*
                 * Evitamos que el logo quede demasiado chico
                 * en pantallas anchas.
                 */
                if (!Number.isFinite(scale)) {
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


            /* =================================================
               UTILIDADES
               ================================================= */

            function clamp(
                valor,
                minimo = 0,
                maximo = 1
            ) {

                return Math.max(
                    minimo,
                    Math.min(
                        maximo,
                        valor
                    )
                );

            }


            function easeInOut(
                valor
            ) {

                valor = clamp(valor);

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


            function easeOut(
                valor
            ) {

                valor = clamp(valor);

                return 1 -
                    Math.pow(
                        1 - valor,
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


            /* =================================================
               PUNTO
               ================================================= */

            function point(
                x,
                y
            ) {

                return {
                    x,
                    y
                };

            }


            /* =================================================
               INTERPOLAR DOS PUNTOS
               ================================================= */

            function interpolatePoint(
                a,
                b,
                t
            ) {

                return point(
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
               DIBUJAR POLILÍNEA
               ================================================= */

            function drawPolyline(
                puntos,
                progreso,
                opciones = {}
            ) {

                if (
                    !puntos ||
                    puntos.length < 2
                ) {
                    return;
                }

                progreso =
                    clamp(progreso);

                const color =
                    opciones.color ||
                    COLORS.orange;

                const width =
                    opciones.width || 3;

                const glow =
                    opciones.glow || 0;

                ctx.save();

                ctx.strokeStyle =
                    color;

                ctx.lineWidth =
                    width;

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

                const totalSegments =
                    puntos.length - 1;

                const exact =
                    progreso *
                    totalSegments;

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
                    totalSegments
                ) {

                    const siguiente =
                        puntos[
                            completos + 1
                        ];

                    const anterior =
                        puntos[
                            completos
                        ];

                    const p =
                        interpolatePoint(
                            anterior,
                            siguiente,
                            parcial
                        );

                    ctx.lineTo(
                        p.x,
                        p.y
                    );

                }

                ctx.stroke();

                ctx.restore();

            }


            /* =================================================
               ECG DE ENTRADA
               ================================================= */

            function crearECGEntrada() {

                return [

                    point(
                        START_X,
                        CENTER_Y
                    ),

                    point(
                        80,
                        CENTER_Y
                    ),

                    point(
                        145,
                        CENTER_Y - 2
                    ),

                    point(
                        195,
                        CENTER_Y + 2
                    ),

                    point(
                        245,
                        CENTER_Y
                    ),

                    point(
                        300,
                        CENTER_Y
                    ),

                    point(
                        340,
                        CENTER_Y - 8
                    ),

                    point(
                        370,
                        CENTER_Y + 5
                    ),

                    point(
                        402,
                        CENTER_Y - 5
                    ),

                    point(
                        438,
                        CENTER_Y
                    ),

                    point(
                        470,
                        CENTER_Y
                    ),

                    point(
                        495,
                        CENTER_Y - 55
                    ),

                    point(
                        518,
                        CENTER_Y + 38
                    ),

                    point(
                        545,
                        CENTER_Y - 18
                    ),

                    point(
                        SPLIT_X,
                        CENTER_Y
                    )

                ];

            }


            const ecgEntrada =
                crearECGEntrada();


            /* =================================================
               RECORRIDOS DEL LOGO

               Las primeras tres líneas forman JUNTAS
               el símbolo EBA.

               La cuarta construye PULSO abajo.
               ================================================= */

            function crearRutaEBA1() {

                return [

                    point(
                        SPLIT_X,
                        138
                    ),

                    point(
                        625,
                        115
                    ),

                    point(
                        660,
                        92
                    ),

                    point(
                        720,
                        78
                    ),

                    point(
                        785,
                        80
                    ),

                    point(
                        820,
                        105
                    ),

                    point(
                        820,
                        128
                    ),

                    point(
                        785,
                        142
                    ),

                    point(
                        725,
                        142
                    )

                ];

            }


            function crearRutaEBA2() {

                return [

                    point(
                        SPLIT_X,
                        150
                    ),

                    point(
                        625,
                        150
                    ),

                    point(
                        680,
                        150
                    ),

                    point(
                        735,
                        150
                    ),

                    point(
                        785,
                        150
                    ),

                    point(
                        820,
                        166
                    ),

                    point(
                        820,
                        190
                    ),

                    point(
                        785,
                        218
                    ),

                    point(
                        720,
                        220
                    ),

                    point(
                        660,
                        205
                    ),

                    point(
                        625,
                        185
                    )

                ];

            }


            function crearRutaEBA3() {

                return [

                    point(
                        SPLIT_X,
                        162
                    ),

                    point(
                        625,
                        190
                    ),

                    point(
                        660,
                        220
                    ),

                    point(
                        720,
                        238
                    ),

                    point(
                        785,
                        235
                    ),

                    point(
                        835,
                        215
                    ),

                    point(
                        855,
                        180
                    ),

                    point(
                        855,
                        130
                    ),

                    point(
                        835,
                        95
                    ),

                    point(
                        800,
                        72
                    ),

                    point(
                        760,
                        65
                    )

                ];

            }


            /*
             * PULSO va ABAJO.
             *
             * Esta cuarta línea recorre las letras
             * del nombre de forma progresiva.
             */
            function crearRutaPULSO() {

                return [

                    point(
                        SPLIT_X,
                        175
                    ),

                    /* P */
                    point(
                        625,
                        255
                    ),

                    point(
                        625,
                        225
                    ),

                    point(
                        625,
                        202
                    ),

                    point(
                        650,
                        202
                    ),

                    point(
                        665,
                        210
                    ),

                    point(
                        665,
                        225
                    ),

                    point(
                        650,
                        235
                    ),

                    point(
                        625,
                        235
                    ),

                    /* U */
                    point(
                        695,
                        202
                    ),

                    point(
                        695,
                        240
                    ),

                    point(
                        705,
                        252
                    ),

                    point(
                        720,
                        252
                    ),

                    point(
                        730,
                        240
                    ),

                    point(
                        730,
                        202
                    ),

                    /* L */
                    point(
                        760,
                        202
                    ),

                    point(
                        760,
                        252
                    ),

                    point(
                        790,
                        252
                    ),

                    /* S */
                    point(
                        835,
                        208
                    ),

                    point(
                        825,
                        202
                    ),

                    point(
                        805,
                        202
                    ),

                    point(
                        795,
                        212
                    ),

                    point(
                        805,
                        225
                    ),

                    point(
                        825,
                        230
                    ),

                    point(
                        835,
                        240
                    ),

                    point(
                        825,
                        252
                    ),

                    point(
                        805,
                        252
                    ),

                    /* O */
                    point(
                        870,
                        205
                    ),

                    point(
                        895,
                        202
                    ),

                    point(
                        912,
                        215
                    ),

                    point(
                        912,
                        240
                    ),

                    point(
                        895,
                        252
                    ),

                    point(
                        870,
                        248
                    ),

                    point(
                        860,
                        235
                    ),

                    point(
                        860,
                        215
                    ),

                    point(
                        870,
                        205
                    ),

                    /*
                     * Salida desde PULSO
                     */
                    point(
                        955,
                        225
                    )

                ];

            }


            const ruta1 =
                crearRutaEBA1();

            const ruta2 =
                crearRutaEBA2();

            const ruta3 =
                crearRutaEBA3();

            const ruta4 =
                crearRutaPULSO();


            /* =================================================
               CONTINUACIONES HACIA LA DERECHA

               Las cuatro líneas NO desaparecen.
               Siguen físicamente desde el logo.
               ================================================= */

            function continuarLinea(
                inicioX,
                inicioY,
                numero
            ) {

                const variacion =
                    Math.sin(
                        numero * 2.3
                    ) * 4;

                return [

                    point(
                        inicioX,
                        inicioY
                    ),

                    point(
                        980,
                        inicioY +
                            variacion
                    ),

                    point(
                        1060,
                        inicioY -
                            5
                    ),

                    point(
                        1140,
                        inicioY +
                            4
                    ),

                    point(
                        1220,
                        inicioY -
                            3
                    ),

                    point(
                        1300,
                        inicioY +
                            5
                    ),

                    point(
                        1380,
                        inicioY -
                            4
                    ),

                    point(
                        MERGE_X,
                        CENTER_Y
                    )

                ];

            }


            /*
             * Una vez construido el logo, cada línea
             * abandona progresivamente su forma y vuelve
             * a la trayectoria central.
             */

            const continuacion1 =
                continuarLinea(
                    725,
                    142,
                    1
                );

            const continuacion2 =
                continuarLinea(
                    625,
                    185,
                    2
                );

            const continuacion3 =
                continuarLinea(
                    760,
                    65,
                    3
                );

            const continuacion4 =
                continuarLinea(
                    955,
                    225,
                    4
                );


            /* =================================================
               LÍNEA FINAL
               ================================================= */

            function crearSalidaFinal() {

                return [

                    point(
                        MERGE_X,
                        CENTER_Y
                    ),

                    point(
                        1570,
                        CENTER_Y - 2
                    ),

                    point(
                        1630,
                        CENTER_Y + 2
                    ),

                    point(
                        1690,
                        CENTER_Y
                    ),

                    point(
                        1750,
                        CENTER_Y - 1
                    ),

                    point(
                        1810,
                        CENTER_Y + 1
                    ),

                    point(
                        END_X,
                        CENTER_Y
                    )

                ];

            }


            const salidaFinal =
                crearSalidaFinal();


            /* =================================================
               PULSO VARIABLE
               
               Esto evita que la línea sea un zigzag idéntico
               en cada ciclo.
               ================================================= */

            function dibujarPulsoVariable(
                tiempo
            ) {

                const puntos = [];

                const comienzo =
                    MERGE_X;

                const final =
                    END_X;

                const cantidad = 30;

                for (
                    let i = 0;
                    i <= cantidad;
                    i++
                ) {

                    const t =
                        i / cantidad;

                    const x =
                        lerp(
                            comienzo,
                            final,
                            t
                        );

                    const onda =
                        Math.sin(
                            t * 8 +
                            tiempo * 0.0015
                        ) * 2;

                    const micro =
                        Math.sin(
                            t * 22 +
                            tiempo * 0.002
                        ) * 1.2;

                    puntos.push(
                        point(
                            x,
                            CENTER_Y +
                                onda +
                                micro
                        )
                    );

                }

                return puntos;

            }


            /* =================================================
               DIBUJAR FONDO DE LUZ
               ================================================= */

            function dibujarGlow() {

                const gradiente =
                    ctx.createRadialGradient(
                        DESIGN_WIDTH * 0.47,
                        DESIGN_HEIGHT * 0.50,
                        10,

                        DESIGN_WIDTH * 0.47,
                        DESIGN_HEIGHT * 0.50,
                        430
                    );

                gradiente.addColorStop(
                    0,
                    "rgba(255,106,0,0.16)"
                );

                gradiente.addColorStop(
                    0.45,
                    "rgba(255,106,0,0.06)"
                );

                gradiente.addColorStop(
                    1,
                    "rgba(255,106,0,0)"
                );

                ctx.save();

                ctx.fillStyle =
                    gradiente;

                ctx.fillRect(
                    0,
                    0,
                    DESIGN_WIDTH,
                    DESIGN_HEIGHT
                );

                ctx.restore();

            }


            /* =================================================
               DIBUJAR LOGO
               ================================================= */

            function dibujarLogo(
                progresoConstruccion
            ) {

                /*
                 * Las tres rutas EBA
                 * aparecen progresivamente.
                 */

                drawPolyline(
                    ruta1,
                    progresoConstruccion,
                    {
                        color:
                            COLORS.silver,
                        width: 3.4,
                        glow: 12
                    }
                );

                drawPolyline(
                    ruta2,
                    progresoConstruccion,
                    {
                        color:
                            COLORS.silverLight,
                        width: 3.4,
                        glow: 12
                    }
                );

                drawPolyline(
                    ruta3,
                    progresoConstruccion,
                    {
                        color:
                            COLORS.silver,
                        width: 3.4,
                        glow: 12
                    }
                );

                /*
                 * PULSO abajo.
                 */
                drawPolyline(
                    ruta4,
                    progresoConstruccion,
                    {
                        color:
                            COLORS.silverLight,
                        width: 3.1,
                        glow: 10
                    }
                );

            }


            /* =================================================
               DIBUJAR LAS CUATRO CONTINUACIONES
               ================================================= */

            function dibujarContinuaciones(
                progreso
            ) {

                /*
                 * Cada continuación comienza exactamente
                 * desde la zona donde terminó su recorrido.
                 */

                drawPolyline(
                    continuacion1,
                    progreso,
                    {
                        color:
                            COLORS.orange,
                        width: 3.2,
                        glow: 14
                    }
                );

                drawPolyline(
                    continuacion2,
                    progreso,
                    {
                        color:
                            COLORS.orange,
                        width: 3.2,
                        glow: 14
                    }
                );

                drawPolyline(
                    continuacion3,
                    progreso,
                    {
                        color:
                            COLORS.orange,
                        width: 3.2,
                        glow: 14
                    }
                );

                drawPolyline(
                    continuacion4,
                    progreso,
                    {
                        color:
                            COLORS.orange,
                        width: 3.2,
                        glow: 14
                    }
                );

            }


            /* =================================================
               TRANSICIÓN DE CUATRO LÍNEAS → UNA
               ================================================= */

            function dibujarUnion(
                progreso
            ) {

                progreso =
                    easeInOut(
                        progreso
                    );

                const lineas = [

                    continuacion1,

                    continuacion2,

                    continuacion3,

                    continuacion4

                ];

                lineas.forEach(
                    (
                        linea,
                        indice
                    ) => {

                        /*
                         * Cuanto más avanza la unión,
                         * más cerca del eje central queda.
                         */

                        const puntos =
                            linea.map(
                                (p) => {

                                    return point(

                                        p.x,

                                        lerp(
                                            p.y,
                                            CENTER_Y,
                                            progreso
                                        )

                                    );

                                }
                            );

                        /*
                         * Al final las cuatro terminan
                         * exactamente en MERGE_X.
                         */

                        drawPolyline(
                            puntos,
                            1,
                            {
                                color:
                                    COLORS.orange,
                                width:
                                    lerp(
                                        3.2,
                                        2.8,
                                        progreso
                                    ),
                                glow: 14
                            }
                        );

                    }
                );

            }


            /* =================================================
               DIBUJAR SALIDA FINAL
               ================================================= */

            function dibujarSalida(
                progreso
            ) {

                progreso =
                    easeOut(
                        progreso
                    );

                const puntos =
                    salidaFinal.map(
                        (p) => p
                    );

                /*
                 * El grosor disminuye al acercarse
                 * al extremo derecho.
                 */

                drawPolyline(
                    puntos,
                    progreso,
                    {
                        color:
                            COLORS.orange,
                        width:
                            lerp(
                                2.8,
                                1.2,
                                progreso
                            ),
                        glow:
                            lerp(
                                14,
                                5,
                                progreso
                            )
                    }
                );

            }


            /* =================================================
               DIBUJAR TODA LA ESCENA
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

                /*
                 * Escala DPR.
                 */
                ctx.scale(
                    dpr,
                    dpr
                );

                /*
                 * Transformación al espacio de diseño.
                 */
                ctx.translate(
                    offsetX,
                    offsetY
                );

                ctx.scale(
                    scale,
                    scale
                );


                /* --------------------------------------------
                   GLOW
                   -------------------------------------------- */

                dibujarGlow();


                /* --------------------------------------------
                   FASE 1 — ECG ENTRA DESDE LA IZQUIERDA
                   -------------------------------------------- */

                const finEntrada =
                    TIME.entrada;

                if (
                    tiempo <= finEntrada
                ) {

                    const p =
                        easeInOut(
                            tiempo /
                            TIME.entrada
                        );

                    drawPolyline(
                        ecgEntrada,
                        p,
                        {
                            color:
                                COLORS.orange,
                            width: 3.2,
                            glow: 16
                        }
                    );

                }


                /* --------------------------------------------
                   FASE 2 — EL ECG SE DIVIDE Y CONSTRUYE
                   EBA + PULSO
                   -------------------------------------------- */

                const inicioConstruccion =
                    TIME.entrada;

                const finConstruccion =
                    inicioConstruccion +
                    TIME.construccion;

                if (
                    tiempo >=
                    inicioConstruccion &&
                    tiempo <=
                    finConstruccion
                ) {

                    /*
                     * La línea principal llega al punto
                     * de división.
                     */
                    drawPolyline(
                        ecgEntrada,
                        1,
                        {
                            color:
                                COLORS.orange,
                            width: 3.2,
                            glow: 16
                        }
                    );

                    const p =
                        easeInOut(
                            (
                                tiempo -
                                inicioConstruccion
                            ) /
                            TIME.construccion
                        );

                    /*
                     * Las cuatro líneas nacen
                     * desde el mismo punto.
                     */
                    dibujarLogo(p);

                }


                /* --------------------------------------------
                   FASE 3 — LOGO COMPLETO + CONTINUIDAD
                   -------------------------------------------- */

                const inicioRecorrido =
                    finConstruccion;

                const finRecorrido =
                    inicioRecorrido +
                    TIME.recorrido;

                if (
                    tiempo >=
                    inicioRecorrido &&
                    tiempo <=
                    finRecorrido
                ) {

                    /*
                     * El logo queda completo.
                     */
                    dibujarLogo(1);

                    /*
                     * Y las cuatro líneas empiezan
                     * a continuar físicamente.
                     */
                    const p =
                        easeInOut(
                            (
                                tiempo -
                                inicioRecorrido
                            ) /
                            TIME.recorrido
                        );

                    dibujarContinuaciones(p);

                }


                /* --------------------------------------------
                   FASE 4 — LAS CUATRO LÍNEAS SE UNEN
                   -------------------------------------------- */

                const inicioUnion =
                    finRecorrido;

                const finUnion =
                    inicioUnion +
                    TIME.union;

                if (
                    tiempo >=
                    inicioUnion &&
                    tiempo <=
                    finUnion
                ) {

                    /*
                     * Mantenemos el logo como referencia
                     * mientras comienza la salida.
                     */
                    dibujarLogo(1);

                    dibujarContinuaciones(1);

                    const p =
                        (
                            tiempo -
                            inicioUnion
                        ) /
                        TIME.union;

                    dibujarUnion(p);

                }


                /* --------------------------------------------
                   FASE 5 — UNA SOLA LÍNEA HACIA LA DERECHA
                   -------------------------------------------- */

                const inicioSalida =
                    finUnion;

                const finSalida =
                    inicioSalida +
                    TIME.salida;

                if (
                    tiempo >=
                    inicioSalida
                ) {

                    /*
                     * El punto central donde convergieron
                     * las cuatro líneas.
                     */
                    const p =
                        clamp(
                            (
                                tiempo -
                                inicioSalida
                            ) /
                            TIME.salida
                        );

                    /*
                     * La línea sale desde el mismo
                     * eje central original.
                     */
                    dibujarSalida(p);

                    /*
                     * Pulso variable en la parte final.
                     */
                    if (
                        p > 0.55
                    ) {

                        const pulso =
                            dibujarPulsoVariable(
                                tiempo
                            );

                        const cantidad =
                            clamp(
                                (
                                    p -
                                    0.55
                                ) / 0.45
                            );

                        drawPolyline(
                            pulso,
                            cantidad,
                            {
                                color:
                                    COLORS.orange,
                                width:
                                    lerp(
                                        2.4,
                                        1.1,
                                        p
                                    ),
                                glow:
                                    lerp(
                                        12,
                                        4,
                                        p
                                    )
                            }
                        );

                    }

                }


                ctx.restore();

            }


            /* =================================================
               ANIMACIÓN
               ================================================= */

            function animar(
                timestamp
            ) {

                if (!animationStart) {
                    animationStart =
                        timestamp;
                }

                let tiempo =
                    timestamp -
                    animationStart;

                /*
                 * LOOP CONTINUO.
                 */
                tiempo =
                    tiempo %
                    TOTAL_TIME;

                dibujarEscena(
                    tiempo
                );

                animationFrame =
                    requestAnimationFrame(
                        animar
                    );

            }


            /* =================================================
               REDUCED MOTION
               ================================================= */

            if (
                prefersReducedMotion
            ) {

                /*
                 * Para personas que prefieren
                 * reducir movimiento mostramos
                 * el estado final.
                 */

                dibujarEscena(
                    TOTAL_TIME - 1
                );

            } else {

                animationFrame =
                    requestAnimationFrame(
                        animar
                    );

            }


            /* =================================================
               REINICIAR CUANDO EL HERO VUELVE
               ================================================= */

            if (
                "IntersectionObserver"
                in window
            ) {

                const hero =
                    document.querySelector(
                        "#inicio"
                    );

                if (hero) {

                    const heroObserver =
                        new IntersectionObserver(
                            (entradas) => {

                                entradas.forEach(
                                    (entrada) => {

                                        if (
                                            entrada.isIntersecting
                                        ) {

                                            animationStart =
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


        }

    }


    /* ========================================================
       LOG DE INICIO
       ======================================================== */

    console.log(
        "%cPULSO",
        "font-size:24px;font-weight:800;letter-spacing:4px;"
    );

    console.log(
        "Sitio iniciado correctamente."
    );

});
