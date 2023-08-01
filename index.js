// Matter.js module aliases
const { Engine, Render, World, Bodies, Composite, Runner } = Matter;

// create an engine
var engine = Engine.create();
const canvas = document.getElementById('canvas');
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;

var render = Render.create({
    element: canvas,
    engine: engine,
    options: {
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        wireframes: false
    }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(200, 200, 80, 20);
var boxB = Bodies.rectangle(250, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);


Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);