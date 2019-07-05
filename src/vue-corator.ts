import Vue from 'vue';
import { createDecorator } from 'vue-class-component';
export function Style(refKey?: string) {
    return createDecorator((options, key) => {
        options.computed = options.computed || {};
        options.computed[key] = {
          cache: false,
          get(this: Vue) {
              // @ts-ignore
            return this.$refs[refKey || key].style;
          },
        };
      });
  }

export function NextTick() {
  return (target: Vue, key: string, descriptor: any) => {
    const original = descriptor.value;
    descriptor.value = () => {
        Vue.nextTick(() => {
            original();
        });
      };
    const returnValue: any =  descriptor.value;
    return descriptor.value();
  };
}


export function UniqueId(key?: string) {
  return createDecorator((options, k) => {
      options.computed = options.computed || {};
      options.computed[k] = {
        cache: false,
        get(this: Vue) {
            // @ts-ignore
          return [key || k] + '-' + this._uid;
        },
      };
    });
}