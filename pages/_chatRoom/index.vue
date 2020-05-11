<template>
  <div>{{ tags }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import '@/store'
@Component({})
export default class ChatRoom extends Vue {
  public async asyncData (context: any): Promise<{ tags: any }> {
    await console.log(context)
    return {
      tags: 'res[0]'
    }
  }

  public mounted () {
    console.log('sdasdsdsdasdasdasdasdsdasd')
  }
}
</script>
