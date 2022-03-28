import React, { Component, useRef, useState, forwardRef, Suspense, useEffect  } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import  { useTexture } from  '@react-three/drei';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import '/public/styles.css';

var classes = {
    canvas : {
        background: '#505767',
        height: '100vh'
    },
    sphere:{
        cursor: 'pointer'
    }
}

const Box = forwardRef((props) => {


    const texture = useTexture('/textures/oneworld.jpg')
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame


    useFrame((state, delta) => (ref.current.rotation.y -= 0.003))
    // Return the view, these are regular Threejs elements expressed in JSX

    useEffect(() => {
        ref.current.rotation.y = -350
    }, []);

    return (
        <mesh
            {...props}
            ref={ref}
            style={classes.sphere}
            scale={clicked ? 3.5 : 2}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <sphereGeometry attach="geometry" args={[1, 16, 200]} />
            <meshStandardMaterial map={texture}/>
        </mesh>
    )
});


function App(props){
    //const { camera, gl: { domElement } } = useThree();
    return (
        <Canvas style={classes.canvas}>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <Suspense fallback={<></>}>
                <Box position={[0, 0, 0]}/>
            </Suspense>
            {false && <orbitControls args={[camera, domElement]} />}
        </Canvas>
    );

}

export default App;
