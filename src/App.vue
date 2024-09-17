<script setup>
import ScrollToTop from "@core/components/ScrollToTop.vue";
import initCore from "@core/initCore";
import { initConfigStore, useConfigStore } from "@core/stores/config";
import { hexToRgb } from "@layouts/utils";
import { useTheme } from "vuetify";

const { global } = useTheme();

// ℹ️ Sync current theme with initial loader theme
initCore();
initConfigStore();

const configStore = useConfigStore();

console.log(import.meta.env);

let showDialog = true;
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp
      :style="`--v-global-theme-primary: ${hexToRgb(
        global.current.value.colors.primary
      )}`"
    >
      <RouterView />

      <ScrollToTop />

      <v-dialog v-model="$store.state.isLoading" max-width="500">
        <v-card style="text-align: center">
          <br />
          <v-card-title>Progressing...</v-card-title>
          <v-card-text>
            <v-progress-circular indeterminate size="50"></v-progress-circular>
          </v-card-text>
          <br />
        </v-card>
      </v-dialog>
    </VApp>
  </VLocaleProvider>
</template>
