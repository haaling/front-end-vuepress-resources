### 1. 0.5px分割线实现方式
```
1. transform: scaleX(0.5); // scaleY(0.5); border
2. background-image: linear-gradient(to right, transparent, #xxx);
（加上transform-origin: 50% 100%; 会更完美！）
 transform-origin => 改变元素变形的原点。
3. box-shadow: 0px 0.5px 0px red;
（box-shadow: ==> X轴偏移, Y轴偏移, 阴影模糊半径, 阴影扩散半径, 阴影颜色）可设置多个阴影，用"逗号"隔开。
4. svg实现：因为svg的描边的1px是1物理像素。
```

### 2. 
