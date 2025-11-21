const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const usuario = {
    email: form.email.value,
    senha: form.senha.value,
  };

  try {
    const response = await axios.post(
      "http://localhost:3001/usuarios/login",
      usuario,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Resposta do backend:", response.data);
    if (response.data.message === "Login realizado com sucesso") {
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          nome: response.data.nome,
          email: usuario.email,
        })
      );

      window.location.href = "./produtos.html";
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert(
      "Erro ao tentar entrar: " +
        (error.response?.data?.message || error.message)
    );
  }
});
