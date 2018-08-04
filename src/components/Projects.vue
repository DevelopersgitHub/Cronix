<template>
  <div id="projects">
    <h3> Projects </h3>
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
    <userinfo v-bind:listProjects="listProjects"></userinfo>
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
</style>
