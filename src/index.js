/**
 * Import Styles
 * Data Reader
 * Components
 */
import './scss/styles.scss';

import {getData} from './services/Resources';
import {Main} from './components/Main';
import {Product} from './components/Product';

/**
 * Init App
 * Create Main Page Content
 */
const App = function _App() {
    return Main(_App.state.data);
};

/**
 * Init State
 */
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

/**
 * Start App
 * Get Data from server
 */
getData().then((res)=>{
    App.state.loadingData(res);

/**
 * Implement Main Page Content to Page
 * Hide Loading
 */
    document.getElementById('app').innerHTML = App();
    document.querySelector('.loader').classList.add('hide');

/**
 * Create Listener to Click on Product
 */
    document.querySelectorAll('.product_item').forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            showProductInfo(el.dataset.id);
        });
    });
/**
 * Create Listeners to hide Product Info Modal
 */
    document.querySelector('.product_info_close').addEventListener("click", (e) => {
        document.querySelector('.product_info').classList.remove('active');
    });
    document.querySelector('.product_info_backdrop').addEventListener("click", (e) => {
        document.querySelector('.product_info').classList.remove('active');
    });
})
.catch((err) =>{
/**
 * Handling errors of receiving data from the server
 */
    document.querySelector('.error').innerText = err.message;
    document.querySelector('.error').classList.add('show');
    console.log(err);
});

/**
 * Show Product Info Modal
 */
const showProductInfo = (id) => {

/**
 * Reset Current Slide counter for Image Slider
 */

    App.state.changeCurrentSlide(0);
/**
 * Create Product Info Content
 * Add Content to Block
 * Show Modal
 */
    const data = App.state.data.groups.find((el) => el.id === id);
    let result = Product(data);
    document.querySelector('.product_info_block').innerHTML = result.html;
    document.querySelector('.product_info').classList.add('active');

/**
 * Adding slider handling if needed
 */
    if (result.lastSlide > 0){

/**
 * Next Slide handler
 */
        document.querySelector('.product_info_hero_right').addEventListener("click", (e) => {
            let currentSlide = App.state.currentSlide;
            let nextSlide = App.state.currentSlide === result.lastSlide ? 0 : App.state.currentSlide + 1;
            changeSlide(currentSlide, nextSlide);
        });

 /**
 * Prev Slide handler
 */
        document.querySelector('.product_info_hero_left').addEventListener("click", (e) => {
            let currentSlide = App.state.currentSlide;
            let nextSlide = App.state.currentSlide === 0 ? result.lastSlide : App.state.currentSlide - 1;
            changeSlide(currentSlide, nextSlide);
        });

 /**
 * Selected Slide handler
 */
        document.querySelectorAll('.product_info_hero_point').forEach((el) => {
            el.addEventListener("click", (e) => {
                let currentSlide = App.state.currentSlide;
                let nextSlide = +el.dataset.slide;
                changeSlide(currentSlide, nextSlide);
            });
        });

    }
}

 /**
 * Chande Slide
 */
const changeSlide = (currentSlide, nextSlide) =>{
    App.state.changeCurrentSlide(nextSlide);
    document.querySelector('.product_info_hero_slide[data-slide="' + currentSlide + '"]').classList.remove('active');
    document.querySelector('.product_info_hero_slide[data-slide="' + nextSlide + '"]').classList.add('active');
    document.querySelector('.product_info_hero_point[data-slide="' + currentSlide + '"]').classList.remove('active');
    document.querySelector('.product_info_hero_point[data-slide="' + nextSlide + '"]').classList.add('active');
}