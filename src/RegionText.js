import { h, ref, defineComponent, watchEffect } from 'vue'
import { validModel } from './utils/helper'
import { modelToRegion, regionToText } from './utils/parse'

export default defineComponent({
  name: 'RegionText',
  props: {
    modelValue: { type: Object, default: undefined },
    separator: { type: String, default: '' }
  },
  setup (props) {
    const text = ref('')
    watchEffect(async () => {
      if (!validModel(props.modelValue)) return

      try {
        const resp = await modelToRegion(props.modelValue)
        text.value = regionToText(resp).join(props.separator)
      } catch (error) {
        console.error('Error converting model to text:', error)
        text.value = 'convert error'
      }
    })

    return () => h('span', text.value)
  }
})
