<script setup>
</script>

<template>
  <!-- {{ defaultPhoto }} -->
  <div>
    <!-- <VAvatar class="cursor-pointer" color="primary" variant="tonal"> -->
    <!-- <VImg :src="defaultPhoto" /> -->



    <VBtn class="cursor-pointer" variant="outlined" color="primary">
      <VIcon start color="primary" icon="tabler-user">
      </VIcon>
      {{ getFullname() }}
    </VBtn>



    <!-- SECTION Menu -->
    <VMenu activator="parent" width="230" location="bottom end" offset="14px">
      <VList>
        <!-- 👉 User Avatar & Name -->
        <!-- <VListItem> -->
        <!-- <template #prepend> -->
        <!-- <VListItemAction start> -->
        <!-- <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success"> -->
        <!--
          <VAvatar color="primary" variant="tonal">
          <VImg :src="avatar1" />
          </VAvatar> 
        -->


        <!-- </VBadge> -->
        <!-- </VListItemAction> -->
        <!-- </template> -->

        <!--
          <VListItemTitle class="font-weight-semibold">
          {{ getFullname() }}
          </VListItemTitle> 
        -->
        <!-- <VListItemSubtitle>Admin</VListItemSubtitle> -->
        <!-- </VListItem> -->

        <!-- <VDivider class="my-2" /> -->

        <!-- 👉 Profile -->
        <!--
          <VListItem link>
          <template #prepend>
          <VIcon
          class="me-2"
          icon="tabler-user"
          size="22"
          />
          </template>

          <VListItemTitle>Profile</VListItemTitle>
          </VListItem> 
        -->

        <!-- 👉 Settings -->
        <!--
          <VListItem link>
          <template #prepend>
          <VIcon
          class="me-2"
          icon="tabler-settings"
          size="22"
          />
          </template>

          <VListItemTitle>Settings</VListItemTitle>
          </VListItem> 
        -->

        <!-- 👉 Pricing -->
        <!--
          <VListItem link>
          <template #prepend>
          <VIcon
          class="me-2"
          icon="tabler-currency-dollar"
          size="22"
          />
          </template>

          <VListItemTitle>Pricing</VListItemTitle>
          </VListItem> 
        -->

        <!-- 👉 FAQ -->
        <!--
          <VListItem link>
          <template #prepend>
          <VIcon
          class="me-2"
          icon="tabler-help"
          size="22"
          />
          </template>

          <VListItemTitle>FAQ</VListItemTitle>
          </VListItem> 
        -->

        <!-- Divider -->
        <!-- <VDivider class="my-2" /> -->

        <!-- 👉 Logout -->
        <VListItem @click="logout">
          <template #prepend>
            <VIcon class="me-2" icon="tabler-logout" size="22" />
          </template>

          <VListItemTitle>Logout</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <!-- !SECTION -->
    <!-- </VAvatar> -->
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      console.log("on logout")

      localStorage.removeItem('token')
      localStorage.removeItem('first_name')
      localStorage.removeItem('last_name')
      this.$router.push("/login")
    },
    getFullname() {
      return localStorage.getItem("first_name") + " " + localStorage.getItem("last_name")
    },
  },
}
</script>
