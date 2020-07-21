const eventsPlugins = (Vue) => {
  Vue.mixin({
    beforeCreate() {
      Vue.util.defineReactive(this, '$fetchState', {
        pending: false,
        error: null,
      });
    },
    async created() {
      let options = this.$options;
      let fetchMethod = options.fetch;

      if (fetchMethod && typeof fetchMethod === 'function') {
        try {
          this.$fetchState.pending = true;
          this.$fetchState.error = null;
          const result = await fetchMethod.apply(this);

          if (result && typeof result === 'object') {
            for (const key in result) {
              Vue.util.defineReactive(this, key, result[key]);
            }
          }
        } catch (error) {
          this.$fetchState.error = error;
        } finally {
          this.$fetchState.pending = false;
        }
      }
    },
  });
};

export default eventsPlugins;
