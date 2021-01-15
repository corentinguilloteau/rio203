<template>
  
</template>

<script>
import simplebar from 'simplebar-vue';


export default {
  name: "sidebar",
  props: {
    isCollapsed: Boolean,
    items: Array
  },
  components: {
    simplebar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
$sidebar-width: 260px

.sidebar
    min-width: $sidebar-width
    max-width: $sidebar-width
    transition: margin-left .35s ease-in-out,left .35s ease-in-out,margin-right .35s ease-in-out,right .35s ease-in-out
    direction: ltr
    background: #293042

.sidebar.collapsed
    margin-left: - $sidebar-width

.sidebar-top
    width: 100%
    height: 3.425rem

.sidebar-nav
    padding-left: 0

a.sidebar-link
    display: block
    padding: .625rem 1.625rem
    font-weight: 400
    transition: color 75ms ease-in-out
    position: relative
    text-decoration: none
    cursor: pointer
    color: rgba(233,236,239,.5)

.sidebar-item.active .sidebar-link:hover, .sidebar-item.active>.sidebar-link 
    color: #e9ecef

</style>
