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
   CANVAS
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
   CONFIGURACIÓN GENERAL
   ===================================================== */

const W = 1800;
const H = 300;

const ORANGE = "#ff6a00";
const SILVER = "#c8c8c8";

const DURACION = 11200;


/*
 * Punto exacto donde el ECG se divide.
 */
const SPLIT_X = 690;
const CENTER_Y = 150;


/*
 * Punto donde las cuatro líneas
 * vuelven a ser una.
 */
const MERGE_X = 1690;


/*
 * Punto final de la línea.
 */
const END_X = 1900;



/* =====================================================
   ESCALA DEL CANVAS
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
   CREAR POLILÍNEA
   ===================================================== */

const crearLinea = (
    puntos
) => {

    const resultado = [];

    for (
        let i = 0;
        i < puntos.length - 1;
        i++
    ) {

        const a = puntos[i];
        const b = puntos[i + 1];

        const distancia =
            Math.hypot(
                b.x - a.x,
                b.y - a.y
            );

        const pasos =
            Math.max(
                4,
                Math.ceil(
                    distancia / 4
                )
            );


        for (
            let j = 0;
            j < pasos;
            j++
        ) {

            const t =
                j / pasos;


            resultado.push({
                x:
                    a.x +
                    (b.x - a.x) * t,

                y:
                    a.y +
                    (b.y - a.y) * t
            });

        }

    }


    resultado.push(
        puntos[puntos.length - 1]
    );


    return resultado;

};



/* =====================================================
   CURVA BÉZIER
   ===================================================== */

const curva =
    (
        p0,
        p1,
        p2,
        p3,
        pasos = 40
    ) => {

        const puntos = [];


        for (
            let i = 0;
            i <= pasos;
            i++
        ) {

            const t =
                i / pasos;

            const u =
                1 - t;


            puntos.push({

                x:
                    u * u * u * p0.x +
                    3 * u * u * t * p1.x +
                    3 * u * t * t * p2.x +
                    t * t * t * p3.x,

                y:
                    u * u * u * p0.y +
                    3 * u * u * t * p1.y +
                    3 * u * t * t * p2.y +
                    t * t * t * p3.y

            });

        }


        return puntos;

    };



/* =====================================================
   CONSTRUCTOR DE TRAZADOS
   ===================================================== */

const crearRuta = (
    constructor
) => {

    const puntos = [];

    let actual = null;


    const M = (
        x,
        y
    ) => {

        actual = {
            x,
            y
        };

        puntos.push({
            x,
            y,
            movimiento: true
        });

    };


    const L = (
        x,
        y
    ) => {

        if (!actual) {

            M(
                x,
                y
            );

            return;

        }


        const tramo =
            crearLinea([
                actual,
                {
                    x,
                    y
                }
            ]);


        tramo.shift();


        tramo.forEach(
            (punto) => {

                puntos.push({
                    ...punto,
                    movimiento: false
                });

            }
        );


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

            M(
                x,
                y
            );

            return;

        }


        const tramo =
            curva(
                actual,
                {
                    x: c1x,
                    y: c1y
                },
                {
                    x: c2x,
                    y: c2y
                },
                {
                    x,
                    y
                },
                36
            );


        tramo.shift();


        tramo.forEach(
            (punto) => {

                puntos.push({
                    ...punto,
                    movimiento: false
                });

            }
        );


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
   DIBUJAR UNA RUTA
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
   ECG DE ENTRADA
   ===================================================== */

/*
 * El pulso entra desde FUERA de la pantalla.
 *
 * La forma va cambiando:
 *
 * recta
 * → pequeña subida
 * → pico
 * → caída
 * → segundo pico
 * → regreso al centro
 */

const ECG =
    crearRuta(({ M, L, C }) => {

        M(-220, CENTER_Y);

        L(80, CENTER_Y);

        L(190, CENTER_Y);

        L(260, CENTER_Y - 2);

        L(320, CENTER_Y + 4);

        C(
            345,
            158,
            355,
            125,
            370,
            105
        );

        C(
            382,
            88,
            395,
            82,
            405,
            95
        );

        C(
            420,
            115,
            425,
            195,
            440,
            208
        );

        C(
            452,
            218,
            468,
            175,
            485,
            132
        );

        C(
            500,
            96,
            515,
            116,
            530,
            139
        );

        C(
            548,
            164,
            565,
            152,
            585,
            150
        );

        L(SPLIT_X, CENTER_Y);

    });



/* =====================================================
   LAS 4 RAMAS
   ===================================================== */

/*
 * IMPORTANTE:
 *
 * Las primeras tres ramas NO son:
 *
 * 1 = E
 * 2 = B
 * 3 = A
 *
 * Las tres trabajan juntas para construir
 * el símbolo EBA.
 *
 * La cuarta rama construye PULSO.
 */



/* =====================================================
   RAMA 1 — PARTE SUPERIOR DEL SÍMBOLO
   ===================================================== */

const rama1 =
    crearRuta(({ M, L, C }) => {

        M(SPLIT_X, CENTER_Y);

        L(730, 118);

        L(760, 92);

        L(800, 72);

        L(850, 72);

        L(900, 72);

        L(950, 72);

        L(985, 88);

        L(1010, 110);

        L(1035, 125);

    });



/* =====================================================
   RAMA 2 — PARTE CENTRAL DEL SÍMBOLO
   ===================================================== */

const rama2 =
    crearRuta(({ M, L, C }) => {

        M(SPLIT_X, CENTER_Y);

        L(735, CENTER_Y);

        L(780, CENTER_Y);

        L(825, CENTER_Y);

        L(870, CENTER_Y);

        L(915, CENTER_Y);

        L(955, CENTER_Y);

        L(995, 142);

        L(1035, CENTER_Y);

    });



/* =====================================================
   RAMA 3 — PARTE INFERIOR DEL SÍMBOLO
   ===================================================== */

const rama3 =
    crearRuta(({ M, L, C }) => {

        M(SPLIT_X, CENTER_Y);

        L(730, 182);

        L(760, 208);

        L(805, 228);

        L(855, 228);

        L(905, 228);

        L(950, 228);

        L(990, 210);

        L(1015, 188);

        L(1035, 175);

    });



/* =====================================================
   RAMA 4 — PULSO
   ===================================================== */

/*
 * Esta rama comienza exactamente en el mismo
 * punto que las otras tres.
 *
 * Primero baja suavemente.
 * Después empieza a construir PULSO.
 */

const rama4 =
    crearRuta(({ M, L, C }) => {

        M(SPLIT_X, CENTER_Y);

        L(720, 160);

        L(750, 174);

        L(780, 188);

        L(805, 194);

        L(830, 194);

        L(850, 188);

        L(865, 178);

        L(875, 164);

        L(875, 145);

        L(885, 128);

        L(900, 120);

        L(920, 120);

        L(940, 128);

        L(952, 143);

        L(958, 160);

        L(958, 178);

        L(970, 190);

        L(990, 194);

        L(1015, 194);

        L(1040, 188);

        L(1065, 176);

        L(1085, 160);

    });



/* =====================================================
   EBA — DETALHES INTERNOS
   ===================================================== */

/*
 * Esses traços completam o símbolo.
 *
 * Eles aparecem depois que as três linhas
 * principais chegam à região central.
 */


/* Traço superior / detalhe EBA */

const ebaSuperior =
    crearRuta(({ M, L }) => {

        M(775, 92);

        L(825, 92);

        L(875, 92);

        L(925, 92);

    });


/* Traço central */

const ebaCentro =
    crearRuta(({ M, L }) => {

        M(790, CENTER_Y);

        L(835, CENTER_Y);

        L(880, CENTER_Y);

        L(925, CENTER_Y);

    });


/* Traço inferior */

const ebaInferior =
    crearRuta(({ M, L }) => {

        M(775, 208);

        L(825, 208);

        L(875, 208);

        L(925, 208);

    });



/* =====================================================
   PULSO — LETRA P
   ===================================================== */

const letraP =
    crearRuta(({ M, L, C }) => {

        M(1110, 205);

        L(1110, 95);

        L(1145, 95);

        C(
            1170,
            95,
            1185,
            110,
            1185,
            128
        );

        C(
            1185,
            146,
            1170,
            158,
            1145,
            158
        );

        L(1110, 158);

    });



/* =====================================================
   PULSO — LETRA U
   ===================================================== */

const letraU =
    crearRuta(({ M, L, C }) => {

        M(1210, 95);

        L(1210, 175);

        C(
            1210,
            198,
            1225,
            208,
            1245,
            208
        );

        C(
            1265,
            208,
            1280,
            198,
            1280,
            175
        );

        L(1280, 95);

    });



/* =====================================================
   PULSO — LETRA L
   ===================================================== */

const letraL =
    crearRuta(({ M, L }) => {

        M(1310, 95);

        L(1310, 208);

        L(1370, 208);

    });



/* =====================================================
   PULSO — LETRA S
   ===================================================== */

const letraS =
    crearRuta(({ M, C }) => {

        M(1460, 105);

        C(
            1445,
            94,
            1420,
            90,
            1400,
            100
        );

        C(
            1380,
            110,
            1385,
            132,
            1405,
            142
        );

        C(
            1425,
            152,
            1455,
            155,
            1465,
            172
        );

        C(
            1475,
            190,
            1455,
            208,
            1430,
            208
        );

        C(
            1410,
            208,
            1395,
            202,
            1385,
            192
        );

    });



/* =====================================================
   PULSO — LETRA O
   ===================================================== */

const letraO =
    crearRuta(({ M, L, C }) => {

        M(1510, 125);

        C(
            1510,
            105,
            1525,
            95,
            1545,
            95
        );

        C(
            1565,
            95,
            1580,
            105,
            1580,
            125
        );

        L(1580, 178);

        C(
            1580,
            198,
            1565,
            208,
            1545,
            208
        );

        C(
            1525,
            208,
            1510,
            198,
            1510,
            178
        );

        L(1510, 125);

    });



/* =====================================================
   CONTINUACIONES
   ===================================================== */

/*
 * MUY IMPORTANTE:
 *
 * Las líneas NO vuelven hacia atrás.
 *
 * Una vez terminado el logo,
 * cada rama continúa físicamente hacia la derecha.
 *
 * Las cuatro mantienen su separación.
 */


/* Rama superior */

const continuacion1 =
    crearRuta(({ M, L, C }) => {

        M(1035, 125);

        C(
            1100,
            108,
            1180,
            95,
            1260,
            92
        );

        C(
            1350,
            88,
            1430,
            92,
            1510,
            100
        );

        L(1600, 108);

        C(
            1640,
            112,
            1670,
            128,
            MERGE_X,
            CENTER_Y
        );

    });


/* Rama central */

const continuacion2 =
    crearRuta(({ M, L, C }) => {

        M(1035, CENTER_Y);

        C(
            1140,
            148,
            1240,
            146,
            1340,
            148
        );

        C(
            1440,
            149,
            1530,
            149,
            1600,
            150
        );

        C(
            1640,
            150,
            1670,
            150,
            MERGE_X,
            CENTER_Y
        );

    });


/* Rama inferior */

const continuacion3 =
    crearRuta(({ M, L, C }) => {

        M(1035, 175);

        C(
            1120,
            192,
            1200,
            205,
            1290,
            208
        );

        C(
            1400,
            212,
            1510,
            205,
            1600,
            190
        );

        C(
            1640,
            184,
            1670,
            170,
            MERGE_X,
            CENTER_Y
        );

    });


/* Rama PULSO */

const continuacion4 =
    crearRuta(({ M, L, C }) => {

        M(1580, 178);

        C(
            1600,
            190,
            1615,
            205,
            1625,
            208
        );

        C(
            1640,
            210,
            1655,
            198,
            1665,
            180
        );

        C(
            1675,
            165,
            1680,
            155,
            MERGE_X,
            CENTER_Y
        );

    });



/* =====================================================
   LÍNEA FINAL
   ===================================================== */

/*
 * Las cuatro ramas llegan EXACTAMENTE al mismo punto.
 *
 * Desde aquí ya existe una sola línea.
 */

const lineaFinal =
    crearRuta(({ M, L, C }) => {

        M(MERGE_X, CENTER_Y);

        C(
            1730,
            CENTER_Y,
            1780,
            CENTER_Y,
            1810,
            CENTER_Y
        );

        L(END_X, CENTER_Y);

    });



/* =====================================================
   COLECCIONES
   ===================================================== */

const ramas =
    [
        rama1,
        rama2,
        rama3,
        rama4
    ];


const continuaciones =
    [
        continuacion1,
        continuacion2,
        continuacion3,
        continuacion4
    ];


const detallesEBA =
    [
        ebaSuperior,
        ebaCentro,
        ebaInferior
    ];


const letrasPulso =
    [
        letraP,
        letraU,
        letraL,
        letraS,
        letraO
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
                1100,
                CENTER_Y,
                20,
                1100,
                CENTER_Y,
                650
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


        ctx.fillStyle =
            gradiente;


        ctx.beginPath();


        ctx.ellipse(
            1100,
            CENTER_Y,
            650,
            125,
            0,
            0,
            Math.PI * 2
        );


        ctx.fill();


        ctx.restore();

    };



/* =====================================================
   ESTILO DE LAS RAMAS
   ===================================================== */

const estiloRama = (
    progreso,
    alpha = 1
) => {

    return {

        color: SILVER,

        grosor:
            2 +
            3.5 * progreso,

        glow: ORANGE,

        glowBlur:
            5 +
            10 * progreso,

        alpha

    };

};



/* =====================================================
   DIBUJAR DETALLES EBA
   ===================================================== */

const dibujarDetallesEBA =
    (progreso) => {

        detallesEBA.forEach(
            (detalle, indice) => {

                const inicio =
                    indice * 0.18;

                const progresoDetalle =
                    clamp(
                        (
                            progreso -
                            inicio
                        ) / 0.82
                    );


                dibujarRuta(
                    detalle,
                    easeOut(
                        progresoDetalle
                    ),
                    {
                        color: SILVER,
                        grosor:
                            2 +
                            3.5 * progreso,
                        glow: ORANGE,
                        glowBlur: 11
                    }
                );

            }
        );

    };



/* =====================================================
   DIBUJAR PULSO
   ===================================================== */

const dibujarPalabraPulso =
    (progreso) => {

        const cantidad =
            letrasPulso.length;


        letrasPulso.forEach(
            (letra, indice) => {

                const inicio =
                    indice / cantidad;

                const fin =
                    (indice + 1) / cantidad;


                const progresoLetra =
                    clamp(
                        (
                            progreso -
                            inicio
                        ) /
                        (
                            fin -
                            inicio
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
                            2 +
                            3.5 * progreso,
                        glow: ORANGE,
                        glowBlur: 11
                    }
                );

            }
        );

    };



/* =====================================================
   LIMPIAR CANVAS
   ===================================================== */

const limpiar =
    () => {

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


        ctx.setTransform(
            dpr * escala,
            0,
            0,
            dpr * escala,
            dpr * offsetX,
            dpr * offsetY
        );

    };



/* =====================================================
   ANIMACIÓN
   ===================================================== */

/*
 * 0 → 2600
 * ECG entra.
 *
 * 2600 → 6100
 * Se divide en 4 y construye el logo.
 *
 * 6100 → 6900
 * El logo queda visible apenas un momento.
 *
 * 6900 → 9000
 * Las cuatro líneas avanzan hacia la derecha
 * y empiezan a converger.
 *
 * 9000 → 10000
 * Se unen físicamente en una sola línea.
 *
 * 10000 → 11200
 * La línea única sale por la derecha
 * y desaparece suavemente.
 *
 * Después vuelve a empezar.
 */


/* ---------- TIEMPOS ---------- */

const T_ECG_FIN =
    2600;

const T_LOGO_FIN =
    6100;

const T_MOMENTO_FIN =
    6900;

const T_CONTINUACION_FIN =
    9000;

const T_UNION_FIN =
    10000;

const T_FIN =
    DURACION;



/* =====================================================
   RENDER
   ===================================================== */

const inicio =
    performance.now();


const render =
    (tiempo) => {

        limpiar();


        const t =
            tiempo % DURACION;



        /* =============================================
           ETAPA 1
           ECG
           ============================================= */

        if (
            t < T_ECG_FIN
        ) {

            const progreso =
                easeOut(
                    t /
                    T_ECG_FIN
                );


            dibujarRuta(
                ECG,
                progreso,
                {
                    color: ORANGE,

                    grosor:
                        1.1 +
                        4.4 * progreso,

                    glow: ORANGE,

                    glowBlur:
                        4 +
                        13 * progreso
                }
            );


            return;

        }



        /* =============================================
           ECG COMPLETO
           ============================================= */

        dibujarRuta(
            ECG,
            1,
            {
                color: ORANGE,
                grosor: 5.5,
                glow: ORANGE,
                glowBlur: 15
            }
        );



        /* =============================================
           ETAPA 2
           DIVISIÓN + CONSTRUCCIÓN
           ============================================= */

        if (
            t <
            T_LOGO_FIN
        ) {

            const progreso =
                easeInOut(
                    (
                        t -
                        T_ECG_FIN
                    ) /
                    (
                        T_LOGO_FIN -
                        T_ECG_FIN
                    )
                );


            /*
             * Las cuatro ramas nacen
             * del mismo punto.
             */

            ramas.forEach(
                (rama) => {

                    dibujarRuta(
                        rama,
                        progreso,
                        estiloRama(
                            progreso
                        )
                    );

                }
            );


            /*
             * Detalles que terminan
             * de formar el símbolo EBA.
             */

            dibujarDetallesEBA(
                progreso
            );


            /*
             * PULSO se construye
             * progresivamente.
             */

            const progresoPulso =
                clamp(
                    (
                        progreso -
                        0.08
                    ) /
                    0.92
                );


            dibujarPalabraPulso(
                progresoPulso
            );


            dibujarGlow(
                progreso
            );


            return;

        }



        /* =============================================
           ETAPA 3
           LOGO COMPLETO — MOMENTO BREVE
           ============================================= */

        if (
            t <
            T_MOMENTO_FIN
        ) {

            ramas.forEach(
                (rama) => {

                    dibujarRuta(
                        rama,
                        1,
                        {
                            color: SILVER,
                            grosor: 5.5,
                            glow: ORANGE,
                            glowBlur: 13
                        }
                    );

                }
            );


            dibujarDetallesEBA(
                1
            );


            dibujarPalabraPulso(
                1
            );


            dibujarGlow(
                1
            );


            return;

        }



        /* =============================================
           ETAPA 4
           LAS CUATRO LÍNEAS AVANZAN
           ============================================= */

        if (
            t <
            T_CONTINUACION_FIN
        ) {

            /*
             * Logo completo permanece.
             */

            ramas.forEach(
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


            dibujarDetallesEBA(
                1
            );


            dibujarPalabraPulso(
                1
            );


            /*
             * Cada rama continúa hacia
             * la derecha.
             */

            const progreso =
                easeInOut(
                    (
                        t -
                        T_MOMENTO_FIN
                    ) /
                    (
                        T_CONTINUACION_FIN -
                        T_MOMENTO_FIN
                    )
                );


            continuaciones.forEach(
                (ruta) => {

                    dibujarRuta(
                        ruta,
                        progreso,
                        {
                            color: SILVER,
                            grosor: 5.5,
                            glow: ORANGE,
                            glowBlur: 12
                        }
                    );

                }
            );


            dibujarGlow(
                1
            );


            return;

        }



        /* =============================================
           ETAPA 5
           CONVERGENCIA FÍSICA
           ============================================= */

        if (
            t <
            T_UNION_FIN
        ) {

            /*
             * Logo completo.
             */

            ramas.forEach(
                (rama) => {

                    dibujarRuta(
                        rama,
                        1,
                        {
                            color: SILVER,
                            grosor: 5.5,
                            glow: ORANGE,
                            glowBlur: 11
                        }
                    );

                }
            );


            dibujarDetallesEBA(
                1
            );


            dibujarPalabraPulso(
                1
            );


            /*
             * Toda la continuación permanece.
             */

            continuaciones.forEach(
                (ruta) => {

                    dibujarRuta(
                        ruta,
                        1,
                        {
                            color: SILVER,
                            grosor: 5.3,
                            glow: ORANGE,
                            glowBlur: 11
                        }
                    );

                }
            );


            /*
             * Intensidad de unión.
             */

            const progresoUnion =
                easeInOut(
                    (
                        t -
                        T_CONTINUACION_FIN
                    ) /
                    (
                        T_UNION_FIN -
                        T_CONTINUACION_FIN
                    )
                );


            /*
             * Una pequeña iluminación
             * marca el punto donde las cuatro
             * señales empiezan a encontrarse.
             */

            ctx.save();


            ctx.globalAlpha =
                0.15 +
                0.45 *
                progresoUnion;


            ctx.fillStyle =
                ORANGE;


            ctx.shadowColor =
                ORANGE;


            ctx.shadowBlur =
                30;


            ctx.beginPath();


            ctx.arc(
                MERGE_X,
                CENTER_Y,
                8 +
                10 *
                progresoUnion,
                0,
                Math.PI * 2
            );


            ctx.fill();


            ctx.restore();


            /*
             * El tramo final de cada continuación
             * ya termina en el mismo punto.
             *
             * A medida que nos acercamos al punto,
             * la percepción visual pasa de cuatro
             * líneas a una.
             */

            const alphaUnion =
                1 -
                progresoUnion;


            /*
             * Redibujamos la zona cercana al
             * punto de unión con una línea central.
             */

            const lineaCentral =
                crearRuta(({ M, C }) => {

                    M(
                        1550,
                        CENTER_Y
                    );

                    C(
                        1610,
                        CENTER_Y,
                        1660,
                        CENTER_Y,
                        MERGE_X,
                        CENTER_Y
                    );

                });


            dibujarRuta(
                lineaCentral,
                progresoUnion,
                {
                    color: ORANGE,
                    grosor:
                        1.5 +
                        4 *
                        progresoUnion,
                    glow: ORANGE,
                    glowBlur:
                        7 +
                        8 *
                        progresoUnion,
                    alpha:
                        progresoUnion
                }
            );


            /*
             * La zona anterior sigue presente.
             */

            if (
                alphaUnion > 0
            ) {

                continuaciones.forEach(
                    (ruta) => {

                        dibujarRuta(
                            ruta,
                            1,
                            {
                                color: SILVER,
                                grosor: 5.3,
                                glow: ORANGE,
                                glowBlur: 10,
                                alpha:
                                    Math.max(
                                        0.15,
                                        alphaUnion
                                    )
                            }
                        );

                    }
                );

            }


            dibujarGlow(
                1
            );


            return;

        }



        /* =============================================
           ETAPA 6
           UNA SOLA LÍNEA
           ============================================= */

        if (
            t <
            T_FIN
        ) {

            /*
             * Logo todavía queda atrás
             * durante el comienzo de esta fase.
             */

            ramas.forEach(
                (rama) => {

                    dibujarRuta(
                        rama,
                        1,
                        {
                            color: SILVER,
                            grosor: 5.2,
                            glow: ORANGE,
                            glowBlur: 9,
                            alpha: 0.18
                        }
                    );

                }
            );


            dibujarDetallesEBA(
                1
            );


            dibujarPalabraPulso(
                1
            );


            /*
             * Las continuaciones desaparecen
             * suavemente detrás del punto de unión.
             */

            continuaciones.forEach(
                (ruta) => {

                    dibujarRuta(
                        ruta,
                        1,
                        {
                            color: SILVER,
                            grosor: 5,
                            glow: ORANGE,
                            glowBlur: 9,
                            alpha: 0.12
                        }
                    );

                }
            );


            /*
             * Ahora sí:
             *
             * UNA ÚNICA LÍNEA.
             */

            const progresoSalida =
                clamp(
                    (
                        t -
                        T_UNION_FIN
                    ) /
                    (
                        T_FIN -
                        T_UNION_FIN
                    )
                );


            const salida =
                easeInOut(
                    progresoSalida
                );


            /*
             * Línea desde exactamente
             * el mismo punto de unión.
             */

            dibujarRuta(
                lineaFinal,
                1,
                {
                    color: ORANGE,

                    grosor:
                        5.3 -
                        4.2 *
                        salida,

                    glow: ORANGE,

                    glowBlur:
                        13 -
                        10 *
                        salida,

                    alpha:
                        1 -
                        Math.pow(
                            progresoSalida,
                            1.55
                        )
                }
            );


            /*
             * Pequeño brillo que viaja
             * con el extremo.
             */

            ctx.save();


            const posicionBrillo =
                MERGE_X +
                (
                    END_X -
                    MERGE_X
                ) *
                salida;


            ctx.globalAlpha =
                (
                    1 -
                    progresoSalida
                ) *
                0.7;


            ctx.fillStyle =
                ORANGE;


            ctx.shadowColor =
                ORANGE;


            ctx.shadowBlur =
                18;


            ctx.beginPath();


            ctx.arc(
                posicionBrillo,
                CENTER_Y,
                2.5,
                0,
                Math.PI * 2
            );


            ctx.fill();


            ctx.restore();


            return;

        }

    };



/* =====================================================
   REDUCIR MOVIMIENTO
   ===================================================== */

const movimientoReducido =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (movimientoReducido) {

    limpiar();


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


    ramas.forEach(
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


    dibujarDetallesEBA(
        1
    );


    dibujarPalabraPulso(
        1
    );


    continuaciones.forEach(
        (ruta) => {

            dibujarRuta(
                ruta,
                1,
                {
                    color: SILVER,
                    grosor: 5,
                    glow: ORANGE,
                    glowBlur: 10
                }
            );

        }
    );


    dibujarRuta(
        lineaFinal,
        1,
        {
            color: ORANGE,
            grosor: 5,
            glow: ORANGE,
            glowBlur: 10
        }
    );


    return;

}



/* =====================================================
   LOOP DE ANIMACIÓN
   ===================================================== */

const animar =
    (ahora) => {

        render(
            ahora -
            inicio
        );


        requestAnimationFrame(
            animar
        );

    };


requestAnimationFrame(
    animar
);

});
