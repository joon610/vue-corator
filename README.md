# Vue Corator


## License

MIT License

## Install

```bash
npm i -S vue-corator
```

## Usage

- [`@Render`](#Render)
- [`@Style`](#Style)   'will be change name or remove
- [`@NextTick`](#NextTick)
- [`@ScopedId`](#ScopedId)

## See also

### <a id="Render"></a> `@Render(componentName?:string)` decorator


```html
<template>
  <good :items="data" title="Vue corator"></good>
</template>
```

```ts
import {Render} from 'vue-corator'
@Component
export default class YourComponent extends Vue {

    private data = ['hello', 'Functional Component'];

    @Render()
    private good(items: any, title: any) {
      return  `
            <div>
             <b> {{ title }} </b>
              <ul>
                <li v-for="(item,index) in items" :key="index">
                      {{ item }}
                </li>
              </ul>
            </div>`;
    }
}
``` 
### should be setup 
```js
//if you use Vue CLI3.0
//vue.config.js
module.exports ={
    runtimeCompiler:true
}
```
or
``` js
//webpack
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  }
}
```
See also: [Runtime + Compiler vs. Runtime only.](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only)


### <a id="vStyle"></a> `@vStyle()` decorator

```html
<template>
  <div>
    <styleTagName1>
      .title { background:red }
    </styleTagName1>   
    <styleTagName2>
       @import "./assets/test.css"
    </styleTagName2> 
  </div>
</template>
```
```ts
import {vStyle} from 'vue-corator'
@Component
export default class YourComponent extends Vue {

  @Style()
  private styleTagName1() {
    return `
        .title { background:pink }
    `;
  }
  @Style()
  private styleTagName2() {
    return '@import "./assets/test.css"';
  }

}
```

### <a id="NextTick"></a> `@NextTick()` decorator

```ts
import { NextTick } from 'vue-corator'
@Component
export default class YourComponent extends Vue {
  @NextTick()
  private methodName(){
    this.method1();
  }
}
```
Is equivalent

```ts
@Component
export default class YourComponent extends Vue {
  private mounted() {
    this.$nexttick(()=>{
      this.method1();
    })
  }
}
```

### <a id="ScopedId"></a> `@ScopedId(Key?: string)` decorator

```ts
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ScopedId } from 'vue-corator';
@Component
export default class YourComponent extends Vue {
  @ScopedId() yourUniqueId!: string 
  @ScopedId('customName') yourUniqueId!: string 
}
```
you can get component  data-v-<hash> data