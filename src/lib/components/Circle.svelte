<script>
	import random from "lodash/random";
	import { onMount } from "svelte";

	const colors = [
		"rgba(244, 237, 224, .05)",
		"rgba(161, 113, 50, .2)",
	];

	const sleep = ms => new Promise(r => setTimeout(r, ms));

	const w = 900;
	const h = 900;

	let noise;
	let particles;
	let rid;

	let ref;

	// credits for code: https://codepen.io/ajm13/pen/qraGKY
	class Vector {
		constructor (x, y) {
			this.x = x;
			this.y = y;
		}

		static fromPolar (r, t) {
			return new Vector(
				r * Math.cos(t),
				r * Math.sin(t));
		}

		add (v) {
			this.x = this.x + v.x;
			this.y = this.y + v.y;
			return this;
		}

		mul (x) {
			this.x = this.x * x;
			this.y = this.y * x;
			return this;
		}
	}

	class Noise {
		constructor (w, h, oct) {
			this.width = w;
			this.height = h;
			this.canvas = Noise.compositeNoise(w, h, oct);
			const ctx = this.canvas.getContext("2d");
			this.data = ctx.getImageData(0, 0, w, h).data;
		}

		static noise (w, h) {
			const cv = document.createElement("canvas");
			const ctx = cv.getContext("2d");

			cv.width = w;
			cv.height = h;

			const img = ctx.getImageData(0, 0, w, h);
			const data = img.data;

			for (let i = 0, l = data.length; i < l; i = i + 4) {
				data[i] = random(0, 255);
				data[i + 1] = random(0, 255);
				data[i + 2] = random(0, 255);
				data[i + 3] = 255;
			}

			ctx.putImageData(img, 0, 0);
			return cv;
		}

		static compositeNoise (w, h, oct) {
			const cv = document.createElement("canvas");
			const ctx = cv.getContext("2d");

			cv.width = w;
			cv.height = h;

			ctx.fillRect(0, 0, w, h);

			ctx.globalCompositeOperation = "lighter";
			ctx.globalAlpha = 1 / oct;

			for (let i = 0; i < oct; i++) {
				const noise = Noise.noise(w >> i, h >> i);
				ctx.drawImage(noise, 0, 0, w, h);
			}

			return cv;
		}

		getNoise (x, y, ch) {
			const i = (~~x + ~~y * this.width) * 4;
			return this.data[i + ch] / 127 - 1;
		}
	}

	class Particle {
		constructor (x, y, vx = 0, vy = 0) {
			this.pos = new Vector(x, y);
			this.vel = new Vector(vx, vy);
		}

		update (noise) {
			this.pos.add(this.vel);

			const { x, y } = this.pos;
			const dx = noise.getNoise(x, y, 0);
			const dy = noise.getNoise(x, y, 1);

			this.vel.add(new Vector(dx, dy));
			this.vel.mul(.9);
		}

		draw (ctx) {
			ctx.fillRect(this.pos.x, this.pos.y, 1, 1);
		}
	}

	onMount(() => {
		const init = async () => {
			noise = new Noise(w, h, 5);
			particles = [];

			ctx.fillStyle = "rgb(32, 35, 41)";
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle = colors[random(0, 1, false)];

			animate();

			for (let i = 0; i < 2000; i++) {
				const r1 = w / 4;
				const a1 = random(0, 2 * Math.PI, true);
				const r2 = random(0, 1, true);
				const a2 = random(0, 2 * Math.PI, true);

				const pos = Vector.fromPolar(r1, a1);
				const vel = Vector.fromPolar(r2, a2);

				pos.add(new Vector(w / 2, h / 2));

				await sleep(0.01);

				particles.push(new Particle(pos.x, pos.y, vel.x, vel.y));
			}
		};

		const generate = () => {
			if (rid) {
				window.cancelAnimationFrame(rid);
				rid = 0;
			} else {
				init();
			}
		};

		const render = () => {
			for (const p of particles) {
				p.update(noise);
				p.draw(ctx);
			}
		};

		const animate = () => {
			render();

			rid = window.requestAnimationFrame(animate);
		};

		const cv = document.createElement("canvas");
		const ctx = cv.getContext("2d");

		cv.width = w;
		cv.height = h;

		ref.appendChild(cv);
		cv.addEventListener("mousedown", generate);
		cv.addEventListener("touchstart", generate);

		init();
	});
</script>

<div class="relative">
	<div
		class="absolute -top-64 -left-24"
		bind:this={ref}
	></div>
</div>