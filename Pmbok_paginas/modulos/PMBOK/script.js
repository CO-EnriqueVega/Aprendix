document.addEventListener("DOMContentLoaded", () => {

  const preguntas = [
    {
      q: "¿Qué es un proyecto según el PMBOK?",
      a: [
        "Una operación continua y repetitiva",
        "Un esfuerzo temporal para crear un producto, servicio o resultado único",
        "Una tarea rutinaria dentro de la organización"
      ],
      correct: 1,
      exp: "El PMBOK define un proyecto como un esfuerzo temporal que se lleva a cabo para crear un producto, servicio o resultado único."
    },
    {
      q: "¿Cuál de las siguientes NO es un grupo de procesos del PMBOK?",
      a: ["Inicio", "Control", "Cierre"],
      correct: 1,
      exp: "Los grupos de procesos son: Inicio, Planificación, Ejecución, Monitoreo y Control, y Cierre. 'Control' por sí solo no es un grupo."
    },
    {
      q: "¿Qué área de conocimiento incluye la definición del alcance del proyecto?",
      a: ["Gestión del Tiempo", "Gestión del Alcance", "Gestión de la Calidad"],
      correct: 1,
      exp: "La Gestión del Alcance del Proyecto asegura que se incluya todo el trabajo necesario, y solo el necesario, para completar el proyecto."
    },
    {
      q: "¿Qué representa la Ruta Crítica (Critical Path)?",
      a: [
        "Las actividades con más recursos asignados",
        "La secuencia más larga de actividades que determina la duración total del proyecto",
        "Las tareas menos importantes del cronograma"
      ],
      correct: 1,
      exp: "La Ruta Crítica es la secuencia de actividades que determina la duración mínima del proyecto. Un retraso en cualquiera de ellas retrasa el proyecto completo."
    },
    {
      q: "¿Qué herramienta se usa para representar visualmente el cronograma del proyecto?",
      a: ["Diagrama de Gantt", "Diagrama de Ishikawa", "Diagrama de Pareto"],
      correct: 0,
      exp: "El diagrama de Gantt muestra gráficamente las actividades del proyecto en una línea de tiempo, facilitando su seguimiento."
    },
    {
      q: "¿Qué es la Línea Base del Alcance?",
      a: [
        "Un registro de cambios aprobados",
        "El conjunto aprobado del alcance, cronograma y costo",
        "El documento del presupuesto inicial"
      ],
      correct: 1,
      exp: "La línea base del proyecto integra el alcance, el cronograma y el costo aprobados. Sirve como referencia para medir el desempeño."
    },
    {
      q: "¿Qué proceso se realiza para autorizar formalmente el proyecto?",
      a: ["Desarrollar el acta de constitución del proyecto", "Planificar la gestión del proyecto", "Controlar la ejecución del proyecto"],
      correct: 0,
      exp: "El acta de constitución del proyecto autoriza formalmente su existencia y otorga al director del proyecto la autoridad para aplicar recursos."
    },
    {
      q: "¿Qué componente del triángulo de restricciones incluye costo, tiempo y alcance?",
      a: ["Triángulo del Desempeño", "Triángulo de la Calidad", "Triángulo de Restricciones del Proyecto"],
      correct: 2,
      exp: "El triángulo de restricciones representa el equilibrio entre tiempo, costo y alcance, factores que afectan directamente la calidad del proyecto."
    },
    {
      q: "¿Qué se entiende por 'partes interesadas' (stakeholders)?",
      a: [
        "Solo el equipo del proyecto",
        "Personas u organizaciones que pueden afectar o verse afectadas por el proyecto",
        "Los clientes externos exclusivamente"
      ],
      correct: 1,
      exp: "Las partes interesadas incluyen a todos los involucrados directa o indirectamente en el proyecto, tanto internos como externos."
    },
    {
      q: "¿Cuál de los siguientes documentos define cómo se gestionará el proyecto?",
      a: [
        "El Acta de Constitución del Proyecto",
        "El Plan para la Dirección del Proyecto",
        "El Registro de Riesgos"
      ],
      correct: 1,
      exp: "El Plan para la Dirección del Proyecto describe cómo se ejecutará, monitoreará, controlará y cerrará el proyecto."
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
