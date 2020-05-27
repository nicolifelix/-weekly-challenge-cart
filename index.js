// PEGAR quais são os PRODUTOS fornecidos; --OK
// VERIFICAR as CATEGORIAS dos produtos fornecidos ; --OK
// VERIFICAR qts CATEGORIAS diferente existem nos produtos fornecidos; --OK
// VERIFICAR PROMOÇÃO a partir da quantidade de CATEGORIAS que foram descobertas; --OK
// PEGAR os produtos que contêm a promoção ativa 
// SOMAR os valores dos itens de acordo com a PROMOÇÃO aplicada;
// ARMAZENAR o valor total                    
// SUBTRAIR o VALOR TOTAL do PREÇO COM DESCONTO
// CALCULAR a % de DESCONTO        

//IMPORTANDO array - descontruido o objeto usando -> { products }
const { products } = require('./data/products');
console.clear()
console.log('\n\n\n\n\n\n\n\nINICIO PROGRAMA\n')
//Pega produtos pelo ID 
                  // ids = recebe uma lista de arrays | e allProducts = a todos os produtos { products}

const pegaProdutosPorId = (ids, listaDeProdutos) => {
	return listaDeProdutos.filter((produto)=> ids.includes(produto.id));
};

//Pega as Categorias dos Produtos do ARRAY

const pegaProdutosCategoria = (produtosFiltradosPorId) => {
	const categoriasEncontradas = []
	produtosFiltradosPorId.map((produto)=> {
		const encontrado = categoriasEncontradas.includes(produto.category)
		if(!encontrado){
			categoriasEncontradas.push(produto.category)
		}
	});

	return categoriasEncontradas
}

//Checa a quantidade de categorias diferentes para promoção
const pegarPromocao = (numeroDeCategorias)=> { 
	switch (numeroDeCategorias) {
		case 2: 
			return "DOUBLE LOOK";
		case 3:
			return "TRIPLE LOOK"
		case 4:
			return "FULL LOOK";
		default: 
			return  "SINGLE LOOK";	
	}
};

//função que retorna uma lista com items e seu preço padrão

const precoRegular = (carrinho, promocao) => {
	return carrinho.filter((produto)=>{
		// aceesando promotions dentro da lista de produtos 
		// e find - encontrando os que não tem look
		return !produto.promotions.find((itemDePromocao) =>{
			return itemDePromocao.looks.includes(promocao);
		})
	});
}





//Callback = Toda vez que o Call volta

// "products": [
// 	{
// 		"id": 110,
// 		"name": "PINK PANTHER™ T-SHIRT",
// 		"category": "T-SHIRTS",
// 		"regularPrice": 124.99,
// 		"promotions": [
// 			{
// 				"looks": ["SINGLE LOOK", "DOUBLE LOOK"],
// 				"price": 124.99
// 			},
// 			{
// 				"looks": ["TRIPLE LOOK", "FULL LOOK"],
// 				"price": 109.99
// 			}
//		 ]

// função que retorna uma lista com items que tem promocação
// const hasPromotions

// const sumValue =  

// As promoções do carrinho serão calculadas de acordo com as seguintes combinações de looks:
// * **`SINGLE LOOK`** - Se todos os produtos do carrinho pertencem a uma única categoria.
// * **`DOUBLE LOOK`** - Se pelo menos 2 produtos adicionados pertencem a categorias diferentes.
// * **`TRIPLE LOOK`**  - Se pelo menos 3 produtos pertencem a categorias diferentes.
// * **`FULL LOOK`** - Se pelo menos 4 produtos pertencem a mesma categoria.

// função pegar carrinho de compras 
const getShoppingCart = (ids, allProducts) => {

	const carrinho = pegaProdutosPorId(ids, allProducts);
	const categoriaDeProdutos = pegaProdutosCategoria(carrinho);
	const PegaNomedaCategoria = categoriaDeProdutos.length; 
	const promocao = pegarPromocao(PegaNomedaCategoria);
	console.log(precoRegular(carrinho, promocao));
};

// Executando a função passando os produtos e a lista com todos os produtos

// SINGLE
// getShoppingCart([110, 120, 130, 140], products);        

// DOUBLE
getShoppingCart([130, 140, 230, 260], products);        

// TRIPLE
// getShoppingCart([110, 130, 140, 230, 310, 330], products);               

// FULL
// getShoppingCart([120, 230, 310, 490], products);               


module.exports = { 
	getShoppingCart 
};  