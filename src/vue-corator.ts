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

export function Render(componentName?: string) {
  return (target: Vue, key: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    const compiledTemplate = Vue.compile(method());
    const execParameta = /(?=\(([^)]*)\))(?=[^,]+)/g;
    const paramArray = execParameta.exec(method);
    const parameta = paramArray !== null ? paramArray[1].replace(/\s*/g, '') : ''; // remove space
    const props = parameta.split(',');
    const newComponent = {
      props,
      render(createElement: any) {
        return compiledTemplate.render.call(this, createElement);
      }
    };
    createDecorator((options, k) => {
      options.components = options.components || {};
      options.components[componentName || key] = newComponent;
    })(target, key);
  };
}