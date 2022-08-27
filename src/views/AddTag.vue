<template>
  <div>
    <NavBar></NavBar>
    <AddTagName></AddTagName>
    <TagList></TagList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NavBar from '@/components/AddTag/NavBar.vue';
import AddTagName from '@/components/AddTag/AddTagName.vue';
import TagList from '@/components/AddTag/TagList.vue';

@Component({
  components: {NavBar, AddTagName, TagList}
})
export default class addTags extends Vue {}
</script>

<style lang="scss" scoped>

</style>