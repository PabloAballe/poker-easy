# ♠️ Poker Easy Academy

**Poker Easy Academy** es una plataforma web interactiva y gamificada diseñada para enseñar Texas Hold'em de forma intuitiva, sin fricción y basada en la práctica en tiempo real. Combina módulos teorico-prácticos, simulaciones infinitas de jugadas y una mesa de poker en vivo asistida por inteligencia artificial que guía al usuario en cada decisión estratégica.

🌐 **Prueba la aplicación en vivo**: [https://PabloAballe.github.io/poker-easy/](https://PabloAballe.github.io/poker-easy/)

---

## 🌟 Características Principales

### 🧠 Asistencia Inteligente en Tiempo Real (AI Coach HUD)
Juega contra bots de IA en una mesa de poker 2D realista de 6 jugadores mientras el asistente en vivo calcula instantáneamente:
- **Equity %**: Probabilidad real de victoria mediante simulación Monte Carlo.
- **Pot Odds**: Cálculo automático del costo relativo de cada apuesta.
- **Sugerencia estratégica**: Recomendaciones claras (*Fold*, *Check*, *Call*, *Raise*) con explicaciones tácticas.
- **Ranking de Fichas en Vivo**: Clasificación en tiempo real de los stacks y beneficios de cada jugador.

### ♾️ Entrenamiento Procedural e Infinito
Escenarios prácticos generados aleatoriamente al vuelo. Nunca jugarás la misma mano dos veces:
- Evaluación matemática inmediata de cada escenario.
- Sistema de puntos de experiencia (XP) y rachas de aciertos.
- Explicaciones personalizadas basadas en el Valor Esperado (EV).

### 🎓 Módulos de Aprendizaje Guiado
- **Módulo 1: Fundamentos y Jerarquía de Manos**: Visualizador interactivo de las 10 jugadas con comparador rápido de manos cara a cara.
- **Módulo 2: Las 4 Fases de la Partida**: Recorrido paso a paso por Pre-flop, Flop, Turn, River y Showdown.
- **Módulo 3: Posición y Regla del 4 y 2**: Calculadora con barra deslizadora para estimar tus salidas (*Outs*) y probabilidad de victoria en 2 segundos.

### 💡 Diccionario y Glosario Instantáneo
Haz clic sobre cualquier término técnico (*Equity*, *Outs*, *Pot Odds*, *VPIP*, *PFR*, *Ciegas*) en cualquier pantalla para desplegar una ventana explicativa con analogías cotidianas y ejemplos prácticos.

---

## 🚀 Instalación y Uso Local

Si deseas ejecutar el proyecto localmente en tu ordenador:

```bash
# 1. Clonar el repositorio
git clone https://github.com/PabloAballe/poker-easy.git
cd poker-easy

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:5173/` para ver la aplicación.

---

## 🛠️ Tecnologías Utilizadas

- **Core**: React 19 + Vite 8
- **Estilos**: Tailwind CSS v4 + Design Tokens oscuros
- **Iconos & Animaciones**: Lucide React + Canvas Confetti
- **Motor de Audio**: Web Audio API (efectos de sonido táctiles sintéticos sin archivos de audio externos)
- **Matemática de Poker**: Algoritmo de evaluación de 7 cartas + Calculador Monte Carlo de Equity

---

## 📄 Licencia

Este proyecto es gratuito y libre para **uso personal y educativo no comercial** (CC BY-NC 4.0). Queda prohibida su explotación comercial o venta sin autorización expresa del autor.
