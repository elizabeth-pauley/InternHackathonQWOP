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

// Create the legs
var legLength = 80;
var leftLeg = Bodies.rectangle(180, 300, 10, legLength, { render: { fillStyle: 'skin-color' } });
var rightLeg = Bodies.rectangle(220, 300, 10, legLength, { render: { fillStyle: 'skin-color' } });

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
    length: 5
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
    length: 5
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
    length: 5
});

// Connect the legs and torso
var leftLegJoint = Constraint.create({
    bodyA: leftLeg,
    pointA: { x: 0, y: legLength / 2 },
    bodyB: torso,
    pointB: { x: -10, y: torsoHeight / 2 },
    stiffness: 0.8,
    render: {
        visible: false
    },
    length: 5
});

var rightLegJoint = Constraint.create({
    bodyA: rightLeg,
    pointA: { x: 0, y: legLength / 2 },
    bodyB: torso,
    pointB: { x: 10, y: torsoHeight / 2 },
    stiffness: 0.8,
    // render: {
    //     visible: false
    // },
    length: 5
});


Composite.add(engine.world, [ground]);
Composite.add(engine.world, [head, torso, leftArm, rightArm, leftLeg, rightLeg]);
Composite.add(engine.world, [neckJoint, leftArmJoint, rightArmJoint, leftLegJoint, rightLegJoint]);


Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);