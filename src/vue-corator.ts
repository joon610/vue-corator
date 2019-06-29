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