# Vue Corator


## License

MIT License

## Install

```bash
npm i -S vue-property-decorator
```

## Usage

- [`@Style`](#Style)

## See also

### <a id="Style"></a> `@Style(refKey: string)` decorator

```ts
import {Style} from 'vue-corator'
@Component
export default class YourComponent extends Vue {
  @Style() yourRefName: CSSStyleDeclaration
  @Style('Refname') customName: CSSStyleDeclaration
}
```
is
```ts
this.$refs.yourRefName.style
cosnt customName = this.$refs.Refname.style

```

don't use StyleBinding 
