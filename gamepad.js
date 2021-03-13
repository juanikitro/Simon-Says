const blue = document.getElementById('blue');
const yellow = document.getElementById('yellow');
const red = document.getElementById('red');
const green = document.getElementById('green');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 50;

class Juego {
	constructor() {
		this.inicializar();
		this.generarSecuencia();
		setTimeout(this.siguienteNivel(), 100);
	}
	inicializar() {
		this.elegirColor = this.elegirColor.bind(this);
		this.siguienteNivel = this.siguienteNivel.bind(this);
		this.toggleBtnEmpezar();
		this.nivel = 1;
		this.colores = {
			blue,
			yellow,
			red,
			green,
		};
	}
	toggleBtnEmpezar() {
		if (btnEmpezar.classList.contains('hide')) {
			btnEmpezar.classList.remove('hide');
		} else {
			btnEmpezar.classList.add('hide');
		}
	}

	generarSecuencia() {
		this.secuencia = new Array(ULTIMO_NIVEL)
			.fill(0)
			.map((n) => Math.floor(Math.random() * 4));
	}

	siguienteNivel() {
		this.subnivel = 0;
		this.iluminarSecuencia();
		this.agregarEventosClick();
	}

	transformarNumeroAColor(numero) {
		switch (numero) {
			case 0:
				return 'blue';
			case 1:
				return 'yellow';
			case 2:
				return 'red';
			case 3:
				return 'green';
		}
	}

	transformarColorANumero(color) {
		switch (color) {
			case 'blue':
				return 0;
			case 'yellow':
				return 1;
			case 'red':
				return 2;
			case 'green':
				return 3;
		}
	}

	iluminarSecuencia() {
		for (let i = 0; i < this.nivel; i++) {
			let color = this.transformarNumeroAColor(this.secuencia[i]);

			setTimeout(() => {
				console.log(color);
				this.iluminarColor(color);
			}, 1000 * i);
		}
	}

	iluminarColor(color) {
		this.colores[color].classList.add('light');
		setTimeout(() => this.apagarColor(color), 250);
	}

	apagarColor(color) {
		this.colores[color].classList.remove('light');
	}

	agregarEventosClick() {
		this.colores.blue.addEventListener('click', this.elegirColor);
		this.colores.green.addEventListener('click', this.elegirColor);
		this.colores.yellow.addEventListener('click', this.elegirColor);
		this.colores.red.addEventListener('click', this.elegirColor);
	}

	eliminarEventosClick() {
		this.colores.blue.removeEventListener('click', this.elegirColor);
		this.colores.green.removeEventListener('click', this.elegirColor);
		this.colores.yellow.removeEventListener('click', this.elegirColor);
		this.colores.red.removeEventListener('click', this.elegirColor);
	}

	elegirColor(ev) {
		const nombreColor = ev.target.dataset.color;
		const numeroColor = this.transformarColorANumero(nombreColor);

		this.iluminarColor(nombreColor);
		if (numeroColor === this.secuencia[this.subnivel]) {
			this.subnivel++;
			if (this.subnivel == this.nivel) {
				this.nivel++;
				this.eliminarEventosClick();
				if (this.nivel == ULTIMO_NIVEL + 1) {
					this.ganoElJuego();
				} else {
					setTimeout(this.siguienteNivel, 1000);
				}
			}
		} else {
			this.perdioElJuego();
		}
	}
	ganoElJuego() {
		swal('Simon dice...', 'Felicitaciones, ganaste!!', 'success').then(
			this.inicializar.bind(this)
		);
	}
	perdioElJuego() {
		swal('Simon says...', 'Lo lamento, la proxima sera!', 'error').then(() => {
			this.inicializar();
			this.eliminarEventosClick();
		});
	}
}
function empezarJuego() {
	window.juego = new Juego();
}
