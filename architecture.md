convention: `T` for "type" e.g. `token.T`, `token.type.T` etc... so we can use "type" in namespacing

scanner: pluggable list of scan functions. each scan function returns 'Token | error | PASS'

multiple token interfaces for different literal types with `type` as discriminating field

match against all scan functions, longest match wins
