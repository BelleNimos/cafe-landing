// Полная инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Бургер-меню для мобильной навигации
  const burger = document.querySelector('.burger');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-list a');

  // Переключение меню
  burger.addEventListener('click', () => {
    const isExpanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('active');
  });

  // Закрытие меню при клике на ссылку
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Закрытие меню при клике вне области
  document.addEventListener('click', (e) => {
    if (navList.classList.contains('active') && 
        !navList.contains(e.target) && 
        !burger.contains(e.target)) {
      navList.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Табы для меню
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Убираем активный класс у всех кнопок
      tabBtns.forEach(b => b.classList.remove('active'));
      // Добавляем активный класс текущей кнопке
      btn.classList.add('active');
      
      // Скрываем все контенты
      tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });
      
      // Показываем контент для выбранной категории
      const targetTab = btn.dataset.tab;
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.style.display = 'block';
        setTimeout(() => activeContent.classList.add('active'), 10);
      }
    });
  });

  // Модальное окно бронирования
  const bookBtn = document.getElementById('bookBtn');
  const modal = document.getElementById('bookingModal');
  const closeBtn = modal.querySelector('.close');
  const bookingForm = document.getElementById('bookingForm');

  // Открытие модального окна
  bookBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Запрет скролла при открытом модале
    modal.setAttribute('aria-hidden', 'false');
  });

  // Закрытие модального окна
  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modal.setAttribute('aria-hidden', 'true');
    bookingForm.reset(); // Очистка формы
  };

  closeBtn.addEventListener('click', closeModal);
  
  // Закрытие по клику вне контента модального окна
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Обработка отправки формы
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value
    };
    
    // В реальном проекте здесь отправка на сервер
    console.log('Данные бронирования:', formData);
    alert(`Столик успешно забронирован на ${formData.date} в ${formData.time}!`);
    
    closeModal();
  });

  // Анимация при скролле (Intersection Observer)
  const animateOnScroll = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  };

  // Запуск анимации только на десктопах
  if (window.innerWidth > 768) {
    animateOnScroll();
  } else {
    // На мобильных просто показываем все элементы
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('appear');
    });
  }

  // Плавная прокрутка к якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Закрываем мобильное меню если открыто
        if (navList.classList.contains('active')) {
          navList.classList.remove('active');
          burger.setAttribute('aria-expanded', 'false');
        }
        
        // Плавная прокрутка с учетом высоты хедера
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Динамическая высота для iOS
  const setScreenHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  window.addEventListener('resize', setScreenHeight);
  setScreenHeight();

  // Защита от контекстного меню на изображениях
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => e.preventDefault());
  });
  
  console.log('Скрипты успешно загружены! Сайт "Уютный уголок" готов к работе.');
});