// Matter.js module aliases
const { Engine, Render, World, Bodies, Composite, Runner, Mouse, MouseConstraint, Constraint, Body } = Matter;

const SCREEN_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = 400;

const DISTANCE_MARKER_SIZE = { h: 30, w: 10 }
const DISTANCE_MARKER_STARTING_VECTOR = { x: SCREEN_WIDTH + DISTANCE_MARKER_SIZE.w, y: CANVAS_HEIGHT - DISTANCE_MARKER_SIZE.h - 15};
const DISTANCE_MARKER_SPEED = 10;

const distanceMarkerBody = () => Bodies.rectangle(DISTANCE_MARKER_STARTING_VECTOR.x,
    DISTANCE_MARKER_STARTING_VECTOR.y,
    DISTANCE_MARKER_SIZE.w,
    DISTANCE_MARKER_SIZE.h,
    { isSensor: true, isStatic: true });

const playerBody = () => Bodies.rectangle(100, 100, 80, 80);
const groundBody = () => Bodies.rectangle(0, CANVAS_HEIGHT, SCREEN_WIDTH * 2, 60, { isStatic: true });

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: SCREEN_WIDTH,
        height: CANVAS_HEIGHT
        // You may have other options here, leave them as they are
    }
});

// create two boxes and a ground
var boxA = distanceMarkerBody();
var boxB = playerBody();

var ground = groundBody();

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// Create the game loop function
function gameLoop() {

    var boxAPos = boxA.position.x;
    var boxBPos = boxB.position.x;

    if (boxAPos < 0 - DISTANCE_MARKER_SIZE.w) {
        Body.setPosition(boxA, DISTANCE_MARKER_STARTING_VECTOR);
    }

    // TODO: distance relative to player pos
    const headerElement = document.getElementById('distanceText');
    var headerText = headerElement.textContent;
    headerElement.textContent = parseInt(headerElement.textContent) + DISTANCE_MARKER_SPEED;



    // TODO: translate relative to game player
    Body.translate(boxA, { x: -1 * DISTANCE_MARKER_SPEED, y: 0 });

    requestAnimationFrame(gameLoop);
    Engine.update(engine);
    Render.world(render);
}

// Start the game loop
gameLoop();

// run the engine
Runner.run(runner, engine);