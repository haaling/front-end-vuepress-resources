### 1. BEM 命名模式

##### BEM 是块（block）、元素（element）、修饰符（modifier）
##### 分别用连字符（supervip-mission）命名（而不是驼峰）；
```
eg:
.block__ele--modifier {
}

ps: ele和modifier不是必须的([0,2]);
```
#### BEM + 命名空间
  
### 2. tips
##### 1. 为了避免在类名改动时，影响到元素的引用：对于有引用的，如（querySelector），在类名前加【js-】；
