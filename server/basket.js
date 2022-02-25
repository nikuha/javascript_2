const add = (basket, req) => {
    basket.contents.push(req.body);
    return JSON.stringify(basket, null, 4);
};

const update = (basket, req) => {
   const find = basket.contents.find(el => el.id_product === +req.params.id);
   find.quantity += req.body.quantity;
   if(find.quantity < 1){
       basket.contents.splice(basket.contents.indexOf(find), 1);
   }
   return JSON.stringify(basket, null, 4);
};

module.exports = {
    add,
    update
};