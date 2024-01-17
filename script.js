import axios from "axios";

const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
  const urlVideos = import.meta.env.VITE_URL_VIDEOS;

  try {
    const busca = await axios.get(urlVideos);

    const videos = busca.data;

    videos.forEach((video) => {
      if (video.categoria == "") {
        throw new Error("Vídeo não tem categoria.");
      }

      containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <a href="https://www.youtube.com/alura" class="img-canal">
                    <img src="${video.imagem}" alt="Logo do canal">
                    </a>
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `;
    });
  } catch (error) {
    containerVideos.innerHTML = `
            <p>Houve um erro ao carregar os vídeos: ${error}</p>
        `;
  }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");
barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
  const videos = document.querySelectorAll(".videos__item");
  const valorFiltro = barraDePesquisa.value.toLowerCase();

  videos.forEach((video) => {
    const titulo = video
      .querySelector(".titulo-video")
      .textContent.toLowerCase();
    video.style.display = titulo.includes(valorFiltro) ? "block" : "none";
  });
}

const botaoCategoria = document.querySelectorAll(".superior__item");
botaoCategoria.forEach((botao) => {
  botao.addEventListener("click", () =>
    filtrarPorcategoria(botao.getAttribute("name"))
  );
});

function filtrarPorcategoria(filtro) {
  const valorFiltro = filtro.toLowerCase();

  document.querySelectorAll(".videos__item").forEach((video) => {
    const categoria = video
      .querySelector(".categoria")
      .textContent.toLowerCase();
    video.style.display =
      !categoria.includes(valorFiltro) && valorFiltro !== "tudo"
        ? "none"
        : "block";
  });
}
