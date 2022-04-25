import React, {Component, useRef, useState, forwardRef, Suspense, useEffect, MutableRefObject} from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import  { useTexture } from  '@react-three/drei';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '/public/styles.css';
import {DoubleSide} from "three/src/constants";

extend({OrbitControls});


var classes = {
    canvas : {
        background: '#505767',
        height: '100vh'
    },
    sphere:{
        cursor: 'pointer'
    }
};


type RefObject = {
    rotation: { x: number, y: number }
};

const Box = forwardRef((props, position) => {

    const { camera, gl: { domElement } } = useThree();

    const texture = useTexture('/textures/oneworld.jpg')
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef<RefObject>(null);
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame


    useFrame((state, delta) => {
        if(ref && ref.current){
            ref.current.rotation.y -= 0.00004
        }
    })
    // Return the view, these are regular Threejs elements expressed in JSX

    useEffect(() => {
        if(ref && ref.current) {
            ref.current.rotation.y = -350
        }
    }, []);

    // @ts-ignore
    const orbitControl = <orbitControls args={[camera, domElement]} />

    return (<>
            {orbitControl}
            <mesh
                {...props}
                ref={ref}
                scale={clicked ? 3.5 : 2}
                onClick={(event) => click(!clicked)}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}>
                <sphereGeometry attach="geometry" args={[1, 16, 200]} />
                <meshStandardMaterial map={texture} side={DoubleSide}/>
            </mesh>
    </>

    )
});


function App(){
    useEffect(() => {
        fetch("http://localhost:3000/island-info")
            .then(res => res.json())
            .then(data => console.log(data))
    })
    return (
        <Canvas style={classes.canvas}>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <Suspense fallback={<></>}>
                <Box />
            </Suspense>
        </Canvas>
    );

}

export default App;
