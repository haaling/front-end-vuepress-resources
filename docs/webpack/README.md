# [WIP]
## conceptions

### 1. entry 
指示Webpack应该使用哪个文件,来作为构建其内部依赖图的开始。输出为bundles

### 2. output
输出bundles至哪个文件夹，默认为 ./dist;

### 3. module
webpack中一切皆模块，一个模块对应一个文件。从entry递归找到所有依赖的模块（如何递归？）

### 4. chunk
一个chunk 由多个module组成，用于代码合并和分割。

### 5. loader
loader让webpack 能够去处理那些非javascript文件，因为webpack自身只能理解JS（why？）

### 6. plugin
loader用来转换某些类型的模块，而plugin可以执行范围更广的任务。
从打包优化和压缩，一直到重新定义环境中的变量。

## 构建过程：
串行过程：
1. 初始化参数：从配置文件和shell语句中（？）读取和合并参数，得出最终的参数。
2. 开始编译：用上一步得到的参数初始化Compiler对象，加载所有配置的插件，执行对象的run方法开始执行编译。
3. 确定入口
4. 编译模块：loader
5. 输出编译后的内容及依赖关系
6. 输出资源.


eg: 
1. 定义Compiler类 
```
// webpack.config.js
class Compiler {
  constructor(options) {
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }
  
  run() {}
  generate() {} // 重写require函数, 输出bundle
}
```

2. 解析入口文件 获取ast(@babel/parser)
```
const parser = require(@babel/parser);
const options = require(./webpack.config);
const Parser = {
  getAst: (path) => {
    const content = fs.readFileSync(path, 'utf-8');
    return parser.parse(content, {
      sourceType: 'module'
    })
  }
}

...
new Compiler(options).run();

...
run() {
  const ast = Parser.getAst(this.entry);
}

```

3. 找出所有依赖的模块
```
const traverse = require(@babel/traverse).default;


getDependencies: (ast, filename) => {
  const dependencies = {}
  // 遍历所有模块 存入dependencies
  traverse(ast, {
    ImportDeclaration({node}) {
        const dirname = path.dirname(filename)
        const filepath = './' + path.join(dirname, node.source.value);
        dependencies[node.source.value] = filepath
    }
  })
  return dependencies
}

...
run() {
  ...
  const dependencies = Parser.getDependencies(ast, this.entry)
}

```

4. AST转化为code
const { transformFromAst } = require(@babel/core)

...
getCode: (ast) => {
  const { code } = transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  return code
}

5. 递归解析所有依赖项 生成依赖关系图
```
run() {
  const info = this.build(this.entry)
  this.modules.push(info)
  this.modules.forEach(({ dependencies }) => {
    if (dependencies) {
      for (const d in dependencies) {
        this.modules.push(this.build(dependencies[d]))
      }
    }
  })
  const dependencyGraph = this.modules.reduce(
    (graph, item) => ({
      ...graph,
      [item.filename]: {
        dependencies: item.dependencies,
        code: item.code
      }
      }),
    {}
  )
}

build(filename) {
  ...
  const code = Parser.getCode(ast);
  return {
    ...
    code
  }
}
```


6. 重写require函数 输出bundle

