document.addEventListener("DOMContentLoaded", () => {

  const preguntas = [
    {
      q: "¿Qué es el One Page Project Manager (OPPM)?",
      a: [
        "Un documento extenso de planificación del proyecto",
        "Una herramienta visual que resume todo el proyecto en una sola hoja",
        "Un software especializado para la gestión de proyectos"
      ],
      correct: 1,
      exp: "El OPPM es una herramienta que permite visualizar en una sola página los elementos esenciales del proyecto: objetivos, tareas, responsables y cronograma."
    },
    {
      q: "¿Cuál es el propósito principal del OPPM?",
      a: [
        "Detallar todos los procesos técnicos del proyecto",
        "Simplificar la comunicación y el seguimiento de proyectos",
        "Aumentar la burocracia del control de proyectos"
      ],
      correct: 1,
      exp: "El propósito del OPPM es comunicar de manera clara y concisa el estado, los objetivos y las responsabilidades del proyecto en una sola vista."
    },
    {
      q: "¿Qué elementos clave incluye un OPPM?",
      a: [
        "Solo el presupuesto y el cronograma",
        "Metas, tareas, responsables, tiempo y métricas de progreso",
        "Los manuales de procedimiento del equipo"
      ],
      correct: 1,
      exp: "Un OPPM integra los objetivos, entregables, responsables, fechas clave y métricas de rendimiento, todo en una sola hoja visual."
    },
    {
      q: "¿Qué beneficio ofrece el OPPM a la alta dirección?",
      a: [
        "Permite comprender rápidamente el estado del proyecto sin leer reportes extensos",
        "Sustituye la necesidad de reuniones",
        "Elimina completamente los riesgos del proyecto"
      ],
      correct: 0,
      exp: "El OPPM brinda una visión clara del avance del proyecto en una sola página, facilitando la toma de decisiones y el seguimiento ejecutivo."
    },
    {
      q: "¿Cómo se representa el progreso de las tareas en el OPPM?",
      a: [
        "Mediante porcentajes de avance o códigos de color",
        "Con párrafos descriptivos extensos",
        "Solo con fechas estimadas"
      ],
      correct: 0,
      exp: "El avance de las tareas se muestra mediante porcentajes o colores, permitiendo una lectura visual rápida del progreso."
    },
    {
      q: "¿Qué relación tiene el OPPM con el plan del proyecto tradicional?",
      a: [
        "Lo reemplaza completamente",
        "Lo complementa, sirviendo como una vista ejecutiva resumida",
        "Es independiente del plan del proyecto"
      ],
      correct: 1,
      exp: "El OPPM no sustituye al plan completo, sino que lo complementa ofreciendo una vista ejecutiva condensada de los aspectos más importantes."
    },
    {
      q: "¿Cómo ayuda el OPPM a la gestión de riesgos?",
      a: [
        "Oculta los riesgos menores para simplificar",
        "Identifica riesgos y responsables en una tabla visible y compacta",
        "No aborda los riesgos del proyecto"
      ],
      correct: 1,
      exp: "El OPPM puede incluir una sección de riesgos principales con sus responsables, ayudando a mantenerlos visibles para todo el equipo."
    },
    {
      q: "¿Qué ventaja tiene el OPPM para los equipos de TI?",
      a: [
        "Permite alinear las actividades técnicas con los objetivos de negocio",
        "Evita la necesidad de documentación técnica",
        "Solo sirve para proyectos pequeños"
      ],
      correct: 0,
      exp: "En proyectos de TI, el OPPM ayuda a conectar el trabajo técnico con los resultados de negocio y facilita la comunicación entre áreas."
    },
    {
      q: "¿Qué principio sigue el OPPM en su diseño?",
      a: [
        "La simplicidad visual y la claridad en la comunicación",
        "El detalle exhaustivo de cada tarea",
        "El uso de lenguaje técnico especializado"
      ],
      correct: 0,
      exp: "El OPPM se basa en el principio de simplicidad: transmitir la información esencial de forma visual, concisa y comprensible para todos."
    },
    {
      q: "¿Qué papel cumple el responsable (Owner) dentro del OPPM?",
      a: [
        "Supervisa la ejecución técnica del proyecto",
        "Asigna tareas menores al equipo",
        "Se hace responsable de cada meta o entregable específico"
      ],
      correct: 2,
      exp: "Cada entregable o meta tiene un 'Owner' designado, quien es responsable directo de su cumplimiento dentro del proyecto."
    }
  ];

  let puntuacion = 0;
  let preguntaActual = 0;

  const quizDiv = document.getElementById("quiz");
  const resultDiv = document.getElementById("result");
  const startBtn = document.getElementById("start-btn");
  const progressBar = document.getElementById("progress-bar");

  startBtn.addEventListener("click", iniciarQuiz);

  function iniciarQuiz() {
    puntuacion = 0;
    preguntaActual = 0;
    progressBar.style.width = "0%";
    mostrarPregunta();
  }

  function mostrarPregunta() {
    quizDiv.innerHTML = "";

    const pregunta = preguntas[preguntaActual];
    const qDiv = document.createElement("div");
    qDiv.classList.add("question");
    qDiv.innerHTML = `<h3>${preguntaActual + 1}. ${pregunta.q}</h3>`;

    const opcionesDiv = document.createElement("div");
    opcionesDiv.classList.add("options");

    pregunta.a.forEach((opcion, idx) => {
      const btn = document.createElement("button");
      btn.textContent = opcion;
      btn.addEventListener("click", () => verificarRespuesta(btn, idx, pregunta.correct, pregunta.exp));
      opcionesDiv.appendChild(btn);
    });

    qDiv.appendChild(opcionesDiv);
    quizDiv.appendChild(qDiv);
  }

  function verificarRespuesta(boton, idx, correcta, explicacion) {
    const botones = boton.parentNode.querySelectorAll("button");
    botones.forEach(b => b.disabled = true);

    if (idx === correcta) {
      boton.classList.add("correct");
      puntuacion += 10;
    } else {
      boton.classList.add("incorrect");
      botones[correcta].classList.add("correct");

      const expDiv = document.createElement("div");
      expDiv.classList.add("explanation");
      expDiv.textContent = "💡 " + explicacion;
      boton.parentNode.parentNode.appendChild(expDiv);
    }

    setTimeout(() => {
      preguntaActual++;
      actualizarProgreso();
      if (preguntaActual < preguntas.length) {
        mostrarPregunta();
      } else {
        mostrarResultado();
      }
    }, 2000);
  }

  function actualizarProgreso() {
    const progreso = (preguntaActual / preguntas.length) * 100;
    progressBar.style.width = progreso + "%";
  }

  function mostrarResultado() {
    progressBar.style.width = "100%";
    quizDiv.style.display = "none";
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `<h2>Tu puntuación: ${puntuacion} / 100</h2>`;

    if (puntuacion === 100) {
      const btnLearn = document.createElement("button");
      btnLearn.classList.add("btn");
      btnLearn.textContent = "Volver a la pantalla de aprendizaje";
      btnLearn.addEventListener("click", () => location.href = "index.html");
      resultDiv.appendChild(btnLearn);
    } else {
      const btnRetry = document.createElement("button");
      btnRetry.classList.add("btn");
      btnRetry.textContent = "Intentar de nuevo";
      btnRetry.addEventListener("click", reiniciarQuiz);
      resultDiv.appendChild(btnRetry);
    }
  }

  function reiniciarQuiz() {
    resultDiv.style.display = "none";
    quizDiv.style.display = "block";
    iniciarQuiz();
  }
});
