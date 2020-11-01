/**
 * Read Data from server
 */

export const getData = async () => {

    const getResource = async (url) => {
        const res = await fetch(`${url}`);
        if (!res.ok){
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    };
//    return await getResource(`http://localhost:8081/json/index.json`);
    return await getResource(`https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json`);
}