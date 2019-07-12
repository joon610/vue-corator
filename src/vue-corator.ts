import Vue from 'vue'
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
    const method = descriptor.value;
    descriptor.value = () => {
        Vue.nextTick(() => {
            method();
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

export function Render(...props: string[]) {
  return (target: Vue, key: string, descriptor: any) => {
    const template = descriptor.value();
    const compiledTemplate = Vue.compile(template);
    const newComponent = {
      props: props,
      render(createElement: any) {
        return compiledTemplate.render.call(this, createElement);
      }
    };
    createDecorator((options, k) => {
      options.components = options.components || {};
      options.components[key] = newComponent;
    })(target, key);
  };
}