declare module '@ioc:ExternalApis/Ntfy' {
  import type { NtfyServicesInterface } from 'App/Interfaces/Services/NtfyServicesInterface'
  const Ntfy: NtfyServicesInterface
  export default Ntfy
}
declare module '@ioc:ExternalApis/ViaCep' {
  import type { ViaCepServicesInterface } from 'App/Interfaces/Services/ViaCepServicesInterface'
  const ViaCep: ViaCepServicesInterface
  export default ViaCep
}
declare module '@ioc:ExternalApis/Plagiarism' {
  import type { PlagiarismServiceInterface } from 'App/Interfaces/Services/PlagiarismServiceInterface'
  const Plagiarism: PlagiarismServiceInterface
  export default Plagiarism
}
declare module '@ioc:ExternalApis/Ortography' {
  import type { OrtographyServiceInterface } from 'App/Interfaces/Services/OrtographyServiceInterface'
  const Ortography: OrtographyServiceInterface
  export default Ortography
}
