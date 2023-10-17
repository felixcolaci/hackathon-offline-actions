export interface ApiSAMLResponse {
    setAttribute(attribute: String, value: string | number | boolean | null | Array<string | number | boolean>): void,
    setAudience(audience: String): void,
    setRecipient(recipient: String): void,
    setCreateUpnClaim(createUpnClaim: boolean): void,
    setPassthroughClaimsWithNoMapping(passthroughClaimsWithNoMapping: boolean): void,
    setMapUnknownClaimsAsIs(mapUnknownClaimsAsIs: boolean): void,
    setMapIdentities(mapIdentities: boolean): void,
    setDestination(destination: String): void,
    setLifetimeInSeconds(lifetimeInSeconds: number): void,
    setSignResponse(signResponse: boolean): void,
    setNameIdentifierFormat(nameIdentifierFormat: String): void,

    setNameIdentifierProbes(nameIdentifierProbes: Array<String>): void,
    setAuthnContextClassRef(authnContextClassRef: String): void,
    setSigningCert(signingCert: String | undefined): void,
    setIncludeAttributeNameFormat(includeAttributeNameFormat: boolean): void,
    setTypedAttributes(typedAttributes: boolean): void,
    setEncryptionCert(encryptionCert: String | undefined): void,
    setCert(cert: String | undefined): void,
    setKey(key: String | undefined): void
}