document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEstoque");
  const listaEstoque = document.getElementById("listaEstoque");
  const btnLimpar = document.getElementById("limpar");

  async function atualizarLista() {
    try {
      const res = await axios.get("http://localhost:3001/products");
      listaEstoque.innerHTML = "";
      res.data.forEach((prod) => {
        const li = document.createElement("li");
        li.textContent = `${prod.nome}: ${prod.quantidade} unidades`;
        listaEstoque.appendChild(li);
      });
    } catch (err) {
      console.error("Erro ao buscar estoque:", err);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("produtoSelect").value;
    const quantidade = parseInt(
      document.getElementById("quantidadeProduto").value
    );

    try {
      await axios.post("http://localhost:3001/products", {
        nome,
        quantidade,
      });
      await atualizarLista();
      form.reset();
    } catch (err) {
      console.error("Erro ao salvar estoque:", err);
    }
  });

  btnLimpar.addEventListener("click", async () => {
    if (!confirm("Tem certeza que deseja limpar todo o estoque?")) return;
    try {
      await axios.delete("http://localhost:3001/products");
      await atualizarLista();
    } catch (err) {
      console.error("Erro ao limpar estoque:", err);
    }
  });

  atualizarLista();
});
