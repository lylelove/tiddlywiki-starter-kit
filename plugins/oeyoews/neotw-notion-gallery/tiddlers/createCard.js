/*\
title: $:/plugins/oeyoews/neotw-notion-gallery/createCard.js
type: application/javascript
module-type: library

\*/
/** create card */
module.exports = function createCard(title, cover, clickEvents, icon) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3, // 当图片50%进入可视区域时加载
  };

  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = cover;
        image.onload = () => {
          img.alt = title;
          img.title = '';
          image.classList.remove(...dynamicClassNames);
          img.classList.add('cursor-pointer');
        };
        observer.unobserve(image); // 加载后取消监测
      }
    });
  }

  const observer = new IntersectionObserver(callback, options);

  const item = document.createElement('div');

  const navigate = clickEvents;

  const itemClassList =
    'flex flex-col items-center justify-center p-0 group relative';
  item.classList.add(...itemClassList.split(' '));
  const contentNode = document.createElement('div');
  const galleryTitleClassList =
    'delay-100 text-lg cursor-pointer flex justify-center items-center truncate m-0 absolute inset-0 backdrop-blur-lg text-black rounded-md ease-in-out transition-all scale-0 group-hover:scale-105';
  const galleryTitle = document.createElement('h3');
  galleryTitle.className = galleryTitleClassList;
  contentNode.appendChild(galleryTitle);
  const iconify = document.createElement('iconify-icon');
  iconify.classList.add('mx-1');
  // icon
  iconify.setAttribute('icon', icon || 'simple-icons:tiddlywiki');

  galleryTitle.title = '点击查看';
  galleryTitle.textContent = title;
  galleryTitle.addEventListener('click', () => navigate(title));
  galleryTitle.appendChild(iconify);
  const img = document.createElement('img');
  // 动态懒加载图片的数量取决于视图的宽度和高度, 不是可见视图, 所以需要使用IntersectionObserver 来监测
  img.loading = 'lazy';
  const dynamicClassNames = [
    'scale-105',
    'blur-lg',
    'bg-black/10',
    'cursor-wait',
  ];
  img.title = 'loading ...';
  img.classList.add(
    'aspect-video',
    'object-cover',
    'w-full',
    'h-full',
    'rounded-md',
    'group-hover:scale-105',
    'transition-all',
    'duration-800',
    'ease-in-out',
    'shadow-md',
    ...dynamicClassNames,
  );

  // img.src = 'favicon.ico';
  item.appendChild(img);
  item.appendChild(contentNode);

  observer.observe(img);

  return item;
};
