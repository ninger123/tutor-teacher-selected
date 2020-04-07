<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tutorIndex from './tutor'
import studentIndex from './student'
import schoolIndex from './school'

export default {
  name: 'Home',
  components: { studentIndex, tutorIndex, schoolIndex },
  data() {
    return {
      currentRole: 'studentIndex'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
  },
  created() {
    if (this.roles.includes('student')) {
      this.currentRole = 'studentIndex'
    } else if(this.roles.includes('tutor')) {
      this.currentRole = 'tutorIndex'
    } else {
      this.currentRole = 'schoolIndex'
    }
  }
}
</script>
