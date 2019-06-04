<template>
  <AbstractPage>
    <template v-slot:header>
      <no-ssr>
        <div class="content-container">
          <h1>Entre em contato</h1>
        </div>
      </no-ssr>
    </template>
    <no-ssr>
      <div class="content-container">
        <el-alert v-if="alertTitle" :title="alertTitle" :type="alertType" @close="clearAlert"></el-alert>
        <p>Use o formulário abaixo para enviar a sua mensagem, críticas, sugestões etc:</p>
        <el-form
          ref="form"
          :disabled="!isAvailable"
          :rules="formRules"
          class="Contact__Form"
          :model="form"
          :label-position="labelPosition"
          label-width="200px"
        >
          <el-form-item class="Contact__FormItem" label="Seu nome" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item class="Contact__FormItem" label="Seu e-mail de contato" prop="email">
            <el-input v-model="form.email" type="email"></el-input>
          </el-form-item>
          <el-form-item class="Contact__FormItem" label="Sua mensagem" prop="message">
            <el-input v-model="form.message" rows="5" type="textarea"></el-input>
          </el-form-item>
          <el-form-item class="Contact__FormItem">
            <vue-recaptcha
              v-if="isAvailable"
              ref="recaptcha"
              size="invisible"
              :sitekey="recaptchaKey"
              @expired="onExpired"
              @verify="onCaptchaVerify"
            ></vue-recaptcha>
          </el-form-item>
          <el-form-item class="Contact__FormItem">
            <el-button type="primary" @click="onSubmit">Enviar</el-button>
            <el-button @click="resetForm()">Limpar</el-button>
          </el-form-item>
        </el-form>
      </div>
    </no-ssr>
  </AbstractPage>
</template>
<script>
const xss = require('xss')
import VueRecaptcha from 'vue-recaptcha'
const emailValidator = require('email-validator')

import AbstractPage from '~/components/common/AbstractPage'
export default {
  components: {
    AbstractPage,
    VueRecaptcha
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!emailValidator.validate(value)) {
        callback(new Error('Informe um e-mail válido'))
      } else {
        callback()
      }
    }
    return {
      isAvailable: false,
      form: {
        name: '',
        email: '',
        message: '',
        recaptcha_response: ''
      },
      alertType: 'success',
      alertTitle: '',
      formRules: {
        name: [
          {
            required: true,
            message: 'Por-favor informe o seu nome',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Seu nome deve ter no mínimo três caracteres',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Por-favor informe o seu e-mail de contato',
            trigger: 'blur'
          },
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        message: [
          {
            required: true,
            message: 'Por-favor digite uma mensagem',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    recaptchaKey() {
      return process.env.RECAPTCHA_KEY
    },
    labelPosition() {
      return this.$device.isDesktop || false ? 'left' : 'top'
    }
  },
  watch: {
    isAvailable: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.alertType = 'error'
          this.alertTitle =
            'Formulário indisponível no momento, por-favor tente mais tarde.'
        }
      }
    }
  },
  head() {
    return {
      title: 'Entre em contato',
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
  async asyncData() {
    /**
     * TODO: pingue o backend em caso de falha, exiba um erro ou um e-mail para o qual o usuário poderá enviar a mensagem
     */
    // Esta página estará disponível somente se houver uma chave para o recaptcha
    const isAvailable =
      process.env &&
      process.env.RECAPTCHA_KEY &&
      process.env.CONTACT_MESSAGE_RELAY_URL
    return {
      isAvailable
    }
  },
  methods: {
    clearAlert() {
      this.alertTitle = ''
    },
    onSubmit() {
      this.cleanFields()
      this.clearAlert()
      const form = this.$refs['form']
      form
        .validate()
        .then(isValid => {
          if (isValid) {
            this.$refs.recaptcha.execute()
          }
        })
        .catch(() => {
          this.alert('Corrija os erros abaixo e tente novamente.', 'error')
        })
    },
    alert(message, type = 'success') {
      this.alertType = type
      this.alertTitle = message
    },
    cleanFields() {
      Object.entries(this.form).forEach(
        ([key, value]) =>
          (this.form[key] = xss(value, {
            whiteList: [],
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script']
          }))
      )
    },
    onCaptchaVerify(response) {
      this.form.recaptcha_response = response
      this.$axios
        .post(process.env.CONTACT_MESSAGE_RELAY_URL, this.form)
        .then(() => {
          this.alert('Mensagem enviada com sucesso!', 'success')
          this.resetForm()
        })
        .catch(e => {
          if (e.response && e.response.status === 400) {
            this.alert(
              'A validação do ReCaptcha falhou, atualize a página e tente novamente.',
              'error'
            )
          } else {
            this.alert(
              'Formulário indisponível no momento, tente mais tarde.',
              'error'
            )
          }
        })
      this.$refs.recaptcha.reset()
    },
    onExpired() {
      this.$refs.recaptcha.reset()
    },
    resetForm(formName = 'form') {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
main {
  font-family: 'Cabin', sans-serif;
}
.Contact__Form {
  font-size: 1.2rem;
  padding: 1rem 0;
}

.el-alert__title,
.Contact__FormItem label {
  font-size: 1rem;
  line-height: 1rem;
}
</style>
