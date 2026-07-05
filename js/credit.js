document.addEventListener("DOMContentLoaded", () => {
  const creditBtn = document.getElementById("credit-btn");
  const creditModal = document.getElementById("credit-modal");
  const creditClose = document.getElementById("credit-close");

  if (!creditBtn || !creditModal || !creditClose) return;

  // 開く
  creditBtn.onclick = () => {
    creditModal.classList.remove("hidden");
  };

  // 閉じる
  creditClose.onclick = () => {
    creditModal.classList.add("hidden");
  };

  // モーダル外クリックで閉じる
  creditModal.onclick = (e) => {
    if (e.target === creditModal) {
      creditModal.classList.add("hidden");
    }
  };
});