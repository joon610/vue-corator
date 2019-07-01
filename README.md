# Vue Corator


## License

MIT License

## Install

```bash
npm i -S vue-corator
```

## Usage

- [`@Style`](#Style)
- [`@NextStick`](#NextStick)

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
@Component
export default class YourComponent extends Vue {

  private mounted() {
    this.$refs.yourRefName.style;
    const customName = this.$refs.Refname.style;
  }
}

```
### <a id="NextStick"></a> `@NextStick()` decorator

```ts
import { NextStick } from 'vue-corator'
@Component
export default class YourComponent extends Vue {
  @NextStick()
  private methodName(){
    this.method1();
  }
}
```
is equal

```ts
@Component
export default class YourComponent extends Vue {

  private created() {
    this.$nexttick(()=>{
      this.method1();
    })
  }
}
