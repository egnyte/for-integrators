# Egnyte Developer Days

### Agenda
- Team introductions
- What Egnyte does
- Definitions of basic terms
- Resources for developers
- API Overview
- SDKs
- UI Integration Framework

### What Egnyte does

- Enterprise file sync and share
- Only B2B clients, no free plan
- Different clients with different needs
- No matter what storage, one way to access everything

### Egnyte domain

An instance of Egnyte Connect product that is owned by a client has a separate subdomain `*.egnyte.com`. Can have a custom domain name with branding.

Only `*.egnyte.com` domain names work with Public API so a custom domain needs to be resolved to `.egnyte.com` before being used.

### file group_id and entry_id

A file in Egnyte Connect can have versions. Every time you update the file, group_id remains the same and points to the file, but every version gets a new entry_id that points to it.

### permissions

Permissions are set on a folder level and all files inside the folder are accessible with the same permissions. Also, permissions only exist in `/Shared` but not in `/Private`

### Resources for developers
- developers.egnyte.com
- [API Documentation](https://developers.egnyte.com/docs)
- [Auth with domain resolution](https://developers.egnyte.com/docs/read/Public_API_Authentication#enhanced_auth)
- [SDKs](https://developers.egnyte.com/Egnyte_SDK)
- [Fileppicker for the browser in JS SDK](https://github.com/egnyte/egnyte-js-sdk/blob/master/src/docs/widgets.md)
- [UI Integration framework introduction](https://developers.egnyte.com/docs/read/UI_Integration_Framework)
- [Example UI Integration app](https://github.com/egnyte/example-UIntegration)
- [UI Integration Framework in depth](https://github.com/egnyte/for-integrators)
- [Examples repository](https://github.com/egnyte/for-integrators)
