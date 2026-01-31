const shapes = [
  {
    id: "cube",
    name: "Hình lập phương",
    keywords: ["lập phương", "cube", "hình hộp"],
    description: "Mô hình gồm 6 mặt vuông bằng nhau, cạnh song song từng cặp.",
    notes:
      "Phù hợp với các bài về mặt phẳng song song, đường chéo khối, thể tích.",
    svg: `
      <svg viewBox="0 0 200 140" aria-label="Hình lập phương">
        <polygon points="40,40 110,20 170,60 100,80" fill="#dbe6ff" stroke="#2f6fed" stroke-width="2" />
        <polygon points="40,40 100,80 100,130 40,90" fill="#c7d7ff" stroke="#2f6fed" stroke-width="2" />
        <polygon points="100,80 170,60 170,110 100,130" fill="#b7caff" stroke="#2f6fed" stroke-width="2" />
        <polyline points="40,40 110,20 170,60" fill="none" stroke="#1f4fb0" stroke-width="2" />
      </svg>
    `,
  },
  {
    id: "prism",
    name: "Lăng trụ tam giác",
    keywords: ["lăng trụ", "prism", "tam giác"],
    description: "Hai đáy là tam giác song song và bằng nhau.",
    notes:
      "Dùng trong bài toán về thể tích, đường thẳng song song mặt phẳng.",
    svg: `
      <svg viewBox="0 0 200 140" aria-label="Lăng trụ tam giác">
        <polygon points="40,90 90,30 140,90" fill="#dbe6ff" stroke="#2f6fed" stroke-width="2" />
        <polygon points="60,110 110,50 160,110" fill="#c7d7ff" stroke="#2f6fed" stroke-width="2" />
        <line x1="40" y1="90" x2="60" y2="110" stroke="#1f4fb0" stroke-width="2" />
        <line x1="90" y1="30" x2="110" y2="50" stroke="#1f4fb0" stroke-width="2" />
        <line x1="140" y1="90" x2="160" y2="110" stroke="#1f4fb0" stroke-width="2" />
      </svg>
    `,
  },
  {
    id: "pyramid",
    name: "Hình chóp",
    keywords: ["hình chóp", "pyramid", "chóp"],
    description: "Một đỉnh và đáy là đa giác, nối đỉnh với các đỉnh đáy.",
    notes:
      "Phổ biến trong bài toán mặt phẳng, góc giữa đường thẳng và mặt phẳng.",
    svg: `
      <svg viewBox="0 0 200 140" aria-label="Hình chóp">
        <polygon points="40,100 160,100 120,70 60,70" fill="#dbe6ff" stroke="#2f6fed" stroke-width="2" />
        <polygon points="100,20 40,100 160,100" fill="#c7d7ff" stroke="#2f6fed" stroke-width="2" />
        <line x1="100" y1="20" x2="120" y2="70" stroke="#1f4fb0" stroke-width="2" />
        <line x1="100" y1="20" x2="60" y2="70" stroke="#1f4fb0" stroke-width="2" />
      </svg>
    `,
  },
  {
    id: "cylinder",
    name: "Hình trụ",
    keywords: ["hình trụ", "cylinder", "trụ"],
    description: "Hai đáy là hình tròn song song, mặt xung quanh là hình chữ nhật.",
    notes:
      "Dùng trong bài toán thể tích, diện tích xung quanh.",
    svg: `
      <svg viewBox="0 0 200 140" aria-label="Hình trụ">
        <ellipse cx="100" cy="35" rx="50" ry="18" fill="#dbe6ff" stroke="#2f6fed" stroke-width="2" />
        <rect x="50" y="35" width="100" height="70" fill="#c7d7ff" stroke="#2f6fed" stroke-width="2" />
        <ellipse cx="100" cy="105" rx="50" ry="18" fill="#b7caff" stroke="#2f6fed" stroke-width="2" />
      </svg>
    `,
  },
  {
    id: "cone",
    name: "Hình nón",
    keywords: ["hình nón", "cone", "nón"],
    description: "Một đỉnh và đáy là hình tròn.",
    notes:
      "Hữu ích cho bài toán diện tích xung quanh, đường sinh.",
    svg: `
      <svg viewBox="0 0 200 140" aria-label="Hình nón">
        <ellipse cx="100" cy="100" rx="55" ry="18" fill="#c7d7ff" stroke="#2f6fed" stroke-width="2" />
        <polygon points="100,20 45,100 155,100" fill="#dbe6ff" stroke="#2f6fed" stroke-width="2" />
        <line x1="100" y1="20" x2="100" y2="100" stroke="#1f4fb0" stroke-width="2" stroke-dasharray="4 4" />
      </svg>
    `,
  },
  {
    id: "sphere",
    name: "Hình cầu",
    keywords: ["hình cầu", "sphere", "cầu"],
    description: "Tập hợp các điểm cách đều tâm một khoảng cố định.",
    notes:
      "Phù hợp với bài toán thể tích, diện tích mặt cầu.",
    svg: `
      <svg viewBox="0 0 200 140" aria-label="Hình cầu">
        <circle cx="100" cy="70" r="50" fill="#dbe6ff" stroke="#2f6fed" stroke-width="2" />
        <ellipse cx="100" cy="70" rx="50" ry="18" fill="none" stroke="#1f4fb0" stroke-width="2" />
        <ellipse cx="100" cy="70" rx="18" ry="50" fill="none" stroke="#1f4fb0" stroke-width="2" opacity="0.4" />
      </svg>
    `,
  },
];

const shapeGrid = document.getElementById("shape-grid");
const resultTitle = document.getElementById("result-title");
const resultBadge = document.getElementById("result-badge");
const resultCanvas = document.getElementById("result-canvas");
const resultNotes = document.getElementById("result-notes");
const promptForm = document.getElementById("prompt-form");
const promptInput = document.getElementById("prompt");

const viewShapesButton = document.getElementById("view-shapes");
const focusInputButton = document.getElementById("focus-input");

const normalize = (text) => text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

const renderShapeCard = (shape) => {
  const card = document.createElement("article");
  card.className = "shape-card";
  card.innerHTML = `
    <div class="shape-preview">${shape.svg}</div>
    <h3>${shape.name}</h3>
    <p>${shape.description}</p>
    <button class="secondary" type="button" data-shape-id="${shape.id}">Chọn hình</button>
  `;
  return card;
};

const updateResult = (shape, modeLabel = "Từ khóa") => {
  resultTitle.textContent = shape.name;
  resultBadge.textContent = modeLabel;
  resultCanvas.innerHTML = shape.svg;
  resultNotes.textContent = shape.notes;
};

const findShapeByPrompt = (prompt) => {
  const normalizedPrompt = normalize(prompt);
  return shapes.find((shape) =>
    shape.keywords.some((keyword) => normalizedPrompt.includes(normalize(keyword)))
  );
};

shapes.forEach((shape) => {
  shapeGrid.appendChild(renderShapeCard(shape));
});

shapeGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-shape-id]");
  if (!button) return;
  const shape = shapes.find((item) => item.id === button.dataset.shapeId);
  if (shape) {
    updateResult(shape, "Chọn từ thư viện");
    resultTitle.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

promptForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) {
    resultTitle.textContent = "Hãy nhập đề bài để gợi ý hình";
    resultBadge.textContent = "Thiếu đề bài";
    resultCanvas.innerHTML = "";
    resultNotes.textContent = "Vui lòng nhập mô tả để hệ thống tìm hình phù hợp.";
    return;
  }

  const matchedShape = findShapeByPrompt(prompt);
  if (matchedShape) {
    updateResult(matchedShape, "Từ khóa đề bài");
  } else {
    resultTitle.textContent = "Chưa nhận diện được hình";
    resultBadge.textContent = "Không tìm thấy";
    resultCanvas.innerHTML = "";
    resultNotes.textContent =
      "Hãy bổ sung từ khóa (ví dụ: hình chóp, lăng trụ, hình trụ...) để gợi ý chính xác hơn.";
  }
});

viewShapesButton.addEventListener("click", () => {
  document.getElementById("library").scrollIntoView({ behavior: "smooth" });
});

focusInputButton.addEventListener("click", () => {
  promptInput.focus();
  document.getElementById("builder").scrollIntoView({ behavior: "smooth" });
});

updateResult(shapes[0], "Gợi ý mặc định");
