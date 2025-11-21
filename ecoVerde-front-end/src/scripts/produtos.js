function mostrarModal(titulo, mensagem, callback) {
  const overlay = document.getElementById("modalOverlay");
  const tituloEl = document.getElementById("modalTitulo");
  const mensagemEl = document.getElementById("modalMensagem");
  const btnOk = document.getElementById("modalBtnOk");
  const btnCancelar = document.getElementById("modalBtnCancelar");

  tituloEl.textContent = titulo;
  mensagemEl.textContent = mensagem;
  btnCancelar.style.display = "none";
  overlay.classList.add("active");

  btnOk.onclick = () => {
    overlay.classList.remove("active");
    if (callback) callback();
  };
}

function mostrarModalConfirmacao(titulo, mensagem, onConfirm, onCancel) {
  const overlay = document.getElementById("modalOverlay");
  const tituloEl = document.getElementById("modalTitulo");
  const mensagemEl = document.getElementById("modalMensagem");
  const btnOk = document.getElementById("modalBtnOk");
  const btnCancelar = document.getElementById("modalBtnCancelar");

  tituloEl.textContent = titulo;
  mensagemEl.textContent = mensagem;
  btnCancelar.style.display = "block";
  overlay.classList.add("active");

  btnOk.onclick = () => {
    overlay.classList.remove("active");
    if (onConfirm) onConfirm();
  };

  btnCancelar.onclick = () => {
    overlay.classList.remove("active");
    if (onCancel) onCancel();
  };
}

function mostrarModalSucesso() {
  const modalSucesso = document.getElementById("modalSucesso");
  const btnFechar = document.getElementById("modalBtnFecharSucesso");

  modalSucesso.classList.add("active");

  btnFechar.onclick = () => {
    modalSucesso.classList.remove("active");
  };
}

async function carregarEstoque() {
  try {
    const response = await axios.get("http://localhost:3001/products");
    const estoque = response.data;

    document.querySelectorAll(".produto").forEach((produtoDiv) => {
      const nomeProduto = produtoDiv.dataset.nome;
      const quantidadeStrong = produtoDiv.querySelector("p strong");
      const produto = estoque.find((p) => p.nome === nomeProduto);

      if (quantidadeStrong) {
        if (!produto || produto.quantidade <= 0) {
          quantidadeStrong.textContent = "Esgotado";
        } else {
          quantidadeStrong.textContent = produto.quantidade;
        }
      }
    });
  } catch (error) {
    console.error("Erro ao carregar estoque:", error);
  }
}

// Modal
const carrinhoBtn = document.querySelector(".carrinhoBtn");
const modalCarrinho = document.querySelector(".modalCarrinho");
const btnFecharModal = document.querySelector(".btnFecharModal");
const listaCarrinho = document.querySelector(".listaCarrinho");
const carrinhoQuantidade = document.getElementById("carrinhoQuantidade");
const btnFinalizarCompra = document.querySelector(".btnFinalizarCompra");
let usuarioEmail = null;

let carrinho = [];

function atualizarCarrinhoNoDOM() {
  listaCarrinho.innerHTML = "";
  let totalItens = 0;
  let totalPreco = 0;

  carrinho.forEach((item) => {
    const li = document.createElement("li");
    const subtotal = item.preco * item.quantidade;
    li.textContent = `${item.nome} - Quantidade: ${
      item.quantidade
    } - R$ ${item.preco.toFixed(2)} - Subtotal: R$ ${subtotal.toFixed(2)}`;
    listaCarrinho.appendChild(li);
    totalItens += item.quantidade;
    totalPreco += subtotal;
  });

  carrinhoQuantidade.textContent = totalItens;

  let totalElement = document.querySelector(".totalCarrinho");
  if (!totalElement) {
    totalElement = document.createElement("div");
    totalElement.className = "totalCarrinho";
    listaCarrinho.parentElement.insertBefore(totalElement, btnFinalizarCompra);
  }
  totalElement.innerHTML = `<strong>TOTAL: R$ ${totalPreco.toFixed(
    2
  )}</strong>`;
}

function adicionarAoCarrinho(nome, quantidadeComprar, preco) {
  const produtoNoCarrinho = carrinho.find((item) => item.nome === nome);
  if (produtoNoCarrinho) {
    produtoNoCarrinho.quantidade += quantidadeComprar;
  } else {
    carrinho.push({
      nome,
      quantidade: quantidadeComprar,
      preco: Number(preco),
    });
  }
  atualizarCarrinhoNoDOM();
}

document.querySelectorAll(".adicionarCarrinho").forEach((botao) => {
  botao.addEventListener("click", () => {
    const produtoDiv = botao.closest(".produto");
    const nomeProduto = produtoDiv.dataset.nome;
    const precoProduto = Number(produtoDiv.dataset.preco);
    const quantidadeTexto = produtoDiv.querySelector("p strong").textContent;

    if (quantidadeTexto === "Esgotado" || quantidadeTexto === "0") {
      mostrarModal("Produto Esgotado", `Produto ${nomeProduto} está esgotado!`);
      return;
    }

    const quantidadeEstoque = Number(quantidadeTexto);

    if (isNaN(quantidadeEstoque) || quantidadeEstoque <= 0) {
      mostrarModal("Produto Esgotado", `Produto ${nomeProduto} está esgotado!`);
      return;
    }

    if (isNaN(precoProduto) || precoProduto <= 0) {
      mostrarModal("Erro", `Erro: preço inválido para ${nomeProduto}`);
      return;
    }

    adicionarAoCarrinho(nomeProduto, 1, precoProduto);
    mostrarModal("Sucesso", `Produto ${nomeProduto} adicionado ao carrinho!`);
  });
});

btnFinalizarCompra.addEventListener("click", async () => {
  if (!usuarioEmail) {
    mostrarModal(
      "Atenção",
      "Você precisa estar logado para finalizar a compra!",
      () => {
        window.location.href = "./entrar.html";
      }
    );
    return;
  }

  if (carrinho.length === 0) {
    mostrarModal("Carrinho Vazio", "Seu carrinho está vazio!");
    return;
  }

  try {
    for (const item of carrinho) {
      const produtoDiv = document.querySelector(
        `.produto[data-nome="${item.nome}"]`
      );
      const quantidadeStrong = produtoDiv.querySelector("p strong");
      const quantidadeTexto = quantidadeStrong.textContent;

      if (quantidadeTexto === "Esgotado") {
        mostrarModal("Produto Esgotado", `Produto ${item.nome} está esgotado!`);
        return;
      }

      const quantidadeAtual = parseInt(quantidadeTexto);

      if (isNaN(quantidadeAtual) || quantidadeAtual < item.quantidade) {
        mostrarModal(
          "Estoque Insuficiente",
          `Estoque insuficiente para ${item.nome}. Disponível: ${quantidadeAtual}, Solicitado: ${item.quantidade}`
        );
        return;
      }
    }

    const compraResponse = await axios.post("http://localhost:3001/compras", {
      email: usuarioEmail,
      itens: carrinho.map((item) => ({
        nome: item.nome,
        quantidade: item.quantidade,
        preco: item.preco,
      })),
    });

    for (const item of carrinho) {
      const produtoDiv = document.querySelector(
        `.produto[data-nome="${item.nome}"]`
      );
      const quantidadeStrong = produtoDiv.querySelector("p strong");
      const quantidadeAtual = parseInt(quantidadeStrong.textContent);
      const novaQuantidade = quantidadeAtual - item.quantidade;

      await axios.post("http://localhost:3001/products", {
        nome: item.nome,
        quantidade: novaQuantidade,
      });

      if (novaQuantidade <= 0) {
        quantidadeStrong.textContent = "Esgotado";
      } else {
        quantidadeStrong.textContent = novaQuantidade;
      }
    }

    carrinho = [];
    atualizarCarrinhoNoDOM();
    modalCarrinho.style.display = "none";

    // Mostra modal de sucesso
    mostrarModalSucesso();
  } catch (error) {
    console.error("Erro ao finalizar compra:", error);

    if (error.response) {
      mostrarModal(
        "Erro",
        `Erro ao finalizar compra: ${
          error.response.data.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      mostrarModal(
        "Erro de Conexão",
        "Erro de conexão com o servidor. Verifique se o backend está rodando."
      );
    } else {
      mostrarModal("Erro", "Erro ao finalizar compra. Tente novamente.");
    }
  }
});

carrinhoBtn.addEventListener("click", () => {
  modalCarrinho.style.display = "flex";
  atualizarCarrinhoNoDOM();
});

btnFecharModal.addEventListener("click", () => {
  modalCarrinho.style.display = "none";
});

modalCarrinho.addEventListener("click", (event) => {
  if (event.target === modalCarrinho) {
    modalCarrinho.style.display = "none";
  }
});

window.onload = async () => {
  const usuarioJSON = localStorage.getItem("usuario");
  if (!usuarioJSON) {
    mostrarModal("Atenção", "Usuário não logado", () => {
      window.location.href = "./entrar.html";
    });
    return;
  }

  const usuario = JSON.parse(usuarioJSON);
  if (!usuario.email) {
    mostrarModal("Atenção", "Usuário não logado", () => {
      window.location.href = "./entrar.html";
    });
    return;
  }

  usuarioEmail = usuario.email;

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
