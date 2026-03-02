document.addEventListener("DOMContentLoaded", () => {
  const unlockMap = {
    v01: "v02",
    v02: ["v03", "closer"]
  };

  const unlock = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("locked");
      el.classList.add("unlocked");
      localStorage.setItem(`unlocked_${id}`, "true");
    }
  };

  // Restore unlock state
  Object.keys(unlockMap).forEach(key => {
    const targets = Array.isArray(unlockMap[key]) ? unlockMap[key] : [unlockMap[key]];
    targets.forEach(id => {
      if (localStorage.getItem(`unlocked_${id}`) === "true") {
        unlock(id);
      }
    });
  });

  // Copy and unlock logic
  document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", () => {
      const entryId = button.dataset.entry;
      const text = document.querySelector(`#${entryId} .entry-text`).innerText;
      navigator.clipboard.writeText(text).then(() => {
        const toUnlock = unlockMap[entryId];
        if (toUnlock) {
          const unlockList = Array.isArray(toUnlock) ? toUnlock : [toUnlock];
          unlockList.forEach(unlock);
        }
      });
    });
  });
});
