import React, { Component, useRef, useState  } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import  { useKTX2 } from  '@react-three/drei'
var classes = {
    canvas : {
        background: '#505767',
        height: '100vh'
    },
    sphere:{
        cursor: 'pointer'
    }
}

function Box(props) {
    //const texture = useKTX2('./oneworld.jpg')
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            style={classes.sphere}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <sphereGeometry attach="geometry" args={[1, 16, 200]} />

            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}


function App(props){
    return (
        <Canvas style={classes.canvas}>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <Box position={[0, 0, 0]}/>
        </Canvas>
    );

}

export default App;
