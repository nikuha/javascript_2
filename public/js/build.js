/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/Basket.js":
/*!*****************************!*\
  !*** ./public/js/Basket.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Basket\": () => (/* binding */ Basket)\n/* harmony export */ });\n/* harmony import */ var _BasketItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasketItem.js */ \"./public/js/BasketItem.js\");\n\nconst Basket = {\n  inject: ['getJson', 'postJson', 'putJson'],\n  components: {\n    BasketItem: _BasketItem_js__WEBPACK_IMPORTED_MODULE_0__.BasketItem\n  },\n\n  data() {\n    return {\n      showBasket: false,\n      basketItems: []\n    };\n  },\n\n  methods: {\n    addProduct(product) {\n      let find = this.basketItems.find(el => el.id_product === product.id_product);\n\n      if (find) {\n        this.putJson(`/api/basket/${find.id_product}`, {\n          quantity: 1\n        }).then(data => {\n          if (data.result) {\n            find.quantity++;\n          }\n        });\n        this.showBasket = true;\n        return;\n      }\n\n      const prod = Object.assign({\n        quantity: 1\n      }, product);\n      this.postJson(`/api/basket`, prod).then(data => {\n        if (data.result) {\n          this.basketItems.push(prod);\n        }\n      });\n      this.showBasket = true;\n    },\n\n    delProduct(product) {\n      let find = this.basketItems.find(el => el.id_product === product.id_product);\n\n      if (find) {\n        this.putJson(`/api/basket/${find.id_product}`, {\n          quantity: -1\n        }).then(data => {\n          if (product.quantity > 1) {\n            product.quantity--;\n          } else {\n            this.basketItems.splice(this.basketItems.indexOf(product), 1);\n          }\n        });\n      }\n    }\n\n  },\n\n  mounted() {\n    this.getJson(`/api/basket`).then(data => {\n      for (let el of data.contents) {\n        this.basketItems.push(el);\n      }\n    });\n  },\n\n  template: `\n        <div class=\"links row flex-wrap\">\n            <div class=\"menu-link\"><a href=\"#\" class=\"basket-a\" @click=\"showBasket = !showBasket\">Корзина</a></div>\n        </div>\n        <div class=\"basket-menu\" v-show=\"showBasket\">\n            <div v-if=\"!basketItems.length\">Корзина пуста</div>\n             <BasketItem \n                v-for=\"item of basketItems\" \n                :key=\"item.id_product\"\n                :basketItem=\"item\"\n                @delProduct=\"delProduct\"\n            ></BasketItem>            \n        </div>\n    `\n};\n\n//# sourceURL=webpack://javascript_2/./public/js/Basket.js?");

/***/ }),

/***/ "./public/js/BasketItem.js":
/*!*********************************!*\
  !*** ./public/js/BasketItem.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BasketItem\": () => (/* binding */ BasketItem)\n/* harmony export */ });\nconst BasketItem = {\n  props: ['img', 'basketItem'],\n  emits: ['delProduct'],\n\n  data() {\n    return {\n      defaultImg: 'img/default.png'\n    };\n  },\n\n  computed: {\n    trueImage() {\n      return basketItem => {\n        return basketItem.img ? basketItem.img : this.defaultImg;\n      };\n    }\n\n  },\n  template: `\n        <div class=\"item-container row space-between\">\n            <div><img :src=\"trueImage(basketItem)\" :alt=\"basketItem.product_name\"></div>\n            <div class=\"name\">\n                <div>{{ basketItem.product_name }}</div>\n                <div>{{ basketItem.price*basketItem.quantity }}&#8381;</div>\n            </div>\n            <div>\n                <div>Кол-во:</div>\n                <div class=\"quantity\">{{ basketItem.quantity }}</div>\n            </div>\n            <div>\n                <div><button class=\"standard red delete\" @click=\"$emit('delProduct', basketItem)\">Удалить</button></div>\n            </div>\n        </div>\n    `\n};\n\n//# sourceURL=webpack://javascript_2/./public/js/BasketItem.js?");

/***/ }),

/***/ "./public/js/Error.js":
/*!****************************!*\
  !*** ./public/js/Error.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Error\": () => (/* binding */ Error)\n/* harmony export */ });\nconst Error = {\n  data() {\n    return {\n      text: ''\n    };\n  },\n\n  methods: {\n    setError(error) {\n      this.text = error;\n    }\n\n  },\n  template: `\n        <div class=\"error-container\" v-if=\"text\">\n            <div class=\"row space-between\">\n                <div class=\"error-text\">{{ text }}</div>\n                <div><button class=\"standard red\" @click=\"setError('')\">&times;</button></div>            \n            </div>\n        </div>\n    `\n};\n\n//# sourceURL=webpack://javascript_2/./public/js/Error.js?");

/***/ }),

/***/ "./public/js/ProductItem.js":
/*!**********************************!*\
  !*** ./public/js/ProductItem.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProductItem\": () => (/* binding */ ProductItem)\n/* harmony export */ });\nconst ProductItem = {\n  props: ['product'],\n\n  data() {\n    return {\n      defaultImg: 'img/default.png'\n    };\n  },\n\n  computed: {\n    bgStyle() {\n      return product => {\n        const image = product.img ? product.img : this.defaultImg;\n        return {\n          backgroundImage: `url('${image}')`\n        };\n      };\n    }\n\n  },\n  template: `\n        <div class=\"item-container\" :style=\"bgStyle(product)\">\n            <div class=\"title row space-between\">\n                <div>\n                    <div>{{ product.product_name }}</div>\n                    <div>{{ product.price }}&#8381;</div>\n                </div>\n                <div><button class=\"standard green buy\" @click=\"$root.$refs.basket.addProduct(product)\">Купить</button></div>\n            </div>\n        </div>`\n};\n\n//# sourceURL=webpack://javascript_2/./public/js/ProductItem.js?");

/***/ }),

/***/ "./public/js/Products.js":
/*!*******************************!*\
  !*** ./public/js/Products.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Products\": () => (/* binding */ Products)\n/* harmony export */ });\n/* harmony import */ var _ProductItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductItem.js */ \"./public/js/ProductItem.js\");\n\nconst Products = {\n  inject: ['getJson'],\n  components: {\n    ProductItem: _ProductItem_js__WEBPACK_IMPORTED_MODULE_0__.ProductItem\n  },\n\n  data() {\n    return {\n      products: []\n    };\n  },\n\n  computed: {\n    filteredProducts() {\n      return this.products.filter(el => new RegExp(this.$root.$refs.search.searchText, 'i').test(el.product_name));\n    }\n\n  },\n\n  mounted() {\n    this.getJson(`/api/products`).then(data => {\n      for (let el of data) {\n        this.products.push(el);\n      }\n    });\n  },\n\n  template: `\n            <div v-if=\"!products.length\" class=\"simple-title margin-top center\">Товары не найдены</div>\n            <div class=\"products-container\">\n                <ProductItem \n                v-for=\"el of filteredProducts\" \n                :key=\"el.id_product\"\n                :product=\"el\"\n                >\n                </ProductItem>\n            </div>\n    `\n};\n\n//# sourceURL=webpack://javascript_2/./public/js/Products.js?");

/***/ }),

/***/ "./public/js/Search.js":
/*!*****************************!*\
  !*** ./public/js/Search.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Search\": () => (/* binding */ Search)\n/* harmony export */ });\nconst Search = {\n  data() {\n    return {\n      searchText: ''\n    };\n  },\n\n  template: `\n        <form class=\"search-form\" @submit.prevent>\n            <input type=\"text\" placeholder=\"поиск\" v-model=\"searchText\" />\n            <button type=\"submit\">\n                <i class=\"fas fa-search\"></i>\n            </button>\n        </form>\n    `\n};\n\n//# sourceURL=webpack://javascript_2/./public/js/Search.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Basket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Basket.js */ \"./public/js/Basket.js\");\n/* harmony import */ var _Products_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Products.js */ \"./public/js/Products.js\");\n/* harmony import */ var _Error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Error.js */ \"./public/js/Error.js\");\n/* harmony import */ var _Search_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Search.js */ \"./public/js/Search.js\");\n\n\n\n\nconst App = {\n  components: {\n    Basket: _Basket_js__WEBPACK_IMPORTED_MODULE_0__.Basket,\n    Products: _Products_js__WEBPACK_IMPORTED_MODULE_1__.Products,\n    Search: _Search_js__WEBPACK_IMPORTED_MODULE_3__.Search,\n    Error: _Error_js__WEBPACK_IMPORTED_MODULE_2__.Error\n  },\n\n  data() {\n    return {\n      userSearch: ''\n    };\n  },\n\n  provide() {\n    return {\n      getJson: this.getJson,\n      putJson: this.putJson,\n      postJson: this.postJson\n    };\n  },\n\n  methods: {\n    getJson(url) {\n      return fetch(url).then(result => result.json()).catch(error => this.$refs.error.setError(error));\n    },\n\n    postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => this.$refs.error.setError(error));\n    },\n\n    putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => this.$refs.error.setError(error));\n    }\n\n  }\n};\nVue.createApp(App).mount('#app');\n\n//# sourceURL=webpack://javascript_2/./public/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./public/js/Basket.js");
/******/ 	__webpack_require__("./public/js/BasketItem.js");
/******/ 	__webpack_require__("./public/js/Error.js");
/******/ 	__webpack_require__("./public/js/main.js");
/******/ 	__webpack_require__("./public/js/ProductItem.js");
/******/ 	__webpack_require__("./public/js/Products.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/Search.js");
/******/ 	
/******/ })()
;