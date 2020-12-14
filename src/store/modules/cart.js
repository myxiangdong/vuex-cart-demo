const state = {
  cartProducts: JSON.parse(window.localStorage.getItem('cart-products')) || []
}
const getters = {
  totalCount (state) {
    return state.cartProducts.reduce((sum, roduce) => sum + roduce.count, 0)
  },
  totalPrice (state) {
    return state.cartProducts.reduce((sum, price) => sum + price.totalPrice, 0)
  },
  checkedCount (state) {
    return state.cartProducts.reduce((sum, prod) => {
      if (prod.isChecked) {
        sum += prod.count
      }
      return sum
    }, 0)
  },
  checkedPrice (state) {
    return state.cartProducts.reduce((sum, prod) => {
      if (prod.isChecked) {
        sum += prod.totalPrice
      }
      return sum
    }, 0)
  }
}
const mutations = {
  addToCart (state, product) {
    // 1. cartProducts 中没有该商品，把该商品添加到数组，并增加 count，isChecked，totalPrice
    // 2. cartProducts 有该商品，让商品的数量加1，选中，计算小计
    const prod = state.cartProducts.find(item => item.id === product.id)
    if (prod) {
      prod.count++
      prod.isChecked = true
      prod.totalPrice = prod.price * prod.count
    } else {
      state.cartProducts.push({
        ...product,
        count: 1,
        isChecked: true,
        totalPrice: product.price
      })
    }
  },
  deleteProduct (state, id) {
    const index = state.cartProducts.findIndex(item => item.id === id)
    index !== -1 && state.cartProducts.splice(index, 1)
  },
  updateAllProductChecked (state, checked) {
    state.cartProducts.forEach(item => {
      item.isChecked = checked
    })
  },
  updateProductChecked (state, { id, checked }) {
    const prod = state.cartProducts.find(item => item.id === id)
    prod && (prod.isChecked = checked)
  },
  updateProduct (state, { id, count }) {
    const prod = state.cartProducts.find(item => item.id === id)
    if (prod) {
      prod.count = count
      prod.totalPrice = prod.price * prod.count
    }
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
