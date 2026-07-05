
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

function setupLetterInteraction(onShrinkEnd) {
  const letterArea = document.getElementById("letter-area");
  const fortuneArea = document.getElementById("fortune-area");

  if (!letterArea) return;

  letterArea.onclick = () => {
    letterArea.classList.add("letter-shrink");

    setTimeout(() => {
      fortuneArea.classList.remove("hidden");

      if (typeof onShrinkEnd === "function") {
        onShrinkEnd();
      }
    }, 1200);
  };
}

function setupRetryButton(onRetry) {
  const retryBtn = document.getElementById("retry-btn");
  if (!retryBtn) return;

  retryBtn.onclick = () => {
    if (typeof onRetry === "function") onRetry();
  };
}

function setupShareButton(getEndingData) {
  const shareBtn = document.getElementById("share-btn");
  if (!shareBtn) return;

  shareBtn.onclick = () => {
    const ending = getEndingData();
    const text =
      `【またねの約束】\n` +
      `あなたの運命は「${ending.name}」でした。\n` +
      `${ending.comment}\n` +
      `#VRC_matane`;

    const url = "https://x.com/intent/tweet?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
  };
}


function setupOfficialXButton() {
  const officialXBtn = document.getElementById("official-x-btn");
  if (!officialXBtn) return;

  officialXBtn.onclick = () => {
    window.open("https://x.com/VRC_matane", "_blank");
  };
}


function setOfficialXButtonVisible(visible) {
  const officialXBtn = document.getElementById("official-x-btn");
  if (!officialXBtn) return;

  if (visible) {
    officialXBtn.classList.remove("hidden");
  } else {
    officialXBtn.classList.add("hidden");
  }
}

