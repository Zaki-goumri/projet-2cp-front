# Shared Types

This directory contains shared type definitions used throughout the application.

## Structure

- `index.ts` - Re-exports all types for easier imports
- `attachment.types.ts` - Types related to file attachments
- `education.types.ts` - Types related to education data
- `experience.types.ts` - Types related to experience data
- `user.types.ts` - Types related to user data (User, Student, Company)
- `shared.types.ts` - Legacy file maintained for backward compatibility (new code should import from index)

## Usage

```typescript
import { User, Student, Company, Attachment } from '@/modules/shared/types';

import { User, Student, Company } from '@/modules/shared/types/shared.types';
```

## Migration

A migration script is available to help update imports:

```bash
# From the project root
node src/modules/shared/utils/migration-types.js
```

This will automatically update imports in all TypeScript files to use the new structure. 