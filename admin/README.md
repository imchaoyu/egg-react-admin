# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

# 命名规范

1. 文件夹
   - `components` 文件夹下子文件夹使用大驼峰；
   - 路由组件（`src/pages`）使用大驼峰法，路由组件下不应该再包含其他路由组件
   - 一系列页面推荐通过小写的单一字母做集合目录
     > 如 src/pages 下有 user 文件夹，user 下又有 Login 和 Logout 等文件夹。Login 和 Logout 表示不同的路由组件页面所以使用大驼峰法命名，但`user`不属于路由组件，只是个集合的名称，使用小写的单一字母表示。
2. 文件
   - 属于类或者组件的文件，除 index.jsx 外，使用大驼峰式命名法。
   - 其它类型的.js 文件，采用 kebab-case（即短横线）命名法。
   - \*.less 文件命名法，除 index.less 或 style.less 外，统一用 kebab-case（即短横线）命名法。
3. 组件引用导入与导出语句中采用大驼峰式，但组件的实例采用小驼峰式命名法。
4. 常量
   - 大写的下划线连接，例如：AREA_TYPES
   - 枚举（Enum 或者 Const)使用大驼峰命名
5. 变量小驼峰命名法，变量名的取名尽量体现出数据的类型，例如: count ,size 代表数字；name、message 代表字符串类型等
6. 函数
   - 函数名小驼峰命名法。
   - 函数取名用前缀采用动词：get 代表取回一个非布尔值，set 保存一个值； has、can、is 代表返回一个布尔值。
