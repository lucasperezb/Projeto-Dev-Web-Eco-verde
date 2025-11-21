window.onload = async () => {
  const usuarioJSON = localStorage.getItem("usuario");
  if (!usuarioJSON) {
    alert("Usuário não logado");
    window.location.href = "./entrar.html";
    return;
  }

  const usuario = JSON.parse(usuarioJSON);
  if (!usuario.email) {
    alert("Usuário não logado");
    window.location.href = "./entrar.html";
    return;
  }

  usuarioEmail = usuario.email;

  const emailEncoded = encodeURIComponent(usuario.email);

  try {
    const response = await axios.get(
      `http://localhost:3001/usuarios/buscarnome/${usuario.email}`
    );
    const nome = response.data;

    const span = document.getElementById("usuarioNome");
    if (nome && span) {
      span.textContent = span.textContent.replace("Usuário", nome);
    }
  } catch (erro) {
    console.error("Erro ao buscar nome do usuário:", erro);
  }

  await carregarEstoque();
};
