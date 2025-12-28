import { useControls, button } from "leva";

const Leva = () => {
    const { position, scalemodel, color } = useControls("cube", {
        position: {
            value: {
                x: 0,
                y: 0,
                z: 0
            },
            min: -10,
            max: 10,
            step: 0.5
        },
        scalemodel: {
            options: [1, 2, 3]
        },
        color: "#ffffff",
        click: button(() => {
            console.log("hello")
            
        })


    });

    return (
        <>
            <mesh position={[position.x, position.y, position.z]} scale={scalemodel}>
                <boxGeometry />
                <meshBasicMaterial color={color} wireframe={false} />
            </mesh>
        </>
    );
}

export default Leva