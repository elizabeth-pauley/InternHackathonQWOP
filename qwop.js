const { Engine, World, Bodies, Constraint, Render } = Matter;

const engine = Engine.create();
const world = engine.world;
const canvas = document.getElementById('my-canvas');

const render = Render.create({
    element: canvas,
    engine: engine,
    options: {
        width: 800,
        height: 600
    }
    });

const head = Bodies.rectangle(200, 200, 20, 20, { render: { fillStyle: 'skin-color' } });

document.body.appendChild(render.canvas);
Render.run(render);

world.add(world, head);
Engine.run(engine);