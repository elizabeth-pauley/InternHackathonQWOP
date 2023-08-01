/*
    Woe be any who enter this code
*/


// Matter.js module aliases
const { Engine, Render, World, Bodies, Composite, Runner, Mouse, MouseConstraint, Constraint, Body } = Matter;

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

const GROUND_COLLIDE = 1;
const groundBody = () => Bodies.rectangle(0, CANVAS_HEIGHT, SCREEN_WIDTH * 2, 60, { isStatic: true, friction: 1, collisionFilter: {
    category: GROUND_COLLIDE
} });

// create an engine
var engine = Engine.create();

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
var boxA = distanceMarkerBody();
var boxB = playerBody();
var ground = groundBody();


var static = false;


/* 

    LEFT LEG

*/

const LEFT_THIGH_COLLIDE = 2;
const LEFT_CALF_COLLIDE = 4;
const LEFT_FOOT_COLLIDE = 8;


var left_thigh = Bodies.rectangle(140, 190, 30, 80, { render: {fillStyle: 'red'}, isStatic: static, collisionFilter: {
    category: LEFT_THIGH_COLLIDE,
    mask: GROUND_COLLIDE

}});

var left_calf = Bodies.rectangle(140, 270, 10, 70, { render: {fillStyle: 'red'}, isStatic: static, collisionFilter: {
    category: LEFT_CALF_COLLIDE,
    mask: GROUND_COLLIDE
}});
var left_foot = Bodies.rectangle(145, 310, 20, 10, { render: {fillStyle: 'red'}, isStatic: static, friction: 1, collisionFilter: {
    category: LEFT_FOOT_COLLIDE,
    mask: GROUND_COLLIDE
} });

var left_knee = Constraint.create({
    bodyA: left_thigh,
    bodyB: left_calf,
    stiffness: 0.5,
    length: 0,
    pointA: { x: 5, y: 40 },
    pointB: { x: 5, y: -30 },
});

var left_ankle = Constraint.create({
    bodyA: left_calf,
    bodyB: left_foot,
    stiffness: 1,
    pointA: { x: -5, y: 30 },
    pointB: { x: -10, y: 0 },
    length: 0,
});

var left_kneeFootConstraint = Constraint.create({
    bodyA: left_thigh,
    bodyB: left_calf,
    stiffness: 0.1,
    length: 80,
    pointA: { x: -50, y: 50 },
    pointB: { x: 10, y: 50 },
    render: {
        visible: false
    }
});

var left_calfFootConstraint = Constraint.create({
    bodyA: left_calf,
    bodyB: left_foot,
    stiffness: 1,
    length: 50,
    pointA: { x: 30, y: 0 },
    pointB: { x: 10, y: 0 },
    render: {
        visible: false
    }
});


/* 

    RIGHT LEG

*/

const RIGHT_THIGH_COLLIDE = 16;
const RIGHT_CALF_COLLIDE = 32;
const RIGHT_FOOT_COLLIDE = 64;


var right_thigh = Bodies.rectangle(155, 190, 30, 80, { render: { fillStyle: 'darkred' }, isStatic: static, collisionFilter: {
    category: RIGHT_THIGH_COLLIDE,
    mask: GROUND_COLLIDE

}});

var right_calf = Bodies.rectangle(155, 270, 10, 70, { render: {fillStyle: 'darkred'}, isStatic: static, collisionFilter: {
    category: RIGHT_CALF_COLLIDE,
    mask: GROUND_COLLIDE
}});
var right_foot = Bodies.rectangle(160, 310, 20, 10, { render: {fillStyle: 'darkred'}, isStatic: static, friction: 1, collisionFilter: {
    category: RIGHT_FOOT_COLLIDE,
    mask: GROUND_COLLIDE
} });

var right_knee = Constraint.create({
    bodyA: right_thigh,
    bodyB: right_calf,
    stiffness: 0.5,
    length: 0,
    pointA: { x: 5, y: 40 },
    pointB: { x: 5, y: -30 },
});

var right_ankle = Constraint.create({
    bodyA: right_calf,
    bodyB: right_foot,
    stiffness: 1,
    pointA: { x: -5, y: 30 },
    pointB: { x: -10, y: 0 },
    length: 0,
});

var right_kneeFootConstraint = Constraint.create({
    bodyA: right_thigh,
    bodyB: right_calf,
    stiffness: 0.1,
    length: 80,
    pointA: { x: -50, y: 50 },
    pointB: { x: 10, y: 50 },
    render: {
        visible: true
    }
});

var right_calfFootConstraint = Constraint.create({
    bodyA: right_calf,
    bodyB: right_foot,
    stiffness: 1,
    length: 50,
    pointA: { x: 30, y: 0 },
    pointB: { x: 10, y: 0 },
    render: {
        visible: true
    }
});



/*

    BODY

*/

const BODY_COLLIDE = 128;


var body = Bodies.rectangle(150, 100, 50, 100, { isStatic: true, collisionFilter: {
    category: BODY_COLLIDE,
    mask: GROUND_COLLIDE,
}});

var leftHip = Constraint.create({
    bodyA: body,
    bodyB: left_thigh,
    pointA: { x: 0, y: 50 },
    pointB: { x: 0, y: -40 },
    length: 0,
    render: {
        visible: true
    }
});

var rightHip = Constraint.create({
    bodyA: body,
    bodyB: right_thigh,
    pointA: { x: 0, y: 50},
    pointB: { x: 0, y: -40 },
    length: 0,
    render: {
        visible: true
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
            render: {
                visible: true
            }
        }
    });


// keep the mouse in sync with rendering
render.mouse = mouse;

// add all of the bodies to the world
Composite.add(engine.world, [boxA, right_thigh, right_calf, right_foot, right_knee, right_ankle, right_calfFootConstraint, right_kneeFootConstraint, left_thigh, left_calf, left_foot, left_knee, left_ankle, ground, mouseConstraint, left_calfFootConstraint, left_kneeFootConstraint,  body, rightHip, leftHip]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// Create the game loop function
function gameLoop() {
    // var boxAPos = boxA.position.x;
    // var boxBPos = boxB.position.x;

    // if (boxAPos < 0 - DISTANCE_MARKER_SIZE.w) {
    //     Body.setPosition(boxA, DISTANCE_MARKER_STARTING_VECTOR);
    // }

    // // TODO: distance relative to player pos
    // const headerElement = document.getElementById('distanceText');
    // var headerText = headerElement.textContent;
    // headerElement.textContent = parseInt(headerElement.textContent) + DISTANCE_MARKER_SPEED;

    // // TODO: translate relative to game player
    // Body.translate(boxA, { x: -1 * DISTANCE_MARKER_SPEED, y: 0 });

    requestAnimationFrame(gameLoop);
    Engine.update(engine);
    Render.world(render);
}

// Start the game loop
gameLoop();

// run the engine
Runner.run(runner, engine);

function applyForce() {
  const forceMagnitude = 0.01; // Adjust the force magnitude as needed
  const forceConstraint = Constraint.create({
    bodyA: left_calf,
    //pointA: { x: 0, y: 10},
    pointB: { x: left_calf.position.x + 30, y: left_calf.position.y}, // The point where the force is applied
    stiffness: forceMagnitude,
    length: 0,
  });

  // Add the force constraint to the world
  World.add(engine.world, forceConstraint);

  // Remove the force constraint after a short delay (e.g., 1 second)
  setTimeout(() => {
    World.remove(engine.world, forceConstraint);
  }, 700);
}

// Add an event listener to the document for the 'keydown' event
document.addEventListener('keydown', (event) => {
  // Check if the pressed key corresponds to the character 'O' (uppercase or lowercase)
  if (event.key === 'o' || event.key === 'O') {
    applyForce();
  }
});