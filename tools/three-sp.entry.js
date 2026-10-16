/* La build di three.js del sito (16.10): solo le classi che usano le due
   scene WebGL (scena3d.js, l'hero; elica3d.js, il DNA), con il tree-shaking
   di esbuild. 525 KB minificati / 134 KB gzip contro i 692 / 171 del
   three.module.min.js intero, e servita dal sito: niente connessione in più
   al CDN, che sul telefono costa. Per rigenerarla (cartella qualunque):
     npm i three@0.170.0 esbuild@0.24.0
     npx esbuild tools/three-sp.entry.js --bundle --minify --format=esm \
       --target=es2020 --legal-comments=eof --outfile=src/js/vendor/three-sp.min.js
   Se una scena usa una classe nuova, va aggiunta qui. */
export {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Object3D, Mesh, InstancedMesh, Sprite,
  MeshStandardMaterial, MeshBasicMaterial, SpriteMaterial,
  HemisphereLight, DirectionalLight, PointLight, Fog,
  Vector3, Color, Euler, Quaternion, Matrix4, MathUtils,
  Shape, Curve, ExtrudeGeometry, TubeGeometry, CylinderGeometry,
  CanvasTexture,
  NeutralToneMapping, DynamicDrawUsage, SRGBColorSpace, AdditiveBlending,
} from 'three';
