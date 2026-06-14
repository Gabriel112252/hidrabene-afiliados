import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["cep", "street", "neighborhood", "city", "state", "status"]

  disconnect() {
    this.abortPendingRequest()
  }

  search() {
    const cep = this.cepTarget.value.replace(/\D/g, "").slice(0, 8)

    this.cepTarget.value = this.formatCep(cep)
    this.clearStatus()

    if (cep.length !== 8) {
      this.abortPendingRequest()
      return
    }

    this.lookup(cep)
  }

  async lookup(cep) {
    this.abortPendingRequest()
    const requestController = new AbortController()
    this.abortController = requestController
    this.setLoading(true)

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        signal: requestController.signal
      })

      if (!response.ok) throw new Error("ViaCEP request failed")

      const data = await response.json()

      if (data.erro) {
        this.showError("CEP não encontrado.")
        return
      }

      this.fillAddress(data)
      this.clearStatus()
    } catch (error) {
      if (error.name !== "AbortError") {
        this.showError("Não foi possível consultar o CEP.")
      }
    } finally {
      if (this.abortController === requestController) {
        this.abortController = null
        this.setLoading(false)
      }
    }
  }

  fillAddress(data) {
    if (this.hasStreetTarget) this.streetTarget.value = data.logradouro || ""
    if (this.hasNeighborhoodTarget) this.neighborhoodTarget.value = data.bairro || ""
    if (this.hasCityTarget) this.cityTarget.value = data.localidade || ""
    if (this.hasStateTarget) this.stateTarget.value = data.uf || ""
  }

  formatCep(cep) {
    return cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep
  }

  setLoading(loading) {
    this.cepTarget.classList.toggle("animate-pulse", loading)
    this.cepTarget.setAttribute("aria-busy", loading.toString())

    if (loading) {
      this.statusTarget.textContent = "Consultando CEP..."
      this.statusTarget.className = "mt-1 block text-sm text-[#d1477a]"
    }
  }

  showError(message) {
    this.setLoading(false)
    this.statusTarget.textContent = message
    this.statusTarget.className = "mt-1 block text-sm text-red-600"
  }

  clearStatus() {
    this.statusTarget.textContent = ""
    this.statusTarget.className = "hidden"
  }

  abortPendingRequest() {
    if (this.abortController) {
      this.abortController.abort()
      this.abortController = null
    }

    if (this.hasCepTarget) this.setLoading(false)
  }
}
