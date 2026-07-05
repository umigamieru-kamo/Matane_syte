
// こんなところまで見に来ているの？物好きね
let currentQuestion = 1;
let answers = { 1: null, 2: null, 3: null };
let currentRoute = null;
let currentEndingId = null;

const VIEWED_ENDINGS_KEY = "matane_viewed_endings";



// あなた、そこまでこの場所に興味があるの。それとも私に？

let homeTitleInitialized = false;

function playHomeTitle() {
  if (homeTitleInitialized) return;
  homeTitleInitialized = true;

  const title = document.getElementById("home-title");

  title.classList.add("fade-in");
  setTimeout(() => {
    title.classList.add("fade-active");
  }, 50);

title.onclick = () => {
  startHomeMessageFlow();

  title.onclick = null;
};
}


// 海の中は真っ暗で苦しいわ。…ねえ、それでも惹かれるの？

function typeWriter(element, text, speed = 90, callback = null) {
  element.textContent = ""; 
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(type, speed);
    } else {
      if (callback) callback();
    }
  }

  type();
}

document.addEventListener("click", () => {
  const bgm = document.getElementById("bgm");
  if (bgm) {
    bgm.volume = 0.5;
    bgm.play();
  }
}, { once: true });


// 

function removeOtherChoices(containerElement, selectedButton) {
  Array.from(containerElement.children).forEach(btn => {
    if (btn !== selectedButton) {
      btn.remove();
    }
  });
}


// 会いに来てくれるなら、相応の覚悟が必要かもしれないわね

const HOME_MESSAGES = [
  "……寂れた路地裏だ",
  "この辺りで胡散臭い占いが流行っているらしい",
  "なんでも、【最期に】一緒にいる人がわかるとか",
  "ばかばかしいと思いつつも、自分の足はそこへ向かっていた",
  "「…あら、いらっしゃい。よく来たわね。…でもそんなに時間をかけていられないの」",
  "「何せ次も次も、ずいぶんたくさんの人が控えているから」",
  "「だから、５分以内であなたを導いてあげるわ。そうねえ…」"
];

let homeMessageIndex = 0;

function startHomeMessageFlow() {
  const box = document.getElementById("home-message-box");
  const startBtn = document.getElementById("start-btn");

  const newBox = box.cloneNode(false);
  box.parentNode.replaceChild(newBox, box);

  homeMessageIndex = 0;
  let isTyping = false;

  const firstLine = document.createElement("p");
  newBox.appendChild(firstLine);

  isTyping = true;
  typeWriter(firstLine, HOME_MESSAGES[homeMessageIndex], 40, () => {
    homeMessageIndex++;
    isTyping = false;
  });

  newBox.onclick = () => {
    if (isTyping) return;

    if (homeMessageIndex < HOME_MESSAGES.length) {
      const line = document.createElement("p");
      newBox.appendChild(line);

      isTyping = true;
      typeWriter(line, HOME_MESSAGES[homeMessageIndex], 40, () => {
        homeMessageIndex++;
        isTyping = false;

        if (homeMessageIndex === HOME_MESSAGES.length) {
          startBtn.classList.remove("hidden");
        }
      });
    }
  };
}

// 私は案内役に過ぎないわ。あなたの運命は私じゃないもの

const QUESTIONS = {
  1: {
    text: "１：現実に飽きた？",
    choices: {
      A: "何もかも、全部、わすれさせてほしい",
      B: "飽きた…のかな。違う気がする"
    },
    message: "……ふふふ、なるほどね"
  },
  2: {
    text: "２：自分を苦しめる何かを心に抱えている？",
    choices: {
      A: "胸の中にどろりとした黒いものがある",
      B: "心の中？…さあ、わからない"
    },
    message: "興味深いわ。…ああ、お世辞よ？本当は聞き飽きてるの"
  },
  3: {
    text: "３：渇望している場所がある？",
    choices: {
      A: "そうなのかもしれない。引き寄せられるようにここに来た",
      B: "今はまだ、見つけられていない"
    },
    message: "これは、あなたの選択"
  }
};


// 見つけてね、救うべき人を

function getViewedEndings() {
  const raw = localStorage.getItem(VIEWED_ENDINGS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function addViewedEnding(id) {
  const viewed = getViewedEndings();
  if (!viewed.includes(id)) {
    viewed.push(id);
    localStorage.setItem(VIEWED_ENDINGS_KEY, JSON.stringify(viewed));
  }
}

function hasViewedAllEndings() {
  return getViewedEndings().length >= 11;
}

function checkLocked() {
  if (hasViewedAllEndings()) {
    showScreen("locked-screen");
    const bgm = document.getElementById("bgm");
    if (bgm) bgm.pause();
    return true;
  }
  return false;
}


// そうして、あなたはきっと、海を眺めることになる

document.addEventListener("DOMContentLoaded", () => {
  if (checkLocked()) return;


  const bg = document.querySelector(".bg-overlay");
  if (bg) {
    bg.style.backgroundImage = 'url("assets/img/bg.jpg")';
  }

  playHomeTitle();

  const bgm = document.getElementById("bgm");
  if (bgm) {
    bgm.volume = 0.6;
    bgm.play().catch(() => {});
  }

  const startBtn = document.getElementById("start-btn");
  startBtn.onclick = () => {
      const bgm = document.getElementById("bgm");
  if (bgm) {
    bgm.volume = 0.6;
    bgm.play();
  }
    const box = document.getElementById("home-message-box");
    const title = document.getElementById("home-title");
    const bg = document.querySelector(".bg-overlay");

    if (bg) bg.style.backgroundImage = 'url("assets/img/bg_question.jpg")';
    if (title) title.classList.add("hidden");
    if (box) box.classList.add("hidden");
    startBtn.classList.add("hidden");

    box.classList.add("fade-out", "fade-active");

    setTimeout(() => {
      currentQuestion = 1;
      answers = { 1: null, 2: null, 3: null };
      currentRoute = null;
      currentEndingId = null;
      showQuestion();
    }, 800);
  };

setupOfficialXButton();
});


// ああ、おかしいわ。ワルツでも踊る？そんな気分なの

function showQuestion() {
  showScreen("question-screen");

  const qData = QUESTIONS[currentQuestion];
  const qText = document.getElementById("question-text");
  const qChoices = document.getElementById("question-choices");
  const qMessage = document.getElementById("question-message");
  const nextBtn = document.getElementById("next-question-btn");

  qText.textContent = qData.text;
  qChoices.innerHTML = "";
  qMessage.classList.add("hidden");
  nextBtn.classList.add("hidden");

  Object.entries(qData.choices).forEach(([key, label]) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = label;
    btn.onclick = () => {
      answers[currentQuestion] = key;
      removeOtherChoices(qChoices, btn);
      qMessage.textContent = qData.message;
      qMessage.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
    };
    qChoices.appendChild(btn);
  });

  nextBtn.onclick = () => {
    if (currentQuestion < 3) {
      currentQuestion++;
      showQuestion();
    } else {
      decideRoute();
    }
  };
}


// うふふ、酔っているのかもしれないわ！

function decideRoute() {
  const key = `${answers[1]}${answers[2]}${answers[3]}`;

  if (key === "AAA" || key === "AAB") currentRoute = 1;
  else if (key === "ABA" || key === "ABB") currentRoute = 2;
  else if (key === "BAA" || key === "BBA") currentRoute = 3;
  else currentRoute = 4;

  showRouteScreen();
}


// あなたの選択を私は尊重する。何も咎めやしないわ！

function showRouteScreen() {
  const route = ROUTES[currentRoute];
  showScreen("route-screen");

  const routeTextEl = document.getElementById("route-text");
  const routeChoicesEl = document.getElementById("route-choices");

  routeTextEl.textContent = "";
  routeChoicesEl.innerHTML = "";
  routeChoicesEl.classList.add("hidden");

  typeWriter(routeTextEl, route.text, 50, () => {
    routeChoicesEl.innerHTML = "";
    routeChoicesEl.classList.remove("hidden");

    route.choices.forEach((c) => {
      const btn = document.createElement("button");
      btn.className = "route-choice-btn";
      btn.textContent = c.label;
      btn.onclick = () => {
        removeOtherChoices(routeChoicesEl, btn);
        currentEndingId = c.endId;
        showEndScreen();
      };
      routeChoicesEl.appendChild(btn);
    });
  });
}


// 終わりが見たいんでしょう？

function showEndScreen() {
  const ending = ENDINGS[currentEndingId];
  showScreen("end-screen");

  const endTitleEl = document.getElementById("end-title");
  const endImageEl = document.getElementById("end-image");
  const fortuneTextEl = document.getElementById("fortune-text");
  const fortuneArea = document.getElementById("fortune-area");
  const letterArea = document.getElementById("letter-area");

  endTitleEl.textContent = ending.name;
  endImageEl.src = ending.image;
  fortuneTextEl.textContent = ending.comment;

  fortuneArea.classList.add("hidden");
  letterArea.classList.remove("letter-shrink");

  setupLetterInteraction(() => {
    addViewedEnding(currentEndingId);
    setupShareButton(() => ENDINGS[currentEndingId]);
    if (hasViewedAllEndings()) {
      setTimeout(() => showFinalScreen(), 1500);
    }
  });

setupRetryButton(() => {
  if (hasViewedAllEndings()) {
    showFinalScreen();
    return;
  }

  answers = { 1: null, 2: null, 3: null };
  currentQuestion = 1;
  currentRoute = null;
  currentEndingId = null;

  document.getElementById("question-message").classList.add("hidden");
  document.getElementById("next-question-btn").classList.add("hidden");
  document.getElementById("question-choices").innerHTML = "";
  
  const routeTextEl = document.getElementById("route-text");
  const routeChoicesEl = document.getElementById("route-choices");
  if (routeTextEl) routeTextEl.textContent = "";
  if (routeChoicesEl) {
    routeChoicesEl.innerHTML = "";
    routeChoicesEl.classList.add("hidden");
  }


  const fortuneArea = document.getElementById("fortune-area");
  const letterArea = document.getElementById("letter-area");
  fortuneArea.classList.add("hidden");
  letterArea.classList.remove("letter-shrink");

  const box = document.getElementById("home-message-box");
  const newBox = box.cloneNode(false);
  box.parentNode.replaceChild(newBox, box);
  newBox.classList.remove("fade-out", "fade-active");

  const startBtn = document.getElementById("start-btn");
  startBtn.classList.add("hidden");
  homeMessageIndex = 0;

  const title = document.getElementById("home-title");
  if (title) {
    title.classList.remove("hidden", "fade-in", "fade-active");
  }

  homeTitleInitialized = false;
  playHomeTitle();
  showScreen("home-screen");
  setOfficialXButtonVisible(true);
});
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  target.classList.add("active");

  const bg = document.querySelector(".bg-overlay");
  if (id === "home-screen") {
    if (bg) bg.style.backgroundImage = 'url("assets/img/bg.jpg")';
  } else if (id === "question-screen") {
    if (bg) bg.style.backgroundImage = 'url("assets/img/bg_question.jpg")';
  }
}
