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

### 2. 【进阶版本】0.5px border如何实现？
```
1. border-image[wip]

2. 利用transform: scale(0.5)复杂一点。
主要思想是：包一层div, 然后添加一个子元素, 设置border（与原需要border的元素平级, 原元素不设置border）。
先用transform: scale(0.5)把另外添加的子元素缩小50%；border也会跟着缩小。再用top/right/bottom/left: -50%来使容器回到之前的大小。
原元素不变。
即：
原来的html结构：
<div class="main"></div>
现在的：
<div class="wrapper"> // 具体情况酌情处理
 <div class="main"></div>
 <div class="border"></div>
</div>

css: 

.wrapper {
 width: 200px;
 height: 200px;
 position: relative; // 给 border 定位
}
.border {
 border: 1px solid #000;
 transform: scale(0.5);
 position: absolute;
 left: -50%;
 top: -50%;
 right: -50%;
 bottom: -50%;
}

