/*
    Woe be any who enter this code
*/


// Matter.js module aliases
const { Engine, Render, World, Bodies, Composite, Runner, Mouse, MouseConstraint, Constraint, Body, Events } = Matter;

const SCREEN_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = 400;

const DISTANCE_MARKER_SIZE = { h: 30, w: 10 }
const DISTANCE_MARKER_STARTING_VECTOR = { x: SCREEN_WIDTH + DISTANCE_MARKER_SIZE.w, y: CANVAS_HEIGHT - DISTANCE_MARKER_SIZE.h - 15 };
const DISTANCE_MARKER_SPEED = 10;

const distanceMarkerBody = () => Bodies.rectangle(DISTANCE_MARKER_STARTING_VECTOR.x,
    DISTANCE_MARKER_STARTING_VECTOR.y,
    DISTANCE_MARKER_SIZE.w,
    DISTANCE_MARKER_SIZE.h,
    { isSensor: true, isStatic: true });

const playerBody = () => Bodies.rectangle(100, 100, 80, 80);

const FLOOR_COLLIDE = 1;

const floorBody = () => Bodies.rectangle(0, CANVAS_HEIGHT - 30, SCREEN_WIDTH * 2, 60, {
    friction: 1, frictionStatic: 1000, mass: 10, collisionFilter: {
        category: FLOOR_COLLIDE,
    },
    render: { fillStyle: "black" }
});

const GROUND_COLLIDE = 2048;

const groundBody = () => Bodies.rectangle(0, CANVAS_HEIGHT, SCREEN_WIDTH * 2, 1, {
    isStatic: true,
    collisionFilter: {
        category: GROUND_COLLIDE
    }
});

// create an engine
var engine = Engine.create();
engine.timing.timeScale = 0.3;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: SCREEN_WIDTH,
        height: CANVAS_HEIGHT,
        wireframes: false
        // You may have other options here, leave them as they are
    }
});

// create two boxes and a ground
var ground = groundBody();
var floor = floorBody();

floor.inertia = Infinity;
floor.frictionAir = 1;


var static = false;


/* 

    LEFT LEG

*/

const LEFT_UPPER_LEG_COLLIDE = 2;
const LEFT_MID_LEG_COLLIDE = 4;
const LEFT_LOWER_FOOT_COLLIDE = 8;


var left_upperLeg = Bodies.rectangle(130, 190, 30, 80, {
    density: 1,
    mass: 100,
    friction: 1,
    frictionStatic: 1000,
    render: { fillStyle: 'red' }, isStatic: static, collisionFilter: {
        category: LEFT_UPPER_LEG_COLLIDE,
        mask: FLOOR_COLLIDE

    }
});

var left_midLeg = Bodies.rectangle(130, 200, 10, 70, {
    density: 1,
    mass: 100,
    friction: 1,
    frictionStatic: 1000,
    render: { fillStyle: 'red' }, isStatic: static, collisionFilter: {
        category: LEFT_MID_LEG_COLLIDE,
        mask: FLOOR_COLLIDE
    }
});
var left_lowerLeg = Bodies.rectangle(135, 310, 20, 10, {
    density: 1,
    friction: 1,
    frictionStatic: 1000,
    mass: 100,
    render: { fillStyle: 'red' }, isStatic: static, collisionFilter: {
        category: LEFT_LOWER_FOOT_COLLIDE,
        mask: FLOOR_COLLIDE
    }
});

/* 

    LEFT LEG JOINTS

*/

var left_kneeJoint = Constraint.create({
    bodyA: left_upperLeg,
    bodyB: left_midLeg,
    stiffness: 1,
    length: 0,
    pointA: { x: 5, y: 40 },
    pointB: { x: 5, y: -30 },
    render: {
        visible: false
    }
});

var left_ankleJoint = Constraint.create({
    bodyA: left_midLeg,
    bodyB: left_lowerLeg,
    stiffness: 1,
    pointA: { x: 0, y: 40 },
    pointB: { x: 0, y: 0 },
    length: -1,
    render: {
        visible: false
    }
});

/* 

    RIGHT LEG

*/

const RIGHT_UPPER_LEG_COLLIDE = 2;
const RIGHT_MID_LEG_COLLIDE = 4;
const RIGHT_LOWER_FOOT_COLLIDE = 8;


var right_upperLeg = Bodies.rectangle(160, 190, 30, 80, {
    density: 1,
    mass: 3,
    friction: 1,
    frictionStatic: 1000,
    render: { fillStyle: 'darkred' }, isStatic: static, collisionFilter: {
        category: RIGHT_UPPER_LEG_COLLIDE,
        mask: FLOOR_COLLIDE

    }
});

var right_midLeg = Bodies.rectangle(160, 270, 10, 70, {
    density: 1,
    mass: 2,
    friction: 1,
    frictionStatic: 1000,
    render: { fillStyle: 'darkred' }, isStatic: static, collisionFilter: {
        category: RIGHT_MID_LEG_COLLIDE,
        mask: FLOOR_COLLIDE
    }
});
var right_lowerLeg = Bodies.rectangle(165, 310, 20, 10, {
    mass: 100,
    density: 1,
    friction: 1,
    frictionStatic: 1000,
    render: { fillStyle: 'darkred' }, isStatic: static, collisionFilter: {
        category: RIGHT_LOWER_FOOT_COLLIDE,
        mask: FLOOR_COLLIDE
    }
});

/* 

    RIGHT LEG JOINTS

*/

var right_kneeJoint = Constraint.create({
    bodyA: right_upperLeg,
    bodyB: right_midLeg,
    stiffness: 1,
    length: 0,
    pointA: { x: 5, y: 40 },
    pointB: { x: 5, y: -30 },
    render: {
        visible: false
    }
});

var right_ankleJoint = Constraint.create({
    bodyA: right_midLeg,
    bodyB: right_lowerLeg,
    stiffness: 1,
    pointA: { x: 0, y: 40 },
    pointB: { x: 0, y: 0 },
    length: -1,
    render: {
        visible: false
    }
});

/*

    BODY

*/

const BODY_COLLIDE = 128;


var body = Bodies.rectangle(150, 100, 50, 100, {
    density: 1,
    mass: 10,
    isStatic: false, collisionFilter: {
        category: BODY_COLLIDE,
        mask: FLOOR_COLLIDE,
    },
    render: {
        fillStyle: "red"
    }
});

/* 

    BODY JOINTS

*/

var left_bodyHip = Constraint.create({
    bodyA: body,
    bodyB: left_upperLeg,
    pointA: { x: -20, y: 50 },
    pointB: { x: 0, y: -40 },
    length: 0,
    render: {
        visible: false
    }
});

var right_bodyHip = Constraint.create({
    bodyA: body,
    bodyB: right_upperLeg,
    pointA: { x: 0, y: 50 },
    pointB: { x: 0, y: -40 },
    stiffness: 1,
    length: 0,
    render: {
        visible: false
    }
});

/* 

    BODY MUSCLES

*/

var left_bodyBack = Constraint.create({
    bodyA: body,
    bodyB: left_upperLeg,
    render: {
        visible: false
    }
});

var right_bodyBack = Constraint.create({
    bodyA: body,
    bodyB: right_upperLeg,
    render: {
        visible: false
    }
});



/*

    MAX ANGLES

*/

// var everyX= 0;

Matter.Events.on(engine, 'beforeUpdate', () => {
    // everyX++;
    // if (everyX % 25 == 0) {
    //     console.log("mid leg: " + right_midLeg.angle);
    //     console.log("upper leg: " + right_upperLeg.angle);
    // }

    Matter.Body.setAngularVelocity(left_lowerLeg, 0);
    Matter.Body.setAngularVelocity(right_lowerLeg, 0);

    if (right_midLeg.angle < 0) {
        Matter.Body.setAngularVelocity(right_midLeg, 0);
    }

    if (right_midLeg.angle > Math.PI - 1) {
        Matter.Body.setAngularVelocity(right_midLeg, 0);
    }

    if (left_midLeg.angle < 0) {
        Matter.Body.setAngularVelocity(left_midLeg, 0);
    }

    if (left_midLeg.angle > Math.PI - 1) {
        Matter.Body.setAngularVelocity(left_midLeg, 0);
    }
});


/* 

    RENDER

*/

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
        }
    });


// keep the mouse in sync with rendering
render.mouse = mouse;

// add all of the bodies to the world
Composite.add(engine.world, [ground, floor, mouseConstraint, right_upperLeg, right_midLeg, right_lowerLeg, right_kneeJoint, right_ankleJoint, left_upperLeg, left_midLeg, left_lowerLeg, left_kneeJoint, left_ankleJoint, body, right_bodyHip, left_bodyHip, right_bodyBack, left_bodyBack]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

/* 

    LISTENERS

*/

const VALID_KEYS = ['q', 'w', 'o', 'p']
var keysDown = [];

document.addEventListener('keydown', (event) => {
    if (VALID_KEYS.includes(event.key) && !(keysDown.includes(event.key))) {
        keysDown.push(event.key)
    }
});

document.addEventListener('keyup', (event) => {
    if (VALID_KEYS.includes(event.key) && keysDown.includes(event.key)) {
        keysDown.pop(event.key);
    }
});

function gameLoop() {

    keysDown.forEach((key) => {
        if (key === 'p') {
            Matter.Body.setAngularVelocity(left_midLeg, 0.1);
        }
        else if (key === 'o') {
            Matter.Body.setAngularVelocity(right_midLeg, 0.1);
        }
        else if (key === 'w') {

            // Angle Right leg
            Matter.Body.setAngularVelocity(right_upperLeg, -0.01);
            Matter.Body.setAngularVelocity(right_midLeg, -0.005);

            // Angle left leg
            Matter.Body.setAngularVelocity(left_upperLeg, 0.01);
            Matter.Body.setAngularVelocity(left_midLeg, 0.015);
        }
        else if (key === 'q') {

            // Angle Right leg
            Matter.Body.setAngularVelocity(right_upperLeg, 0.01);
            Matter.Body.setAngularVelocity(right_midLeg, 0.005);

            // Angle left leg
            Matter.Body.setAngularVelocity(left_upperLeg, -0.01);
            Matter.Body.setAngularVelocity(left_midLeg, -0.015);

        }
    });

    requestAnimationFrame(gameLoop);
    Engine.update(engine);
    Render.world(render);
}

// Start the game loop
gameLoop();