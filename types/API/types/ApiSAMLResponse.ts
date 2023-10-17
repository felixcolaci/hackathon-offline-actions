/**
 * Modify the SAML Response for the user that is logging in.
 */
export interface ApiSAMLResponse {
    /**
     * Set a custom SAML attribute.


The value must be of type SAMLValue, which can be `string | number | boolean | null | Array < string | number | boolean >`
     * @param attribute The SAML attribute to be set.
     * @param value The value of the SAML assertion. This may be set to null to remove the attribute property.
     * @returns A failed operation throws an Error. For errors, the returned object has a message that indicates the nature of the failure.
     */
    setAttribute(
        attribute: String, 
        value: string | number | boolean | null | Array<string | number | boolean>
        ): {[key:string]:any} | void,
        /**
         * Alter the audience of the SAML Response. Default is the issuer on SAMLRequest.
         * @param audience The SAML audience to be set.
         */
    setAudience(audience: String): void,
    /**
     * Alter the recipient of the SAML assertion (SubjectConfirmationData). Default is AssertionConsumerUrl on SAMLRequest or callback URL if no SAMLRequest was sent.
     * @param recipient The SAML recipient to be set.
     */
    setRecipient(recipient: String): void,
    /**
     * Dictates if a UPN claim should be created. Default is `true`.
     * @param createUpnClaim Toggle to create a UPN claim.
     */
    setCreateUpnClaim(createUpnClaim: boolean): void,
    /**
     * If true (default), for each claim that is not mapped to the common profile, Auth0 passes through those in the output assertion. If false, those claims won't be mapped.
     * @param passthroughClaimsWithNoMapping Should claims should be mapped to the output assertion.
     */
    setPassthroughClaimsWithNoMapping(passthroughClaimsWithNoMapping: boolean): void,
    /**
     * If passthroughClaimsWithNoMapping is true and this is false (default), for each claim not mapped to the common profile Auth0 adds a prefix http://schema.auth0.com. If true, it will pass through the claim as-is.
     * @param mapUnknownClaimsAsIs Should claims should be mapped as-is.
     */
    setMapUnknownClaimsAsIs(mapUnknownClaimsAsIs: boolean): void,
    /**
     * If true (default), this adds more information in the token such as the provider (Google, ADFS, AD, etc.) and the access token, if available.
     * @param mapIdentities Should identities be mapped.
     */
    setMapIdentities(mapIdentities: boolean): void,
    /**
     * Destination of the SAML response. If not specified, it will be AssertionConsumerUrl of SAMLRequest or callback URL if there was no SAMLRequest.
     * @param destination Destination of the SAML response.
     */
    setDestination(destination: String): void,
    /**
     * Expiration of the token in seconds. Default is 3600 seconds (1 hour).
     * @param lifetimeInSeconds Expiration of the token in seconds.
     */
    setLifetimeInSeconds(lifetimeInSeconds: number): void,
    /**
     * Whether or not the SAML response should be signed. By default the SAML assertion will be signed, but not the SAML response. If true, SAML Response will be signed instead of SAML assertion. Default to false.
     * @param signResponse Should the SAML response be signed.
     */
    setSignResponse(signResponse: boolean): void,
    /**
     * Sets the name ID format. Default is urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified.
     * @param nameIdentifierFormat The Name ID Format.
     */
    setNameIdentifierFormat(nameIdentifierFormat: String): void,
    /**
     * Auth0 tries to name each of the attributes of this array in order. If one of them has a value, it will use that for the Subject/NameID. The order is:

    http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier (mapped from user_id)

    http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress (mapped from email),

    http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name (mapped from name)
     * @param nameIdentifierProbes An array of attributes to try for the name identifier.
     */
    setNameIdentifierProbes(nameIdentifierProbes: Array<String>): void,
    /**
     * Default is urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified.
     * @param authnContextClassRef The AuthnContextClassRef.
     */
    setAuthnContextClassRef(authnContextClassRef: String): void,
    /**
     * Optionally indicates the public key certificate used to validate SAML requests. If set, SAML requests will be required to be signed. A sample value would be "-----BEGIN CERTIFICATE-----\nMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n".
     * @param signingCert Optional public key certificate used to validate SAML requests.
     */
    setSigningCert(signingCert: String | undefined): void,
    /**
     * When set to true, we infer the NameFormat based on the attribute name. NameFormat values are urn:oasis:names:tc:SAML:2.0:attrname-format:uri, urn:oasis:names:tc:SAML:2.0:attrname-format:basic and urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified.
     * 
     * If set to false, the attribute NameFormat is not set in the assertion. Default is true.
     * @param includeAttributeNameFormat Should NameFormat be inferred based on the attribute name.
     */
    setIncludeAttributeNameFormat(includeAttributeNameFormat: boolean): void,
    /**
     * When set to true, we infer the xs:type of the element. Types are xs:string, xs:boolean, xs:double and xs:anyType. When set to false all xs:type are xs:anyType. Default is true.
     * @param typedAttributes Should xs:type be inferred.
     */
    setTypedAttributes(typedAttributes: boolean): void,
    /**
     * Optionally specify a certificate used to encrypt the SAML assertion. The certificate should be obtained from the service provider. Both the certificate and public key must be specified. A sample value would be "-----BEGIN CERTIFICATE-----\nMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n".
     * @param encryptionCert Optional certificate to encrypt the SAML assertion.
     */
    setEncryptionCert(encryptionCert: String | undefined): void,
    /**
     * By default, Auth0 will use the private/public key pair assigned to your tenant to sign SAML responses or assertions. For very specific scenarios, you might wish to provide your own certificate and private key.

Both the certificate and private key must be specified.

A sample value would be "-----BEGIN CERTIFICATE-----\nMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n".
     * @param cert Optional certificate to sign the SAML responses or assertions.
     */
    setCert(cert: String | undefined): void,
    /**
     * By default, Auth0 will use the private/public key pair assigned to your tenant to sign SAML responses or assertions. For very specific scenarios, you might wish to provide your own certificate and private key.

Since this private key is sensitive, we recommend using the Add Secret functionality of Actions. See here for more details: Write Your First Action

Both the certificate and private key must be specified.

A sample value would be "-----BEGIN PRIVATE KEY-----\nnMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END PRIVATE KEY-----\n".
     * @param key Optional private key to sign the SAML responses or assertions.
     */
    setKey(key: String | undefined): void
}