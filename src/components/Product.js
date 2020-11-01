/**
 * Create Product Info Content
 */
export const Product = (data) => {

/**
 * Create Slider Elements
 */

    let i = 1;
    let hero = `<span data-slide="0" class="product_info_hero_slide active" style="background-image: url('${data.hero.href}')"></span>`;
    let points = '<span data-slide="0" class="product_info_hero_point active"></span>';
    for (let element of data.images){
        hero += `
            <span data-slide="${i}" class="product_info_hero_slide" style="background-image: url('${element.href}')"></span>
        `;
        points += `
            <span data-slide="${i}" class="product_info_hero_point"></span>
        `;
        i++;
    }
/**
 * Create Slider Controls
 */
    let controls = '';
    if (i > 1){
        controls = `
            <div class="product_info_hero_controls">
                <span class="product_info_hero_left"><i class="fas fa-chevron-left"></i></span>
                <span class="product_info_hero_right"><i class="fas fa-chevron-right"></i></span>
            </div>
        `;
        points = `<div class="product_info_hero_points">` + points + `</div>`;
    }
    else {
        points = '';
    }
/**
 * Create Prices
 * Yes. a little ugly. But the logic of displaying the price in json raises questions
 */
    let price = '';
    if (typeof data.price !== 'undefined'){
        if (data.price.selling === data.price.regular){
            price = `
                <div class="product_info_price">
                    <span class="product_info_price_reg">$${data.price.selling.toFixed(2)}</span>
                </div>
            `;
        }
        else{
            price = `
                <div class="product_info_price_sale">
                    <span class="product_info_price_reg">$${data.price.regular.toFixed(2)}</span>
                    <span class="product_info_price_sell">$${data.price.selling.toFixed(2)}</span>
                </div>
            `;
        }
    }
    else if (typeof data.priceRange !== 'undefined'){
        if (typeof data.priceRange.regular !== 'undefined'){
            price = `
                <div class="product_info_price_sale">
                    <span class="product_info_price_reg">$${data.priceRange.regular.low.toFixed(2)} - $${data.priceRange.regular.high.toFixed(2)}</span>
                    <span class="product_info_price_sell">$${data.priceRange.selling.low.toFixed(2)} - $${data.priceRange.selling.high.toFixed(2)}</span>
                </div>
            `;
        }
        else{
            price = `
                <div class="product_info_price">
                    <span class="product_info_price_reg">$${data.priceRange.selling.low.toFixed(2)} - $${data.priceRange.selling.high.toFixed(2)}</span>
                </div>
            `;
        }
    }
/**
 * Return Template
 */
    return {
        html: `
            <div class="product_info_hero">
                <div class="product_info_hero_slides">${hero}</div>
                ${controls}
                ${points}
            </div>
            <div class="product_info_information">
                <h2>${data.name}</h2>
                ${price}
                <div class="product_info_price_other">
                    <div class="product_info_price_other_item">
                        <span class="product_info_price_other_item_label">Link:</span>
                        <a class="product_info_price_other_item_href" target="_blank" href="${data.links.www}">Original Site</a>
                    </div>
                    <div class="product_info_price_other_item">
                        <span class="product_info_price_other_item_label">Rating:</span>
                        <span class="product_info_price_other_item_rating">
                            <i class="fa${data.reviews.averageRating >= 0.5 ? 's' : 'r'} fa-star"></i>
                            <i class="fa${data.reviews.averageRating >= 1.5 ? 's' : 'r'} fa-star"></i>
                            <i class="fa${data.reviews.averageRating >= 2.5 ? 's' : 'r'} fa-star"></i>
                            <i class="fa${data.reviews.averageRating >= 3.5 ? 's' : 'r'} fa-star"></i>
                            <i class="fa${data.reviews.averageRating >= 4.5 ? 's' : 'r'} fa-star"></i>
                        </span>
                    </div>
                    <div class="product_info_price_other_item">
                        <span class="product_info_price_other_item_label">Review:</span>
                        <span class="product_info_price_other_item_value">${data.reviews.reviewCount}</span>
                    </div>
                    <div class="product_info_price_other_item">
                        <span class="product_info_price_other_item_label">Likes:</span>
                        <span class="product_info_price_other_item_value">${data.reviews.likelihood}</span>
                    </div>
                </div>
            </div>
        `,
        lastSlide: i - 1
    };
};