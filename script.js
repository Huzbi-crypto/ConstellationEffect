const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particle_array = [];
let hue_value = 0;

const cursor_location = {
    x: undefined,
    y: undefined,
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

window.addEventListener('click', function(event) {
    cursor_location.x = event.x;
    cursor_location.y = event.y;
    for (let i = 0; i < 10; i++) {
    particle_array.push(new Particle());
    }
})

window.addEventListener('mousemove', function(event) {
    cursor_location.x = event.x;
    cursor_location.y = event.y;
    for (let i = 0; i < 2; i++) {
    particle_array.push(new Particle());
    }
})

class Particle {
    constructor() {
        this.x = cursor_location.x;
        // this.x = Math.random() * canvas.width;
        this.y = cursor_location.y;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue_value + ', 100%, 50%)';
    }

    // Methods
    updateParticlePositions() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    drawParticle() {
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

function drawParticles() {
    for (let i = 0; i < particle_array.length; i++) {
        particle_array[i].updateParticlePositions();
        particle_array[i].drawParticle();
        
        for (let j = i; j < particle_array.length; j++) {
            const dX = particle_array[i].x - particle_array[j].x;
            const dY = particle_array[i].y - particle_array[j].y;
            const distance = Math.sqrt(dX * dX + dY * dY);
            if (distance < 100) {
                context.beginPath();
                context.strokeStyle = particle_array[i].color;
                context.lineWidth = particle_array[i].size / 10;
                context.moveTo(particle_array[i].x, particle_array[i].y);
                context.lineTo(particle_array[j].x, particle_array[j].y);
                context.stroke();
                context.closePath();
            }
        }

        if (particle_array[i].size <= 0.3) {
            particle_array.splice(i, 1);
            console.log(particle_array.length);
            i--;
        }
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = 'rgba(0, 0, 0, 0.02)';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    drawParticles();
    hue_value += 0.5;
    requestAnimationFrame(animate);
}

animate();