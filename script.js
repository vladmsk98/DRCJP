"use strict";

// --- DOM-ЭЛЕМЕНТЫ ---
const artImage = document.getElementById('art-image');
const artDescription = document.getElementById('art-description');
const currentIndexDisplay = document.getElementById('current-index');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const artListContainer = document.getElementById('art-list-container');
const artList = document.getElementById('art-list');
const themeToggle = document.getElementById('theme-toggle');

// --- ДАННЫЕ ГАЛЕРЕИ ---
// Массив объектов с информацией об артах
const galleryData = [
  {
    id: 1,
    title: "SHIZUKESA (20.01.2026)",
    description: "На фотографии изображено японское слово 「静けさ」(shizukesa), которое переводится как «тишина» или «спокойствие». Это слово точно передает атмосферу изображения — умиротворенную, безмятежную, почти молчаливую.",
    imageUrl: "arts/SHIZUKESA (20.01.2026).jpg"
  },
  {
    id: 2,
    title: "HEION (22.01.2026)",
    description: "На фотографии изображено японское слово 「平静」(heion), которое переводится как «спокойствие» или «уравновешенность». Это слово соответствует спокойной, умиротворяющей атмосфере изображения с сухой травой на светлом фоне.",
    imageUrl: "arts/HEION (22.01.2026).jpg"
  },
  {
    id: 3,
    title: "KIBUN TENKAN (23.01.2026)",
    description: "На фотографии изображено японское слово 「気分転換」(kibun tenkan), которое переводится как «смена настроения» или «перемена впечатлений». Это слово гармонично сочетается с визуальным образом снега, отступающего перед галькой, что символизирует переход, изменение и обновление.",
    imageUrl: "arts/KIBUN TENKAN (23.01.2026).jpg"
  }
];

// --- СОСТОЯНИЕ ГАЛЕРЕИ ---
let currentIndex = 0;

// --- МОДУЛЬ ОТОБРАЖЕНИЯ ---
const DisplayModule = {
  updateDisplay(index) {
    if (galleryData.length === 0) {
      artImage.src = "";
      artImage.alt = "Нет доступных изображений";
      artDescription.textContent = "Галерея пуста";
      currentIndexDisplay.textContent = "0 из 0";
      return;
    }

    const art = galleryData[index];
    artImage.src = art.imageUrl;
    artImage.alt = art.title;
    artDescription.textContent = `${art.title}: ${art.description}`;
    currentIndexDisplay.textContent = `${index + 1} из ${galleryData.length}`;
  },

  updateArtList() {
    artList.innerHTML = "";

    galleryData.forEach((art, index) => {
      const li = document.createElement('li');
      li.className = 'art-item';
      li.textContent = `${art.title} (${art.id})`;
      li.addEventListener('click', () => {
        currentIndex = index;
        this.updateDisplay(currentIndex);
        this.scrollToCurrentArt();
      });
      artList.appendChild(li);
    });
  },

  scrollToCurrentArt() {
    const currentLi = artList.children[currentIndex];
    if (currentLi) {
      currentLi.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      currentLi.classList.add('highlighted');
      setTimeout(() => {
        currentLi.classList.remove('highlighted');
      }, 1000);
    }
  }
};

// --- МОДУЛЬ НАВИГАЦИИ ---
const NavigationModule = {
  goToPrevious() {
    if (galleryData.length === 0) return;
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    DisplayModule.updateDisplay(currentIndex);
    DisplayModule.scrollToCurrentArt();
  },

  goToNext() {
    if (galleryData.length === 0) return;
    currentIndex = (currentIndex + 1) % galleryData.length;
    DisplayModule.updateDisplay(currentIndex);
    DisplayModule.scrollToCurrentArt();
  },

  goToIndex(index) {
    if (index >= 0 && index < galleryData.length) {
      currentIndex = index;
      DisplayModule.updateDisplay(currentIndex);
      DisplayModule.scrollToCurrentArt();
    }
  }
};

// --- ОБРАБОТЧИКИ СОБЫТИЙ ---
prevBtn.addEventListener('click', NavigationModule.goToPrevious);
nextBtn.addEventListener('click', NavigationModule.goToNext);

// --- ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ---
themeToggle.addEventListener('click', () => {
  document.body.setAttribute('data-theme',
    document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  );
});

// --- КЛАВИАТУРНАЯ НАВИГАЦИЯ ---
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    NavigationModule.goToPrevious();
  } else if (event.key === 'ArrowRight') {
    NavigationModule.goToNext();
  } else if (event.key === 'Home') {
    NavigationModule.goToIndex(0);
  } else if (event.key === 'End') {
    NavigationModule.goToIndex(galleryData.length - 1);
  }
});

// --- ИНИЦИАЛИЗАЦИЯ ---
function initGallery() {
  DisplayModule.updateArtList();
  DisplayModule.updateDisplay(currentIndex);
}

initGallery();