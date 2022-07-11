import init, { best_equations, calc_equation } from './pkg/suhjong_wasm.js'

const input = document.getElementById('input')

const isPC = (() => {
	const ua = navigator.userAgent
	for (const d of [
		'Mobile', 'Android', 'iPad', 'Windows Phone'
	]) {
		if (ua.includes(d)) return false
	}
	return true
})()

window.onload = () => {
	if (isPC) input.focus()
}
async function set_score(score) {
	document.getElementById('score').textContent = score.toString()
}
async function set_eqns(eqns) {
	if (eqns.length === 0) {
		document.getElementById("eqn-sec").style.display = "none"
	}
	else {
		const ulist = document.getElementById('eqns')
		ulist.replaceChildren.apply(ulist, eqns.map(eqn => {
			let display = eqn
			if (
				(eqn[3] === '*' || eqn[3] === '/') &&
				(eqn[1] === '+' || eqn[1] === '-')
			) {
				display = '(' + eqn.slice(0, 3) + ')' + eqn.slice(3)
			}
			display = display.replaceAll('*', '×')
			display = display.replaceAll(/\D/g, " $& ")
			const li = document.createElement('li')
			li.textContent = display
			return li
		}))
		document.getElementById("eqn-sec").style.display = "block"
	}
}

(async () => {
	await init()
	input.addEventListener('input', async it => {
		const cards = input.value
		if (cards.length === 5) {
			if (!isPC) input.blur()
			if (!/^\d{5}$/.test(cards)) return
			const output = best_equations(cards[0], cards[1], cards[2], cards[3], cards[4])
			if (output.includes("=")) {
				const eqns = output.split(";")
				await Promise.all([
					set_score(calc_equation(eqns[0])),
					set_eqns(eqns),
				])
			} else {
				await Promise.all([
					set_score(0),
					set_eqns([]),
				])
			}
			document.getElementById("res").style.display = "block"
		} else {
			document.getElementById("res").style.display = "none"
		}
	})
})()

