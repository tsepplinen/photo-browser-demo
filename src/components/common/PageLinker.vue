<template>
  <div v-if="hasPages" class="container">
    <router-link v-if="hasPrevious" :to="linkTo(previous)">Previous</router-link>

    <router-link v-for="page in begin" :key="page"
                 class="page" :to="linkTo(page)"
                 v-bind:class="{current: isCurrent(page)}">{{page}}</router-link>

    <span v-if="showFirstDots" class="dots">...</span>

    <router-link v-if="showCurrent" class="page current"
                 :to="linkTo(currentPage)">{{currentPage}}</router-link>

    <span v-if="showLastDots" class="dots">...</span>

    <router-link v-for="page in end" :key="page" class="page"
                 :to="linkTo(page)"
                 v-bind:class="{current: isCurrent(page)}">{{page}}</router-link>

    <router-link v-if="hasNext" :to="linkTo(next)">Next</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageLinker',
  props: ['currentPage','first', 'last', 'linkBuilder'],
  data() {
    return {
      // Until this many pages, use simple mode
      simpleLimit: 7,
    }
  },  
  computed: {
    // Tells if more than one page exists
    hasPages() {
      return this.pageCount > 1;
    },
    pageCount() {
      return (this.last - this.first) + 1;
    },
    isSimple() {
      return this.pageCount <= this.simpleLimit;
    },
    // Page buttons from beginning.
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
    // Page buttons from end.
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
    // Should current page should be shown in middle
    showCurrent() {
      if (this.isSimple) {
        return false;
      }
      const page = this.currentPage;
      const min = Number(this.first) + 2;
      const max = Number(this.last) - 2;
      const value = (min < page && page < max);
    
      return value;
    },
    // Tells is there a previous page
    hasPrevious() {
      return (Number(this.previous) >= this.first);
    },
    // Tells is there a next page
    hasNext() {
      return (Number(this.next) <= this.last);
    },
    // Previous pages number
    previous() {
      return Number(this.currentPage) - 1;
    },
    // Next pages number
    next() {
      return Number(this.currentPage) + 1;
    },
  },
  methods: {
    // Creates a link to page
    linkTo(page) {
      return this.linkBuilder(page);
    },
    // Check if a page is the current page
    isCurrent(page) {
      return Number(page) === Number(this.currentPage);
    }
  }
}
</script>

<style scoped>
  a.page, a.current {
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
