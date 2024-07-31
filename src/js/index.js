import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', function() {
    let MenuBtn = document.querySelector('.app__icon__menu');
    let SidebarBlock = document.querySelector('.app-header__sidebar');
    let SpacerMenuLeft = document.querySelector('.app__header-spacer__left');
    let SidebarRightMenu = document.querySelector('.app__header-right');
    let SidebarSearchIcon = document.querySelector('.app__icon__search');
    let ExpandBlock = document.querySelectorAll('.app__expand-block');
    let ExpandBrands = document.querySelector('.app__expand__brands');
    let BlockBrands = document.querySelector('.app__brands-blocks');
    let ExpandServices = document.querySelector('.app__expand__services');
    let BlockServices = document.querySelector('.app__service-blocks');
    let OpenModalBlock = document.querySelectorAll('.app__open-modal');
    let ModalBlock = document.querySelectorAll('.app__modal');
    let ModalClose = document.querySelectorAll('.app__modal__close');

    let widthWindow = window.innerWidth;
    let BreakPointDesktop = 1366;
    let BreakPointTouch = 768;
    let BreakPointMobile = 320;

    CheckResizeWindows();/** Перерисовка меню, если открытии страницы */
    AddListenerCloseModal();/** Отрабатываем нажатия на закрытие модалок */
    AddListenerOpenModal();/** Отрабатываем нажатия на открытия модалок */
    window.addEventListener('resize', CheckResizeWindows);/** Перерисовка меню, если размер экрана поменялся */
    MenuBtn.addEventListener('click', ProcessSidebar);/** Событие открытия и открытия сайдабара с меню */
    ExpandBrands.addEventListener('click', ProcessExpandBrands);/** Событие разворачивания и сворачивания блоков с брендами */
    ExpandServices.addEventListener('click', ProcessExpandServices);/** Событие разворачивания и сворачивания блоков с услугами */


    ExpandBlock.forEach(div => {/** Перебираем все блоки app__expand-block (за исключением блоков с услушами и брендами - у них другие обработчики) */
        div.addEventListener('click', function() {/** Вешаем на каждый блок обработчик */
            let isExpand = div.getAttribute('data-isexpand');/** Смотрим его атрибут data-isexpand (true|false) */
            let IconRotate = div.querySelector('.app__expand-block__control .app__expand-block__arrow');/** Вешаем обработчик на иконку, чтобы ее можно было развернуть на 180 градусов */
            if(isExpand=='false'){/** Если блок свернут, то меняем его атрибут и добавляем класс разворота иконки */
                div.setAttribute('data-isexpand','true');
                IconRotate.classList.add('app__expand-block__arrow-rotate');
            }else{
                div.setAttribute('data-isexpand','false');
                IconRotate.classList.remove('app__expand-block__arrow-rotate');
            }
        });
    });

    function AddListenerOpenModal() {/** Вешаем обработчик на каждое элемент, ссылающийся на модальное окно */
        OpenModalBlock.forEach(div => {/** Вешаем обработчик на каждый такой блок */
            div.addEventListener('click', function () {/** Берем значение атрибута каждого блока*/
                let modalAttr = div.getAttribute('data-modal');/** И ссылаемся по нему на соответствующее окно и отображаем его */
                let Modal = document.querySelector('.app__modal[data-modal-name="' + modalAttr + '"]');
                Modal.style.display = 'block';
            });
        });
    }

    function AddListenerCloseModal() {/** Вещаем обработчик на все элементы, закрывающие модальные окна */
        ModalClose.forEach(divClose => {
            divClose.addEventListener('click', function () {/** И разом все окна закрываем */
                ModalBlock.forEach(div => {
                    div.style.display = 'none';
                });
            });
        });
    }


    function CheckResizeWindows() {/** Обработчик изменения размера экрана */
        widthWindow = window.innerWidth;/** Фиксируем ширину экрана */
        if(widthWindow>=BreakPointDesktop){/** Если экран в отображении для десктопа, то */
            SidebarBlock.style.display = 'block';/** показываем боковое меню  */
            SidebarSearchIcon.style.display = 'block';/** Показываем иконку поиска */
            MenuBtn.classList.add('app__icon__close');/** Добавляем иконку закрытия мен. */
            SpacerMenuLeft.style.visibility = 'hidden';/** Убираем визуально разделить между логотипом и иконкой меню, но оставляем занимаемое место */

        }else{
            SidebarBlock.style.display = 'none';/** Сайдбар скрыт */
            MenuBtn.classList.remove('app__icon__close');/** Убираем иконку меню */
            SpacerMenuLeft.style.visibility = 'visible ';/** Показываем разделитель между логотипом и иконкой меню */
            SidebarSearchIcon.style.display = 'none';/** Скрываем иконку поиска */
        }


    }

    function ProcessSidebar() {/** Событие открытия и закрытия меню */
        if(SidebarBlock.style.display==='none' || SidebarBlock.style.display===''){/** Если сайдбар не отображается, то отображаем и наооборот */
            SidebarBlock.style.display = 'block';
        }else{
            SidebarBlock.style.display = 'none';
        }
        if(SidebarBlock.style.display==='block'){/** Есди сайдбар отображен */
            MenuBtn.classList.add('app__icon__close');/** Добавляем иконку закрытия */
            SpacerMenuLeft.style.visibility = 'hidden';/** Скрываем визуальный разделитель меню и лого */
            SidebarSearchIcon.style.display = 'block';/** Показываем иконку поиска */
            if(widthWindow<=BreakPointTouch) {/** Если меню отображается в мобильном варианте, то скрываем меню справа (оставить заявку/ статус ремонта) */
                SidebarRightMenu.style.display = 'none';
            }else{
                SidebarRightMenu.style.display = 'flex';
            }
        }else{
            MenuBtn.classList.remove('app__icon__close');
            SpacerMenuLeft.style.visibility = 'visible';
            SidebarSearchIcon.style.display = 'none';
            if(widthWindow>BreakPointMobile) {
                SidebarRightMenu.style.display = 'flex';
            }else{
                SidebarRightMenu.style.display = 'none';
            }
        }
    }

    function ProcessExpandBrands() {/** Отдельный обработчик для слайдера брендов */
        let IconRotate = document.querySelector('.app__expand__brands .app__expand-block__arrow');
        let Text = document.querySelector('.app__expand__brands .app__expand-block__title');
        if(BlockBrands.classList.contains('app__brands-block-expand')){
            BlockBrands.classList.remove('app__brands-block-expand');
            IconRotate.classList.remove('app__expand-block__arrow-rotate');
            Text.innerText = 'Показать все';
        }else{
            BlockBrands.classList.add('app__brands-block-expand');
            IconRotate.classList.add('app__expand-block__arrow-rotate');
            Text.innerText = 'Скрыть';
        }
    }

    function ProcessExpandServices() {/** Отдельный обработчик для слайдера услуг */
        let IconRotate = document.querySelector('.app__expand__services .app__expand-block__arrow');
        let Text = document.querySelector('.app__expand__services .app__expand-block__title');
        if(BlockServices.classList.contains('app__service-block-expand')){
            BlockServices.classList.remove('app__service-block-expand');
            IconRotate.classList.remove('app__expand-block__arrow-rotate');
            Text.innerText = 'Показать все';
        }else{
            BlockServices.classList.add('app__service-block-expand');
            IconRotate.classList.add('app__expand-block__arrow-rotate');
            Text.innerText = 'Скрыть';
        }
    }


    document.querySelector('.app-header__sidebar').addEventListener('click', function(event) {/** Так как из-за позиционирования меню фон не возможно на 100% растянуть, то вешаем обработчик на псевдоэлемент before и по клику скрываем сайдабр */
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (!(x >= 0 && x <= rect.width && y >= 0 && y <= rect.height)){
            CheckResizeWindows();
        }
    });

});




