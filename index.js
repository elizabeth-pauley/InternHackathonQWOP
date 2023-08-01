// Matter.js module aliases
const { Engine, Render, World, Bodies, Composite, Runner, Constraint } = Matter;

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
        wireframes: false,
        background: 'grey'
    }
});

// create two boxes and a ground
// var head = Bodies.circle(canvasWidth/2, canvasHeight/2, 30, { render: { fillStyle: 'skin-color' } });
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });


// Create the head
var headRadius = 20;
var head = Bodies.circle(200, 100, headRadius, { render: { fillStyle: 'skin-color' } });

// Create the torso
var torsoWidth = 50;
var torsoHeight = 100;
var torso = Bodies.rectangle(200, 200, torsoWidth, torsoHeight, { render: { fillStyle: 'skin-color' } });

// Create the arms
var armLength = 60;
var leftArm = Bodies.rectangle(150, 200, armLength, 10, { render: { fillStyle: 'skin-color' } });
var rightArm = Bodies.rectangle(250, 200, armLength, 10, { render: { fillStyle: 'skin-color' } });

// Create the upper leg (thigh)
const thighWidth = 20;
const thighHeight = 80;
const leftThigh = Bodies.rectangle(180, 300, thighWidth, thighHeight, { render: { fillStyle: 'skin-color' } });
const rightThigh = Bodies.rectangle(220, 300, thighWidth, thighHeight, { render: { fillStyle: 'skin-color' } });



// Create the lower leg (calf)
const calfWidth = 15;
const calfHeight = 60;
const leftCalf = Bodies.rectangle(180, 370, calfWidth, calfHeight, { render: { fillStyle: 'skin-color' } });
const rightCalf = Bodies.rectangle(220, 370, calfWidth, calfHeight, { render: { fillStyle: 'skin-color' } });

// Connect the head and torso (neck joint)
var neckJoint = Constraint.create({
    bodyA: head,
    pointA: { x: 0, y: headRadius },
    bodyB: torso,
    pointB: { x: 0, y: -torsoHeight / 2 },
    stiffness: 0.8,
    render: {
        visible: false
    },
    length: 0
});

// Connect the arms and torso
var leftArmJoint = Constraint.create({
    bodyA: leftArm,
    pointA: { x: -armLength / 2, y: 0 },
    bodyB: torso,
    pointB: { x: -torsoWidth / 2, y: 0 },
    stiffness: 0.8,
    render: {
        visible: false
    },
    length: 0
});

var rightArmJoint = Constraint.create({
    bodyA: rightArm,
    pointA: { x: armLength / 2, y: 0 },
    bodyB: torso,
    pointB: { x: torsoWidth / 2, y: 0 },
    stiffness: 0.8,
    render: {
        visible: false
    },
    length: 0
});

// Connect the thighs and torso
const leftThighJoint = Constraint.create({
    bodyA: leftThigh,
    pointA: { x: 0, y: -thighHeight / 2 },
    bodyB: torso,
    pointB: { x: -torsoWidth / 4, y: torsoHeight / 2 },
    stiffness: 0.8,
    render: {
        visible: false
    },
    length: 0
  });

  const rightThighJoint = Constraint.create({
    bodyA: rightThigh,
    pointA: { x: 0, y: -thighHeight / 2 },
    bodyB: torso,
    pointB: { x: torsoWidth / 4, y: torsoHeight / 2 },
    stiffness: 0.8,
    render: {
        visible: false
    },
    length: 0
  });

  // Connect the calves and thighs (knee joint)
  const leftKneeJoint = Constraint.create({
    bodyA: leftThigh,
    pointA: { x: 0, y: thighHeight / 2 },
    bodyB: leftCalf,
    pointB: { x: 0, y: -calfHeight / 2 },
    stiffness: 0.8,
    render: {
        visible: false
    },
    length: 0
  });

  const rightKneeJoint = Constraint.create({
    bodyA: rightThigh,
    pointA: { x: 0, y: thighHeight / 2 },
    bodyB: rightCalf,
    pointB: { x: 0, y: -calfHeight / 2 },
    stiffness: 0.8,
    render: {
        visible: false
    },
    length: 0
  });

Composite.add(engine.world, [ground]);
Composite.add(engine.world, [head, torso, leftArm, rightArm, leftThigh, rightThigh, leftCalf, rightCalf]);
Composite.add(engine.world, [neckJoint, rightArmJoint, leftArmJoint, leftThighJoint, rightThighJoint, leftKneeJoint, rightKneeJoint]);


Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);