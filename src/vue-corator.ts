import Vue from 'vue'
import { createDecorator } from 'vue-class-component';

export function Super(component: any) {
    return createDecorator((options, k) => {
      options.computed = options.computed || {};
      options.computed[k] = {
        cache: false,
        get(this: Vue) {
            return new component();
        },
      };
    });
}

export function Style() {
    return (target: Vue, key: string, descriptor: PropertyDescriptor) => {
      const style = descriptor.value();
      createDecorator((options, k) => {
        const newComponent = {
          // @ts-ignore
          render(createElement: any) {
              // @ts-ignore
            const styleScoped = style.replace(/{./gi, '[' + options._scopeId + '] {');
            return createElement('style',
                  { attrs: { type: 'text/css', lang: 'css'} },
                  // @ts-ignore
                  [this.$slots.default || styleScoped ]);
          }
        };
        options.components = options.components || {};
        options.components[key] = newComponent;
      })(target, key);
    };
  }

export function NextTick() {
    return (target: Vue, key: string, descriptor: any) => {
        const method = descriptor.value;
        descriptor.value = () => {
            Vue.nextTick(() => {
                method();
            });
        };
        const returnValue: any = descriptor.value;
        return descriptor.value();
    };
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
            functional: true,
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
  
export function ScopedId(key?: string) {
    return createDecorator((options, k) => {
        options.computed = options.computed || {};
        options.computed[k] = {
            cache: false,
            get(this: Vue) {
                // @ts-ignore
                return this.$options._scopeId;
            },
        };
    });
}

