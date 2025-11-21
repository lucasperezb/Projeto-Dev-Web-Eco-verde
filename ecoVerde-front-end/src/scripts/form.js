const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (form.senha.value !== form.confirmarsenha.value) {
    alert("As senhas não coincidem!");
    return;
  }

  const usuario = {
    nome: form.nome.value,
    email: form.email.value,
    datanascimento: form.datanascimento.value,
    telefone: form.telefone.value,
    endereco: form.endereco.value,
    cidade: form.cidade.value,
    estado: form.estado.value,
    cep: form.cep.value,
    genero: form.genero.value,
    senha: form.senha.value,
  };

  try {
    const response = await axios.post(
      "http://localhost:3001/usuarios",
      usuario
    );

    alert("Cadastro realizado com sucesso!");
    window.location.href = "./entrar.html";
  } catch (error) {
    if (error.response) {
      alert(
        "Erro ao cadastrar: " +
          (error.response.data.message || "Tente novamente.")
      );
    } else {
      alert("Erro na conexão com o servidor: " + error.message);
    }
  }
});
