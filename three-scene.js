(function () {
    function createResumeScene(canvas) {
        if (!canvas || !window.THREE) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        const group = new THREE.Group();
        const accentGroup = new THREE.Group();
        const clock = new THREE.Clock();

        camera.position.set(0, 0.4, 8);
        scene.add(group);
        scene.add(accentGroup);

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
        keyLight.position.set(4, 6, 5);
        scene.add(keyLight);
        scene.add(new THREE.AmbientLight(0x9bc8ff, 0.7));

        const paperGeometry = new THREE.BoxGeometry(2.1, 2.8, 0.08);
        const blueMaterial = new THREE.MeshStandardMaterial({ color: 0x1a91f0, roughness: 0.45, metalness: 0.08 });
        const greenMaterial = new THREE.MeshStandardMaterial({ color: 0x13bba7, roughness: 0.5, metalness: 0.05 });
        const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.62, metalness: 0.02 });

        for (let i = 0; i < 5; i++) {
            const card = new THREE.Mesh(paperGeometry, i % 2 === 0 ? whiteMaterial : blueMaterial);
            card.position.set((i - 2) * 1.15, Math.sin(i) * 0.25, -i * 0.38);
            card.rotation.set(0.18, -0.28 + i * 0.08, -0.08 + i * 0.04);
            group.add(card);
        }

        const sphereGeometry = new THREE.SphereGeometry(0.12, 24, 24);
        for (let i = 0; i < 18; i++) {
            const dot = new THREE.Mesh(sphereGeometry, i % 3 === 0 ? greenMaterial : blueMaterial);
            dot.position.set(
                (Math.random() - 0.5) * 9,
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 4
            );
            accentGroup.add(dot);
        }

        function resize() {
            const width = canvas.clientWidth || canvas.parentElement.clientWidth || 800;
            const height = canvas.clientHeight || canvas.parentElement.clientHeight || 500;
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        function animate() {
            const elapsed = clock.getElapsedTime();
            group.rotation.y = Math.sin(elapsed * 0.35) * 0.18;
            group.rotation.x = Math.cos(elapsed * 0.28) * 0.08;
            accentGroup.rotation.y = elapsed * 0.12;
            accentGroup.rotation.x = elapsed * 0.04;
            renderer.render(scene, camera);
            window.setTimeout(function () {
                requestAnimationFrame(animate);
            }, 16);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    }

    window.addEventListener('DOMContentLoaded', function () {
        createResumeScene(document.getElementById('resume-3d-scene'));
        createResumeScene(document.getElementById('resume-page-3d-scene'));
    });
})();
