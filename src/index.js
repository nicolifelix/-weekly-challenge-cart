

// PEGAR quais são os PRODUTOS fornecidos; --OK
// VERIFICAR as CATEGORIAS dos produtos fornecidos ; --OK
// VERIFICAR qts CATEGORIAS diferente existem nos produtos fornecidos; --OK
// VERIFICAR PROMOÇÃO a partir da quantidade de CATEGORIAS que foram descobertas; --OK
// PEGAR o preço regular de todos os produtos
// SOMAR os valores dos itens de acordo com a PROMOÇÃO aplicada;
// ARMAZENAR o valor total
// SUBTRAIR o VALOR TOTAL do PREÇO COM DESCONTO
// CALCULAR a % de DESCONTO

const { products } = require('./data/products');

const PROMOTIONS_RULES = { //caixa alta -> regra da aplicação
	1: "SINGLE LOOK", 
	2: "DOUBLE LOOK",
	3: "TRIPLE LOOK",
	4: "FULL LOOK"
};

//pega produtos pelo ID
const getProductsByIds = (ids, allProducts) => {
	return allProducts.filter((product) => ids.includes(product.id));
};

//pega a categoria dos produtos
const getProductsCategories = (filteredProducts) => {
	return filteredProducts.map((product) => product.category);
};

// VERIFICAR qts CATEGORIAS diferente existem nos produtos fornecidos; remover duplicadas --OK
const getCategoryQuantity = (categories) => [...new Set (categories)].length; //retorna array com quantidade de categorias


//soma do preço regular de todos os produtos que estao no carrinho
const getRegularPrices = (cartProducts) => cartProducts.reduce((acc, product) => acc + product.regularPrice, 0);//valor inicial

//find retorna objeto
//verifica promocao existente para aplicar desconto
//include retorna verdadeiro ou falso, se no produto há a promocao em "promotionRules"
const getPromotionPrices = (cartProducts, promotionRule) => cartProducts.reduce((acc, product) => {
	const foundPromotion = product.promotions.find(promotion => promotion.looks.includes(promotionRule));
	//se encontrar promocao válida, somar preco com desconto
	if (foundPromotion) {
		acc = acc + foundPromotion.price;
	}
	else { // so for undefined, soma-se o 0 ou o valor acumulado com regular price
		acc = acc + product.regularPrice;
	}
	
	return acc;
}, 0);//acumulador = acc


//lista produtos do carrinho, apresentando ids, dados e categoria
const getShoppingCart = (ids, allProducts) => {
	const cartProducts = getProductsByIds(ids, allProducts);
	const categoryProducts = getProductsCategories(cartProducts);
	const quantity = getCategoryQuantity(categoryProducts);
	const promotion = PROMOTIONS_RULES[quantity];
	//retornando name q recebe product.name e category q recebe produtc.category
	const products = cartProducts .map(( {name, category }) => ({ name, category }));//array novo so com produtos q ja estao no carrinho
	const totalRegularPrice = getRegularPrices(cartProducts); //soma dos valores regulares
	const totalPriceWithDiscount = getPromotionPrices(cartProducts, promotion);
	const discountValue = totalRegularPrice - totalPriceWithDiscount;
	const discount = `${((discountValue / totalRegularPrice) * 100).toFixed(2)}%`;

	

	return {
		products: products, //retorna array com nome e categoria dos produtos
		promotion,
		totalPrice: totalPriceWithDiscount.toFixed(2),
    discountValue: discountValue.toFixed(2),
		discount,

	}
	
};

//executando a funçao passando os produtos e a lista com todos os produtos
//console.log(getShoppingCart([120, 230, 310, 490], products));
 


module.exports = {
	getShoppingCart,
}