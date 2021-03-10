const azul = document.getElementById('azul');
const violeta = document.getElementById('violeta');
const rojo = document.getElementById('rojo');
const verde = document.getElementById('verde');
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
			azul,
			violeta,
			rojo,
			verde,
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
				return 'azul';
			case 1:
				return 'violeta';
			case 2:
				return 'rojo';
			case 3:
				return 'verde';
		}
	}

	transformarColorANumero(color) {
		switch (color) {
			case 'azul':
				return 0;
			case 'violeta':
				return 1;
			case 'rojo':
				return 2;
			case 'verde':
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
		this.colores.azul.addEventListener('click', this.elegirColor);
		this.colores.verde.addEventListener('click', this.elegirColor);
		this.colores.violeta.addEventListener('click', this.elegirColor);
		this.colores.rojo.addEventListener('click', this.elegirColor);
	}

	eliminarEventosClick() {
		this.colores.azul.removeEventListener('click', this.elegirColor);
		this.colores.verde.removeEventListener('click', this.elegirColor);
		this.colores.violeta.removeEventListener('click', this.elegirColor);
		this.colores.rojo.removeEventListener('click', this.elegirColor);
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
