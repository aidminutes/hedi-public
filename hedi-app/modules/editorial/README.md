# HEDI article module
implements drupal CMS serving

## Module Types

### [Article](./article.ts)
Exposed Functions:
- __getArticleBySlug__

### [Categories](./categories.ts)
Exposed Functions:
- __getCategoryBySlug__
- __getAllCategories__

### [Languages](./languages.ts)
Exposed Functions:
- __getAllLanguages__

### [Segements](./segments.ts)
Exposed Functions:
- __getAllSegments__


## Types
Types for: 
- [__Articles__](./types/articles.ts)
- [__Categories__](./types/categories.ts)
- [__Segments__](./types/segments.ts)

## Helper
Available helper function:
- [__string-to-slug__](./helper/string-to-slug.ts) - add a ``/`` before a string and return the new string.