//Находим все уменьшенные картинки
const imagesArr = document.querySelectorAll('.gallery__img:not(.gallery__img--zoom-in)');

//Находим активную картинку
const imageAccent = document.querySelectorAll('.gallery__img--accent');

//Находим блок, в который будем добавлять картинку
const blockZoomIn = document.querySelector('.gallery__zoom');

//Находим увеличенную картинку в этом блоке
const imgZoomIn = document.querySelector('.gallery__img--zoom-in');

//Находим кнопку назад
const btnBack = document.querySelector('.gallery__btn--back');
//Находим кнопку вперед
const btnNext = document.querySelector('.gallery__btn--next');


//Находим список картинок
const imgList = document.querySelector('.gallery__list');

//Объект атрибутов этой картинки
//При клике на картинки объект будет обновляться
//p.S. Можно было просто создать пустым....
const attrObj = {
  "src": document.querySelector('.gallery__img').getAttribute('src'),
  "srcset": document.querySelector('.gallery__img').getAttribute('srcset'),
}

//Функция определения активной/неактивной картинки
function highlightsImg(img) {
  if (!img) {
    imagesArr.forEach(img => img.classList.remove('gallery__img--accent'));
    return;
  }
  img.classList.add('gallery__img--accent');
}

//Функция определения неактивной/активной кнопок
function updateBtns(currImg = -1) {
  if (currImg === imagesArr[0]) {
    btnBack.disabled = true;
    return;
  }
  if (currImg === imagesArr[imagesArr.length - 1]) {
    btnNext.disabled = true;
    return;
  }
  btnBack.disabled = false;
  btnNext.disabled = false;
  return;
}

//Функция обновления объекта с атрибутами
function updateObj(obj, elem = imageAccent) {
  const attributes = elem.attributes;
  for (const attribute of attributes) {
    if (Object.keys(obj).includes(attribute.name)) {
      obj[attribute.name] = attribute.value;
    }
  }
}

//Функция добавления атрибутов
function setAttrEl(el, attr) {
  for (const key in attr) {
    el.setAttribute(key, attr[key])
  }
}

// Функция для прокрутки к активной картинке
function scrollToActiveImage(image) {
  const galleryList = document.querySelector('.gallery__list');
  // Прокручиваем к элементу. behavior: 'smooth' для плавной прокрутки
  galleryList.scrollLeft = image.offsetLeft - (galleryList.offsetWidth - image.offsetWidth) / 2;
}

//Функция отображения картинок при клике по кнопкам вперед/назад
function onclickNextAndBackBtns(imgArr, sibling) {
  let currentAccent = imageAccent;
  for (let i = 0; i < imgArr.length; i++) {
    if (imgArr[i].classList.contains('gallery__img--accent')) {
      if (sibling === 1) {
        if (i < imgArr.length - 1) {
          currentAccent = imgArr[i + 1]
          highlightsImg()
          highlightsImg(imgArr[i + 1])
          updateBtns(currentAccent);
          updateObj(attrObj, currentAccent);
          setAttrEl(imgZoomIn, attrObj);
          scrollToActiveImage(imgArr[i + 1])
        } else {
          currentAccent = imgArr[0]
          highlightsImg()
          highlightsImg(imgArr[0])
          updateBtns(currentAccent);
          updateObj(attrObj, currentAccent);
          setAttrEl(imgZoomIn, attrObj);
          scrollToActiveImage(imgArr[0])
        }
      }
      if (sibling === -1) {
        if (i > 0) {
          currentAccent = imgArr[i - 1]
          highlightsImg()
          highlightsImg(imgArr[i - 1])
          updateBtns(currentAccent);
          updateObj(attrObj, currentAccent);
          setAttrEl(imgZoomIn, attrObj);
          scrollToActiveImage(imgArr[i - 1])
        } else {
          currentAccent = imgArr[imgArr.length - 1]
          highlightsImg()
          highlightsImg(imgArr[imgArr.length - 1])
          updateBtns(currentAccent);
          updateObj(attrObj, currentAccent);
          setAttrEl(imgZoomIn, attrObj);
          scrollToActiveImage(imgArr[imgArr.length - 1])
        }
      }
      return currentAccent;
    }
  }
  return currentAccent;
}


//Клик по всему списку, но через e.target кликом попадаем на картинку
imgList.addEventListener('click', function (e) {
  e.preventDefault();
  const currImg = e.target;
  if (currImg.classList.contains('gallery__img')) {
    highlightsImg(currImg);
    console.log(imagesArr);
    updateObj(attrObj, currImg);

    setAttrEl(imgZoomIn, attrObj);

    blockZoomIn.classList.toggle('gallery__zoom--open');

    updateBtns(currImg);
  }
})

//Клик на блок увеличенной картинки, дабы скрыть его
blockZoomIn.addEventListener('click', function (e) {
  e.preventDefault()
  this.classList.toggle('gallery__zoom--open')
  highlightsImg();
  updateBtns()
})

//Клик на кнопку вперед
btnNext.addEventListener('click', function (e) {
  e.stopPropagation();
  onclickNextAndBackBtns(imagesArr, 1);
})

//Клик на кнопку назад
btnBack.addEventListener('click', function (e) {
  e.stopPropagation();
  onclickNextAndBackBtns(imagesArr, -1);
})

