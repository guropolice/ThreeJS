import * as THREE from 'three'
//https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js
console.log(THREE);

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    
    const fov = 75;   //시야각 단위 도
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;

    const scene = new THREE.Scene();

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color,intensity);
        light.position.set(-1,2,4);
        scene.add(light);    
    }

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry,color,x){
        const material = new THREE.MeshPhongMaterial({color});
        
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;  

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
      ];


    //기기의 해상도에 따라 캔버스 리사이징  
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth*pixelRatio | 0;     //어떤 문법?
        const height = canvas.clientHeight*pixelRatio | 0;   //어떤 문법?
        const needResize = canvas.width !== width || canvas.height !== height;
        if(needResize){
            renderer.setSize(width,height,false);
        }
        return needResize;
    }
    
    function render(time){
        time *= 0.001;

        if(resizeRendererToDisplaySize(renderer)){
             //카메라의 aspect(비율) 속성을 canvas의 화면 크기에 맞춰야 합니다
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
          });
    
        renderer.render(scene,camera);
    
        requestAnimationFrame(render);
    
    }
    requestAnimationFrame(render);
}

main();
