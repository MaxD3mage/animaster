addListeners();

function addListeners() {
    let breathHeart;

    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 1000);
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 5000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            breathHeart = animaster().heartBeating(block, 500);
        });

    document.getElementById('stopHeartBeatingPlay')
        .addEventListener('click', function () {
            breathHeart.stop();
        });
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

function animaster()
{
    function resetMoveAndScale(element){
        element.style.transitionDuration = null;
        element.style.transform = null;
    }
    function resetFadeOut(element){
        element.style.transitionDuration = null
        element.classList.add('show');
        element.classList.remove('hide');
    }
    function resetFadeIn (element){
        element.style.transitionDuration = null
        element.classList.add('hide');
        element.classList.remove('show');

    }
    return {
        /**
         * Блок плавно появляется из прозрачного.
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         */
        fadeIn: function(element, duration)
        {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },

        /**
         * Функция, передвигающая элемент
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         * @param translation — объект с полями x и y, обозначающими смещение блока
         */
        move: function (element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },

        /**
         * Функция, увеличивающая/уменьшающая элемент
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
         */
        scale: function(element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },

        fadeOut: function(element, duration)
        {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
        },

        moveAndHide: function(element, duration) {
            this.move(element, duration*2/5, {x: 100, y: 20});
            this.fadeOut(element, duration*3/5);
        },

        showAndHide: function (element, duration){
            this.fadeIn(element, duration/3);
            setTimeout(() => {
                this.fadeOut(element, duration/3);
            }, duration/3)
        },
        heartBeating: function (block, duration){
            this.scale(block, 500, 1.4);
            const set = setInterval(() => {
                // Увеличение масштаба элемента
                this.scale(block, duration, 1.4);

                // Переключение масштаба обратно через время анимации
                setTimeout(() => {
                        this.scale(block, duration, 1);
                }, 500);

            }, 500*2)

            return {
                stop: function (){
                    clearTimeout(set);
                }
            }
        }
    }
}
