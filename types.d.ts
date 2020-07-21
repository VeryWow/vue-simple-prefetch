import Vue from 'vue';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    fetch?(): Promise<object | void> | void | object;
  }
}
