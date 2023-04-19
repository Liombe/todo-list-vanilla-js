export class Toast {
  constructor(variant, title, message) {
    this.variant = variant;
    this.title = title;
    this.message = message;

    const toast = document.createElement("div");
    toast.setAttribute("role", "alert");
    toast.classList.add("toast", this.variant);

    toast.insertAdjacentHTML(
      "afterbegin",
      `
        ${this.getVariantIcon(this.variant)}
        <div class="toast-body">
          <h5 class="toast-title">${this.title}</h5>
          ${this.message ? `<p class="toast-message">${this.message}</p>` : ""}
        </div>
        <button class="toast-close btn-icon">
          <span class="sr-only">Fermer</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      `
    );

    document.getElementById("alerts").insertAdjacentElement("beforeend", toast);

    setTimeout(function () {
      toast.remove();
    }, 5000);

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.remove();
    });
  }

  getVariantIcon(variant) {
    switch (variant) {
      case "error":
        return `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
        `;
    }
  }
}
