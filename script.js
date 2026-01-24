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
const imageContainer = document.querySelector('.image-container');
const mainArtImage = document.getElementById('art-image');
const shareModal = document.getElementById('share-modal');
const closeShareModal = document.getElementById('close-share-modal');
const sharePlatformButtons = document.querySelectorAll('.share-platform-btn');

// --- ДАННЫЕ ГАЛЕРЕИ ---
// Массив объектов с информацией об артах (обновлены разрешения изображений, добавлен новый арт)
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

// --- МОДУЛЬ УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЯ ---
const ZoomModule = {
  showZoom(imageSrc) {
    zoomImage.src = imageSrc;
    zoomOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
  },
  
  hideZoom() {
    zoomOverlay.classList.remove('visible');
    document.body.style.overflow = ''; // Восстанавливаем прокрутку
  },
  
  initializeEventListeners() {
    // Открытие при клике на изображение
    mainArtImage.addEventListener('click', () => {
      if (mainArtImage.src && mainArtImage.src !== 'about:blank' && !mainArtImage.src.includes('undefined')) {
        this.showZoom(mainArtImage.src);
      }
    });
    
    // Закрытие при клике на оверлей
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
    DisplayModule.updateArtList();
    DisplayModule.updateDisplay(currentIndex);
  }
}

initGallery();

