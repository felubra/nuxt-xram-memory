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
          :rules="formRules"
          class="Contact__Form"
          :model="form"
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
            <vue-recaptcha ref="recaptcha" size="invisible" :sitekey="recaptchaKey"></vue-recaptcha>
          </el-form-item>
          <el-form-item class="Contact__FormItem">
            <el-button type="primary" @click="onSubmit">Enviar</el-button>
            <el-button @click="resetForm('ruleForm')">Limpar</el-button>
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
      form: {
        name: '',
        email: '',
        message: ''
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
      return process.env.recaptchaKey
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
  async asyncData({ $axios, route, context, error }) {
    /**
     * TODO: pingue o backend em caso de falha, exiba um erro ou um e-mail para o qual o usuário poderá enviar a mensagem
     */
    // Esta página estará disponível somente se houver uma chave para o recaptcha
    const isAvailable = process.env && process.env.recaptchaKey.length > 0
    if (!isAvailable) {
      error({ statusCode: 500, message: 'Formulário de contato indisponível' })
    }
  },
  methods: {
    clearAlert() {
      this.alertTitle = ''
    },
    onSubmit() {
      this.cleanFields()
      this.clearAlert()
      this.$refs.recaptcha.reset()
      const form = this.$refs['form']
      form
        .validate()
        .then(valid => {
          if (valid) {
            try {
              this.$refs.recaptcha.execute()
              this.alert('Mensagem enviada com sucesso!', 'success')
              this.resetForm()
            } catch {
              this.alert(
                'A validação do captcha falhou, tente novamente.',
                'error'
              )
            } finally {
              this.$refs.recaptcha.reset()
            }
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
            stripIgnoreTag: true,
            stripIgnoreTagBody: true
          }))
      )
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
