import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "name",
    "cpf",
    "cpfError",
    "email",
    "emailError",
    "whatsapp",
    "tiktok",
    "authorization",
    "submit"
  ]

  connect() {
    this.cpfTarget.value = this.formatCpf(this.onlyDigits(this.cpfTarget.value))
    this.whatsappTarget.value = this.formatWhatsapp(this.onlyDigits(this.whatsappTarget.value))
    this.validate()
  }

  maskCpf() {
    this.cpfTarget.value = this.formatCpf(this.onlyDigits(this.cpfTarget.value))
  }

  maskWhatsapp() {
    this.whatsappTarget.value = this.formatWhatsapp(this.onlyDigits(this.whatsappTarget.value))
  }

  preventInvalidSubmit(event) {
    this.validate()

    if (!this.formValid) event.preventDefault()
  }

  validate() {
    const tiktokVal = this.tiktokTarget.value.trim()
    if (tiktokVal && !tiktokVal.startsWith("@")) {
      this.tiktokTarget.value = "@" + tiktokVal
    }

    const cpfValid = this.validCpf(this.cpfTarget.value)
    const emailValid = this.validEmail(this.emailTarget.value)

    this.updateFieldFeedback(this.cpfTarget, this.cpfErrorTarget, cpfValid)
    this.updateFieldFeedback(this.emailTarget, this.emailErrorTarget, emailValid)

    this.formValid =
      this.nameTarget.value.trim() !== "" &&
      cpfValid &&
      emailValid &&
      this.whatsappTarget.value.trim() !== "" &&
      this.tiktokTarget.value.trim() !== "" &&
      this.authorizationTarget.checked

    this.submitTarget.disabled = !this.formValid
    this.submitTarget.classList.toggle("opacity-50", !this.formValid)
    this.submitTarget.classList.toggle("cursor-not-allowed", !this.formValid)
    this.submitTarget.classList.toggle("hover:opacity-95", this.formValid)
  }

  validCpf(value) {
    const cpf = this.onlyDigits(value)

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

    const calculateDigit = (length) => {
      let sum = 0

      for (let index = 0; index < length; index += 1) {
        sum += Number(cpf[index]) * (length + 1 - index)
      }

      const remainder = (sum * 10) % 11
      return remainder === 10 ? 0 : remainder
    }

    return calculateDigit(9) === Number(cpf[9]) &&
      calculateDigit(10) === Number(cpf[10])
  }

  validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  }

  updateFieldFeedback(field, error, valid) {
    const hasValue = field.value.trim() !== ""

    field.style.borderColor = hasValue && valid ? "#22c55e" : hasValue ? "#ef4444" : ""
    field.style.boxShadow = hasValue && !valid ? "0 0 0 3px rgba(239,68,68,.15)" : ""
    error.classList.toggle("hidden", !hasValue || valid)
    field.setAttribute("aria-invalid", (hasValue && !valid).toString())
  }

  onlyDigits(value) {
    return value.replace(/\D/g, "")
  }

  formatCpf(value) {
    const digits = value.slice(0, 11)

    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }

  formatWhatsapp(value) {
    const digits = value.slice(0, 11)

    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
  }
}
