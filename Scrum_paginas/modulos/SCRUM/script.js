document.addEventListener("DOMContentLoaded", () => {
  const preguntas = [
    { q: "¿Qué significa SCRUM?", a: ["Una metodología ágil", "Un deporte", "Una app de gestión"], correct: 0,
      exp: "SCRUM es una metodología ágil para trabajar en equipo de forma flexible y adaptativa." },
    { q: "¿De qué deporte toma su nombre SCRUM?", a: ["Fútbol", "Rugby", "Tenis"], correct: 1,
      exp: "El término SCRUM viene del rugby, donde los jugadores se agrupan y empujan juntos hacia un objetivo común." },
    { q: "¿Cuál NO es un pilar de SCRUM?", a: ["Adaptación", "Inspección", "Competencia"], correct: 2,
      exp: "Los tres pilares de SCRUM son Transparencia, Inspección y Adaptación." },
    { q: "¿Quién representa la voz del cliente?", a: ["Product Owner", "Scrum Master", "Equipo de desarrollo"], correct: 0,
      exp: "El Product Owner representa los intereses del cliente y prioriza las tareas con base en el valor que aportan." },
    { q: "¿Qué evento se realiza todos los días?", a: ["Sprint Review", "Daily Scrum", "Retrospectiva"], correct: 1,
      exp: "La Daily Scrum es una reunión diaria breve para sincronizar al equipo y resolver obstáculos." },
    { q: "¿Qué se entrega al final de cada sprint?", a: ["Documento", "Incremento", "Lista de tareas"], correct: 1,
      exp: "El Incremento es el resultado funcional y valioso generado al final de cada sprint." },
    { q: "¿Qué hace el Scrum Master?", a: ["Dirige al equipo", "Ayuda a aplicar SCRUM", "Revisa código"], correct: 1,
      exp: "El Scrum Master no manda, sino que facilita el proceso y elimina los obstáculos del equipo." },
    { q: "¿Qué herramienta contiene todas las ideas y tareas?", a: ["Product Backlog", "Sprint Backlog", "Kanban"], correct: 0,
      exp: "El Product Backlog es la lista principal de todas las tareas, ideas y requisitos del proyecto." },
    { q: "¿Qué error común se debe evitar?", a: ["Adaptar el método", "Ser flexible", "Tratar SCRUM como una lista rígida"], correct: 2,
      exp: "SCRUM es adaptable; tratarlo como una lista rígida va contra su filosofía ágil." },
    { q: "¿Cuál es la esencia de SCRUM?", a: ["Jerarquía rígida", "Trabajo en equipo y mejora constante", "Plan fijo"], correct: 1,
      exp: "SCRUM se basa en la colaboración, la transparencia y la mejora continua del trabajo en equipo." }
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
