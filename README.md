# Vue Corator


## License

MIT License

## Install

```bash
npm i -S vue-corator
```

## Usage

- [`@Style`](#Style)
- [`@NextTick`](#NextTick)

## See also

### <a id="Style"></a> `@Style(refKey?: string)` decorator

```ts
import {Style} from 'vue-corator'
@Component
export default class YourComponent extends Vue {
  @Style() yourRefName: CSSStyleDeclaration
  @Style('Refname') customName: CSSStyleDeclaration
}
```
is equal

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
　　　//refを登録
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
    //作成したDecorator
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
is equal

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
