export const statusCodeGroups = [
    // 1xx: Informational responses
    {
      type: 'Informational',
      codes: [
        { code: 100, description: 'CONTINUE' },
        { code: 101, description: 'SWITCHING_PROTOCOLS' },
        { code: 102, description: 'PROCESSING' },
        { code: 103, description: 'EARLY_HINTS' },
      ],
      handling: 'Informational responses, often used for intermediate steps. No error handling needed.'
    },
  
    // 2xx: Successful responses
    {
      type: 'Success',
      codes: [
        { code: 200, description: 'OK' },
        { code: 201, description: 'CREATED' },
        { code: 202, description: 'ACCEPTED' },
        { code: 203, description: 'NON_AUTHORITATIVE_INFORMATION' },
        { code: 204, description: 'NO_CONTENT' },
        { code: 205, description: 'RESET_CONTENT' },
        { code: 206, description: 'PARTIAL_CONTENT' },
      ],
      handling: 'Successful responses, no error handling required. The request was successful.'
    },
  
    // 3xx: Redirection responses
    {
      type: 'Redirection',
      codes: [
        { code: 300, description: 'MULTIPLE_CHOICES' },
        { code: 301, description: 'MOVED_PERMANENTLY' },
        { code: 302, description: 'FOUND' },
        { code: 303, description: 'SEE_OTHER' },
        { code: 304, description: 'NOT_MODIFIED' },
        { code: 305, description: 'USE_PROXY' },
        { code: 307, description: 'TEMPORARY_REDIRECT' },
        { code: 308, description: 'PERMANENT_REDIRECT' },
      ],
      handling: 'Redirection responses indicate that further action is needed to fulfill the request. Typically, no error handling needed but the client should follow the redirection.'
    },
  
    // 4xx: Client error responses
    {
      type: 'Client Error',
      codes: [
        { code: 400, description: 'BAD_REQUEST' },
        { code: 401, description: 'UNAUTHORIZED' },
        { code: 402, description: 'PAYMENT_REQUIRED' },
        { code: 403, description: 'FORBIDDEN' },
        { code: 404, description: 'NOT_FOUND' },
        { code: 405, description: 'METHOD_NOT_ALLOWED' },
        { code: 406, description: 'NOT_ACCEPTABLE' },
        { code: 407, description: 'PROXY_AUTHENTICATION_REQUIRED' },
        { code: 408, description: 'REQUEST_TIMEOUT' },
        { code: 409, description: 'CONFLICT' },
        { code: 410, description: 'GONE' },
        { code: 411, description: 'LENGTH_REQUIRED' },
        { code: 412, description: 'PRECONDITION_FAILED' },
        { code: 413, description: 'PAYLOAD_TOO_LARGE' },
        { code: 414, description: 'URI_TOO_LONG' },
        { code: 415, description: 'UNSUPPORTED_MEDIA_TYPE' },
        { code: 416, description: 'RANGE_NOT_SATISFIABLE' },
        { code: 417, description: 'EXPECTATION_FAILED' },
        { code: 418, description: 'I\'M_A_TEAPOT' }, // Fun status code
        { code: 421, description: 'MISDIRECTED_REQUEST' },
        { code: 422, description: 'UNPROCESSABLE_ENTITY' },
        { code: 423, description: 'LOCKED' },
        { code: 424, description: 'FAILED_DEPENDENCY' },
        { code: 425, description: 'TOO_EARLY' },
        { code: 426, description: 'UPGRADE_REQUIRED' },
        { code: 428, description: 'PRECONDITION_REQUIRED' },
        { code: 429, description: 'TOO_MANY_REQUESTS' },
        { code: 431, description: 'REQUEST_HEADER_FIELDS_TOO_LARGE' },
        { code: 451, description: 'UNAVAILABLE_FOR_LEGAL_REASONS' },
      ],
      handling: 'Client errors indicate issues with the request, which typically require the client to fix (e.g., incorrect data, unauthorized access).'
    },
  
    // 5xx: Server error responses
    {
      type: 'Server Error',
      codes: [
        { code: 500, description: 'INTERNAL_SERVER_ERROR' },
        { code: 501, description: 'NOT_IMPLEMENTED' },
        { code: 502, description: 'BAD_GATEWAY' },
        { code: 503, description: 'SERVICE_UNAVAILABLE' },
        { code: 504, description: 'GATEWAY_TIMEOUT' },
        { code: 505, description: 'HTTP_VERSION_NOT_SUPPORTED' },
        { code: 506, description: 'VARIANT_ALSO_NEGOTIATES' },
        { code: 507, description: 'INSUFFICIENT_STORAGE' },
        { code: 508, description: 'LOOP_DETECTED' },
        { code: 510, description: 'NOT_EXTENDED' },
        { code: 511, description: 'NETWORK_AUTHENTICATION_REQUIRED' },
      ],
      handling: 'Server errors indicate issues on the server side. These need to be handled by the server, and the client should be informed that the server is unavailable or encountering issues.'
    },
  ];
