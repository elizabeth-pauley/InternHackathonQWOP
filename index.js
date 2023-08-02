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
    frictionStatic: 100, friction: 1, mass: 10, collisionFilter: {
        category: FLOOR_COLLIDE,
    }
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
engine.timing.timeScale = 0.5;

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


var left_upperLeg = Bodies.rectangle(140, 190, 30, 80, {
    mass: 3,
    render: { fillStyle: 'red' }, isStatic: static, collisionFilter: {
        category: LEFT_UPPER_LEG_COLLIDE,
        mask: FLOOR_COLLIDE

    }
});

var left_midLeg = Bodies.rectangle(140, 270, 10, 70, {
    mass: 2,
    render: { fillStyle: 'red' }, isStatic: static, collisionFilter: {
        category: LEFT_MID_LEG_COLLIDE,
        mask: FLOOR_COLLIDE
    }
});
var left_lowerLeg = Bodies.rectangle(145, 310, 20, 10, {
    density: 1,
    mass: 1,
    frictionStatic: 100,
    render: { fillStyle: 'red' }, isStatic: static, friction: 1, collisionFilter: {
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
    stiffness: 0.5,
    length: 0,
    pointA: { x: 5, y: 40 },
    pointB: { x: 5, y: -30 },
});

var left_ankleJoint = Constraint.create({
    bodyA: left_midLeg,
    bodyB: left_lowerLeg,
    stiffness: 1,
    pointA: { x: 0, y: 40 },
    pointB: { x: 0, y: 0 },
    length: 0,
});

/* 

    LEFT LEG MUSCLES

*/

var left_hamstring = Constraint.create({
    bodyA: left_upperLeg,
    bodyB: left_lowerLeg,
    stiffness: 0.5,
    pointA: { x: 15, y: 0 },
    pointB: { x: 0, y: 0 },
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
    mass: 3,
    render: { fillStyle: 'darkred' }, isStatic: static, collisionFilter: {
        category: RIGHT_UPPER_LEG_COLLIDE,
        mask: FLOOR_COLLIDE

    }
});

var right_midLeg = Bodies.rectangle(160, 270, 10, 70, {
    mass: 2,
    render: { fillStyle: 'darkred' }, isStatic: static, collisionFilter: {
        category: RIGHT_MID_LEG_COLLIDE,
        mask: FLOOR_COLLIDE
    }
});
var right_lowerLeg = Bodies.rectangle(165, 310, 20, 10, {
    mass: 1,
    density: 1,
    frictionStatic: 100,
    render: { fillStyle: 'darkred' }, isStatic: static, friction: 1, collisionFilter: {
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
    stiffness: 0.5,
    length: 0,
    pointA: { x: 5, y: 40 },
    pointB: { x: 5, y: -30 },
});

var right_ankleJoint = Constraint.create({
    bodyA: right_midLeg,
    bodyB: right_lowerLeg,
    stiffness: 1,
    pointA: { x: 0, y: 40 },
    pointB: { x: 0, y: 0 },
    length: 0,
});

/* 

    RIGHT LEG MUSCLES

*/

var right_hamstring = Constraint.create({
    bodyA: right_upperLeg,
    bodyB: right_lowerLeg,
    stiffness: 0.5,
    pointA: { x: 15, y: 0 },
    pointB: { x: 0, y: 0 },
    render: {
        visible: false
    }
});



/*

    BODY

*/

const BODY_COLLIDE = 128;


var body = Bodies.rectangle(150, 100, 50, 100, {
    frictionStatic: 100,
    friction: 1,
    mass: 10,
    isStatic: false, collisionFilter: {
        category: BODY_COLLIDE,
        mask: FLOOR_COLLIDE,
    }
});

/* 

    BODY JOINTS

*/

var left_bodyHip = Constraint.create({
    bodyA: body,
    bodyB: left_upperLeg,
    pointA: { x: 0, y: 50 },
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
});

var right_bodyBack = Constraint.create({
    bodyA: body,
    bodyB: right_upperLeg,
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
Composite.add(engine.world, [ground, floor, mouseConstraint, right_hamstring, right_upperLeg, right_midLeg, right_lowerLeg, right_kneeJoint, right_ankleJoint, left_upperLeg, left_midLeg, left_lowerLeg, left_kneeJoint, left_ankleJoint, left_hamstring, body, right_bodyHip, left_bodyHip, right_bodyBack, left_bodyBack]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);


/* 

    MUSCLE ACTIONS

*/

function leftHamstringFlexion() {
    const forceConstraint = Constraint.create({
        bodyA: left_lowerLeg,
        bodyB: left_upperLeg,
        pointB: {x: 0, y: -30},
        stiffness: 0.05,
        length: 10,
        render: {
            visible: false
        }
    });

    // Add the force constraint to the world
    World.add(engine.world, forceConstraint);
    left_hamstring.stiffness = 0;

    // Remove the force constraint after a short delay (e.g., 1 second)
    setTimeout(() => {
        World.remove(engine.world, forceConstraint);
        left_hamstring.stiffness = 0.5;
    }, 100);
}

function rightHamstringFlexion() {
    const forceConstraint = Constraint.create({
        bodyA: right_lowerLeg,
        bodyB: right_upperLeg,
        pointB: {x: 0, y: -30},
        stiffness: 0.05,
        length: 10,
        render: {
            visible: false
        }
    });

    // Add the force constraint to the world
    World.add(engine.world, forceConstraint);
    right_hamstring.stiffness = 0;

    // Remove the force constraint after a short delay (e.g., 1 second)
    setTimeout(() => {
        World.remove(engine.world, forceConstraint);
        right_hamstring.stiffness = 0.5;
    }, 100);
}

function rightHipFlexion() {
    const forceConstraint = Constraint.create({
        bodyA: body,
        bodyB: right_upperLeg,
        pointA: {x: 10, y: 0},
        pointB: {x: 20, y: 20},
        stiffness: 0.03,
        length: 0,
        render: {
            visible: false
        }
    });

    // Add the force constraint to the world
    World.add(engine.world, forceConstraint);

    // Remove the force constraint after a short delay (e.g., 1 second)
    setTimeout(() => {
        World.remove(engine.world, forceConstraint);
    }, 100);
}

function leftHipFlexion() {
    const forceConstraint = Constraint.create({
        bodyA: body,
        bodyB: left_upperLeg,
        pointA: {x: 10, y: 0},
        pointB: {x: 20, y: 20},
        stiffness: 0.03,
        length: 0,
        render: {
            visible: false
        }
    });

    // Add the force constraint to the world
    World.add(engine.world, forceConstraint);

    // Remove the force constraint after a short delay (e.g., 1 second)
    setTimeout(() => {
        World.remove(engine.world, forceConstraint);
    }, 100);
}


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
            leftHamstringFlexion();
        }
        if (key === 'o') {
            rightHamstringFlexion();
        }
        if (key === 'w') {
            leftHipFlexion();
        }
        if (key === 'q') {
            rightHipFlexion();
        }
    });

    requestAnimationFrame(gameLoop);
    Engine.update(engine);
    Render.world(render);
}

// Start the game loop
gameLoop();