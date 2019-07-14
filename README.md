# Vue Corator


## License

MIT License

## Install

```bash
npm i -S vue-corator
```

## Usage

- [`@Render`](#Render)
- [`@Style`](#Style)
- [`@NextTick`](#NextTick)
- [`@UniqueId`](#UniqueId)

## See also

### <a id="Render"></a> `@Render()` decorator


```html
<template>
  <good :items="data" title="hello world"></good>
</template>
```

```ts
import {Render} from 'vue-corator'
@Component
export default class YourComponent extends Vue {

    private data = ['hello', 'function render'];

    @Render()
    private good(itmes:any, title:any) {
      return `
              <ul>
              <li v-for="item in items">
              {{ title }} {{ item }}
              </li>
              </ul>`;
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


### <a id="Style"></a> `@Style(refKey?: string)` decorator

```ts
import {Style} from 'vue-corator'
@Component
export default class YourComponent extends Vue {
  @Style() yourRefName: CSSStyleDeclaration
  @Style('Refname') customName: CSSStyleDeclaration
}
```
Is equivalent

```ts
import { NextTick } from 'vue-corator'
@Component
export default class YourComponent extends Vue {

  private mounted() {
    this.$refs.yourRefName.style;
    const customName = this.$refs.Refname.style;
  }
}
```
### How to use
```html
<template>
<div>
    <div class="test-box" ref="testBox"></div>
    <button class="green-button" @click="onclickGreen()">Green Button</button>
    <button class="blue-button" @click="onclickBlue()">blue Button</button>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Style } from '@/utils/StyleDeco';
@Component
export default class ComponentName extends Vue {
    @Style()　
    private testBox!: CSSStyleDeclaration;

    private onclickGreen() {
        this.testBox.backgroundColor = 'green';
    }
    private onclickBlue() {
        this.testBox.backgroundColor = 'blue';
    }
}
</script>
```
![](/assets/style-decorator.gif)


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
import { NextTick } from 'vue-corator'
@Component
export default class YourComponent extends Vue {

  private created() {
    this.$nexttick(()=>{
      this.method1();
    })
  }
}
```

### <a id="UniqueId"></a> `@UniqueId(Key?: string)` decorator

```ts
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UniqueId } from '../utils/StyleDeco';
@Component
export default class YourComponent extends Vue {
  @UniqueId() yourUniqueId!: string 
  @UniqueId('customName') yourUniqueId!: string 
}
```
Is equivalent

```ts
import { NextTick } from 'vue-corator'
@Component
export default class YourComponent extends Vue {

  private yourUniqueId!: string;
  private customName!: string;

  private created() {
    this.yourUniqueId = 'yourUniqueId' + this._uid;
    this.yourUniqueId = 'customName' + this._uid;
  }
}
```
