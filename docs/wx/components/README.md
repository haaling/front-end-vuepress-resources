# 自定义组件

## 组件模板和样式
wxml && wxss

### 组件模板
`slot` 同vue;
```
<slot name="header"></slot>
...

<view slot="header"></view>
```

若使用具名`slot`, 则需要另外配置：
```
options: {
    multipleSlots: true,
}
```

### 组件样式
1. 无id选择器、标签名选择器、属性选择器
2. 组件可以指定它所在节点的默认样式 :host 选择器；
```
:host {
    color: yellow
}
```

### 组件样式隔离
1. `app.wxss` 或页面的`wxss`中使用了标签名选择器（或一些其他特殊选择器）来直接指定样式，这些选择器会影响到页面和全部组件（不推荐）;
2. `styleIsolation`
```
options: {
    styleIsolation: 'isolated' // 启用样式隔离：在自定义组件内外 `.class`指定的样式将不会相互影响
    还可以取值：
    apply-shared -- 页面的wxss样式将影响到自定义组件 反过来不会
    shared -- 互相影响（组件必须也设置为apply-shared or shared）
} 
```

### 外部样式类

组件可以接受外部传入的样式类 在`Component` 中用`externalClasses` 定义段定义若干个外部样式类
```
Component({
    externalClasses: ['my-class']
})
...
<custom-component class="my-class">这段文本的颜色由my-class 决定<custom-component>
```

### 引用页面或父组件的样式
即使启用了样式隔离`isolated` 组件仍然可以在局部引用组件所在页面的样式或父组件的样式
1. 如页面`wxss`定义了
```
.blue-text {
    color: blue;
}
```
在这个组件中可以用 `~` 来引用这个类的样式
```
<view class="~blue-text">blue</view>
```
2. 如果在一个组件的父组件`wxss`中定义了
```
.red-text {
    color: red;
}
```
在这个组件中可以用 `^` 来引用这个类的样式
```
<view class="^red-text">red</view>
```
也可以连续使用多个`^`来引用祖先组件中的样式。



## Component构造器

用于定义组件

```
Component({
    properties: {},
    behaviors: [],
    data: {},
    // 生命周期函数
    lifetimes: {
        attached: function() {}, // 会覆盖外部定义的生命周期函数
        moved: function() {},
        detached: function() {}
    },
    // 组件所在页面的生命周期
    pageLifetimes: {
        show: function() {},
        hide: function() {},
        resize: function() {}
    }
    methods: {
        // 
    }
})
```


### 使用Component构造器构造**页面**

+ 小程序的**页面**也可视为自定义组件, 也可用Component 构造器 -- 需要在.json 文件里使用 `usingComponents` 字段。

+ 组件的属性可接收来自于页面的参数(其实页面也是一个或多个组件组合的)。
如：访问页面`/pages/index/index?paramA=123&paramB=xyz`, 如果（组成该页面的）组件里有声明`paramA`或`paramB`, 则它们会被赋值为`123`和`xyz`。

+ 页面生命周期方法应放在`methods` 里。

*好处是, 可以使用`behaviors` 来提取所有页面中公用的代码段。*
```
// common-behavior.js
module.exports = Behavior({
    attached: function() {},
    detached: function() {}
})

var pageABehaviors = require('./common-behavior');
Component({
    behaviors: [pageABehaviors]
})
```


## 组件间通信与事件

1. 组件间通信
    + 父->子组件通信（通过属性 同vue）;
    + 子->父组件通信（事件）;
    + 父组件可以通过`this.selectComponent` 方法获取子组件的实例对象（类似于ref）.

2. 监听事件
    `bind:myEvent` (同vue)

3. 触发事件
    `triggerEvent` -- 指定事件名`myEvent`、`detail对象`和事件选项。
```
<button bindtap="onTap"></button>

Component({
  ...
  methods: {
    onTap: function() {
      var detail = {};
      // 包括 `bubbles` -- 冒泡 ; `composed` -- 穿越组件边界; `capturePhase` -- 捕获
      var options = {}, 
      this.triggerEvent('myEvent', detail, options);
    }
  }
})
```


## **组件**生命周期

1. `created`: 组件实力刚被创建好; 此时还不能调用`this.setData()`; 通常在此期间给组件`this`添加一些自定义属性字段；
2. `attached`: (同`mounted`); 组件完全被初始化完毕;
3. `detached`: 组件离开页面节点 或 退出当前页面时。


### 组件所在页面的生命周期
```
pageLifetimes: {
  show: ...;
  hide: ...;
  resize: ...;
}
```

## behaviors

用于组件间代码共享的特性 -- 属性、数据、生命周期函数和方法。


### 组件中使用
1. 生命周期函数： 先触发`require`进来的`behavior`, 再触发组件自身的`behavior`;
2. 字段的覆盖和组合规则：
  + 属性、方法：组件覆盖；如果是多个`behavior`, 则后面的覆盖前面的;
  + 数据：如果是对象类型, 则会合并；否则覆盖。
  + 生命周期函数：不会覆盖, 会在特定的调用时期触发。如果一个`behavior`被多个组件引用, 只调用一次。

### 内置`behavior`


## 组件间关系(未完)

### 定义和使用组件间关系
自定义组件嵌套自定义组件, 可以在组件定义中加入 `relations` 字段。
如：
```
// path/to/custom-ul.js;
Component({
  relations: {
    './custom-li': {
      type: 'child',
      ...
    }
  },
  methods: {
    _getAllLi: function() {
      var nodes = this.getRelationNodes('path/to/custom-li'); // 包含所有已关联的custom-li, 且有序。
    }
  }
})

// path/to/custom-li.js
Component({
  relaitions: {
    'custom-ul': {
      type: 'parent',
      ...
    }
  }
})
```

***必须在两个组件中都定义relations(必须对应)***

### 关联一类组件
对应`ancestor`和`descendant`.


## 数据监听器
`observers`
回顾：`data`都需要用`this.setData({})`来修改。


## 纯数据字段

### 数据中
不用于界面渲染的data数据;
```
  options: {
    pureDataPattern: /^_/, // 指定所有 _ 开头的数据字段为纯数据字段。
  }
```

### 属性中
同, 只要符合`pureDataPattern`;

纯数据字段需要用数据监听器`(observers)`


## 抽象节点
类似于vue中的 动态组件 => `is` 来确定使用哪个组件；但更局限。
```
// select-group.wxml 
<!-- 抽象节点 -->
<selectable></selectable>
```

1. 使用"动态"组件的.json 文件中必须加入
```
"componentGenerics": {
  "selectable": true, // selectable 是自定义的; 为抽象组件的标签名。
}
```

2. 在使用包含抽象节点的组件中：
```
xxx 为具体的组件名; 只能是静态值...不适用于动态决定节点名的场景。
<view>
  <select-group generics:select="xxx"></select-group>
</view>
```

3. 在该组件里.json 文件里引入涉及到的组件。

还可以给抽象节点指定一个默认节点：
将"动态组件"的.json 文件改成
```
"componentGenerics": {
  "selectable": {
    "default": "./defaultComponent" // 路径
  }
}
```

## 自定义组件扩展

## 开发第三方自定义组件

## 单元测试
