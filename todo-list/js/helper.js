import { Toast } from "./toast-center";

export async function apiFetch(url, method = "GET", data) {
  return await fetch(url, {
    method,
    body: JSON.stringify(data),
  })
    .catch((err) => {
      console.log(err);
      new Toast(
        "error",
        "Impossible de communiquer avec le serveur.",
        err.toString()
      );
    })
    .then(async (response) => {
      if (response.ok) {
        return await response.json().catch(() => null);
      }

      if (response.status === 500) {
        new Toast("error", "Un problème est survenu.", err.toString());
        return;
      }

      throw new Error("Erreur serveur", { cause: response });
    });
}
