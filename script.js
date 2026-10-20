const collections = {
  queensland: {
    title: "Queensland multicultural photography competition — landscape",
    files: ["images/queensland-competition/award-landscape.jpg"]
  },
  uqgcaa: {
    title: "UQGCAA 2026 Calendar Project",
    files: [
      "images/uqgcaa-calendar/photo-01.jpg",
      "images/uqgcaa-calendar/photo-02.jpg",
      "images/uqgcaa-calendar/photo-03.jpg"
    ]
  }
};

const dialog = document.querySelector(".lightbox");
const dialogImage = dialog.querySelector("figure img");
const countLabel = dialog.querySelector(".lightbox-count");
const activeProjects = new Map();
let activeKey = "";
let activePhotos = [];
let activeIndex = 0;

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

async function loadProject(article) {
  const key = article.dataset.project;
  const project = collections[key];
  const loaded = (await Promise.all(project.files.map(loadImage))).filter(Boolean);
  if (!loaded.length) return;

  activeProjects.set(key, loaded);
  if (key === "queensland") {
    const cover = article.querySelector(".cover");
    const image = cover.querySelector("img");
    image.src = loaded[0];
    image.alt = "Landscape photograph in the Queensland multicultural photography competition";
    image.style.display = "block";
    cover.hidden = false;
    cover.addEventListener("click", () => openViewer(key, 0));
    return;
  }

  const grid = article.querySelector(".photo-grid");
  loaded.forEach((src, index) => {
    const figure = document.createElement("figure");
    const button = document.createElement("button");
    const image = document.createElement("img");
    figure.className = "photo-card";
    button.type = "button";
    button.setAttribute("aria-label", `Open calendar project photograph ${index + 1}`);
    image.src = src;
    image.alt = `Photograph ${index + 1} selected for the UQGCAA 2026 Calendar Project`;
    button.append(image);
    button.addEventListener("click", () => openViewer(key, index));
    figure.append(button);
    grid.append(figure);
  });
  grid.hidden = false;
}

function openViewer(key, startIndex) {
  activeKey = key;
  activePhotos = activeProjects.get(key) || [];
  activeIndex = startIndex;
  showPhoto();
  dialog.showModal();
}

function showPhoto() {
  dialogImage.classList.remove("zoomed");
  dialogImage.src = activePhotos[activeIndex];
  dialogImage.alt = `${collections[activeKey].title}, photograph ${activeIndex + 1}`;
  countLabel.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(activePhotos.length).padStart(2, "0")}`;
}

function movePhoto(delta) {
  if (!activePhotos.length) return;
  activeIndex = (activeIndex + delta + activePhotos.length) % activePhotos.length;
  showPhoto();
}

document.querySelectorAll(".project").forEach(loadProject);
dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
dialog.querySelector(".lightbox-prev").addEventListener("click", () => movePhoto(-1));
dialog.querySelector(".lightbox-next").addEventListener("click", () => movePhoto(1));
dialogImage.addEventListener("click", () => dialogImage.classList.toggle("zoomed"));
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") movePhoto(-1);
  if (event.key === "ArrowRight") movePhoto(1);
});
