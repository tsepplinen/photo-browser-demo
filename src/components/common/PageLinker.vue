<template>
  <div v-if="hasPages" class="container">
    <router-link v-if="hasPrevious" :to="linkTo(previous)">Previous</router-link>
    <router-link v-for="page in begin" :key="page" class="page" :to="linkTo(page)" v-bind:class="{current: isCurrent(page)}">{{page}}</router-link>
    <span v-if="showFirstDots" class="dots">...</span>
    <router-link v-if="showCurrent" class="page current" :to="linkTo(currentPage)">{{currentPage}}</router-link>
    <span v-if="showLastDots" class="dots">...</span>
    <router-link v-for="page in end" :key="page" class="page" :to="linkTo(page)" v-bind:class="{current: isCurrent(page)}">{{page}}</router-link>
    <router-link v-if="hasNext" :to="linkTo(next)">Next</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageLinker',
  props: ['currentPage','first', 'last', 'linkBuilder'],
  data() {
    return {
      simpleLimit: 7,
    }
  },  
  computed: {
    hasPages() {
      return this.pageCount > 1;
    },
    pageCount() {
      return (this.last - this.first) + 1;

    },
    isSimple() {
      return this.pageCount <= this.simpleLimit;
    },
    begin() {
      const pageCount = this.pageCount;
      let pageArray = [];
      let limit = Math.min(pageCount, this.simpleLimit);
      if (pageCount > this.simpleLimit) {
        limit = 3;
      }
      for(let i = 1; i <= limit; i++) {
        pageArray.push(i);
      }
      return pageArray;
    },
    end() {
      const pageCount = this.pageCount;
      if (pageCount > this.simpleLimit) {  
        return [this.last -2, this.last -1, this.last];
      } else {
        return [];
      }
    },
    showFirstDots() {
      if (this.isSimple) {
        return false;
      } else {
        return this.currentPage > Number(this.first) + 3;;
      }
    },
    showLastDots() {
      if (this.isSimple) {
        return false;
      } else {
        return this.currentPage < Number(this.last) - 3;
      }
    },
    showCurrent() {
      if (this.isSimple) {
        return false;
      }
      const page = this.currentPage;
      const min = Number(this.first) + 2;
      const max = Number(this.last) - 2;
      const value = (min < page && page < max);
      console.log("show current", value);
    
      return value;
    },
    hasPrevious() {
      console.log("has previous", this.previous);
      return (Number(this.previous) >= this.first);
    },
    hasNext() {
      console.log("has next", this.next);
      return (Number(this.next) <= this.last);
    },
    previous() {
      return Number(this.currentPage) - 1;
    },
    next() {
      return Number(this.currentPage) + 1;
    },
  },
  methods: {
    linkTo(page) {
      return this.linkBuilder(page);
      // return `/photos?page=${page}`;
    },
    isCurrent(page) {
      console.log("iscurrent", page, this.currentPage);
      
      return Number(page) === Number(this.currentPage);
    }
  }
}
</script>

<style scoped>
  a.page, a.current {
    /* padding: 10px 15px; */
    margin: 0 2px;
    background: lightblue;
    border-radius: 7px;
    display: inline-block;
    width: 38px;
    padding: 5px 0;
  }

  a.current {
    font-weight: bold;
    background: #2c3e50;
    color: white;
  }

  div.container {
    margin: 20px 0;
  }

</style>
