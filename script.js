"use strict";

// --- DOM-ЭЛЕМЕНТЫ ---
const artImage = document.getElementById('art-image');
const artDescription = document.getElementById('art-description');
const currentIndexDisplay = document.getElementById('current-index');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const artListContainer = document.getElementById('art-list-container');
const artList = document.getElementById('art-list');
const artGrid = document.getElementById('art-grid'); // <--- НОВЫЙ ЭЛЕМЕНТ
const historyGrid = document.getElementById('history-grid');
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const sortSelect = document.getElementById('sort-select');
const clearSearchBtn = document.getElementById('clear-search-btn');
const artTagsContainer = document.getElementById('art-tags-container');
const artTags = document.getElementById('art-tags');
const artInfoContainer = document.getElementById('art-info-container');
const artInfo = document.getElementById('art-info');
const favoriteBtn = document.getElementById('favorite-btn');
const shareBtn = document.getElementById('share-btn');
const tagFilterContainer = document.getElementById('tag-filter-container');
const tagFilterList = document.getElementById('tag-filter-list');
const zoomOverlay = document.getElementById('zoom-overlay');
const zoomImage = document.getElementById('zoom-image');
const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const zoomResetBtn = document.getElementById('zoom-reset-btn');
const imageContainer = document.querySelector('.image-container');
const mainArtImage = document.getElementById('art-image');
const shareModal = document.getElementById('share-modal');
const closeShareModal = document.getElementById('close-share-modal');
const sharePlatformButtons = document.querySelectorAll('.share-platform-btn');
// НОВЫЕ ЭЛЕМЕНТЫ: кнопка и контейнер промо-видео
const togglePromoBtn = document.getElementById('toggle-promo-btn');
const promoVideoContainer = document.querySelector('.promo-video-container');
// ЭЛЕМЕНТЫ ОБРАТНОГО ОТСЧЁТА
const countdownTimerElement = document.getElementById('countdown-timer');

// --- ДАННЫЕ ГАЛЕРЕИ ---
// Массив объектов с информацией об артах (обновлены разрешения изображений, добавлены новые арты)
const galleryData = [
  {
    id: 1,
    title: "SHIZUKESA (20.01.2026)",
    description: "На фотографии изображено японское слово 「静けさ」(shizukesa), которое переводится как «тишина» или «спокойствие». Это слово точно передает атмосферу изображения — умиротворенную, безмятежную, почти молчаливую.",
    imageUrl: "arts/SHIZUKESA (20.01.2026).jpg",
    tags: ["японские иероглифы", "тишина", "фотография"],
    fileDetails: {
      format: "JPEG",
      dimensions: "3000x3000"
    }
  },
  {
    id: 2,
    title: "HEION (22.01.2026)",
    description: "На фотографии изображено японское слово 「平静」(heion), которое переводится как «спокойствие» или «уравновешенность». Это слово соответствует спокойной, умиротворяющей атмосфере изображения с сухой травой на светлом фоне.",
    imageUrl: "arts/HEION (22.01.2026).jpg",
    tags: ["японские иероглифы", "спокойствие", "фотография"],
    fileDetails: {
      format: "JPEG",
      dimensions: "3000x3000"
    }
  },
  {
    id: 3,
    title: "KIBUN TENKAN (23.01.2026)",
    description: "На фотографии изображено японское слово 「気分転換」(kibun tenkan), которое переводится как «смена настроения» или «перемена впечатлений». Это слово гармонично сочетается с визуальным образом снега, отступающего перед галькой, что символизирует переход, изменение и обновление.",
    imageUrl: "arts/KIBUN TENKAN (23.01.2026).jpg",
    tags: ["японские иероглифы", "смена настроения", "фотография"],
    fileDetails: {
      format: "JPEG",
      dimensions: "3000x3000"
    }
  },
  {
    id: 4,
    title: "HENKA (24.01.2026)",
    description: "На фотографии изображено японское слово 「変化」(henka), которое переводится как «изменение» или «перемена». Это слово соответствует визуальному образу зрелых колосьев, символизирующих естественный цикл жизни и трансформацию.",
    imageUrl: "arts/HENKA (24.01.2026).jpg",
    tags: ["японские иероглифы", "изменение", "фотография"],
    fileDetails: {
      format: "JPEG",
      dimensions: "3000x3000"
    }
  },
  {
    id: 5,
    title: "FUANTEI (26.01.2026)",
    description: "На фотографии изображено японское слово 「不安定」(fuantei), которое переводится как «нестабильность» или «неустойчивость». Это слово соответствует визуальному образу моря под тяжелыми облаками — внешне спокойной, но наполненной ощущением неопределенности и возможных перемен.",
    imageUrl: "arts/FUANTEI (26.01.2026).jpg",
    tags: ["японские иероглифы", "нестабильность", "фотография"],
    fileDetails: {
      format: "JPEG",
      dimensions: "3000x3000"
    }
  },
  {
    id: 6,
    title: "AIMAI (31.01.2026)",
    description: "На фотографии изображено японское слово 「曖昧」(aimai), которое переводится как «неопределённость», «двусмысленность» или «расплывчатость». Это слово отражает аттмосферу изображения — мягкую, приглушённую, где детали теряются в снегу и тени, создавая ощущение недосказанности и открытости для интерпретации.",
    imageUrl: "arts/AIMAI (31.01.2026).jpg",
    tags: ["японские иероглифы", "неопределённость", "фотография", "снег"],
    fileDetails: {
      format: "JPEG",
      dimensions: "3000x3000"
    }
  },
  // === НОВЫЙ АРТ: SEISHI (18.02.2026) ===
  {
    id: 7,
    title: "SEISHI (18.02.2026)",
    description: "На фотографии изображено японское слово 「静止」(seishi), которое переводится как «покой», «неподвижность» или «остановка». Это слово передаёт ощущение застывшего момента — когда время, движение и шум замедляются до полной остановки, оставляя только чистую, неподвижную тишину.",
    imageUrl: "arts/SEISHI (18.02.2026).jpg",
    tags: ["японские иероглифы", "покой", "фотография", "неподвижность"],
    fileDetails: {
      format: "JPEG",
      dimensions: "3000x3000"
    }
  }
];

// --- СОСТОЯНИЕ ГАЛЕРЕИ ---
let currentIndex = 0;
let filteredData = [...galleryData]; // Данные после фильтрации
let currentSort = 'default'; // Текущий тип сортировки
let favorites = new Set(); // Множество ID избранных артов
let activeTagFilters = new Set(); // Множество активных фильтров по тегам
let currentArtForSharing = null; // Текущий арт для деления

// --- МОДУЛЬ ХРАНЕНИЯ СОСТОЯНИЯ ---
const StateModule = {
  storageKey: 'drcjp_gallery_state',
  favoritesKey: 'drcjp_favorites',
  tagFiltersKey: 'drcjp_tag_filters',
  promoVisibleKey: 'drcjp_promo_visible', // ← новая ключевая переменная

  saveState(query, filterType, sortType) {
    const state = {
      query: query,
      filterType: filterType,
      sortType: sortType
    };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch (e) {
      console.warn('Не удалось сохранить состояние в localStorage:', e);
    }
  },

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Не удалось загрузить состояние из localStorage:', e);
    }
    return null;
  },

  clearState() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (e) {
      console.warn('Не удалось очистить состояние в localStorage:', e);
    }
  },

  saveFavorites() {
    try {
      localStorage.setItem(this.favoritesKey, JSON.stringify([...favorites]));
    } catch (e) {
      console.warn('Не удалось сохранить избранное в localStorage:', e);
    }
  },

  loadFavorites() {
    try {
      const saved = localStorage.getItem(this.favoritesKey);
      if (saved) {
        const loadedFavorites = JSON.parse(saved);
        if (Array.isArray(loadedFavorites)) {
          favorites = new Set(loadedFavorites);
        }
      }
    } catch (e) {
      console.warn('Не удалось загрузить избранное из localStorage:', e);
    }
  },

  saveTagFilters() {
    try {
      localStorage.setItem(this.tagFiltersKey, JSON.stringify([...activeTagFilters]));
    } catch (e) {
      console.warn('Не удалось сохранить фильтры по тегам в localStorage:', e);
    }
  },

  loadTagFilters() {
    try {
      const saved = localStorage.getItem(this.tagFiltersKey);
      if (saved) {
        const loadedTagFilters = JSON.parse(saved);
        if (Array.isArray(loadedTagFilters)) {
          activeTagFilters = new Set(loadedTagFilters);
        }
      }
    } catch (e) {
      console.warn('Не удалось загрузить фильтры по тегам из localStorage:', e);
    }
  },

  // Сохранить видимость промо
  savePromoVisibility(visible) {
    try {
      localStorage.setItem(this.promoVisibleKey, JSON.stringify(visible));
    } catch (e) {
      console.warn('Не удалось сохранить видимость промо в localStorage:', e);
    }
  },

  // Загрузить видимость промо
  loadPromoVisibility() {
    try {
      const saved = localStorage.getItem(this.promoVisibleKey);
      return saved === null ? true : JSON.parse(saved); // по умолчанию показывать
    } catch (e) {
      console.warn('Не удалось загрузить видимость промо из localStorage:', e);
      return true;
    }
  }
};

// --- МОДУЛЬ СОРТИРОВКИ ---
const SortModule = {
  compareFunctions: {
    'title-asc': (a, b) => a.title.localeCompare(b.title),
    'title-desc': (a, b) => b.title.localeCompare(a.title),
    'id-asc': (a, b) => a.id - b.id,
    'id-desc': (a, b) => b.id - a.id,
    'default': (a, b) => galleryData.indexOf(a) - galleryData.indexOf(b) // Сохранить исходный порядок
  },

  sortData(data, sortType) {
    const compareFn = this.compareFunctions[sortType] || this.compareFunctions['default'];
    return [...data].sort(compareFn);
  }
};

// --- МОДУЛЬ ИЗБРАННОГО ---
const FavoritesModule = {
  toggleFavorite(artId) {
    if (favorites.has(artId)) {
      favorites.delete(artId);
    } else {
      favorites.add(artId);
    }
    StateModule.saveFavorites();
    // Обновляем состояние кнопки
    this.updateFavoriteButton(artId);
    // Если фильтр "избранное", пересчитываем список
    if (filterSelect.value === 'favorites') {
      this.applyFilters();
    }
  },

  isFavorite(artId) {
    return favorites.has(artId);
  },

  getFavoritesData() {
    return galleryData.filter(art => this.isFavorite(art.id));
  },

  updateFavoriteButton(artId) {
    if (this.isFavorite(artId)) {
      favoriteBtn.textContent = 'Удалить из избранного';
      favoriteBtn.classList.add('active');
    } else {
      favoriteBtn.textContent = 'Добавить в избранное';
      favoriteBtn.classList.remove('active');
    }
  },

  applyFilters() {
    const query = searchInput.value.trim();
    const filterType = filterSelect.value;
    const sortType = sortSelect.value;

    SearchModule.filterAndSortData(query, filterType, sortType);
  }
};

// --- МОДУЛЬ ПОДЕЛИТЬСЯ ---
const ShareModule = {
  openShareModal(art) {
    currentArtForSharing = art;
    shareModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
  },

  closeShareModal() {
    shareModal.classList.remove('open');
    document.body.style.overflow = ''; // Восстанавливаем прокрутку
  },

  shareToPlatform(platform) {
    if (!currentArtForSharing) {
      console.error('Нет арта для деления');
      return;
    }

    const currentUrl = window.location.href.split('?')[0];
    const shareUrl = `${currentUrl}?art=${currentArtForSharing.id}`;
    const title = encodeURIComponent(currentArtForSharing.title);
    const description = encodeURIComponent(currentArtForSharing.description.substring(0, 100)); // Ограничение длины описания

    let shareLink = '';

    switch (platform) {
      case 'vk':
        shareLink = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${title}&description=${description}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${title}%0A${description}`;
        break;
      case 'ok':
        shareLink = `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(shareUrl)}&st.title=${title}`;
        break;
      case 'bluesky':
        shareLink = `https://bsky.app/intent/compose?text=${title}%20${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        this.copyLink(shareUrl);
        this.closeShareModal();
        return;
      default:
        console.error('Неизвестная платформа:', platform);
        return;
    }

    // Открываем ссылку в новом окне
    window.open(shareLink, '_blank', 'noopener,noreferrer');
    this.closeShareModal();
  },

  async copyLink(url) {
    try {
      await navigator.clipboard.writeText(url);
      alert('Ссылка скопирована в буфер обмена!');
    } catch (err) {
      console.error('Не удалось скопировать ссылку:', err);
      // Альтернативный метод для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Ссылка скопирована в буфер обмена!');
    }
  }
};

// --- МОДУЛЬ ФИЛЬТРА ПО ТЕГАМ ---
const TagFilterModule = {
  initializeTagFilters() {
    // Собираем все уникальные теги из галереи
    const allTags = new Set();
    galleryData.forEach(art => {
      if (art.tags && Array.isArray(art.tags)) {
        art.tags.forEach(tag => allTags.add(tag));
      }
    });

    // Очищаем контейнер
    tagFilterList.innerHTML = '';

    // Создаём элементы для каждого тега
    allTags.forEach(tag => {
      const tagElement = document.createElement('div');
      tagElement.className = 'tag-filter-item';
      tagElement.textContent = tag;
      tagElement.dataset.tag = tag;

      if (activeTagFilters.has(tag)) {
        tagElement.classList.add('active');
      }

      tagElement.addEventListener('click', () => {
        this.toggleTagFilter(tag);
      });

      tagFilterList.appendChild(tagElement);
    });
  },

  toggleTagFilter(tag) {
    if (activeTagFilters.has(tag)) {
      activeTagFilters.delete(tag);
    } else {
      activeTagFilters.add(tag);
    }

    // Обновляем активные классы
    const tagElements = document.querySelectorAll('.tag-filter-item');
    tagElements.forEach(el => {
      if (el.dataset.tag === tag) {
        el.classList.toggle('active', activeTagFilters.has(tag));
      }
    });

    StateModule.saveTagFilters();

    // Применяем фильтрацию
    this.applyFilters();
  },

  applyFilters() {
    const query = searchInput.value.trim();
    const filterType = filterSelect.value;
    const sortType = sortSelect.value;

    SearchModule.filterAndSortData(query, filterType, sortType);
  },

  filterByTags(data) {
    if (activeTagFilters.size === 0) {
      return data;
    }

    return data.filter(art => {
      if (!art.tags || !Array.isArray(art.tags)) {
        return false;
      }

      // Проверяем, содержит ли хотя бы один тег из арта любой из активных фильтров
      return art.tags.some(tag => activeTagFilters.has(tag));
    });
  }
};

// --- МОДУЛЬ УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЯ (улучшенный) ---
const ZoomModule = {
  // Переменные для состояния зума и панорамирования
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,

  // Показать увеличенное изображение
  showZoom(imageSrc) {
    zoomImage.src = imageSrc;
    this.resetTransform(); // Сброс при открытии
    zoomOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
  },

  // Скрыть увеличенное изображение
  hideZoom() {
    zoomOverlay.classList.remove('visible');
    this.resetTransform(); // Сброс при закрытии
    document.body.style.overflow = ''; // Восстанавливаем прокрутку
  },

  // Сброс масштаба и позиции
  resetTransform() {
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.applyTransform();
  },

  // Применить текущие трансформации к изображению
  applyTransform() {
    zoomImage.style.transform = `scale(${this.scale}) translate(${this.offsetX}px, ${this.offsetY}px)`;
  },

  // Увеличить
  zoomIn() {
    this.scale *= 1.1; // Увеличиваем масштаб на 10%
    this.applyTransform();
  },

  // Уменьшить
  zoomOut() {
    this.scale /= 1.1; // Уменьшаем масштаб на ~9.1%
    if (this.scale < 0.1) this.scale = 0.1; // Минимальный масштаб
    this.applyTransform();
  },

  // Начало перетаскивания
  startDrag(e) {
    this.isDragging = true;
    // Координаты начала перетаскивания относительно изображения
    this.dragStartX = e.clientX - this.offsetX;
    this.dragStartY = e.clientY - this.offsetY;
    zoomImage.classList.add('grabbing');
  },

  // Процесс перетаскивания
  drag(e) {
    if (!this.isDragging) return;
    // Вычисляем смещение
    this.offsetX = e.clientX - this.dragStartX;
    this.offsetY = e.clientY - this.dragStartY;
    this.applyTransform();
  },

  // Конец перетаскивания
  stopDrag() {
    this.isDragging = false;
    zoomImage.classList.remove('grabbing');
  },

  // Обработка колеса мыши для зума
  handleWheel(e) {
    e.preventDefault(); // Предотвращаем прокрутку страницы
    const rect = zoomImage.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Запоминаем текущие смещения
    const oldOffsetX = this.offsetX;
    const oldOffsetY = this.offsetY;

    // Вычисляем смещения относительно центра изображения до зума
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const relXBefore = mouseX - centerX;
    const relYBefore = mouseY - centerY;

    // Применяем зум
    if (e.deltaY < 0) {
      this.scale *= 1.1; // Увеличение
    } else {
      this.scale /= 1.1; // Уменьшение
    }
    if (this.scale < 0.1) this.scale = 0.1; // Минимальный масштаб
    if (this.scale > 5) this.scale = 5; // Максимальный масштаб

    // Вычисляем смещения после зума
    const relXAfter = relXBefore * (this.scale / (this.scale / (e.deltaY < 0 ? 1.1 : 1 / 1.1)));
    const relYAfter = relYBefore * (this.scale / (this.scale / (e.deltaY < 0 ? 1.1 : 1 / 1.1)));

    // Обновляем глобальные смещения
    this.offsetX = oldOffsetX - (relXAfter - relXBefore);
    this.offsetY = oldOffsetY - (relYAfter - relYBefore);

    this.applyTransform();
  },

  // Инициализация обработчиков событий
  initializeEventListeners() {
    // Открытие при клике на основное изображение
    mainArtImage.addEventListener('click', () => {
      if (mainArtImage.src && mainArtImage.src !== 'about:blank' && !mainArtImage.src.includes('undefined')) {
        this.showZoom(mainArtImage.src);
      }
    });

    // Закрытие при клике на оверлей (но не на кнопки управления)
    zoomOverlay.addEventListener('click', (e) => {
      if (e.target === zoomOverlay) {
        this.hideZoom();
      }
    });

    // Закрытие при нажатии Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && zoomOverlay.classList.contains('visible')) {
        this.hideZoom();
      }
    });

    // --- НОВОЕ: Обработчики для кнопок зума ---
    zoomInBtn.addEventListener('click', () => this.zoomIn());
    zoomOutBtn.addEventListener('click', () => this.zoomOut());
    zoomResetBtn.addEventListener('click', () => this.resetTransform());

    // --- НОВОЕ: Обработчики для панорамирования и зума колесом ---
    zoomImage.addEventListener('mousedown', (e) => this.startDrag(e));
    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('mouseup', () => this.stopDrag());
    zoomImage.addEventListener('wheel', (e) => this.handleWheel(e));

    // --- НОВОЕ: Предотвращение двойного клика для увеличения ---
    zoomImage.addEventListener('dblclick', (e) => {
        e.preventDefault();
        // Дополнительно можно реализовать двойной клик как зум/сброс
        // this.scale > 1 ? this.resetTransform() : this.zoomIn();
    });
  }
};

// --- МОДУЛЬ ПОИСКА ---
const SearchModule = {
  // Функция проверки соответствия поисковому запросу
  matchesSearch(art, query, filterType) {
    if (filterType === 'favorites') {
      return FavoritesModule.isFavorite(art.id);
    }

    const lowerQuery = query.toLowerCase();
    const titleMatch = art.title.toLowerCase().includes(lowerQuery);
    const descMatch = art.description.toLowerCase().includes(lowerQuery);

    switch (filterType) {
      case 'title':
        return titleMatch;
      case 'description':
        return descMatch;
      case 'all':
      default:
        return titleMatch || descMatch;
    }
  },

  // Фильтрация и сортировка данных
  filterAndSortData(query, filterType, sortType) {
    let resultData;

    if (!query && filterType !== 'favorites') {
      resultData = [...galleryData];
    } else {
      resultData = galleryData.filter(art =>
        this.matchesSearch(art, query, filterType)
      );
    }

    // Фильтрация по тегам
    resultData = TagFilterModule.filterByTags(resultData);

    // Сортировка данных
    resultData = SortModule.sortData(resultData, sortType);

    filteredData = resultData;

    // Сброс индекса при изменении фильтра
    if (filteredData.length > 0 && currentIndex >= filteredData.length) {
      currentIndex = 0;
    } else if (filteredData.length === 0) {
      currentIndex = -1;
    }

    DisplayModule.updateArtList();
    DisplayModule.updateDisplay(currentIndex);

    // Сохраняем состояние
    StateModule.saveState(query, filterType, sortType);
  },

  // Очистка фильтра
  clearFilter() {
    searchInput.value = '';
    filterSelect.value = 'all';
    sortSelect.value = 'default';
    activeTagFilters.clear(); // Очищаем фильтры по тегам
    TagFilterModule.initializeTagFilters(); // Обновляем отображение фильтров
    this.filterAndSortData('', 'all', 'default');
    StateModule.clearState();
    StateModule.saveTagFilters(); // Сохраняем пустые фильтры
  }
};

// --- МОДУЛЬ ОТОБРАЖЕНИЯ ---
const DisplayModule = {
  updateDisplay(index) {
    if (filteredData.length === 0) {
      artImage.src = "";
      artImage.alt = "Нет доступных изображений";
      artDescription.textContent = "Нет совпадений по вашему запросу";
      artTags.innerHTML = ""; // Очистить теги
      artInfo.textContent = "Нет информации"; // Очистить информацию о файле
      favoriteBtn.style.display = 'none'; // Скрыть кнопку избранного
      shareBtn.style.display = 'none'; // Скрыть кнопку поделиться
      // Обновлённый формат отображения с количеством результатов
      currentIndexDisplay.textContent = `Найдено: ${filteredData.length} из ${galleryData.length}`;
      return;
    }

    if (index < 0 || index >= filteredData.length) {
      index = 0;
    }

    const art = filteredData[index];
    artImage.src = art.imageUrl;
    artImage.alt = art.title;
    artDescription.textContent = `${art.title}: ${art.description}`;

    // Обновить теги
    this.updateTags(art.tags);

    // Обновить информацию о файле
    this.updateFileInfo(art.fileDetails);

    // Обновить состояние кнопки избранного
    FavoritesModule.updateFavoriteButton(art.id);
    favoriteBtn.style.display = 'inline-block'; // Показать кнопку избранного
    shareBtn.style.display = 'inline-block'; // Показать кнопку поделиться

    // Обновлённый формат отображения с количеством результатов
    currentIndexDisplay.textContent = `${index + 1} из ${filteredData.length} (найдено: ${filteredData.length}/${galleryData.length})`;
    currentIndex = index;

    // --- НОВОЕ: Добавить арт в историю просмотров ---
    HistoryModule.add(art);
  },

  updateTags(tags) {
    artTags.innerHTML = "";

    if (!tags || tags.length === 0) {
      const span = document.createElement('span');
      span.textContent = 'Нет тегов';
      span.style.opacity = '0.6';
      artTags.appendChild(span);
      return;
    }

    tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      artTags.appendChild(span);
    });
  },

  updateFileInfo(fileDetails) {
    artInfo.innerHTML = "";

    if (!fileDetails) {
      const span = document.createElement('span');
      span.textContent = 'Нет информации о файле';
      span.style.opacity = '0.6';
      artInfo.appendChild(span);
      return;
    }

    const details = [];
    if (fileDetails.format) details.push(`Формат: ${fileDetails.format}`);
    if (fileDetails.dimensions) details.push(`Разрешение: ${fileDetails.dimensions}`);

    if (details.length === 0) {
      const span = document.createElement('span');
      span.textContent = 'Нет информации о файле';
      span.style.opacity = '0.6';
      artInfo.appendChild(span);
      return;
    }

    artInfo.textContent = details.join(', ');
  },

  updateArtList() {
    artList.innerHTML = "";

    filteredData.forEach((art, originalIndex) => {
      const li = document.createElement('li');
      li.className = 'art-item';

      // Находим оригинальный индекс в galleryData для навигации
      const realOriginalIndex = galleryData.findIndex(item => item.id === art.id);

      li.textContent = `${art.title} (${art.id})`;

      // Помечаем избранные элементы в списке
      if (FavoritesModule.isFavorite(art.id)) {
        li.textContent += ' ★';
      }

      li.addEventListener('click', () => {
        // Находим индекс в отфильтрованном массиве
        const filteredIndex = filteredData.findIndex(item => item.id === art.id);
        if (filteredIndex !== -1) {
          currentIndex = filteredIndex;
          this.updateDisplay(currentIndex);
          this.scrollToCurrentArt();
        }
      });
      artList.appendChild(li);
    });

    // --- НОВОЕ: обновляем сетку карточек ---
    GridModule.render();
  },

  scrollToCurrentArt() {
    const currentLi = artList.children[currentIndex];
    if (currentLi && currentIndex !== -1) {
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
    if (filteredData.length === 0) return;
    currentIndex = (currentIndex - 1 + filteredData.length) % filteredData.length;
    DisplayModule.updateDisplay(currentIndex);
    DisplayModule.scrollToCurrentArt();
  },

  goToNext() {
    if (filteredData.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredData.length;
    DisplayModule.updateDisplay(currentIndex);
    DisplayModule.scrollToCurrentArt();
  },

  goToIndex(index) {
    if (index >= 0 && index < filteredData.length) {
      currentIndex = index;
      DisplayModule.updateDisplay(currentIndex);
      DisplayModule.scrollToCurrentArt();
    }
  }
};

// --- НОВЫЙ МОДУЛЬ: ДИНАМИЧЕСКОЕ ИЗОБРАЖЕНИЕ (не используется, но объявлен) ---
/*
const DynamicImageModule = {
  addImage(imagePath, altText = 'Динамическое изображение') {
    const dynamicImageContainer = document.getElementById('dynamic-image-container');
    if (!dynamicImageContainer) {
      console.error('Контейнер #dynamic-image-container не найден в DOM.');
      return;
    }
    dynamicImageContainer.innerHTML = '';
    const imgElement = document.createElement('img');
    imgElement.src = imagePath;
    imgElement.alt = altText;
    dynamicImageContainer.appendChild(imgElement);
    console.log(`Динамическое изображение добавлено: ${imagePath}`);
  }
};
*/

// --- НОВЫЙ МОДУЛЬ: СЕТКА КАРТОЧЕК АРТОВ ---
const GridModule = {
  render() {
    // Очищаем сетку перед рендерингом
    artGrid.innerHTML = '';

    filteredData.forEach((art, indexInFiltered) => {
      const card = document.createElement('div');
      card.className = 'art-card';
      card.dataset.index = indexInFiltered; // Сохраняем индекс в отфильтрованном массиве

      card.innerHTML = `
        <img src="${art.imageUrl}" alt="${art.title}">
        <div class="art-card-info">
          <p class="art-card-title">${art.title}</p>
          <div class="art-card-tags">
            ${art.tags.map(tag => `<span class="art-card-tag">${tag}</span>`).join('')}
          </div>
        </div>
      `;

      // Добавляем обработчик клика: показать арт в основном окне
      card.addEventListener('click', () => {
         DisplayModule.updateDisplay(indexInFiltered);
         DisplayModule.scrollToCurrentArt(); // Опционально: проскроллить к списку
      });

      artGrid.appendChild(card);
    });
  }
};

// --- НОВЫЙ МОДУЛЬ: ИСТОРИЯ ПРОСМОТРОВ ---
const HistoryModule = {
  MAX_HISTORY_LENGTH: 10, // Максимальное количество элементов в истории
  HISTORY_KEY: 'drcjp_view_history', // Ключ для localStorage

  // Загрузить историю из localStorage
  loadHistory() {
    try {
      const stored = localStorage.getItem(this.HISTORY_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Ошибка при загрузке истории просмотров из localStorage:', e);
    }
    return []; // Возвращаем пустой массив, если нет сохранённых данных или ошибка
  },

  // Сохранить историю в localStorage
  saveHistory(history) {
    try {
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Ошибка при сохранении истории просмотров в localStorage:', e);
    }
  },

  // Добавить арт в историю
  add(art) {
    let history = this.loadHistory();
    // Удаляем старую запись об этом арте, если она есть (чтобы не дублировалась)
    history = history.filter(item => item.id !== art.id);
    // Добавляем новый арт в начало массива
    history.unshift({ id: art.id, title: art.title, imageUrl: art.imageUrl });
    // Ограничиваем длину истории
    history = history.slice(0, this.MAX_HISTORY_LENGTH);
    // Сохраняем обновлённую историю
    this.saveHistory(history);
    // Обновляем отображение
    this.render();
  },

  // Отрисовать историю на странице
  render() {
    const history = this.loadHistory();
    historyGrid.innerHTML = ''; // Очищаем контейнер

    if (history.length === 0) {
      // historyGrid.innerHTML = '<p>История пуста.</p>'; // Опционально: сообщение если пусто
      return; // Просто выходим, если пусто
    }

    history.forEach(art => {
      const card = document.createElement('div');
      card.className = 'history-card';
      card.dataset.id = art.id; // Сохраняем ID арта для обработки клика

      card.innerHTML = `
        <img src="${art.imageUrl}" alt="${art.title}">
        <p class="history-card-title">${art.title}</p>
      `;

      // Обработчик клика: найти индекс в galleryData и отобразить
      card.addEventListener('click', () => {
        const indexInGallery = galleryData.findIndex(item => item.id == art.id); // == для сравнения строки и числа
        if (indexInGallery !== -1) {
          // Найти индекс в текущем filteredData
          const indexInFiltered = filteredData.findIndex(item => item.id == art.id);
          if (indexInFiltered !== -1) {
             DisplayModule.updateDisplay(indexInFiltered);
             DisplayModule.scrollToCurrentArt(); // Опционально: проскроллить к списку
          } else {
              // Арт есть в галерее, но не в отфильтрованном списке.
              // Нужно сбросить фильтр и перейти.
              SearchModule.clearFilter();
              setTimeout(() => { // Небольшая задержка, чтобы фильтр сбросился
                  const newIndexInFiltered = filteredData.findIndex(item => item.id == art.id);
                  if (newIndexInFiltered !== -1) {
                      DisplayModule.updateDisplay(newIndexInFiltered);
                      DisplayModule.scrollToCurrentArt();
                  }
              }, 100);
          }
        }
      });

      historyGrid.appendChild(card);
    });
  },

  // Очистить историю
  clear() {
    this.saveHistory([]);
    this.render();
  }
};

// --- МОДУЛЬ ОБРАТНОГО ОТСЧЁТА ---
const CountdownModule = {
  targetDate: new Date('2026-03-01T00:00:00+03:00'), // 1 марта 2026, Москва (UTC+3)

  update() {
    const now = new Date();
    const timeDiff = this.targetDate - now;

    if (timeDiff <= 0) {
      countdownTimerElement.textContent = '🎉 Презентация! 🎉';
      clearInterval(this.intervalId); // Останавливаем обновление
      return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    countdownTimerElement.textContent = `${days}д ${hours}ч ${minutes}м ${seconds}с`;
  },

  start() {
    if (!countdownTimerElement) {
      console.warn('Элемент #countdown-timer не найден, отсчёт не запущен.');
      return;
    }
    this.update(); // Обновить сразу
    this.intervalId = setInterval(() => this.update(), 1000); // Обновлять каждую секунду
  }
};

// --- ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ СОБЫТИЙ ---
prevBtn.addEventListener('click', NavigationModule.goToPrevious);
nextBtn.addEventListener('click', NavigationModule.goToNext);

// Обработчики для поиска
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  const filterType = filterSelect.value;
  const sortType = sortSelect.value;
  SearchModule.filterAndSortData(query, filterType, sortType);
});

filterSelect.addEventListener('change', () => {
  const query = searchInput.value.trim();
  const filterType = filterSelect.value;
  const sortType = sortSelect.value;
  SearchModule.filterAndSortData(query, filterType, sortType);
});

// Обработчик для сортировки
sortSelect.addEventListener('change', () => {
  const query = searchInput.value.trim();
  const filterType = filterSelect.value;
  const sortType = sortSelect.value;
  SearchModule.filterAndSortData(query, filterType, sortType);
});

// Обработчик для кнопки очистки
clearSearchBtn.addEventListener('click', () => {
  SearchModule.clearFilter();
});

// Обработчик для кнопки избранного
favoriteBtn.addEventListener('click', () => {
  if (currentIndex >= 0 && currentIndex < filteredData.length) {
    const currentArt = filteredData[currentIndex];
    FavoritesModule.toggleFavorite(currentArt.id);
  }
});

// Обработчик для кнопки поделиться
shareBtn.addEventListener('click', () => {
  if (currentIndex >= 0 && currentIndex < filteredData.length) {
    const currentArt = filteredData[currentIndex];
    ShareModule.openShareModal(currentArt);
  }
});

// Обработчики для модального окна поделиться
closeShareModal.addEventListener('click', () => {
  ShareModule.closeShareModal();
});

shareModal.addEventListener('click', (e) => {
  if (e.target === shareModal) {
    ShareModule.closeShareModal();
  }
});

// Обработчики для кнопок платформ
sharePlatformButtons.forEach(button => {
  button.addEventListener('click', () => {
    const platform = button.dataset.platform;
    ShareModule.shareToPlatform(platform);
  });
});

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
    NavigationModule.goToIndex(filteredData.length - 1);
  } else if (event.key === 'Escape') {
    // Закрыть модальные окна при нажатии Escape
    if (zoomOverlay.classList.contains('visible')) {
      ZoomModule.hideZoom();
    } else if (shareModal.classList.contains('open')) {
      ShareModule.closeShareModal();
    } else {
      // Очистить поле поиска при нажатии Escape
      SearchModule.clearFilter();
    }
  } else if (event.key === 'f' && event.ctrlKey) {
    // Ctrl+F для добавления в избранное
    event.preventDefault();
    if (currentIndex >= 0 && currentIndex < filteredData.length) {
      const currentArt = filteredData[currentIndex];
      FavoritesModule.toggleFavorite(currentArt.id);
    }
  }
});

// --- ИНИЦИАЛИЗАЦИЯ ВИДИМОСТИ ПРОМО ---
let isPromoVisible;
function initPromoVisibility() {
  isPromoVisible = StateModule.loadPromoVisibility();
  if (!isPromoVisible) {
    promoVideoContainer.classList.add('promo-video-hidden');
    togglePromoBtn.textContent = 'Показать промо-видео';
  } else {
    promoVideoContainer.classList.remove('promo-video-hidden');
    togglePromoBtn.textContent = 'Скрыть промо-видео';
  }
}

// Обработчик переключения промо
togglePromoBtn.addEventListener('click', () => {
  isPromoVisible = !isPromoVisible;
  if (isPromoVisible) {
    promoVideoContainer.classList.remove('promo-video-hidden');
    togglePromoBtn.textContent = 'Скрыть промо-видео';
  } else {
    promoVideoContainer.classList.add('promo-video-hidden');
    togglePromoBtn.textContent = 'Показать промо-видео';
  }
  StateModule.savePromoVisibility(isPromoVisible);
});

// --- ИНИЦИАЛИЗАЦИЯ ---
function initGallery() {
  // Загружаем сохранённое избранное
  StateModule.loadFavorites();

  // Загружаем сохранённые фильтры по тегам
  StateModule.loadTagFilters();

  // Инициализируем фильтры по тегам
  TagFilterModule.initializeTagFilters();

  // Инициализируем модуль увеличения изображения
  ZoomModule.initializeEventListeners();

  // Загружаем сохранённое состояние при инициализации
  const savedState = StateModule.loadState();
  if (savedState) {
    searchInput.value = savedState.query || '';
    filterSelect.value = savedState.filterType || 'all';
    sortSelect.value = savedState.sortType || 'default';
    SearchModule.filterAndSortData(savedState.query || '', savedState.filterType || 'all', savedState.sortType || 'default');
  } else {
    // Если нет сохранённого состояния, используем обычную инициализацию
    DisplayModule.updateArtList(); // <--- Здесь вызывается и список, и сетка
    DisplayModule.updateDisplay(currentIndex);
  }

  // --- НОВОЕ ---
  initPromoVisibility();
  CountdownModule.start();

  // --- НОВОЕ: отрисовать историю при загрузке ---
  HistoryModule.render();
}

initGallery();
