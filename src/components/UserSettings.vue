<template>
    <div class="us" id="userSettings">
      <UserSettingsNav/>
      <router-view class ="us__content"/>
      <router-view name="helper" class="us__content us__content--helper"/>
    </div>
</template>

<script>
    import UserSettingsNav from "./UserSettingsNav";
    export default {
        name: "UserSettings",
      components: {UserSettingsNav}
    }
</script>

<style scoped>

</style>
