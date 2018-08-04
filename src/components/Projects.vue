<template>
  <div id="projects">
    <h2 class="borderProject"> Projects </h2>
      <ul class="borderProject" style="list-style-type: none">
        <li><router-link :to="{ name: 'project', params: { id: 'Home' }}">Home</router-link></li>
        <li><router-link :to="{ name: 'project', params: { id: 'Job' }}">Job</router-link></li>
        <li><router-link :to="{ name: 'project', params: { id: 'Buy' }}">Buy</router-link></li>
        <li><router-link :to="{ name: 'project', params: { id: 'Private' }}">Private</router-link></li>
      </ul>
    <button type="button" class="btn btn-primary btn-lg btn-block">Add project</button>
    <!--<h3> Projects </h3>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Job</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Buy</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Private</a>
      </li>
    </ul>
    <userinfo v-bind:listProjects="listProjects"></userinfo>-->
    </div>
</template>

<script>
    export default {
        name: "projects"
    }
</script>

<style>
  #projects {
    position:absolute;
    float:left;
    width: 25%;
    margin: 60px 20px;
    padding: 15px 15px;
    border: 1px solid white;
    border-radius: 5px;
  }
  .borderProject {
    border-bottom: 1px solid white;
    border-radius: 5px; padding: 10px;
  }
</style>
