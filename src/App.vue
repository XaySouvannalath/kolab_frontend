<script setup>
import ScrollToTop from "@core/components/ScrollToTop.vue"
import initCore from "@core/initCore"
import { initConfigStore, useConfigStore } from "@core/stores/config"
import { hexToRgb } from "@layouts/utils"
import { useTheme } from "vuetify"

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()

const configStore = useConfigStore()

console.log(import.meta.env)

let showDialog = true
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(
      global.current.value.colors.primary
    )}`">
      <RouterView />

      <ScrollToTop />

      <VDialog v-model="$store.state.isLoading" max-width="500">
        <VCard style="text-align: center;">
          <br>
          <VCardTitle>Progressing...</VCardTitle>
          <VCardText>
            <VProgressCircular indeterminate size="50" />
          </VCardText>
          <br>
        </VCard>
      </VDialog>
    </VApp>
  </VLocaleProvider>
</template>



<script>
export default {

  created() {
    console.log("App created!")

    var token = localStorage.getItem('token')
    if (token == null) {
      this.$router.push("/login")
    }
  },
}
</script>
