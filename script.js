document.addEventListener("DOMContentLoaded", () => {

  const navMoreBtn = document.getElementById("nav-more-btn");
  const navMorePanel = document.getElementById("nav-more-panel");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navMoreBtn && navMorePanel) {
    navMoreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navMorePanel.classList.toggle("open");
      navMoreBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navMorePanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMorePanel.classList.remove("open");
        navMoreBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.addEventListener("click", (e) => {
    if (navMorePanel && !navMorePanel.contains(e.target) && e.target !== navMoreBtn) {
      navMorePanel.classList.remove("open");
      if (navMoreBtn) navMoreBtn.setAttribute("aria-expanded", "false");
    }
    if (navLinks && !navLinks.contains(e.target) && e.target !== menuToggle) {
      navLinks.classList.remove("open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }
  });


  const accessibilityBtn = document.getElementById("accessibility-btn");
  const accessibilityMenu = document.getElementById("accessibility-menu");
  let fontScale = 1;

  if (accessibilityBtn && accessibilityMenu) {
    accessibilityBtn.addEventListener("click", () => {
      const isHidden = accessibilityMenu.classList.toggle("hidden");
      accessibilityBtn.setAttribute("aria-expanded", String(!isHidden));
    });

    accessibilityMenu.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.accessibilityAction;

        if (action === "increase-font" && fontScale < 1.3) {
          fontScale = +(fontScale + 0.1).toFixed(1);
          document.documentElement.style.setProperty("--font-scale", fontScale);
        } else if (action === "decrease-font" && fontScale > 0.8) {
          fontScale = +(fontScale - 0.1).toFixed(1);
          document.documentElement.style.setProperty("--font-scale", fontScale);
        } else if (action === "toggle-contrast") {
          document.body.classList.toggle("high-contrast");
        }
      });
    });
  }

const slides = [
  {
    src: "impacto.jpg",
    alt: "Ponto de coleta de lixo eletrônico",
    title: "1. Pontos de Coleta Seletiva",
    description: "Locais preparados para receber celulares, pilhas, cabos e eletrodomésticos sem uso."
  },
  {
    src: "eletronicos.jpg",
    alt: "Desmontagem de placas eletrônicas",
    title: "2. Triagem e Desmontagem Segura",
    description: "Separação técnica de placas de circuito, baterias, plásticos e metais."
  },
  {
    src: "destinacao.jpg",
    alt: "Projeto escolar de robótica com peças reaproveitadas",
    title: "3. Reaproveitamento na Educação",
    description: "Motores, fios e sensores ganham nova vida em oficinas de ciência e robótica."
  }
];

  let currentSlide = 0;
  const slideContainer = document.getElementById("carousel-slide");
  const slideTitle = document.getElementById("carousel-title");
  const slideDescription = document.getElementById("carousel-description");
  const dotsContainer = document.getElementById("carousel-dots");
  const carouselButtons = document.querySelectorAll("[data-carousel-direction]");

  function renderSlide(index) {
    if (!slideContainer || !slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    const item = slides[currentSlide];

    slideContainer.innerHTML = `<img src="${item.src}" alt="${item.alt}" />`;
    if (slideTitle) slideTitle.textContent = item.title;
    if (slideDescription) slideDescription.textContent = item.description;

    if (dotsContainer) {
      dotsContainer.querySelectorAll("button").forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentSlide);
      });
    }
  }

  if (dotsContainer && slides.length) {
    slides.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir para imagem ${idx + 1}`);
      dot.addEventListener("click", () => renderSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  carouselButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = Number(btn.dataset.carouselDirection);
      renderSlide(currentSlide + dir);
    });
  });

  renderSlide(0);

  const facts = [
    "Uma tonelada de celulares antigos pode conter muito mais ouro do que uma tonelada de minério bruto extraído da natureza.",
    "O Brasil está entre os países que mais geram lixo eletrônico na América Latina, mas menos de 5% ainda é reciclado formalmente.",
    "Baterias descartadas em lixo comum podem vazar substâncias tóxicas como chumbo, mercúrio e cádmio no solo e nos rios.",
    "Reciclar alumínio e cobre de aparelhos eletrônicos consome até 85% menos energia do que extrair esses metais na mineração.",
    "Muitos computadores considerados lentos voltam a funcionar perfeitamente após limpeza interna e troca de peças simples."
  ];

  let factIndex = 0;
  const factText = document.getElementById("fact-text");
  const factBtn = document.getElementById("fact-btn");

  if (factText && factBtn) {
    factBtn.addEventListener("click", () => {
      factIndex = (factIndex + 1) % facts.length;
      factText.textContent = facts[factIndex];
    });
  }

  const quizForm = document.getElementById("quiz-form");
  const quizResult = document.getElementById("quiz-result");

  if (quizForm && quizResult) {
    quizForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const totalQuestions = 5;
      let score = 0;
      let answered = 0;

      for (let i = 1; i <= totalQuestions; i++) {
        const selected = quizForm.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
          answered++;
          if (selected.value === "certo") {
            score++;
          }
        }
      }

      if (answered < totalQuestions) {
        quizResult.textContent = `Você respondeu ${answered} de ${totalQuestions} perguntas. Marque todas antes de ver o resultado!`;
        return;
      }

      if (score === totalQuestions) {
        quizResult.textContent = `Excelente! Você acertou ${score} de ${totalQuestions} perguntas e domina o assunto!`;
      } else if (score >= 3) {
        quizResult.textContent = `Muito bem! Você acertou ${score} de ${totalQuestions} perguntas.`;
      } else {
        quizResult.textContent = `Você acertou ${score} de ${totalQuestions} perguntas. Que tal revisar as seções do site e tentar novamente?`;
      }
    });
  }

  const expandableCards = document.querySelectorAll(".expandable-card");

  expandableCards.forEach((card) => {
    const toggleBtn = card.querySelector(".card-toggle");
    const icon = card.querySelector(".card-icon");

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const isOpen = card.classList.toggle("open");
        toggleBtn.setAttribute("aria-expanded", String(isOpen));
        if (icon) icon.textContent = isOpen ? "−" : "+";
      });
    }
  });
});
