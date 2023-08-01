const { Engine, Render, World, Bodies } = require('matter-js');

// Create an engine
const engine = Engine.create();

// Create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
});

// Create some bodies (example)
const box = Bodies.rectangle(200, 200, 80, 80);
const ground = Bodies.rectangle(400, 600, 800, 60, { isStatic: true });

// Add the bodies to the world
World.add(engine.world, [box, ground]);

// Start the engine
Engine.run(engine);

// Start the renderer
Render.run(render);
