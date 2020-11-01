export const Main = (data) => {

    let list = '';
    for (let element of data.groups){
        let price = '';
        if (typeof element.price !== 'undefined') price = element.price.selling;
        else if (typeof element.priceRange !== 'undefined') price = element.priceRange.selling.low;

        list += `
            <a href="#" data-id="${element.id}" class="product_item">
                <div class="product_item_block">
                    <span class="product_item_image" style="background-image: url('${element.thumbnail.href}')"></span>
                    <span class="product_item_title">${element.name}</span>
                    <span class="product_item_price">$${price.toFixed(2)}</span>
                </div>
            </a>
        `;
    }

    let pagination = '';
    if (data.totalPages > 1 && data.totalPages < 6){
        for(let i = 1; i <= data.totalPages; i++){
            pagination += `<a href="#" class="pagination_item ${i === 1 ? 'active' : ''}">${i}</a>`;
        }
    }
    else if (data.totalPages > 1){
        pagination = `
            <a href="#" class="pagination_item active">1</a>
            <a href="#" class="pagination_item">2</a>
            <span class="pagination_item_divider">...</span>
            <a href="#" class="pagination_item">${data.totalPages - 1}</a>
            <a href="#" class="pagination_item">${data.totalPages}</a>
        `;
    }
    if (pagination !== '') pagination = `
        <a href="#" class="pagination_item disabled"><i class="fas fa-chevron-left"></i></a>
        ${pagination}
        <a href="#" class="pagination_item"><i class="fas fa-chevron-right"></i></a>
    `;

    return `
        <header>
            <div class="container header_container">
                <a href="#" class="logo">Coding Challenge</a>
                <div class="menu">
                    <span class="user_circle">DU</span>
                    <span class="user_name">Demo User</span>
                </div>
            </div>
        </header>
        <main>
            <div class="container">
                <h1 class="text-center">Product List</h1>
                <div class="product_list">${list}</div>
                <div class="pagination">
                    ${pagination}
                </div>
            </div>
            <div class="product_info">
                <div class="product_info_backdrop"></div>
                <div class="product_info_container">
                    <span class="product_info_close"><i class="fas fa-times"></i></span>
                    <div class="product_info_block"></div>
                </div>
            </div>
        </main>
    `;
}