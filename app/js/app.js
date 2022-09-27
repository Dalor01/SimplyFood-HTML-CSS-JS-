import $, { each } from 'jquery'
import Swiper from 'swiper/bundle'
window.jQuery = $
window.$ = $
require("@fancyapps/fancybox")
require('../libs/hc-offcanvas-nav.js')
document.addEventListener('DOMContentLoaded', () => {
	$('#form').on('submit',(event) => {
		let data = JSON.stringify($('#form').serializeArray())
		event.preventDefault()
		console.log(data)
		$('#form').empty().html('<span class="modal-window__success-message">thanks, we will contact you</span>')
	})
	const menuSlider1 = new Swiper('#menu-slider-1', {
		loop: true,
		spaceBetween: 20,
		slidesPerView: 2,
		centeredSlides: false,
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next'
		},
		
		scrollbar: {
			el: '.swiper-scrollbar',
			hide: true
		},
		breakpoints: {
			992:{
				slidesPerView: 3
			}
		}
		
	});
	const menuSlider2 = new Swiper('#menu-slider-2', {
		loop: true,
		spaceBetween: 20,
		slidesPerView: 2,
		centeredSlides: false,
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next'
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			hide: true
		},
		breakpoints: {
			992:{
				slidesPerView: 4	
			}
		}
	});
	$(document).on('scroll',function(){
		let header = $('.header__bottom-line')
		let topLineHeight = $('.header__top-line').height()
		if($(this).scrollTop() > topLineHeight) {
			header.addClass('header__bottom-line--fixed')
		}else {
			header.removeClass('header__bottom-line--fixed')
		}
	})
	$('.header__menu-hamburger').on('click',() => {
		$('.header__menu-hamburger, .header__nav').toggleClass('active')
	})
	// CART
	$.fn.mydata=function(key, variable){
		$(this).attr(key, variable)
		$(this).trigger('costchange')
	}
	$(document).on('change', '.cart__item-quantity > input[type=number]', (e) => {
		$(e.target).attr( 'value', $(e.target).val() )
	})
	function changeCartItemCount(id, maxCount){
		let countElement = $('.cart__item[data-id="' + id + '"] > .cart__item-quantity > input[type="number"]')
		if (parseInt(countElement.val()) < parseInt(maxCount)){
			let currentValue = parseInt(countElement.val())
			countElement.val(currentValue + 1)
			countElement.trigger('change')
		}else {
		}	
	}
	function removeCartItem(id){
		$('.cart__item[data-id="' + id + '"]').remove()
	}
	function ChangeCartItemCost(){
		
	}
	function addCartItem(img,title,price,count,id){
		if(img && title && price && count && id){
			let cartItem = 
			`<div class="cart__item" data-price="` + price + `" data-id="` + id + `">
				<img class="cart__item-img" src="`+ img +`" alt="` + title + `">
				<div class="cart-item-info">
					<span class="cart__item-title">`+ title +`</span>
					<span class="cart__item-price">`+ price + `</span>
					<span class="cart__item-cost" data-cost="` + price + `" data-id="` + id + `">Cost: ` + price + `</span>
				</div>
				<div class="cart__item-quantity">
					<input type="number" data-id="`+ id + `" value="` + count + `" min="1" max="20" step="1">
				</div>
				<button class="cart__item-remove" data-id="` + id + `">х</button>
			</div>`
			$('.cart').append(cartItem)
			$('.cart__item-quantity > input[data-id="' + id + '"]').trigger('change')
		}
	}
	$('#show-cart').on('click', () => {
		$('.cart').toggleClass('cart--active')
		$('#show-cart').toggleClass('header__client-btn--active')
	})
	$('.menu-item__btn').on('click', (e) => {
		let img = $(e.target).data('img')
		let	title = $(e.target).data('title')
		let	price = $(e.target).data('price')
		let	count = $(e.target).data('count')
		let id = $(e.target).data('id')
		let maxCount = $(e.target).data('max-count')
		if ($('.cart__item[data-id="' + id + '"]').length) {
			changeCartItemCount(id, maxCount)
		}else {
			addCartItem(img,title,price,count,id)
		}
	})
	$(document).on('click','.cart__item-remove', (e) => {
		let currentId = $(e.target).data('id')
		removeCartItem(currentId)	
	})
	$(document).on('change', '.cart__item-quantity > input[type=number]', (e) => {
		let id = $(e.target).data('id')
		let price = $('.cart__item[data-id="' + id + '"]').data('price')
		let count = $(e.target).val()
		let ItemCost = price * count
		$('.cart__item-cost[data-id="' + id + '"]').html('Cost: ' + ItemCost.toFixed(2))
		$('.cart__item-cost[data-id="' + id + '"]').attr('data-cost', ItemCost.toFixed(2)).trigger('changecost')	
	})
	$('.cart__item-cost').on('costchange',function() {
		console.log(ItemCost)
	})
	$('.header__nav-link').on('click', (e) => {
		navigator.clipboard
		.writeText(e.target.innerText)
	})
})

console.log(String(001))

// ЕБУЧИЕ ФУНКЦИИ
// let iceCream = {
// 	size: ['small', 'middle', 'huge'],
// 	getSize: function(chooseIceCream) {
// 		console.log('Размер вашей мороженки - ' + this.size[chooseIceCream])
// 	}
// }
// iceCream.getSize(2)

// for (let i = 0; i <= 5; i++) {	
// 	setTimeout(() => {
// 		console.log('Ну вот как то так епт ' + i)
// 	}, 3000);
// }
// let i = 3
// i += 3
// console.log(i)	

// let people = ['Вася', 'Катя', 'Петя', 'Клава','Маша']
// for (let i = people.length - 1 ; i >= 0; i--) {
// 	console.log(people[i])
// }
// class Bloger {
// 	constructor(channelName, firstName, lastName) {
// 		this.channelName = channelName
// 		this.firstName = firstName
// 		this.lastName = lastName
// 	}
// 	channelAbout() {
// 		console.log(`Канал:  ${this.channelName} Автор канала:  ${this.firstName} ${this.lastName}`)
// 	}
// }
// let Bloger1 = new Bloger ('John Connor', 'Arthur', 'Lutsenko')
// Bloger1.channelAbout()
// let Bloger2 = new Bloger ('Badcomedian', 'Евгений', 'Баженов')
// Bloger2.channelAbout()

// class Gamer {
// 	constructor(gameName, gameGenre, gameRating) {
// 		this.gameName = gameName
// 		this.gameGenre = gameGenre
// 		this.gameRating = gameRating
// 	}
// 	gameAbout() {
// 		console.log(`Название игры: ${this.gameName} Жанр игры: ${this.gameGenre} Рейтинг игры: ${this.gameRating}`)
// 	}
// }
// let game = new Gamer('Diablo', 'RPG', '9/10')
// game.gameAbout()

// class Car {
// 	constructor(speed) {
// 		this.speed = speed
// 	}
// 	viewSpeed() {
// 		return `Моя скорость ${this.speed} км/ч`
// 	}
// }
// let audi = new Car(200)
// document.querySelector('#car').innerHTML = audi.viewSpeed()
// audi = new Car(300)
// document.querySelector('#car2').innerHTML = audi.viewSpeed()
