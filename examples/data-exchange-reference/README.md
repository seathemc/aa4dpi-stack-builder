# AA4DPI Data Exchange Reference

This is a small executable reference example for what an African DPI data
exchange layer needs to do before any real integration begins.

It is not a production exchange layer. It shows the shape of the logic:

- who is requesting data
- which service they are requesting
- the declared purpose
- the required fields
- the minimum response fields
- the audit event that proves what happened

## Cohort 1 Examples

The registry includes sample services for:

- Sierra Leone procurement-to-payment status
- Sierra Leone supplier and contract checks
- Ethiopia MESOB identity assertion through Fayda
- Zambia land parcel status
- Zambia forest permit status

## Run the Demo

```bash
node examples/data-exchange-reference/demo.mjs
```

## Run Tests

```bash
npm run test:exchange
```

## What This Proves

The important part is not the mock response data. The important part is the
control pattern:

1. Requests must have a known agency.
2. Requests must have a known service.
3. The country and service context must match.
4. The request purpose must match the service purpose.
5. The requester must have an allowed role.
6. Required fields must be present.
7. Responses are minimized to approved fields.
8. Every decision produces an audit event.

That is the practical bridge between the website concept and actual reusable
DPG-style infrastructure code.
