document.addEventListener("DOMContentLoaded", () => {

  // Unlock an element by ID
  function unlock(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("locked");
    el.classList.add("unlocked");
  }

  // Wire up all copy buttons
  document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", () => {
      const entryId = button.dataset.entry;
      const unlockId = button.dataset.unlocks;

      // Find text to copy
      const textEl = document.querySelector(`#${entryId} .entry-text`);
      if (!textEl) return;

      const text = textEl.innerText.trim();

      navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        button.textContent = "COPIED ✓";
        button.classList.add("copied");
        setTimeout(() => {
          button.textContent = "COPY ENTRY";
          button.classList.remove("copied");
        }, 2000);

        // Unlock next element
        if (unlockId) unlock(unlockId);

      }).catch(() => {
        // Fallback for browsers that block clipboard API
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);

        button.textContent = "COPIED ✓";
        button.classList.add("copied");
        setTimeout(() => {
          button.textContent = "COPY ENTRY";
          button.classList.remove("copied");
        }, 2000);

        if (unlockId) unlock(unlockId);
      });
    });
  });

});
