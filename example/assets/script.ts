const input = document.getElementById('input') as HTMLInputElement

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
async function set_score(score: number) {
	document.getElementById('score').textContent = score.toString()
}
async function set_eqns(eqns: string[]) {
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
			display = display.replace(/\*/g, '×')
			display = display.replace(/\D/g, " $& ")
			const li = document.createElement('li')
			li.textContent = display
			return li
		}))
		document.getElementById("eqn-sec").style.display = "block"
	}
}

(async () => {
	const wasm: {
		default: () => Promise<any>,
		best_equations: (a: string, b: string, c: string, d: string, e: string) => string,
		calc_equation: (eqn: string) => number,
		// @ts-ignore
	} = await import('./pkg/suhjong_wasm.js')
	await wasm.default()
	input.addEventListener('input', async () => {
		const cards = input.value
		if (cards.length === 5) {
			if (!/^\d*$/.test(cards)) return
			const jobs = []
			jobs.push(async () => {
				if (!isPC) input.blur()
				document.getElementById('container').style.alignItems = 'start'
			})
			const output = wasm.best_equations(cards[0], cards[1], cards[2], cards[3], cards[4])
			if (output.includes("=")) {
				const eqns = output.split(";")
				jobs.push(
					set_score(wasm.calc_equation(eqns[0])),
					set_eqns(eqns),
				)
			} else {
				jobs.push(
					set_score(0),
					set_eqns([]),
				)
			}
			await Promise.all(jobs)
			document.getElementById("res").style.display = "block"
		} else {
			document.getElementById('container').style.alignItems = 'center'
			document.getElementById("res").style.display = "none"
		}
	})
})()
