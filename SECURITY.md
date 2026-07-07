# Security Policy

## Dependency Management

### Known Overrides

#### js-yaml
- **Version**: ^4.1.2
- **Reason**: Fixes CVE-2021-3765 in js-yaml 3.x
- **Details**: Jest 30.x depends on @istanbuljs/load-nyc-config which requires js-yaml@^3.13.1. This version has known CVEs that cannot be fixed without updating. We override to 4.1.2 which is compatible and secure.
- **Location**: backend/package.json

## Vulnerability Scanning

We run `npm audit` in both backend and frontend directories to identify vulnerabilities:

```bash
cd backend && npm audit
cd frontend && npm audit
```

The update-dependencies workflow verifies that both directories pass npm audit with audit-level=moderate before updating lockfiles.

## Reporting Security Issues

Please report security vulnerabilities responsibly by opening a private security advisory.
