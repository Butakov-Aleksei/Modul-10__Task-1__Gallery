//Объект атрибутов этой картинки
//При клике на картинки объект будет обновляться
//p.S. Можно было просто создать пустым....
const attrObj = {
  "src": document.querySelector('.gallery__img').getAttribute('src'),
  "srcset": document.querySelector('.gallery__img').getAttribute('srcset'),
}

//Находим все уменьшенные картинки
const imagesArr = document.querySelectorAll('.gallery__img:not(.gallery__img--zoom-in)');

//Находим одну картинку
const imgEl = document.querySelector('.gallery__img:not(.gallery__img--zoom-in)');

//Находим блок, в который будем добавлять картинку
const blockZoomIn = document.querySelector('.gallery__zoom');

//Находим увеличенную картинку в этом блоке
const imgZoomIn = document.querySelector('.gallery__img--zoom-in');

//Находим кнопку назад
const btnBack = document.querySelector('.gallery__btn--back');
//Находим кнопку вперед
const btnNext = document.querySelector('.gallery__btn--next');

//Функция добавления атрибутов
function setAttrEl(el, attr) {
  for (const key in attr) {
    el.setAttribute(key, attr[key])
  }
}

//Функция удаления атрибутов (пока не пригодилась)
function removeAttrEl(el, attr) {
  for (const key in attr) {
    el.removeAttribute(key)
  }
}

//Функция toggle классов у элемента
function classToggle(el, classValue) {
  el.classList.toggle(classValue);
}

//Функция toggle disabled
function toggleDisabled(btn) {
  btn.disabled = !btn.disabled;
}

//Функция обработки кликов по кнопкам "вперед", "назад"
function renderingBtnsClicks(img, imgArr, imgZoom) {
  let indexImg = 0;
  if (imgArr.contains(img)) {
    indexImg = imgArr.indexOf(img);
  }

  if (img === imgArr[imgArr.length - 1]) {
    toggleDisabled(btnNext);
    console.log(indexImg);
    attrObj.src = imgArr[indexImg + 1].getAttribute('src');
    attrObj.srcset = imgArr[indexImg + 1].getAttribute('srcset');
  }

  if (img === imgArr[0]) {
    toggleDisabled(btnBack);
    console.log(indexImg);
    attrObj.src = imgArr[indexImg - 1].getAttribute('src');
    attrObj.srcset = imgArr[indexImg - 1].getAttribute('srcset');
  }

  setAttrEl(imgZoom, attr);
}

// Функция рендеринга кликов по элементам
function renderingImgAndBtnsClicks(imgArr, imgZoom, attr) {
  for (const image of imgArr) {
    image.addEventListener('click', function (e) {
      renderingBtnsClicks(image, imgArr, imgZoom);

      attrObj.src = this.getAttribute('src');
      attrObj.srcset = this.getAttribute('srcset');
      setAttrEl(imgZoom, attr);
      classToggle(blockZoomIn, 'gallery__zoom--open');
      classToggle(this, 'gallery__img--accent');
      console.log(this);
    });

    blockZoomIn.addEventListener('click', function () {
      const imgElAccent = document.querySelector('.gallery__img--accent');
      console.log(imgElAccent);
      if (imgElAccent) {
        classToggle(imgElAccent, 'gallery__img--accent');
      }
      classToggle(this, 'gallery__zoom--open');

      toggleDisabled(btnNext);
      toggleDisabled(btnBack);
    });

    btnBack.addEventListener('click', function (e) {
      renderingBtnsClicks(image, imgArr, imgZoom);
    })

    btnNext.addEventListener('click', function (e) {
      renderingBtnsClicks(image, imgArr, imgZoom);
    })
  }
}

renderingImgAndBtnsClicks(imagesArr, imgZoomIn, attrObj)
