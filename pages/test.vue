<template lang='pug'>
div
  div(v-bind:class="{ 'form-group--error': $v.name.$error }")
    label Name
    input(v-model.trim="name" @input="$v.name.$touch()")
  span(v-if="!$v.name.required") Field is required
  span(v-if="!$v.name.minLength") Name must be longer than 3 letters.
  pre
    | name: {{ $v.name }}

  div(v-bind:class="{ 'form-group--error': $v.age.$error }")
    label Age
    input(v-model.trim="age" @blur="$v.age.$touch()")
  span(v-if="!$v.age.between") Must be between 20 and 30
  pre
    | age: {{ $v.age }}
  button(v-bind:disabled="$v.$invalid") Valid
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: '',
      age: 0
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    age: {
      between: between(20, 30)
    }
  },
  methods: {
    test: () => console.log(this)
  }
}
</script>
