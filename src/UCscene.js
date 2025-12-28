import { Grid } from '@react-three/drei'
import React from 'react'

const UCscene = () => {
    return (
        <>
            <Grid args={[10, 10]}
                sectionColor="blue"
                cellColor="white"
                sectionSize={1}
                cellSize={0.25}
                sectionThickness={1.5}
                fadeDistance={20}
                fadeStrength={0.25}
            />
            <mesh>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
        </>
    )
}

export default UCscene