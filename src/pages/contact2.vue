<template>
  <section class="Page CenteredPage">
    <h1>Entre em contato</h1>
    <header>
      <p>Use o formulário abaixo para enviar a sua mensagem, críticas, sugestões etc:</p>
    </header>

    <main>
      <v-alert v-if="alertText" :type="alertType">{{alertText}}</v-alert>
      <v-form ref="form" @input="resetSuccess">
        <v-text-field
          v-model="name"
          required
          label="Nome"
          :disabled="isSending || !isAvailable"
          :error-messages="nameErrors"
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          required
          label="E-mail"
          :disabled="isSending || !isAvailable"
          :error-messages="emailErrors"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-textarea
          v-model="message"
          required
          label="Mensagem"
          :disabled="isSending || !isAvailable"
          :error-messages="messageErrors"
          @input="$v.message.$touch()"
          @blur="$v.message.$touch()"
        ></v-textarea>
        <vue-recaptcha
          v-if="isAvailable"
          ref="recaptcha"
          size="invisible"
          :sitekey="recaptchaKey"
          @expired="onExpired"
          @verify="onCaptchaVerify"
        ></vue-recaptcha>

        <v-btn :disabled="isSending || !isAvailable" color="primary" @click="onSubmit">Enviar</v-btn>
        <v-btn :disabled="isSending || !isAvailable" @click="clearForm">Limpar</v-btn>
      </v-form>
    </main>
  </section>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'

class ServerError extends Error {}
class ValidationError extends Error {}

export default {
  name: 'ContactPage',
  components: {
    VueRecaptcha: () =>
      import(/* webpackChunkName: "vue-recaptcha" */ 'vue-recaptcha')
  },
  mixins: [validationMixin],
  data() {
    return {
      error: null,
      success: false,
      isSending: false,
      isAvailable: false,
      name: '',
      email: '',
      message: ''
    }
  },
  computed: {
    recaptchaKey() {
      return process.env.RECAPTCHA_KEY
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('O nome não pode ter mais do que 255 caracteres')
      !this.$v.name.required && errors.push('É necessário digitar um nome')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('E-mail inválido')
      !this.$v.email.required && errors.push('É necessário digitar um e-mail')
      return errors
    },
    messageErrors() {
      const errors = []
      if (!this.$v.message.$dirty) return errors
      !this.$v.message.minLength && errors.push('Mensagem curta demais')
      !this.$v.message.required &&
        errors.push('É necessário digitar uma mensagem')
      return errors
    },
    alertType() {
      return this.error ? 'error' : 'success'
    },
    alertText() {
      return this.error && this.error.message
        ? this.error.message
        : this.success
          ? 'Mensagem enviada com sucesso'
          : ''
    }
  },
  async asyncData() {
    // Esta página estará disponível somente se houver uma chave para o recaptcha
    const isAvailable =
      process.env &&
      process.env.RECAPTCHA_KEY &&
      process.env.CONTACT_MESSAGE_RELAY_URL
    return {
      isAvailable
    }
  },
  mounted() {
    if (!this.isAvailable) {
      this.error = new ServerError(
        'Formulário indisponível, por-favor tente novamente mais tarde.'
      )
    }
  },
  head() {
    return {
      title: 'Contato',
      titleTemplate: 'xraM-Memory - %s',
      script: [
        {
          type: 'text/javascript',
          src:
            'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit',
          async: true,
          defer: true,
          body: false
        }
      ]
    }
  },
  methods: {
    onCaptchaVerify(response) {
      this.isSending = true
      this.$axios
        .post(process.env.CONTACT_MESSAGE_RELAY_URL, {
          name: this.name,
          email: this.email,
          message: this.message,
          recaptcha_response: response
        })
        .then(() => {
          this.showSuccess()
          this.$refs.recaptcha.reset()
          this.isSending = false
        })
        .catch(e => {
          if (e.response && e.response.status === 400) {
            this.showValidationError(
              'A validação do ReCaptcha falhou, atualize a página e tente novamente.'
            )
          } else {
            this.showUnavailabilityError(
              'Formulário indisponível no momento, tente mais tarde.'
            )
          }
          this.$refs.recaptcha.reset()
          this.isSending = false
        })
    },
    onExpired() {
      this.$refs.recaptcha.reset()
    },
    onSubmit() {
      if (this.$v.$invalid) {
        this.showValidationError()
      } else {
        this.error = null
        // dê o pontapé na validação do recaptcha, que por si mesma enviará o formulário ao final
        this.$refs.recaptcha.execute()
      }
    },
    resetSuccess() {
      this.success = false
    },
    showValidationError(message = 'Por-favor, corrija os erros abaixo:') {
      this.error = new ValidationError(message)
      this.$v.$touch()
    },
    showUnavailabilityError() {
      this.error = new ServerError(
        'Formulário indisponível, por-favor tente novamente mais tarde.'
      )
      this.$v.$reset()
    },
    showSuccess() {
      this.success = true
      this.$v.$reset()
      this.clearFields()
    },
    clearFields() {
      for (let fieldName of ['name', 'email', 'message']) {
        this[fieldName] = ''
      }
    },
    clearForm() {
      this.clearFields()
      this.$v.$reset()
      this.error = null
      this.success = false
      this.isSending = false
    }
  },
  validations: {
    name: { required, maxLength: maxLength(255) },
    email: { required, email },
    message: { required, minLength: minLength(3) }
  }
}
</script>

<style lang="stylus" scoped>
h1 {
  margin-top: 0;
}

main {
  font-family: $sans-serif;
}

.Contact__Form {
  font-size: 1.2rem;
  padding: 1rem 0;
}

.v-btn.primary {
  /** Existe um bug no vuletify que não está carregando a cor de fundo deste botão */
  background-color: $link-color-active !important;
}
</style>
