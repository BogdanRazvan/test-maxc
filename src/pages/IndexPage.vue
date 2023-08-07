<template>
    <div class="container">
      <CardExternal v-for="i in 7" :key="i" style="overflow: auto" :class="`card-${i}`">
        <template v-slot:header>Card-{{i}}</template>
        <div class="q-pa-md text-neutral-1-text">
          <h1 class="text-h1">H1</h1>
          <h2 class="text-h2">H2</h2>
          <h3 class="text-h3">H3</h3>
          <h4 class="text-h4">H4</h4>

          <p class="q-mb-md p">p</p>

          <div class="q-mb-md large-600">Large600</div>
          <div class="q-mb-md large-400">Large400</div>
          <div class="q-mb-md medium-600">Medium600</div>
          <div class="q-mb-md medium-400">Medium400</div>
          <div class="q-mb-md small-800">Small800</div>
          <div class="q-mb-md small-700">Small700</div>
          <div class="q-mb-md small-600">Small600</div>
          <div class="q-mb-md small-600 text-underline">Small600 Underline</div>
          <div class="q-mb-md small-600 text-line-through">Small600 Strikethrough</div>
          <div class="q-mb-md small-400">Small400</div>
          <div class="q-mb-md small-400 text-line-through">Small400 Strikethrough</div>

          <div class="q-mb-md caption-large">Large</div>
          <div class="q-mb-md caption-small-800">Small800</div>
          <div class="q-mb-md caption-small-700">Small700</div>
          <div class="q-mb-md caption-small-600">Small600</div>

          <div class="q-mb-md button-large">Large</div>
          <div class="q-mb-md button-small">Small</div>
        </div>
      </CardExternal>
    </div>
</template>

<script setup lang="ts">
import { CardExternal } from 'app/dist/frontend'
import { useQuasar } from 'quasar'

const $q = useQuasar()

$q.screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 })
</script>
