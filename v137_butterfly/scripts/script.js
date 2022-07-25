const Scene = require('Scene');
const Patches = require('Patches');
const Reactive = require('Reactive');
export const Diagnostics = require('Diagnostics');
(async function () {  

  const butterfly = await Scene.root.findFirst('Fluttering butterfly');
  const skeleton = await butterfly.findFirst('skeleton');
  const bones = await skeleton.findByPath('**/*');
  
  const b1 = await Scene.root.findFirst('hover');
  const skeleton1 = await b1.findFirst('skeleton');
  const bones1 = await skeleton1.findByPath('**/*');
  
  const b2 = await Scene.root.findFirst('idle');
  const skeleton2 = await b2.findFirst('skeleton');
  const bones2 = await skeleton2.findByPath('**/*');

  const blend = await Patches.outputs.getScalar('blend');
  const _blend = Reactive.val(1).sub(blend);

  bones.map((bone,i)=>{
    bones[i].transform.x = bones1[i].transform.x.mul(blend).add(bones2[i].transform.x.mul(_blend));
    bones[i].transform.y = bones1[i].transform.y.mul(blend).add(bones2[i].transform.y.mul(_blend));
    bones[i].transform.z = bones1[i].transform.z.mul(blend).add(bones2[i].transform.z.mul(_blend));
    
    bones[i].transform.rotation = bones1[i].transform.rotation.slerp(bones2[i].transform.rotation,_blend);
  });

})();
