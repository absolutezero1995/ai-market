    import { useRef, useEffect } from 'react';
    import * as THREE from 'three';

    const BackgroundAnimation = () => {
        const containerRef = useRef();
        let camera, scene, renderer, pyramid1, pyramid2;

        useEffect(() => {
            let mouseX = 0,
                mouseY = 0;

            const init = () => {
                const container = containerRef.current;

                camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.z = 80;

                scene = new THREE.Scene();

                const geometry = new THREE.ConeGeometry(3, 7, 4);
                const material = new THREE.MeshBasicMaterial();

                pyramid1 = new THREE.Mesh(geometry, material);
                scene.add(pyramid1);

                pyramid2 = new THREE.Mesh(geometry, material);
                scene.add(pyramid2);

                renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight);

                container.appendChild(renderer.domElement);

                document.addEventListener('mousemove', onMouseMove, false);

                animate();
            };

            const onMouseMove = (event) => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            };

            const animate = () => {
                requestAnimationFrame(animate);

                updateBackground();

                renderer.render(scene, camera);
            };

            const updateBackground = () => {
                pyramid1.material.color.setRGB(1 - Math.abs(mouseX), Math.abs(mouseX), 0.7 - Math.abs(mouseY));
                pyramid2.material.color.setRGB(1 - Math.abs(mouseX), Math.abs(mouseX), 0.7 - Math.abs(mouseY));
                

                pyramid1.rotation.x += 0.005;
                pyramid1.rotation.y += 0.005;

                pyramid2.rotation.x -= 0.005;
                pyramid2.rotation.y -= 0.010;

                camera.position.x += (mouseX - camera.position.x) * 0.8;
                camera.position.y += (-mouseY - camera.position.y) * 0.6;
                camera.lookAt(scene.position);
            };

            init();

            return () => {
                document.removeEventListener('mousemove', onMouseMove);
                if(containerRef.current) {
                    containerRef.current.removeChild(renderer.domElement);
                }
            };
        }, []);

        return (
            <div
                ref={containerRef}
                style={{
                    width: '100vh',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: -1
                }}
            />
        );
    };

    export default BackgroundAnimation;
