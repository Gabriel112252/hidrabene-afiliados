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

    if (!this.formValid) {
      event.preventDefault()
      return
    }

    event.preventDefault()
    this.showSuccess()
    setTimeout(() => { this.element.submit() }, 2000)
  }

  showSuccess() {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes hb-fadeIn { from { opacity: 0 } to { opacity: 1 } }
      @keyframes hb-scaleIn { from { transform: scale(0.6); opacity: 0 } to { transform: scale(1); opacity: 1 } }
      @keyframes hb-checkDraw {
        from { stroke-dashoffset: 48 }
        to   { stroke-dashoffset: 0  }
      }
      @keyframes hb-spin { to { transform: rotate(360deg) } }
    `
    document.head.appendChild(style)

    const overlay = document.createElement("div")
    overlay.style.cssText = [
      "position:fixed", "inset:0", "z-index:9999",
      "display:flex", "flex-direction:column", "align-items:center", "justify-content:center",
      "background:rgba(255,247,250,0.97)",
      "animation:hb-fadeIn 0.35s ease both"
    ].join(";")

    overlay.innerHTML = `
      <div style="text-align:center;padding:2rem;animation:hb-scaleIn 0.4s cubic-bezier(.34,1.56,.64,1) 0.1s both">
        <div style="
          width:80px;height:80px;border-radius:50%;
          background:linear-gradient(135deg,#f472a8,#d1477a);
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 1.25rem;
          box-shadow:0 8px 24px rgba(209,71,122,0.35)
        ">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
            <polyline points="8,21 16,30 32,12"
              stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"
              stroke-dasharray="48" stroke-dashoffset="48"
              style="animation:hb-checkDraw 0.45s ease 0.35s forwards"/>
          </svg>
        </div>
        <p style="font-size:1.2rem;font-weight:800;color:#d1477a;margin-bottom:0.4rem">Cadastro realizado!</p>
        <p style="font-size:0.875rem;color:#9ca3af;margin-bottom:1.5rem">Você será redirecionada em instantes...</p>
        <div style="
          width:28px;height:28px;border:3px solid rgba(209,71,122,0.2);
          border-top-color:#d1477a;border-radius:50%;
          margin:0 auto;
          animation:hb-spin 0.8s linear infinite
        "></div>
      </div>
    `

    document.body.appendChild(overlay)
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
