<script setup>
import navItems from "@/navigation/vertical"

// Components
import Footer from "@/layouts/components/Footer.vue"

// @layouts plugin
import { VerticalNavLayout } from "@layouts"

// SECTION: Loading Indicator
const isFallbackStateActive = ref(false)
const refLoadingIndicator = ref(null)

watch(
  [isFallbackStateActive, refLoadingIndicator],
  () => {
    if (isFallbackStateActive.value && refLoadingIndicator.value)
      refLoadingIndicator.value.fallbackHandle()
    if (!isFallbackStateActive.value && refLoadingIndicator.value)
      refLoadingIndicator.value.resolveHandle()
  },
  { immediate: true },
)
// !SECTION
</script>

<template>
  <VerticalNavLayout :nav-items="navItems" class="black-background">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- Left side - Toggle button (on small screens) and Back button -->
        <IconBtn id="vertical-nav-toggle-btn" class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon size="26" icon="tabler-menu-2" />
        </IconBtn>

        <!-- Center - KOLAB SYSTEM -->
        <div class="kolab-logo text-center">
          K &nbsp; O &nbsp; L &nbsp; A &nbsp; B &nbsp; &nbsp; S &nbsp; Y &nbsp; S &nbsp; T &nbsp; E &nbsp; M
        </div>
      </div>
    </template>

    <AppLoadingIndicator ref="refLoadingIndicator" />
    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Suspense :timeout="0" @fallback="isFallbackStateActive = true" @resolve="isFallbackStateActive = false">
        <Component :is="Component" />
      </Suspense>
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
 


.custom-navbar,
.navbar-content-container {
  position: relative;
  justify-content: space-between;
  border-radius: 15px;
  background: linear-gradient(to right, #6975ff, #794fff, #8e54ff, #be60ff);
  color: white;
  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.navbar-content-container {
  position: relative;
  justify-content: space-between;
  border-radius: 15px;
  background: linear-gradient(to right, #6975ff, #794fff, #8e54ff, #be60ff);
  color: white;
  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.kolab-logo {
  position: absolute;
  font-size: 0.9rem;
  font-weight: 500;
  inset-inline: 0;
  letter-spacing: 1px;
}

.back-btn,
.edit-btn {
  color: white;
}
</style>
