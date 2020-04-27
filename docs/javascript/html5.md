### HTML5 为我们带来了什么？

1. 语义：更多标签
2. 连通性： 与服务器通信的新方式
3. 离线和存储：在客户端本地存储
4. 多媒体： video && audio
5. 2D/3D 绘图
6. 性能和集成
7. 设备访问（devices access）
8. 样式设计


#### 1. 语义
+  区块、段落
``` 
<section>
<article>
<nav>
<header>
<footer>
<aside>
<hgroup>: 标题的集合，即目录。
```

表单改进：
强制校验API; 属性 伪类来设置```:valid```和```:invalid```的样式提醒。

其他语义话元素
```
<time>
<mark>
<figure>
<figcaption>
<data>
<output>
<progress>
<meter>
<main>
```

```iframe```改进
：内联框架元素：将另外一个html页面嵌入到当前页面

```MathML```允许嵌入数学公式。


#### 4. ```video & audio```
更多属性、方法和事件。
##### 插嘴讲两句：
监听事件，调用方法。
事件 => 组件自身触发的；
方法 => 外部主动调用组件自身的方法。如```video.play()```；先获取```video```这个DOM元素，再调用这个元素的play()方法。

#### 2. 通信：```web sockets```
允许页面与服务器建立持久连接并交换非html数据；
```WebSocket```
用于连接Web Socket服务器的主要接口，之后可以在这个连接上发送和接收数据。
```closeEvent```
连接关闭时，Web Socket对象发送的事件。
```MessageEvent```
当从服务器获取到消息时，Web Socket触发的事件。

1. 建立连接
2. 交换数据
3. 数据帧格式
4. 维持连接

WebRTC -- Web real-time communication;


#### 3. 离线与存储
indexedDB -> noSQL -> 非关系型数据库

#### 5. canvas
