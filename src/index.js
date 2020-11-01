import './scss/styles.scss';

import {getData} from './services/Resources';
import {Main} from './components/Main';
import {Product} from './components/Product';

const App = function _App() {
    return Main(_App.state.data);
};

App.state = {
    data: {},
    currentSlide: 0,
    loadingData: (data) =>{
        App.state.data = data;
    },
    changeCurrentSlide: (data) =>{
        App.state.currentSlide = data;
    }
};


getData().then((res)=>{
    App.state.loadingData(res);

    document.getElementById('app').innerHTML = App();
    document.querySelector('.loader').classList.add('hide');

    document.querySelectorAll('.product_item').forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            showProductInfo(el.dataset.id);
        });
    });

    document.querySelector('.product_info_close').addEventListener("click", (e) => {
        document.querySelector('.product_info').classList.remove('active');
    });
    document.querySelector('.product_info_backdrop').addEventListener("click", (e) => {
        document.querySelector('.product_info').classList.remove('active');
    });
})
.catch((err) =>{
    document.querySelector('.error').innerText = err.message;
    document.querySelector('.error').classList.add('show');
    console.log(err);
});

const showProductInfo = (id) => {
    App.state.changeCurrentSlide(0);
    const data = App.state.data.groups.find((el) => el.id === id);
    let result = Product(data);
    document.querySelector('.product_info_block').innerHTML = result.html;
    document.querySelector('.product_info').classList.add('active');

    if (result.lastSlide > 0){

        document.querySelector('.product_info_hero_right').addEventListener("click", (e) => {
            let currentSlide = App.state.currentSlide;
            let nextSlide = App.state.currentSlide === result.lastSlide ? 0 : App.state.currentSlide + 1;
            changeSlide(currentSlide, nextSlide);
        });

        document.querySelector('.product_info_hero_left').addEventListener("click", (e) => {
            let currentSlide = App.state.currentSlide;
            let nextSlide = App.state.currentSlide === 0 ? result.lastSlide : App.state.currentSlide - 1;
            changeSlide(currentSlide, nextSlide);
        });

        document.querySelectorAll('.product_info_hero_point').forEach((el) => {
            el.addEventListener("click", (e) => {
                let currentSlide = App.state.currentSlide;
                let nextSlide = +el.dataset.slide;
                changeSlide(currentSlide, nextSlide);
            });
        });

    }
}

const changeSlide = (currentSlide, nextSlide) =>{
    App.state.changeCurrentSlide(nextSlide);
    document.querySelector('.product_info_hero_slide[data-slide="' + currentSlide + '"]').classList.remove('active');
    document.querySelector('.product_info_hero_slide[data-slide="' + nextSlide + '"]').classList.add('active');
    document.querySelector('.product_info_hero_point[data-slide="' + currentSlide + '"]').classList.remove('active');
    document.querySelector('.product_info_hero_point[data-slide="' + nextSlide + '"]').classList.add('active');
}